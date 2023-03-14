import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { BigNumberish, ContractTransaction } from "ethers";
import { network, deployments, ethers } from "hardhat";
import { DevelopmentChains, networkConfig } from "../../helper-hardhat-config";
import { NonFungibleUkraine } from "../../typechain-types";
import { StorageFilePath, NonFungibleUkraineName } from "../../../nfu-ukr-common/constants";
import getTokenUrisFromStorage from "../../utils/getTokenUrisFromStorage";

!DevelopmentChains.includes(network.name)
    ? describe.skip
    : describe("NonFungibleUkraine Nft unit tests", function () {
          const currentNetwork = networkConfig[network.config.chainId!];
          let deployer: SignerWithAddress, alice: SignerWithAddress;
          let nonFungibleUkraine: NonFungibleUkraine;
          let aliceNonFungibleUkraine: NonFungibleUkraine;

          const tokenUris: string[] = getTokenUrisFromStorage("../" + StorageFilePath);
          const tokensPerUri = currentNetwork.tokensPerUri;

          this.beforeEach(async function () {
              const accounts = await ethers.getSigners();
              deployer = accounts[0];
              alice = accounts[1];

              await deployments.fixture(["nonFungibleUkraine"]);
              nonFungibleUkraine = await ethers.getContract(NonFungibleUkraineName, deployer);
              aliceNonFungibleUkraine = await ethers.getContract(NonFungibleUkraineName, alice);
          });

          const mintNft: (contract: NonFungibleUkraine, uri: string, overrides?: { mintFee?: BigNumberish }) => Promise<ContractTransaction> = async function (contract, uri, overrides) {
              return contract.mintNft(uri, { value: overrides?.mintFee || currentNetwork.mintFee });
          };

          it("Should update counters on mint", async function () {
              for (const index in tokenUris) {
                  let availability = await nonFungibleUkraine.getTokenUriAvailability(tokenUris[index]);
                  assert.equal(availability.toNumber(), tokensPerUri);

                  await mintNft(aliceNonFungibleUkraine, tokenUris[index]);

                  availability = await nonFungibleUkraine.getTokenUriAvailability(tokenUris[index]);
                  assert.equal(availability.toNumber(), tokensPerUri - 1);

                  const balance = await nonFungibleUkraine.balanceOf(alice.address);
                  assert.equal(balance.toNumber(), Number.parseInt(index) + 1);
              }

              const tokenCounter = await nonFungibleUkraine.getTokenCounter();
              assert.equal(tokenCounter.toNumber(), tokenUris.length);
          });

          it("Should return expected total supply", async function () {
              const totalSupply = await nonFungibleUkraine.totalSupply();
              assert.equal(totalSupply.toNumber(), tokenUris.length * tokensPerUri);
          });

          it("Should revert when not enouth eth sent", async function () {
              const invalidMintFee = ethers.BigNumber.from(currentNetwork.mintFee).div(2);
              await expect(mintNft(nonFungibleUkraine, tokenUris[0], { mintFee: invalidMintFee })).to.be.revertedWith("NonFungibleUkraine__NotEnoughEth");
          });

          it("Should revert when invalid token Uri is requested", async function () {
              const invalidTokenUri = "myUri";
              await expect(mintNft(nonFungibleUkraine, invalidTokenUri)).to.be.revertedWith("NonFungibleUkraine__TokenUnavailable");
          });

          it("Should revert when token Uri is minted more times that allowed", async function () {
              const tokenUri = tokenUris[0];
              for (let index = 0; index < tokensPerUri; index++) {
                  await mintNft(nonFungibleUkraine, tokenUri);
              }

              const balance = await nonFungibleUkraine.balanceOf(deployer.address);
              assert.equal(balance.toNumber(), tokensPerUri);

              await expect(mintNft(nonFungibleUkraine, tokenUri)).to.be.revertedWith("NonFungibleUkraine__TokenUnavailable");
          });

          it("Should withdraw funds to owner", async function () {
              const initialDeployerBalance = await deployer.getBalance();

              await mintNft(aliceNonFungibleUkraine, tokenUris[0]);
              await nonFungibleUkraine.withdraw();

              const actualDeployerBalance = await deployer.getBalance();
              expect(actualDeployerBalance).to.be.gt(initialDeployerBalance);

              const contractBalance = await nonFungibleUkraine.provider.getBalance(nonFungibleUkraine.address);
              assert.equal(contractBalance.toNumber(), 0);

              await expect(aliceNonFungibleUkraine.withdraw()).to.be.revertedWith("Ownable: caller is not the owner");
          });
      });
