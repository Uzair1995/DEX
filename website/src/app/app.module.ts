import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArbitratorscreenComponent } from './arbitratorscreen/arbitratorscreen.component';
import { SellercreenComponent } from './sellercreen/sellercreen.component';
import { BuyercreenComponent } from './buyercreen/buyercreen.component';

@NgModule({
  declarations: [
    AppComponent,
    ArbitratorscreenComponent,
    SellercreenComponent,
    BuyercreenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
