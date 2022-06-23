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
    TicketCategory[] public ticketCategoryArray;

    constructor(
        string memory _ticketName,
        string memory _ticketSymbol
    ) ERC721(_ticketName, _ticketSymbol){}

    function setUpTicket(
        TicketCategory memory _ticketCategory, 
        uint256 _ticketPrice,
        uint256 _maxNoOfTickets
        ) public onlyOwner {
            // TicketCategory memory _categoryName = TicketCategory(_ticketPrice, _maxNoOfTickets);
            // ticketCategoryArray.push(cat1);
            _ticketCategory.ticketPrice = _ticketPrice;
            _ticketCategory.maxNoOfTickets = _maxNoOfTickets;
            ticketCategoryArray.push(_ticketCategory);
        }
}
