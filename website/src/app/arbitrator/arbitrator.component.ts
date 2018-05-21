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
    var contract = (this.web3.eth.contract(this.contractAbi)).at(ethContractAddress);
    console.log(contract);
    
    this.owner = contract.owner.call();
    this.arbitratorAddress = contract.arbitratorAddress.call();
    this.sellerAddress = contract.sellerAddress.call();
    this.buyerAddress = contract.buyerAddress.call();
    
    this.arbitratorFees = contract.arbitratorFees.call();
    this.offeredAmount = contract.offeredAmount.call();

    this.isBuyerAgreeing = contract.isBuyerAgreeing.call();
    this.isSellerAgreeing = contract.isSellerAgreeing.call();
    this.isArbitratorAgreeingForBuyer = contract.isArbitratorAgreeingForBuyer.call();
    this.isArbitratorAgreeingForSeller = contract.isArbitratorAgreeingForSeller.call();

    this.sellerAmountDeposit = contract.sellerAmountDeposit.call();
    this.buyerSecurityDeposit = contract.buyerSecurityDeposit.call();
  }

}
