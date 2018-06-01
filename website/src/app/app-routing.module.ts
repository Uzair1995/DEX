
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ArbitratorComponent } from 'app/arbitrator/arbitrator.component';
import { BuyerComponent } from 'app/buyer/buyer.component';
import { SellerComponent } from 'app/seller/seller.component';
import { UseraccountComponent } from './useraccount/useraccount.component';
import { OffersComponent } from './offers/offers.component';
import { WalletComponent } from './wallet/wallet.component';



const routes: Routes = [
  {
    path: 'arbitratorscreen',
    component: ArbitratorComponent
  },
  { 
    path: 'buyerscreen', 
    component: BuyerComponent
  },
  { 
    path: 'sellerscreen', 
    component: SellerComponent
  },
  {
    path : 'useraccount',
    component : UseraccountComponent
  },
  {
    path : 'offersscreen',
    component : OffersComponent
  }
  ,
  {
    path : 'wallet',
    component : WalletComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }