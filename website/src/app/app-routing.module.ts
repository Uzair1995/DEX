import { ArbitratorscreenComponent } from "app/arbitratorscreen/arbitratorscreen.component";
import { SellercreenComponent } from "app/sellercreen/sellercreen.component";
import { BuyercreenComponent } from "app/buyercreen/buyercreen.component";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: 'arbitratorscreen', 
    component: ArbitratorscreenComponent
  },
  { 
    path: 'sellerscreen', 
    component: SellercreenComponent 
  },
  {
    path: 'buyerscreen',
    component: BuyercreenComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }