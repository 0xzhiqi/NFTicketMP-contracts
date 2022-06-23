import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumberish } from "ethers";
import { ethers } from "hardhat";
import { NftTicket } from "../typechain";

describe("Interaction with nftTicket", () => {
  let accounts: SignerWithAddress[];
  let nftTicketContract: NftTicket;
  let eventOwner: SignerWithAddress;
  let EventNameSet: string; 
  let EventSymbolSet: string;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    eventOwner = accounts[0];
    // NOTE: To adjust these two variables as necessary
    EventNameSet = "Encode Club Dinner";
    EventSymbolSet = "ECD";
    const nftTicketContractFactory = await ethers.getContractFactory(
      "NftTicket"
    );
    nftTicketContract = await nftTicketContractFactory.deploy(
      EventNameSet,
      EventSymbolSet
    );
    await nftTicketContract.deployed();
  })

  describe("Deployment of contract by event organiser ", async () => {
    it("Should show the correct name and symbol", async () => {
      const eventNameExpected = await nftTicketContract.name();
      expect(eventNameExpected).to.eq(EventNameSet);
      const eventSymbolExpected = await nftTicketContract.symbol();
      expect(eventSymbolExpected).to.eq(EventSymbolSet);
    });
  })

  describe("Setting ticket categories", async () => {
    it("Should set the right ticket price and max no", async () => {
      // TODO: Get the data type for TicketCategory directly
      const VIP: any = {
        ticketPrice: 0,
        maxNoOfTickets: 0,
      };
      // NOTE: Set ticket category price and max no accordingly
      const ticketPriceSet = 0.09;
      const maxNoOfTicketsSet = 250;

      const ticketPriceSetBN = ethers.utils.parseEther(
        ticketPriceSet.toString()
      );

      const tx = await nftTicketContract
        .connect(accounts[0])
        .setUpTicket(VIP, ticketPriceSetBN, maxNoOfTicketsSet);
      const ticketPriceExpectedBN = (
        await nftTicketContract.ticketCategoryArray(0)
      ).ticketPrice;
      const ticketPriceExpectedString = ethers.utils.formatEther(
        ticketPriceExpectedBN
      );
      expect(ticketPriceExpectedString).to.eq(ticketPriceSet.toString());

      const maxNoOfTicketsExpected = (
        await nftTicketContract.ticketCategoryArray(0)
      ).maxNoOfTickets;
      
      expect(maxNoOfTicketsExpected).to.eq(maxNoOfTicketsSet.toString());
    });

    it("Should show the right number of ticket categories in the array", async () => {
      // TODO: Get the data type for TicketCategory directly
      const VIP: any = {
        ticketPrice: 0,
        maxNoOfTickets: 0,
      };
      // NOTE: Set ticket category price and max no accordingly
      const ticketPriceSetVIP = 0.09;
      const maxNoOfTicketsSetVIP = 250;

      const ticketPriceSetVIPBN = ethers.utils.parseEther(
        ticketPriceSetVIP.toString()
      );

      const tx = await nftTicketContract
        .connect(accounts[0])
        .setUpTicket(VIP, ticketPriceSetVIPBN, maxNoOfTicketsSetVIP);

      // TODO: Get the data type for TicketCategory directly
      const VVIP: any = {
        ticketPrice: 0,
        maxNoOfTickets: 0,
      };
      // NOTE: Set ticket category price and max no accordingly
      const ticketPriceSetVVIP = 0.14;
      const maxNoOfTicketsSetVVIP = 40;

      const ticketPriceSetVVIPBN = ethers.utils.parseEther(
        ticketPriceSetVVIP.toString()
      );

      const tx2 = await nftTicketContract
        .connect(accounts[0])
        .setUpTicket(VVIP, ticketPriceSetVVIPBN, maxNoOfTicketsSetVVIP);
      
      const ticketCategoryArrayIndex1Expected =
        await nftTicketContract.ticketCategoryArray(1);
      
      const ticketPriceExpectedBN =
        ticketCategoryArrayIndex1Expected.ticketPrice;
      const ticketPriceExpectedString = ethers.utils.formatEther(
        ticketPriceExpectedBN
      );
      expect(ticketPriceExpectedString).to.eq(ticketPriceSetVVIP.toString());

      const maxNoOfTicketsExpected =
        ticketCategoryArrayIndex1Expected.maxNoOfTickets;

      expect(maxNoOfTicketsExpected).to.eq(maxNoOfTicketsSetVVIP.toString());
      
      // TODO: How to get array length?
      // console.log(`Array length: ${ticketCategoryArrayExpected}`);
    });
  });
});
