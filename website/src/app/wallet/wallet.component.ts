import { Component, OnInit } from '@angular/core';

declare var require: any;
var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
declare var window: any;
var Web3 = require('web3');
var web3 = window.web3;
var keythereum = require("keythereum");

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  web3: any;
  coinbase: string;
  passphraseForCoinBase: string = "mparsec123";

  constructor() { }

  ngOnInit() {
    if (web3 != undefined) {
      this.web3 = web3;
    }
    else {
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.100.20:8545"));
    }
    this.coinbase = this.web3.eth.accounts[0];
    this.generateEthWallet();
    // Listening for Selected Account Changes
    // var account = web3.eth.accounts[0];
    // var accountInterval = setInterval(function () {
    //   if (web3.eth.accounts[0] !== account) {
    //     account = web3.eth.accounts[0];
    //     updateInterface();
    //   }
    // }, 100);
  }

  public generateBitcoinWallet(passphrase: string) {
    var mnemonic = bip39.generateMnemonic()
    var seed = bip39.mnemonicToSeed(mnemonic, passphrase);
    var bitcoinNetwork = bitcoin.networks.bitcoin
    var hdMaster = bitcoin.HDNode.fromSeedBuffer(seed, bitcoinNetwork) // seed from above
    var publicAddress = hdMaster.getAddress();
    var privateKey = hdMaster.keyPair.toWIF();
    console.log("Public Address:" + publicAddress);
    console.log("Private key:" + privateKey);
  }

  public async generateEthWallet() {
    var params = { keyBytes: 32, ivBytes: 16 };
    keythereum.create(params, function (dk) {
      console.log("dk => ");
      console.log(dk);
      var options = {
        kdf: "pbkdf2",
        cipher: "aes-128-ctr",
        kdfparams: {
          c: 262144,
          dklen: 32,
          prf: "hmac-sha256"
        }
      };
      keythereum.dump("mparsec123", dk.privateKey, dk.salt, dk.iv, options, function (keyObject) {
        console.log("keyObject");
        console.log(keyObject);
        keythereum.exportToFile(keyObject);
        console.log(keythereum.recover("mparsec123", keyObject));
      });
    });
  }


}


//0x2f732CC6c8F04302342f55BB95ebb819DA86dd90
//0x65dc300caecf383e7bd01e9d94c0bea09735dbf8