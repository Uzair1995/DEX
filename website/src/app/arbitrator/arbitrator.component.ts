import { Component, OnInit } from '@angular/core';
import { ABI } from 'ABI.const';

declare var require: any;
var Web3 = require('web3');

@Component({
  selector: 'app-arbitrator',
  templateUrl: './arbitrator.component.html',
  styleUrls: ['./arbitrator.component.scss']
})
export class ArbitratorComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
    // this.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.100.20:8545"));
    // this.coinbase = this.web3.eth.coinbase;
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
  }

  updateOwner() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, this.passphraseForCoinBase);
      if (isUnlocked && this.owner != undefined && this.owner != "") {
        this.contract.updateOwner(this.owner);
      }
    }
  }

  updateArbitrator() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, this.passphraseForCoinBase);
      if (isUnlocked && this.arbitratorAddress != undefined && this.arbitratorAddress != "") {
        this.contract.updateArbitrator(this.arbitratorAddress);
      }
    }
  }

  updateSeller() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, this.passphraseForCoinBase);
      if (isUnlocked && this.sellerAddress != undefined && this.sellerAddress != "") {
        this.contract.updateSeller(this.sellerAddress);
      }
    }
  }

  updateBuyer() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, this.passphraseForCoinBase);
      if (isUnlocked && this.buyerAddress != undefined && this.buyerAddress != "") {
        this.contract.updateBuyer(this.buyerAddress);
      }
    }
  }

  updateArbitratorFees() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, this.passphraseForCoinBase);
      if (isUnlocked && this.arbitratorFees != undefined && this.arbitratorFees > 0) {
        this.contract.updateArbitratorFees(this.web3.toBigNumber(this.arbitratorFees));//in wei
      }
    }
  }

  updateOfferedAmount() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, this.passphraseForCoinBase);
      if (isUnlocked && this.offeredAmount != undefined && this.offeredAmount > 0) {
        this.contract.updateOfferedAmount(this.web3.toBigNumber(this.offeredAmount));//in wei
      }
    }
  }

  signerForArbitratorForBuyer() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, this.passphraseForCoinBase);
      if (isUnlocked) {
        this.contract.signerForArbitratorForBuyer();
      }
    }
  }

  signerForArbitratorForSeller() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, this.passphraseForCoinBase);
      if (isUnlocked) {
        this.contract.signerForArbitratorForSeller();
      }
    }
  }
}