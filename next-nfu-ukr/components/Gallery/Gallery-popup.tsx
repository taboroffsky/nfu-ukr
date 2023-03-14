import React, { useState }from "react";
import GalleryPopupStyle from "./Gallery-popup.module.scss"
import {faClose} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PopupProps {
    Close: () => void
    imageURL: string
}

const GalleryPopup = (props: PopupProps): JSX.Element => {
    return (
        <div className={GalleryPopupStyle.popup_view}>
            <div className={GalleryPopupStyle.popup_card}>
                <FontAwesomeIcon className={GalleryPopupStyle.close_btn} icon={faClose} onClick={() => props.Close()}/>
                <div className={GalleryPopupStyle.product_img}>
                    <img src={props.imageURL} alt="image"/>
                </div>
                <div className={GalleryPopupStyle.info}>
                    <h2>ОРК</h2><span>колекція орки</span>
                    <span className={GalleryPopupStyle.price}>$ 140.00</span>
                    <a href="#" className={GalleryPopupStyle.add_cart_btn}>Купити</a>
                    <p>У літературі орками називали армію міфічних істот, які були відлюдниками з низьким інтелектом. У
                    розумінні англійського письменника Джона Толкіна, орки – це темні створіння, які втілюють зло. Вони
                    підкорялися Темному Володарю і становили основу його збройних сил. Їх військо підкорювало не силою, а
                    кількістю. Орки мали вкрай низький інтелект і не звикли жити в комфорті..</p>
                </div>
            </div>
        </div>
    )
}

export default GalleryPopup;