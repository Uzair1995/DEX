import { Component, OnInit } from '@angular/core';
declare var require: any;
var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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



}
