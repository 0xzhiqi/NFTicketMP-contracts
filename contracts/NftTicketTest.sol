//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NftTicket is ERC721, Ownable, ReentrancyGuard {
    struct TicketCategory {
        uint256 ticketPrice;
        uint256 maxNoOfTickets;
    }

    mapping(bytes32 => TicketCategory) public ticketCategoryMapping;

    TicketCategory[] public ticketCategoryArray;

    constructor(string memory _ticketName, string memory _ticketSymbol)
        ERC721(_ticketName, _ticketSymbol)
    {}

    function ticketArraySize() public view returns (uint256 size) {
        size = ticketCategoryArray.length;
    }

    function setUpTicket(uint256 _ticketPrice, uint256 _maxNoOfTickets)
        public
        onlyOwner
    {
        ticketCategoryArray.push(
            TicketCategory({
                ticketPrice: _ticketPrice,
                maxNoOfTickets: _maxNoOfTickets
            })
        );
    }

    function setUpTicket2(
        uint256 _ticketPrice,
        uint256 _maxNoOfTickets,
        bytes32 _name
    ) public onlyOwner {
        ticketCategoryMapping[_name] = TicketCategory({
            ticketPrice: _ticketPrice,
            maxNoOfTickets: _maxNoOfTickets
        });
    }
}
