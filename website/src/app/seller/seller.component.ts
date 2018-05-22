import { Component, OnInit } from '@angular/core';
import { ABI } from '../../ABI.const';

declare var require: any;
var Web3 = require('web3');

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

  signerForSeller() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, this.passwordForCoinbase);
      if (isUnlocked) {
        this.contract.signerForSeller();
      }
    }
  }

  depositForSeller() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, this.passwordForCoinbase);
      if (isUnlocked) {
        this.contract.depositForSeller({ value: this.offeredAmount });//in wei
      }
    }
  }

  releaseFundsToSeller(){
    if(this.contract !=undefined){
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, this.passwordForCoinbase);
      if(isUnlocked){
        this.contract.releaseFundsToSeller();
      }
    }
  }
}
