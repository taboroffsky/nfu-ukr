import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { BigNumberish, ContractTransaction } from "ethers";
import { network, deployments, ethers } from "hardhat";
import { DevelopmentChains, networkConfig, TokenUrisCache, NonFungibleUkraineName } from "../../helper-hardhat-config";
import { NonFungibleUkraine } from "../../typechain-types";

!DevelopmentChains.includes(network.name)
    ? describe.skip
    : describe("NonFungibleUkraine Nft unit tests", function () {
          const currentNetwork = networkConfig[network.config.chainId!];
          const auctionUris = TokenUrisCache.slice(0, 1);
          const tokenUris = TokenUrisCache.slice(1, TokenUrisCache.length);
          let deployer: SignerWithAddress, alice: SignerWithAddress;
          let nonFungibleUkraine: NonFungibleUkraine;
          let aliceNonFungibleUkraine: NonFungibleUkraine;

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
                  await mintNft(aliceNonFungibleUkraine, tokenUris[index]);

                  const counter = await nonFungibleUkraine.getTokenUriCount(tokenUris[index]);
                  assert.equal(counter.toNumber(), currentNetwork.tokensPerUri - 1);

                  const balance = await nonFungibleUkraine.balanceOf(alice.address);
                  assert.equal(balance.toNumber(), Number.parseInt(index) + 1);
              }

              const tokenCounter = await nonFungibleUkraine.getTokenCounter();
              assert.equal(tokenCounter.toNumber(), tokenUris.length + auctionUris.length);
          });

          it("Should transfer auction tokens to owner", async function () {
              const immediateOwnerBalance = await nonFungibleUkraine.balanceOf(deployer.address);
              assert.equal(immediateOwnerBalance.toNumber(), auctionUris.length);
          });

          it("Should revert when not enouth eth sent", async function () {
              const invalidMintFee = ethers.BigNumber.from(currentNetwork.mintFee).div(2);
              await expect(mintNft(nonFungibleUkraine, tokenUris[0], { mintFee: invalidMintFee })).to.be.revertedWith("NonFungibleUkraine__NotEnoughEth");
          });

          it("Should revert when invalid token Uri is requested", async function () {
              const invalidTokenUri = "myUri";
              await expect(mintNft(nonFungibleUkraine, invalidTokenUri)).to.be.revertedWith("NonFungibleUkraine__TokenUriCountExceeded");
          });

          it("Should revert when token Uri is minted more times that allowed", async function () {
              const tokenUri = tokenUris[0];
              for (let index = 0; index < currentNetwork.tokensPerUri; index++) {
                  await mintNft(nonFungibleUkraine, tokenUri);
              }

              await expect(mintNft(nonFungibleUkraine, tokenUri)).to.be.revertedWith("NonFungibleUkraine__TokenUriCountExceeded");
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
