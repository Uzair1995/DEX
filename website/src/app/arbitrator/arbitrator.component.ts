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

  constructor() { }

  ngOnInit() {
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.100.20:8545"));
    this.coinbase = this.web3.eth.coinbase;
  }

  LoadContract(ethContractAddress: string){
    var CoursetroContract = this.web3.eth.contract(this.contractAbi);
    var Coursetro = CoursetroContract.at(ethContractAddress);
    console.log(Coursetro);
  }

}
