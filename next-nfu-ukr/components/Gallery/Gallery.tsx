import React, { useEffect, useState } from "react";
import useTranslation from 'next-translate/useTranslation';

import { Token } from "../../../nfu-ukr-common/contracts";
import GalleryPopup from "./Gallery-popup";
import GalleryStyle from "./Gallery.module.scss";

const loadGalleryItems = async (): Promise<Token[]> => {
  const items: Promise<Token[]> = (await fetch("http://localhost:3000/api/tokens")).json();
  return items;
}

const Gallery = (): JSX.Element => {
  const { t } = useTranslation('tokens');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  const fetchTokens = (): void => {
    setIsLoading(true);
    setIsImageLoading(true);
    loadGalleryItems().then(
      (loadedTokens: Token[]) => {
        setTokens(loadedTokens);
      }
    ).finally(
      () => {
        setIsLoading(false);
        setIsImageLoading(false);
      }
    );
  }

  useEffect(() => {
    fetchTokens();
  }, [])

  return (
    <section className={`${GalleryStyle.gallery} container`} id="gallery">
      <h1>Галерея</h1>
      <div className={GalleryStyle.products}>
        {
          isLoading
            ? null
            : (
              tokens.map((token) =>
                <div className={GalleryStyle.product}>
                  <div className={GalleryStyle.product_card}>
                    <h2 className={GalleryStyle.name}>{t(token.name)}</h2>
                    <span className={GalleryStyle.price}>$140.00</span>
                    <a className={GalleryStyle.popup_btn} onClick={() => setIsPopupVisible(true)}>Подробиці</a>
                    <img src={`tokens/${token.name}.png`} className={GalleryStyle.product_img} alt="image" />
                  </div>
                  {isPopupVisible && <GalleryPopup Close={() => setIsPopupVisible(false)} token={token} />}
                </div>
              )
            )
        }
      </div>
    </section>
  )
}

export default Gallery;