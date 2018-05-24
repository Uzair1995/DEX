import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ABI } from 'ABI.const';
import {contractAddress} from 'addresses.const';
import { promisify } from 'app/wrappers/wrapper'
import { LoadingBar } from './shared/loading';
declare var require: any;
declare var window: any;
var Web3 = require('web3');
var web3 = window.web3;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  contractAbi = ABI;
  web3: any;
  coinbase: string;
  contract: any;
  passphraseForCoinBase: string = "mparsec123"
  isLoading:boolean = false;
  isSubscribeAlive:boolean = true;

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
  public sellerAmountDeposit;
  public buyerSecurityDeposit;

  constructor(public _router: Router) {
  }
  ngOnInit() {
    
    if (web3 != undefined) {
      this.web3 = web3;
    }
    else {
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.100.20:8545"));
    }
    this.coinbase = this.web3.eth.accounts[0];
    this.LoadContract();
    
    LoadingBar.takeWhile(()=>this.isSubscribeAlive).subscribe(res=>this.isLoading = res);
  }

  ngOnDestroy(){
    this.isSubscribeAlive = false;
  }

  async LoadContract() {
    this.contract = (this.web3.eth.contract(this.contractAbi)).at(contractAddress);
    this.web3.eth.defaultAccount = this.coinbase;

    this.sellerDisputeRaise = await promisify(cb => this.contract.sellerDisputeRaise.call(cb));
    this.buyerDisputeRaise = await promisify(cb => this.contract.buyerDisputeRaise.call(cb));
  }


  public navigateToArbitratorScreen() {
    this._router.navigate(['arbitratorscreen']);
  }

  public navigateToBuyerScreen() {
    this._router.navigate(['buyerscreen']);
  }
  public navigateToSellerScreen() {
    this._router.navigate(['sellerscreen']);
  }

}
