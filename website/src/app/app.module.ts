import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArbitratorComponent } from './arbitrator/arbitrator.component';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import "rxjs";
import { UseraccountComponent } from './useraccount/useraccount.component';

@NgModule({
  declarations: [
    AppComponent,
    ArbitratorComponent,

    BuyerComponent,
    SellerComponent,
    UseraccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
