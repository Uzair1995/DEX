import { Component, OnInit } from '@angular/core';
import { promisify } from 'app/wrappers/wrapper';
import { LoadingBar } from 'app/shared/loading';
import { EscrowContract_ABI } from 'ABI.const';
import { EscrowContract_Address } from 'addresses.const';

declare var require: any;
declare var window: any;
var Web3 = require('web3');
var web3 = window.web3;

@Component({
  selector: 'app-arbitrator',
  templateUrl: './arbitrator.component.html',
  styleUrls: ['./arbitrator.component.scss']
})
export class ArbitratorComponent implements OnInit {

  contractAbi = EscrowContract_ABI;
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
  public sellerDisputeRaise;
  public buyerDisputeRaise;
  public isArbitratorAgreeingForSeller;
  public buyerSentFiatAmount;
  public sellerAmountDeposit;
  public buyerSecurityDeposit;
  public isLoading = false;

  constructor() { }

  async ngOnInit() {
    if (web3 != undefined) {
      this.web3 = web3;
    }
    else {
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.100.20:8545"));
    }
    this.coinbase = this.web3.eth.accounts[0];
    this.LoadContract();

    const filter = web3.eth.filter({
      fromBlock: 0,
      toBlock: 'latest',
      address: EscrowContract_Address,
      topics: [web3.sha3("UpdateArbitrator(address,address)"), this.ConvertAddressToBase64(this.coinbase)]
    })
    filter.watch((error, result) => {
      console.log("ERROR => ");
      console.log(error);
      console.log("RESULT => ");
      console.log(result);
    });

  }

  private ConvertAddressToBase64(address: string) {
    var splittedAddress = address.split("x");
    address = "0x000000000000000000000000"+ splittedAddress[1];
    return address;
  }

  async LoadContract() {
    this.isLoading = true;
    LoadingBar.emit(true);
    this.contract = (this.web3.eth.contract(this.contractAbi)).at(EscrowContract_Address);
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
    this.buyerSentFiatAmount = promisify(cb => this.contract.buyerSentFiatAmount.call(cb));
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
      this.buyerDisputeRaise,
      this.buyerSentFiatAmount
    ]).then(values => {
      this.owner = values[0];
      this.arbitratorAddress = values[1];
      this.sellerAddress = values[2];
      this.buyerAddress = values[3];
      this.arbitratorFees = values[4];
      this.offeredAmount = values[5];
      this.isBuyerAgreeing = values[6];
      this.isSellerAgreeing = values[7];
      this.isArbitratorAgreeingForBuyer = values[8];
      this.isArbitratorAgreeingForSeller = values[9];
      this.sellerAmountDeposit = values[10];
      this.buyerSecurityDeposit = values[11];
      this.sellerDisputeRaise = values[12];
      this.buyerDisputeRaise = values[13];
      this.buyerSentFiatAmount = values[14];
      LoadingBar.emit(false);
      this.isLoading = false;
    })

  }

  async updateOwner() {
    if (this.contract != undefined) {
      if (this.owner != undefined && this.owner != "") {
        await promisify(cb => this.contract.updateOwner(this.owner, cb));
      }
    }
  }

  async updateArbitrator() {
    if (this.contract != undefined) {
      if (this.arbitratorAddress != undefined && this.arbitratorAddress != "") {
        await promisify(cb => this.contract.updateArbitrator(this.arbitratorAddress, cb));
      }
    }
  }

  async updateSeller() {
    if (this.contract != undefined) {
      if (this.sellerAddress != undefined && this.sellerAddress != "") {
        await promisify(cb => this.contract.updateSeller(this.sellerAddress, cb));
      }
    }
  }

  async updateBuyer() {
    if (this.contract != undefined) {
      if (this.buyerAddress != undefined && this.buyerAddress != "") {
        await promisify(cb => this.contract.updateBuyer(this.buyerAddress, cb));
      }
    }
  }

  async updateArbitratorFees() {
    if (this.contract != undefined) {
      if (this.arbitratorFees != undefined && this.arbitratorFees > 0) {
        await promisify(cb => this.contract.updateArbitratorFees(this.web3.toBigNumber(this.arbitratorFees), cb));//in wei
      }
    }
  }

  async updateOfferedAmount() {
    if (this.contract != undefined) {
      if (this.offeredAmount != undefined && this.offeredAmount > 0) {
        await promisify(cb => this.contract.updateOfferedAmount(this.web3.toBigNumber(this.offeredAmount), cb));//in wei
      }
    }
  }

  async signerForArbitratorForBuyer() {
    if (this.contract != undefined) {
      await promisify(cb => this.contract.signerForArbitratorForBuyer(cb));
    }
  }

  async signerForArbitratorForSeller() {
    if (this.contract != undefined) {
      await promisify(cb => this.contract.signerForArbitratorForSeller(cb));
    }
  }

}