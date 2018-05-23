import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
declare var require: any;
var Web3 = require('web3');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {


  constructor(public _router: Router) {
  }
  ngOnInit() {
    


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
