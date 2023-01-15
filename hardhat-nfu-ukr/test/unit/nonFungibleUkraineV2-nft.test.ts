import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { BigNumberish, ContractTransaction } from "ethers";
import { network, deployments, ethers } from "hardhat";
import { StorageFilePath, NonFungibleUkraineV2Name } from "../../../nfu-ukr-common/constants";
import { DevelopmentChains, networkConfig } from "../../helper-hardhat-config";
import { NonFungibleUkraineV2 } from "../../typechain-types";
import getTokenUrisFromStorage from "../../utils/getTokenUrisFromStorage";

!DevelopmentChains.includes(network.name)
    ? describe.skip
    : describe("NonFungibleUkraineV2 Nft unit tests", function () {
          const currentNetwork = networkConfig[network.config.chainId!];
          let deployer: SignerWithAddress, alice: SignerWithAddress;
          let nonFungibleUkraine: NonFungibleUkraineV2;
          let aliceNonFungibleUkraine: NonFungibleUkraineV2;

          const tokenUrisFromStorage: string[] = getTokenUrisFromStorage("../" + StorageFilePath);
          const auctionTokenUris: string[] = tokenUrisFromStorage.slice(0, 1);
          const tokenUris: string[] = tokenUrisFromStorage.slice(1, tokenUrisFromStorage.length);

          this.beforeEach(async function () {
              const accounts = await ethers.getSigners();
              deployer = accounts[0];
              alice = accounts[1];

              await deployments.fixture(["nonFungibleUkraineV2"]);
              nonFungibleUkraine = await ethers.getContract(NonFungibleUkraineV2Name, deployer);
              aliceNonFungibleUkraine = await ethers.getContract(NonFungibleUkraineV2Name, alice);
          });

          const mintNft: (contract: NonFungibleUkraineV2, uri: string, overrides?: { mintFee?: BigNumberish }) => Promise<ContractTransaction> = async function (contract, uri, overrides) {
              return contract.mintNft(uri, { value: overrides?.mintFee || currentNetwork.mintFee });
          };

          it("Should update counters on mint", async function () {
              for (const index in tokenUris) {
                  await mintNft(aliceNonFungibleUkraine, tokenUris[index]);

                  const counter = await nonFungibleUkraine.getTokenUriCount(tokenUris[index]);
                  assert.equal(counter.toNumber(), currentNetwork.tokensPerUri - 1);

                  const balance = await nonFungibleUkraine.balanceOf(alice.address);
                  assert.equal(balance.toNumber(), Number.parseInt(index) + 1);
              }

              const tokenCounter = await nonFungibleUkraine.getTokenCounter();
              assert.equal(tokenCounter.toNumber(), tokenUris.length + auctionTokenUris.length);
          });

          it("Should transfer auction tokens to owner", async function () {
              const immediateOwnerBalance = await nonFungibleUkraine.balanceOf(deployer.address);
              assert.equal(immediateOwnerBalance.toNumber(), auctionTokenUris.length);
          });

          it("Should revert when not enouth eth sent", async function () {
              const invalidMintFee = ethers.BigNumber.from(currentNetwork.mintFee).div(2);
              await expect(mintNft(nonFungibleUkraine, tokenUris[0], { mintFee: invalidMintFee })).to.be.revertedWith("NonFungibleUkraineV2__NotEnoughEth");
          });

          it("Should revert when invalid token Uri is requested", async function () {
              const invalidTokenUri = "myUri";
              await expect(mintNft(nonFungibleUkraine, invalidTokenUri)).to.be.revertedWith("NonFungibleUkraineV2__TokenUriCountExceeded");
          });

          it("Should revert when token Uri is minted more times that allowed", async function () {
              const tokenUri = tokenUris[0];
              for (let index = 0; index < currentNetwork.tokensPerUri; index++) {
                  await mintNft(nonFungibleUkraine, tokenUri);
              }

              await expect(mintNft(nonFungibleUkraine, tokenUri)).to.be.revertedWith("NonFungibleUkraineV2__TokenUriCountExceeded");
          });

          it("Should withdraw funds to owner", async function () {
              const initialDeployerBalance = await deployer.getBalance();

              await mintNft(aliceNonFungibleUkraine, tokenUris[0]);
              await nonFungibleUkraine.withdraw();

              const actualDeployerBalance = await deployer.getBalance();
              expect(actualDeployerBalance).to.be.gt(initialDeployerBalance);

              await expect(aliceNonFungibleUkraine.withdraw()).to.be.revertedWith("Ownable: caller is not the owner");
          });
      });
