import React, { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { useWeb3Contract } from 'react-moralis';

import AdminStyle from "./Admin.module.scss"
import { CollectionStats } from "../../../nfu-ukr-common/contracts";
import contractAbis from '../../../nfu-ukr-common/resources/contractAbi.json';
import contractAddresses from '../../../nfu-ukr-common/resources/contractAddress.json';

const loadStats = async (): Promise<CollectionStats> => {
    return (await fetch("/api/stats")).json();
}

const Admin = () => {
    const [stats, setStats] = useState<CollectionStats>(null);
    const { t } = useTranslation('common');

    const fetchStats = (): void => {
        loadStats().then(
            (stats: CollectionStats) => {
                setStats(stats);
            }
        );
    }

    useEffect(() => {
        fetchStats();
    }, [])

    const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
    const contractAddress = contractAddresses[chainId]["NonFungibleUkraine"];
    const contractAbi = JSON.parse(contractAbis["NonFungibleUkraine"]);

    const { runContractFunction: withdrawFunction } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "withdraw"
    })

    const withdraw = async function () {
        await withdrawFunction({
            onError: (error) => {
                console.log("failure");
                console.log(error);
            },
            onSuccess: (tx) => {
                console.log("sucess");
            }
        });
    }

    return (
        <>
            <h2>Collection Balance:</h2>
            <p>{stats?.balance}</p>
            <h2>Tokens minted:</h2>
            <p>{stats?.tokensMinted}</p>
            <a href="#" onClick={withdraw}>{t("withdraw")}</a>
        </>
    )
}

export default Admin;