import React, { useState } from "react";
import GalleryPopupStyle from "./Gallery-popup.module.scss"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTranslation from 'next-translate/useTranslation';
import { useMoralis, useWeb3Contract } from 'react-moralis';

import contractAbis from '../../../nfu-ukr-common/resources/contractAbi.json';
import contractAddresses from '../../../nfu-ukr-common/resources/contractAddress.json';
import { Token } from "../../../nfu-ukr-common/contracts";
import { tokenToString } from "typescript";

interface PopupProps {
    Close: () => void
    token: Token
}

const GalleryPopup = (props: PopupProps): JSX.Element => {
    const { t } = useTranslation('tokens');
    const { Moralis } = useMoralis()
    const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
    const contractAddress = contractAddresses[chainId]["NonFungibleUkraine"];
    const contractAbi = JSON.parse(contractAbis["NonFungibleUkraine"]);
    const tokenPrice = Moralis.Units.ETH(process.env.NEXT_PUBLIC_TOKEN_PRICE)

    const { runContractFunction: mintNftFunction } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "mintNft",
        params: {
            tokenUri: props.token.tokenUri
        },
        msgValue: tokenPrice
    })

    const mint = async function () {
        const result = await mintNftFunction({
            onError: (error) => { console.log(error) },
            onSuccess: async (tx) => { console.log(tx) }
        });
    }

    return (
        <div className={GalleryPopupStyle.popup_view}>
            <div className={GalleryPopupStyle.popup_card}>
                <FontAwesomeIcon className={GalleryPopupStyle.close_btn} icon={faClose} onClick={() => props.Close()} />
                <div className={GalleryPopupStyle.product_img}>
                    <img src={`tokens/${props.token.name}.png`} alt="image" />
                </div>
                <div className={GalleryPopupStyle.info}>
                    <h2>{t(props.token.name + "_name")}</h2><span>колекція орки</span>
                    <span className={GalleryPopupStyle.price}>$ 140.00</span>
                    <a href="#" className={GalleryPopupStyle.add_cart_btn} onClick={mint}>Купити</a>
                    <p>{t(props.token.name + "_description")}</p>
                </div>
            </div>
        </div>
    )
}

export default GalleryPopup;