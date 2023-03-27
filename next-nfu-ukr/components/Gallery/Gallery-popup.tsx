import React, { useState } from "react";
import GalleryPopupStyle from "./Gallery-popup.module.scss"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTranslation from 'next-translate/useTranslation';
import { useMoralis, useWeb3Contract } from 'react-moralis';

import contractAbis from '../../../nfu-ukr-common/resources/contractAbi.json';
import contractAddresses from '../../../nfu-ukr-common/resources/contractAddress.json';
import { DescriptionSuffix, NameSuffix } from "../../../nfu-ukr-common/constants";
import { Token } from "../../../nfu-ukr-common/contracts";

interface PopupProps {
    Close: () => void
    token: Token
}

const GalleryPopup = (props: PopupProps): JSX.Element => {
    const { t: tTokens } = useTranslation('tokens');
    const { t: tCommon } = useTranslation('common');
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
                    <h2>{tTokens(props.token.name + NameSuffix)}</h2>
                    <span>{tCommon("collectionName")}</span>
                    <span className={GalleryPopupStyle.price}>{process.env.NEXT_PUBLIC_TOKEN_PRICE} ETH</span>
                    <a href="#" className={GalleryPopupStyle.add_cart_btn} onClick={mint}>{tCommon("buy")}</a>
                    <p>{tTokens(props.token.name + DescriptionSuffix)}</p>
                </div>
            </div>
        </div>
    )
}

export default GalleryPopup;