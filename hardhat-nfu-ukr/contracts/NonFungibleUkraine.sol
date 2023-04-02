// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "operator-filter-registry/src/DefaultOperatorFilterer.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NonFungibleUkraine is
    ERC721URIStorage,
    Ownable,
    DefaultOperatorFilterer
{
    error NonFungibleUkraine__NotEnoughEth();
    error NonFungibleUkraine__TransferFailed();
    error NonFungibleUkraine__TokenUnavailable();

    uint256 public immutable mintFee;
    uint256 public immutable totalSupply;
    uint256 private tokenCounter;
    mapping(string => uint256) private tokensAvailability;

    constructor(
        string[] memory tokenUris,
        uint256 _mintFee,
        uint256 _tokensPerUri
    ) ERC721("NonFungibleUkraine", "NFU") {
        mintFee = _mintFee;
        totalSupply = tokenUris.length * _tokensPerUri;

        for (uint i = 0; i < tokenUris.length; i++) {
            tokensAvailability[tokenUris[i]] = _tokensPerUri;
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

        if (tokensAvailability[tokenUri] == 0) {
            revert NonFungibleUkraine__TokenUnavailable();
        }

        tokensAvailability[tokenUri]--;
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
    ) public view returns (uint256) {
        return tokensAvailability[tokenURI];
    }

    // Default Operator Filter overrides:
    function setApprovalForAll(
        address operator,
        bool approved
    ) public override onlyAllowedOperatorApproval(operator) {
        super.setApprovalForAll(operator, approved);
    }

    function approve(
        address operator,
        uint256 tokenId
    ) public override onlyAllowedOperatorApproval(operator) {
        super.approve(operator, tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override onlyAllowedOperator(from) {
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId, data);
    }
}
