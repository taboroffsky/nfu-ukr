import React, { useEffect, useState } from "react";
import useTranslation from 'next-translate/useTranslation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

import { Token } from "../../../nfu-ukr-common/contracts";
import { NameSuffix } from "../../../nfu-ukr-common/constants";
import GalleryPopup from "./Gallery-popup";
import GalleryStyle from "./Gallery.module.scss";

const loadGalleryItems = async (): Promise<Token[]> => {
  const items: Promise<Token[]> = (await fetch("/api/tokens")).json();
  return items;
}

const Gallery = (): JSX.Element => {
  const { t: tTokens } = useTranslation('tokens');
  const { t: tCommon } = useTranslation('common');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [activeToken, setActiveToken] = useState<Token>(null);

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
      <h1>{tCommon("gallery")}</h1>
      <div className={GalleryStyle.products}>
        {
          isLoading
            ? null
            : (
              tokens.map((token) =>
                <div className={GalleryStyle.product} key={token.tokenUri}>
                  <div className={GalleryStyle.product_card}>
                    <h2 className={GalleryStyle.name}>{tTokens(token.name + NameSuffix)}</h2>
                    <span className={GalleryStyle.price}>
                      <FontAwesomeIcon className={GalleryStyle.ethereumIcon} icon={faEthereum} />
                      {process.env.NEXT_PUBLIC_TOKEN_PRICE}
                    </span>
                    <a className={GalleryStyle.popup_btn} onClick={() => setActiveToken(token)}>{tCommon("tokenDetails")}</a>
                    <img src={`tokens/${token.name}.png`} className={GalleryStyle.product_img} alt="image" />
                  </div>
                </div>
              )
            )
        }
        {activeToken && <GalleryPopup Close={() => setActiveToken(null)} token={activeToken} />}
      </div>
    </section>
  )
}

export default Gallery;