// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NonFungibleUkraineV2 is ERC721URIStorage, Ownable {
    error NonFungibleUkraineV2__NotEnoughEth();
    error NonFungibleUkraineV2__TransferFailed();
    error NonFungibleUkraineV2__TokenUriCountExceeded();

    uint256 public immutable mintFee;
    uint256 private tokenCounter;
    mapping(string => uint256) private tokenUrisCounter;

    constructor(
        string[] memory auctionTokenUris,
        string[] memory tokenUris,
        uint256 tokensPerUri,
        uint256 _mintFee
    ) ERC721("NonFungibleUkraineV2", "NFU") {
        mintFee = _mintFee;

        for (uint i = 0; i < tokenUris.length; i++) {
            tokenUrisCounter[tokenUris[i]] = tokensPerUri;
        }

        for (uint i = 0; i < auctionTokenUris.length; i++) {
            _mintTokenUri(++tokenCounter, auctionTokenUris[i]);
        }
    }

    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        (bool success, ) = payable(msg.sender).call{value: amount}("");

        if (!success) {
            revert NonFungibleUkraineV2__TransferFailed();
        }
    }

    function mintNft(string calldata tokenUri) public payable {
        if (msg.value < mintFee) {
            revert NonFungibleUkraineV2__NotEnoughEth();
        }

        if (tokenUrisCounter[tokenUri] <= 0) {
            revert NonFungibleUkraineV2__TokenUriCountExceeded();
        }

        tokenUrisCounter[tokenUri]--;
        _mintTokenUri(++tokenCounter, tokenUri);
    }

    function kill() public onlyOwner {
        selfdestruct(payable(msg.sender));
    }

    function getTokenCounter() public view returns (uint) {
        return tokenCounter;
    }

    function getTokenUriCount(
        string memory tokenURI
    ) public view returns (uint256) {
        return tokenUrisCounter[tokenURI];
    }

    function _mintTokenUri(uint256 tokenId, string memory tokenUri) private {
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenUri);
    }
}
