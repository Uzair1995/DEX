import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
declare var require:any;
var Web3 = require('web3');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  
  constructor(public _router:Router){

  }
  ngOnInit() {
    var web3 = new Web3();

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
  } else {
      // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.100.20:8545"));
  }

  web3.eth.defaultAccount = web3.eth.accounts[0];
  var CoursetroContract = web3.eth.contract([
    {
      "constant": false,
      "inputs": [],
      "name": "signerForArbitratorForSeller",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "sellerAmountDeposit",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "buyerSecurityDeposit",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "sellerAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "buyerAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "releaseFundsToBuyer",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "signerForBuyer",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_arbitratorFees",
          "type": "uint256"
        }
      ],
      "name": "updateArbitratorFees",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "updateOwner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "depositForBuyer",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isArbitratorAgreeingForBuyer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isBuyerAgreeing",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "arbitratorFees",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "offeredAmount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_arbitratorAddress",
          "type": "address"
        }
      ],
      "name": "updateArbitrator",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "depositForSeller",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "arbitratorAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "releaseFundsToSeller",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "signerForArbitratorForBuyer",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "signerForSeller",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_sellerAddress",
          "type": "address"
        }
      ],
      "name": "updateSeller",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isArbitratorAgreeingForSeller",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isSellerAgreeing",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_buyerAddress",
          "type": "address"
        }
      ],
      "name": "updateBuyer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_arbitratorAddress",
          "type": "address"
        },
        {
          "name": "_sellerAddress",
          "type": "address"
        },
        {
          "name": "_buyerAddress",
          "type": "address"
        },
        {
          "name": "_arbitratorFees",
          "type": "uint256"
        },
        {
          "name": "_offeredAmount",
          "type": "uint256"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "UpdateOwner",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "newSeller",
          "type": "address"
        }
      ],
      "name": "UpdateSeller",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "newBuyer",
          "type": "address"
        }
      ],
      "name": "UpdateBuyer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "newArbitrator",
          "type": "address"
        }
      ],
      "name": "UpdateArbitrator",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "sellerAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "RecievedFromSeller",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "buyerAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "RecievedFromBuyer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "buyerAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "ReleaseFundsForBuyer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "sellerAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "amountToRelease",
          "type": "uint256"
        }
      ],
      "name": "ReleaseFundsForSeller",
      "type": "event"
    }
  ]);
  var Coursetro = CoursetroContract.at('0xd85CA7fF3aB11868562BA1799f452e043C96a94a');
  console.log(Coursetro);
  }

  public navigateToArbitratorScreen(){
    this._router.navigate(['arbitratorscreen']);
  }

  public navigateToBuyerScreen(){
    this._router.navigate(['buyerscreen']);
  }
  public navigateToSellerScreen(){
    this._router.navigate(['sellerscreen']);
  }

}
