import { Component, OnInit } from '@angular/core';
import { ABI } from '../../ABI.const';

declare var require: any;
declare var window: any;
var Web3 = require('web3');
var web3 = window.web3;

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit {

  contractAbi = ABI;
  web3: any;
  coinbase: string;
  contract: any;
  passphraseForCoinBase: string = "mparsec123"

  public owner;
  public sellerAddress;
  public buyerAddress;
  public arbitratorAddress;
  public arbitratorFees;
  public offeredAmount;

  public isBuyerAgreeing;
  public isSellerAgreeing;
  public isArbitratorAgreeingForBuyer;
  public isArbitratorAgreeingForSeller;
  public sellerAmountDeposit;
  public buyerSecurityDeposit;
  public sellerDisputeRaise;
  public buyerDisputeRaise;

  constructor() { }

  ngOnInit() {
    if (web3 != undefined) {
      this.web3 = web3;
    }
    else {
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.100.20:8545"));
    }
    this.coinbase = this.web3.eth.accounts[0];
  }

  LoadContract(ethContractAddress: string) {

    this.contract = (this.web3.eth.contract(this.contractAbi)).at(ethContractAddress);
    this.web3.eth.defaultAccount = this.coinbase;

    this.owner = this.contract.owner.call();
    this.arbitratorAddress = this.contract.arbitratorAddress.call();
    this.sellerAddress = this.contract.sellerAddress.call();
    this.buyerAddress = this.contract.buyerAddress.call();

    this.arbitratorFees = this.contract.arbitratorFees.call();
    this.offeredAmount = this.contract.offeredAmount.call();

    this.isBuyerAgreeing = this.contract.isBuyerAgreeing.call();
    this.isSellerAgreeing = this.contract.isSellerAgreeing.call();
    this.isArbitratorAgreeingForBuyer = this.contract.isArbitratorAgreeingForBuyer.call();
    this.isArbitratorAgreeingForSeller = this.contract.isArbitratorAgreeingForSeller.call();

    this.sellerAmountDeposit = this.contract.sellerAmountDeposit.call();
    this.buyerSecurityDeposit = this.contract.buyerSecurityDeposit.call();

    this.sellerDisputeRaise = this.contract.sellerDisputeRaise.call();
    this.buyerDisputeRaise = this.contract.buyerDisputeRaise.call();
  }

  signerForBuyer() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, this.passphraseForCoinBase);
      if (isUnlocked) {
        this.contract.signerForBuyer();
      }
    }
  }

  depositForBuyer() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, this.passphraseForCoinBase);
      if (isUnlocked) {
        this.contract.depositForBuyer({ value: this.offeredAmount });//in wei
      }
    }
  }

  releaseFundsToBuyer() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, this.passphraseForCoinBase);
      if (isUnlocked) {
        this.contract.releaseFundsToBuyer();
      }
    }
  }

  raiseDisputeForBuyer() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, this.passphraseForCoinBase);
      if (isUnlocked) {
        this.contract.raiseDisputeForSeller();
      }
    }
  }

}
