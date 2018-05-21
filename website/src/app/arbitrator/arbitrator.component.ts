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

  constructor() { }

  ngOnInit() {

    var web3 = new Web3();

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.100.20:8545"));
    }

    web3.eth.defaultAccount = web3.eth.accounts[0];
    // var CoursetroContract = web3.eth.contract(this.contractAbi);
    // var Coursetro = CoursetroContract.at('0xd85CA7fF3aB11868562BA1799f452e043C96a94a');
    // console.log(Coursetro);

  }

}
