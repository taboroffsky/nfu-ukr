import React from "react";
import GalleryPopupStyle from "./Gallery-popup.module.scss"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { faEthereum } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTranslation from 'next-translate/useTranslation';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { useNotification } from "web3uikit"

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

    const insufficientFundsErrorPattern = "insufficient funds";
    const executionRevertedErrorPattern = "execution reverted";
    const executionCancelledErrorPattern = "User denied transaction";
    const walletNotConnectedErrorPattern = "Missing web3 instance";

    const { runContractFunction: mintNftFunction } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "mintNft",
        params: {
            tokenUri: props.token.tokenUri
        },
        msgValue: tokenPrice
    })

    const raiseNotification = useNotification();

    const mint = async function () {
        await mintNftFunction({
            onError: (error) => {
                if (error.message.includes(insufficientFundsErrorPattern)) {
                    raiseNotification({
                        type: "error",
                        title: tCommon("failure"),
                        message: tCommon("insufficientFunds"),
                        position: "bottomR",
                    })
                }
                else if (error.message.includes(executionRevertedErrorPattern)) {
                    raiseNotification({
                        type: "error",
                        title: tCommon("failure"),
                        message: tCommon("transactionReverted"),
                        position: "bottomR",
                    })
                }
                else if (error.message.includes(executionCancelledErrorPattern)) {
                    raiseNotification({
                        type: "error",
                        title: tCommon("failure"),
                        message: tCommon("transactionCancelled"),
                        position: "bottomR",
                    })
                }
                else if (error.message.includes(walletNotConnectedErrorPattern)) {
                    raiseNotification({
                        type: "error",
                        title: tCommon("failure"),
                        message: tCommon("walletNotConnected"),
                        position: "bottomR",
                    })
                }
                else {
                    raiseNotification({
                        type: "error",
                        title: tCommon("failure"),
                        message: tCommon("unknownError"),
                        position: "bottomR",
                    })
                }

                console.log(error);
            },
            onSuccess: (tx) => {
                raiseNotification({
                    type: "success",
                    title: tCommon("success"),
                    message: tCommon("successfulTransaction"),
                    position: "bottomR"
                });
                props.Close();
            }
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
                    <span className={GalleryPopupStyle.price}>
                        <FontAwesomeIcon className={GalleryPopupStyle.ethereumIcon} icon={faEthereum} />
                        {process.env.NEXT_PUBLIC_TOKEN_PRICE}
                    </span>
                    <a href="#" className={GalleryPopupStyle.add_cart_btn} onClick={mint}>{tCommon("buy")}</a>
                    <p>{tTokens(props.token.name + DescriptionSuffix)}</p>
                </div>
            </div>
        </div>
    )
}

export default GalleryPopup;