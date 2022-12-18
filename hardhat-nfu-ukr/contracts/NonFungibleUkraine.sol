// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NonFungibleUkraine is ERC721URIStorage, Ownable {
    error NonFungibleUkraine__NotEnoughEth();
    error NonFungibleUkraine__TransferFailed();
    error NonFungibleUkraine__TokenUriCountExceeded();

    uint256 public immutable mintFee;
    uint256 private tokenCounter;
    mapping(string => uint256) private tokenUrisCounter;

    constructor(
        string[] memory tokenUris,
        uint256 tokensPerUri,
        uint256 _mintFee
    ) ERC721("NonFungibleUkraine", "NFU") {
        mintFee = _mintFee;

        for (uint i = 0; i < tokenUris.length; i++) {
            tokenUrisCounter[tokenUris[i]] = tokensPerUri;
        }
    }

    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        (bool success, ) = payable(msg.sender).call{value: amount}("");

        if (!success) {
            revert NonFungibleUkraine__TransferFailed();
        }
    }

    function mintNft(string memory tokenUri) public payable {
        if (msg.value < mintFee) {
            revert NonFungibleUkraine__NotEnoughEth();
        }

        if (tokenUrisCounter[tokenUri] <= 0) {
            revert NonFungibleUkraine__TokenUriCountExceeded();
        }

        uint256 newItemId = tokenCounter++;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenUri);
        tokenUrisCounter[tokenUri]--;
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
}
