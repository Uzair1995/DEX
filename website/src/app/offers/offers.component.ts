import { Component, OnInit } from '@angular/core';
import { promisify } from 'app/wrappers/wrapper';
import { DEX_MainContract_ABI } from 'ABI.const';
import { DEX_MainContract_Address } from 'addresses.const';

declare var require: any;
declare var window: any;
var Web3 = require('web3');
var web3 = window.web3;

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  contractAbi = DEX_MainContract_ABI;
  web3: any;
  coinbase: string;
  contract: any;
  passphraseForCoinBase: string = "mparsec123";

  currentSellOffersCount: any;
  currentSellOffersTradeHashes: string[] = Array();
  offerDetails: any;
  extendedOfferDetails: any;
  selectedTradeHash: string;

  constructor() { }

  ngOnInit() {
    if (web3 != undefined) {
      this.web3 = web3;
    }
    else {
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.100.20:8545"));
    }
    this.coinbase = this.web3.eth.accounts[0];
    this.LoadContract();
  }

  async LoadContract() {
    this.contract = (this.web3.eth.contract(this.contractAbi)).at(DEX_MainContract_Address);
    this.web3.eth.defaultAccount = this.coinbase;
    this.currentSellOffersCount = await promisify(cb => this.contract.getCurrentSellOffersCount(cb));
    this.currentSellOffersCount = JSON.parse(this.currentSellOffersCount);
    this.LoadAllSellTradeHashes((this.currentSellOffersCount));
  }

  async LoadAllSellTradeHashes(currentNumberOfTrades: number) {
    this.currentSellOffersTradeHashes = [];
    for (let i = 0; i < currentNumberOfTrades; i++)
    {
      let tradeHash = await promisify(cb => this.contract.currentSellOffersAddresses(i, cb));
      this.currentSellOffersTradeHashes.push(tradeHash.toString());
    }
  }

  async LoadTradeDetailsFromTradeHash(hash) {
    this.selectedTradeHash = hash;
    this.offerDetails = undefined;
    this.extendedOfferDetails = undefined;
    this.offerDetails = await promisify(cb => this.contract.getSellOfferFromTradeHash(hash, cb));
  }

  async LoadExtendedTradeDetailsFromTradeHash(hash = this.selectedTradeHash) {
    this.extendedOfferDetails = await promisify(cb => this.contract.getSellOfferDetailsFromTradeHash(hash, cb));
    console.log(this.extendedOfferDetails)
  }

}
