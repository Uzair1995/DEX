import { Component, OnInit } from '@angular/core';
import { ABI } from '../../ABI.const';
import { contractAddress } from 'addresses.const';
import { promisify } from 'app/wrappers/wrapper';
import { LoadingBar } from 'app/shared/loading';


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
    this.LoadContract();
  }

  async LoadContract() {
    LoadingBar.emit(true);
    this.contract = (this.web3.eth.contract(this.contractAbi)).at(contractAddress);
    this.web3.eth.defaultAccount = this.coinbase;
    this.owner = promisify(cb => this.contract.owner.call(cb));
    this.arbitratorAddress = promisify(cb => this.contract.arbitratorAddress.call(cb))
    this.sellerAddress = promisify(cb => this.contract.sellerAddress.call(cb));
    this.buyerAddress = promisify(cb => this.contract.buyerAddress.call(cb));
    this.arbitratorFees = promisify(cb => this.contract.arbitratorFees.call(cb));
    this.offeredAmount = promisify(cb => this.contract.offeredAmount.call(cb));
    this.isBuyerAgreeing = promisify(cb => this.contract.isBuyerAgreeing.call(cb));
    this.isSellerAgreeing = promisify(cb => this.contract.isSellerAgreeing.call(cb));
    this.isArbitratorAgreeingForBuyer = promisify(cb => this.contract.isArbitratorAgreeingForBuyer.call(cb));
    this.isArbitratorAgreeingForSeller = promisify(cb => this.contract.isArbitratorAgreeingForSeller.call(cb));
    this.sellerAmountDeposit = promisify(cb => this.contract.sellerAmountDeposit.call(cb));
    this.buyerSecurityDeposit = promisify(cb => this.contract.buyerSecurityDeposit.call(cb));
    this.sellerDisputeRaise = promisify(cb => this.contract.sellerDisputeRaise.call(cb));
    this.buyerDisputeRaise = promisify(cb => this.contract.buyerDisputeRaise.call(cb));
    await Promise.all([
      this.owner,
      this.arbitratorAddress,
      this.sellerAddress,
      this.buyerAddress,
      this.arbitratorFees,
      this.offeredAmount,
      this.isBuyerAgreeing,
      this.isSellerAgreeing,
      this.isArbitratorAgreeingForBuyer,
      this.isArbitratorAgreeingForSeller,
      this.sellerAmountDeposit,
      this.buyerSecurityDeposit,
      this.sellerDisputeRaise,
      this.buyerDisputeRaise
    ]).then(values=>{
      this.owner = values[0];
      this.arbitratorAddress = values[1];
      this.sellerAddress= values[2];
      this.buyerAddress= values[3];
      this.arbitratorFees= values[4];
      this.offeredAmount= values[5];
      this.isBuyerAgreeing= values[6];
      this.isSellerAgreeing= values[7];
      this.isArbitratorAgreeingForBuyer= values[8];
      this.isArbitratorAgreeingForSeller= values[9];
      this.sellerAmountDeposit= values[10];
      this.buyerSecurityDeposit= values[11];
      this.sellerDisputeRaise= values[12];
      this.buyerDisputeRaise= values[13];
      LoadingBar.emit(false);
    })

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
