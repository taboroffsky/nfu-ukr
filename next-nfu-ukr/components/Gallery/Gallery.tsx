import React, {useEffect, useState} from "react";

import { StorageToken } from "../../../nfu-ukr-common/contracts";
import GalleryPopup from "./Gallery-popup";
import GalleryStyle from "./Gallery.module.scss";

  const loadGalleryItems = async (): Promise<StorageToken[]>  => {
      const items: Promise<StorageToken[]> = (await fetch("http://localhost:3000/api/tokens")).json();
      return items;
  }

const Gallery = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
    const [tokens, setTokens] = useState<StorageToken[]>([]);
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

    const fetchImage = (tokens: StorageToken[]) : void  => {
      tokens.map( async (token) => token.image = await fetch(token.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")).toString());
    };

    const fetchTokens = (): void => {
      setIsLoading(true);
      setIsImageLoading(true);
      loadGalleryItems().then(
        (loadedTokens : StorageToken[]) => {
          fetchImage(loadedTokens)
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
                    <h2 className={GalleryStyle.name}>{token.name}</h2>
                    <span className={GalleryStyle.price}>$140.00</span>
                    <a className={GalleryStyle.popup_btn} onClick={() => setIsPopupVisible(true)}>Подробиці</a>
                    <img src={isImageLoading ? "" : token.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")} className={GalleryStyle.product_img} alt="image"/>
                  </div>
                  {isPopupVisible && <GalleryPopup Close = {()=> setIsPopupVisible(false)} imageURL = {token.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")} />}
                </div>
              )
            )
          }
        </div>
      </section>
    )
}

export default Gallery;