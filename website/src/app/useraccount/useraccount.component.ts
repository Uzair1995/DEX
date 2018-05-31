import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'app/shared/services/localstorage.service';

declare var require: any;
var bip39 = require('bip39')


@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.scss']
})
export class UseraccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.saveUserAccountInfo();
    var mnemonic = bip39.generateMnemonic()
    console.log(mnemonic);
  }

  public saveUserAccountInfo() {
    var userData = {
      paymentMethod: 'Western Union',
      region: 'Asia',
      country: 'Pakistan',
      currency: 'Pakistani Rupee (PKR)',
      fullName: 'Asadullah Khalid',
      city: 'Karachi',
      email: 'asadullah@mparsec.com',
      limitations: '4 days/0.0625BTC/0days',
      saltAccountAgeVerification: '1fea0fad474d46b2bbab91f2a8c38796da6c55da59f534cb2e4708b91e7da5cd',
      accountName: 'Western Union'
    }

    LocalStorageService.userAccount = userData;
  }

}
