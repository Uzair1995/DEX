import { Component, OnInit } from '@angular/core';
import { ABI } from '../../ABI.const';
declare var require: any;
var Web3 = require('web3');
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
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.100.20:8545"));
    this.coinbase = this.web3.eth.coinbase;
  }

  
  LoadContract(ethContractAddress: string){

    this.contract = (this.web3.eth.contract(this.contractAbi)).at(ethContractAddress);
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
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, "mparsec123");
      if(isUnlocked){
        this.contract.updateOwner("0xbCAC3E9973918eF49ec2b08325d3add3b7586a36");
      }
    }
  }

  updateArbitrator() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, "mparsec123");
      if(isUnlocked){
        this.contract.updateArbitrator("0xbCAC3E9973918eF49ec2b08325d3add3b7586a36");
      }
    }
  }

  updateSeller() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, "mparsec123");
      if(isUnlocked){
        this.contract.updateSeller("0xbCAC3E9973918eF49ec2b08325d3add3b7586a36");
      }
    }
  }

  updateBuyer() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, "mparsec123");
      if(isUnlocked){
        this.contract.updateBuyer("0xbCAC3E9973918eF49ec2b08325d3add3b7586a36");
      }
    }
  }

  updateArbitratorFees() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, "mparsec123");
      if(isUnlocked){
        this.contract.updateArbitratorFees(this.web3.toBigNumber(0.1*1000000000000000000));//0.1 ether
      }
    }
  }

  updateOfferedAmount() {
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, "mparsec123");
      if(isUnlocked){
        this.contract.updateOfferedAmount(this.web3.toBigNumber(1*1000000000000000000));//1 ether
      }
    }
  }

  signerForBuyer(){
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, "mparsec123");
      if(isUnlocked){
        this.contract.signerForBuyer();
      }
    }
  }

  signerForSeller(){
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, "mparsec123");
      if(isUnlocked){
        this.contract.signerForSeller();
      }
    }
  }

  signerForArbitratorForBuyer(){
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, "mparsec123");
      if(isUnlocked){
        this.contract.signerForArbitratorForBuyer();
      }
    }
  }

  signerForArbitratorForSeller(){
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, "mparsec123");
      if(isUnlocked){
        this.contract.signerForArbitratorForSeller();
      }
    }
  }

  depositForBuyer(){
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, "mparsec123");
      if(isUnlocked){
        this.contract.depositForBuyer({value:this.web3.toWei(1,'ether')});
      }
    }
  }

  depositForSeller(){
    if (this.contract != undefined) {
      var isUnlocked = this.web3.personal.unlockAccount(this.web3.eth.defaultAccount, "mparsec123");
      if(isUnlocked){
        this.contract.depositForSeller({value:this.web3.toWei(1,'ether')});
      }
    }
  }


}
