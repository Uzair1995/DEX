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
    var mnemonic = bip39.generateMnemonic()
    console.log(mnemonic);
    var seed = bip39.mnemonicToSeed(mnemonic, "asad123");
    // Generate bitcoin public address and private keys.
    var bitcoinNetwork = bitcoin.networks.bitcoin
    var hdMaster = bitcoin.HDNode.fromSeedBuffer(seed, bitcoinNetwork) // seed from above
    var publicAddress = hdMaster.getAddress();
    var privateKey = hdMaster.keyPair.toWIF();
    console.log("Public Address:" + publicAddress);
    console.log("Private key:" + privateKey);
  }

}
