import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { BigNumberish, ContractTransaction } from "ethers";
import { network, deployments, ethers } from "hardhat";
import { DevelopmentChains, networkConfig, TokenUrisCache } from "../../helper-hardhat-config";
import { NonFungibleUkraine } from "../../typechain-types";

!DevelopmentChains.includes(network.name)
    ? describe.skip
    : describe("NonFungibleUkraine Nft unit tests", function () {
          const nonFungibleUkraineContractName = "NonFungibleUkraine";
          const currentNetwork = networkConfig[network.config.chainId!];
          let deployer: SignerWithAddress, alice: SignerWithAddress;
          let nonFungibleUkraine: NonFungibleUkraine;

          this.beforeEach(async function () {
              const accounts = await ethers.getSigners();
              deployer = accounts[0];
              alice = accounts[1];

              await deployments.fixture(["nonFungibleUkraine"]);
              nonFungibleUkraine = await ethers.getContract(nonFungibleUkraineContractName, deployer);
          });

          const mintNft: (uri: string, overrides?: { contract?: NonFungibleUkraine; mintFee?: BigNumberish }) => Promise<ContractTransaction> = async function (uri, overrides) {
              return (overrides?.contract || nonFungibleUkraine).mintNft(uri, { value: overrides?.mintFee || currentNetwork.mintFee });
          };

          it("Should update counters on mint", async function () {
              for (const index in TokenUrisCache) {
                  await mintNft(TokenUrisCache[index]);

                  const counter = await nonFungibleUkraine.getTokenUriCount(TokenUrisCache[index]);
                  assert.equal(counter.toNumber(), currentNetwork.tokensPerUri - 1);

                  const balance = await nonFungibleUkraine.balanceOf(deployer.address);
                  assert.equal(balance.toNumber(), Number.parseInt(index) + 1);
              }

              const tokenCounter = await nonFungibleUkraine.getTokenCounter();
              assert.equal(tokenCounter.toNumber(), TokenUrisCache.length);
          });

          it("SHould revert when not enouth eth sent", async function () {
              const invalidMintFee = ethers.BigNumber.from(currentNetwork.mintFee).div(2);
              await expect(mintNft(TokenUrisCache[0], { mintFee: invalidMintFee })).to.be.revertedWith("NonFungibleUkraine__NotEnoughEth");
          });

          it("Should revert when invalid token Uri is requested", async function () {
              const invalidTokenUri = "myUri";
              await expect(mintNft(invalidTokenUri)).to.be.revertedWith("NonFungibleUkraine__TokenUriCountExceeded");
          });

          it("Should revert when token Uri is minted more times that allowed", async function () {
              const tokenUri = TokenUrisCache[0];
              for (let index = 0; index < currentNetwork.tokensPerUri; index++) {
                  await mintNft(tokenUri);
              }

              await expect(mintNft(tokenUri)).to.be.revertedWith("NonFungibleUkraine__TokenUriCountExceeded");
          });

          it("Should withdraw funds to owner", async function () {
              const initialDeployerBalance = await deployer.getBalance();
              const aliceNonFungibleUkraine: NonFungibleUkraine = await ethers.getContract(nonFungibleUkraineContractName, alice);

              await mintNft(TokenUrisCache[0], { contract: aliceNonFungibleUkraine });
              await nonFungibleUkraine.withdraw();

              const actualDeployerBalance = await deployer.getBalance();
              expect(actualDeployerBalance).to.be.gt(initialDeployerBalance);

              await expect(aliceNonFungibleUkraine.withdraw()).to.be.revertedWith("Ownable: caller is not the owner");
          });
      });
