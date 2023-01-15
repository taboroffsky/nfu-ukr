// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NonFungibleUkraine is ERC721URIStorage, Ownable {
    error NonFungibleUkraine__NotEnoughEth();
    error NonFungibleUkraine__TransferFailed();
    error NonFungibleUkraine__TokenUnavailable();

    uint256 public immutable mintFee;
    uint256 private tokenCounter;
    mapping(string => bool) private tokensAvailability;

    constructor(
        string[] memory tokenUris,
        uint256 _mintFee
    ) ERC721("NonFungibleUkraine", "NFU") {
        mintFee = _mintFee;

        for (uint i = 0; i < tokenUris.length; i++) {
            tokensAvailability[tokenUris[i]] = true;
        }
    }

    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        (bool success, ) = payable(msg.sender).call{value: amount}("");

        if (!success) {
            revert NonFungibleUkraine__TransferFailed();
        }
    }

    function mintNft(string calldata tokenUri) public payable {
        if (msg.value < mintFee) {
            revert NonFungibleUkraine__NotEnoughEth();
        }

        if (!tokensAvailability[tokenUri]) {
            revert NonFungibleUkraine__TokenUnavailable();
        }

        tokensAvailability[tokenUri] = false;
        uint256 tokenId = ++tokenCounter;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenUri);
    }

    function kill() public onlyOwner {
        selfdestruct(payable(msg.sender));
    }

    receive() external payable {}

    function getTokenCounter() public view returns (uint) {
        return tokenCounter;
    }

    function getTokenUriAvailability(
        string memory tokenURI
    ) public view returns (bool) {
        return tokensAvailability[tokenURI];
    }
}
