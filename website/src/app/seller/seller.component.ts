import { Component, OnInit } from '@angular/core';
import { ABI } from '../../ABI.const';
import { promisify } from 'app/wrappers/wrapper'

declare var require: any;
declare var window: any;
var Web3 = require('web3');
var web3 = window.web3;


@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {

  contractAbi = ABI;
  web3: any;
  coinbase: string;
  contract: any;
  passwordForCoinbase = "mparsec123";

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

  async LoadContract(ethContractAddress: string) {
    this.contract = (this.web3.eth.contract(this.contractAbi)).at(ethContractAddress);
    this.web3.eth.defaultAccount = this.coinbase;

    this.owner = await promisify(cb => this.contract.owner.call(cb));
    this.arbitratorAddress = await promisify(cb => this.contract.arbitratorAddress.call(cb))
    this.sellerAddress = await promisify(cb => this.contract.sellerAddress.call(cb));
    this.buyerAddress = await promisify(cb => this.contract.buyerAddress.call(cb));
    this.arbitratorFees = await promisify(cb => this.contract.arbitratorFees.call(cb));
    this.offeredAmount = await promisify(cb => this.contract.offeredAmount.call(cb));
    this.isBuyerAgreeing = await promisify(cb => this.contract.isBuyerAgreeing.call(cb));
    this.isSellerAgreeing = await promisify(cb => this.contract.isSellerAgreeing.call(cb));
    this.isArbitratorAgreeingForBuyer = await promisify(cb => this.contract.isArbitratorAgreeingForBuyer.call(cb));
    this.isArbitratorAgreeingForSeller = await promisify(cb => this.contract.isArbitratorAgreeingForSeller.call(cb));
    this.sellerAmountDeposit = await promisify(cb => this.contract.sellerAmountDeposit.call(cb));
    this.buyerSecurityDeposit = await promisify(cb => this.contract.buyerSecurityDeposit.call(cb));
    this.sellerDisputeRaise = await promisify(cb => this.contract.sellerDisputeRaise.call(cb));
    this.buyerDisputeRaise = await promisify(cb => this.contract.buyerDisputeRaise.call(cb));
  }

  async signerForSeller() {
    if (this.contract != undefined) {
      await promisify(cb => this.contract.signerForSeller(cb));
    }
  }

  async depositForSeller() {
    if (this.contract != undefined) {
      await promisify(cb => this.contract.depositForSeller({ value: this.offeredAmount }, cb));//in wei
    }
  }

  async releaseFundsToSeller() {
    if (this.contract != undefined) {
      await promisify(cb => this.contract.releaseFundsToSeller(cb));
    }
  }

  async raiseDisputeForSeller() {
    if (this.contract != undefined) {
      await promisify(cb => this.contract.raiseDisputeForSeller(this.web3.toBigNumber(10),cb));
    }
  }

}
