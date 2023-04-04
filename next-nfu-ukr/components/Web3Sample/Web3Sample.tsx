import { ConnectButton } from 'web3uikit';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import contractAbis from '../../../nfu-ukr-common/resources/contractAbi.json';
import contractAddresses from '../../../nfu-ukr-common/resources/contractAddress.json';

export default function Web3Sample() {
  const { Moralis } = useMoralis()
  //const chainId = "5"
  const chainId = "31337"
  const tokenUri = "ipfs://QmdPgUoxhZimXRuaF3N2rrWoZiw7TgKEU1or6RNjirVY9Q";
  //const tokenUri = "ipfs://QmSJCs8K98k44Fiew6GDNz7G3wAWdVgyoRx1NEqjFoHJUy";
  //const tokenUri = "ipfs://QmZp889WL7pHJ8sEZBs7FjefbbKoNUe586ZccsivFLy43a";
  const contractAddress = contractAddresses[chainId]["NonFungibleUkraine"];
  const contractAbi = JSON.parse(contractAbis["NonFungibleUkraine"]);

  const { runContractFunction: mintNftFunction } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: contractAddress,
    functionName: "mintNft",
    params: {
      tokenUri: tokenUri
    },
    msgValue: Moralis.Units.ETH(0.001)
})

const { runContractFunction: withdrawFunction } = useWeb3Contract({
  abi: contractAbi,
  contractAddress: contractAddress,
  functionName: "withdraw",
})

const mint = async function () {
  const result = await mintNftFunction({
      onError: (error) => {console.log(error)},
      // tx is just a transaction initialied. It is not yet completed when onSuccess is invoked.
      onSuccess: async (tx) =>{console.log(tx)}});
}

const withdraw = async function () {
    // get rid of this duplicate
  const result = await withdrawFunction({
      onError: (error) => {console.log(error)},
      onSuccess: async (tx) =>{console.log(tx)}});
}

  return (
   <div>
    <ConnectButton moralisAuth={false} />
    <hr/>
    <button onClick={mint}>mint</button>
    <hr/>
    <button onClick={withdraw}>withdraw</button>
   </div>
  )
}
