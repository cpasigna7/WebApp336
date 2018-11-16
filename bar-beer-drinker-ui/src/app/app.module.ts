import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import  { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { WelcomeComponent } from './welcome/welcome.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';
import { BeerslistComponent } from './beerslist/beerslist.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { DropdownModule } from 'primeng/dropdown';
import { ManfComponent } from './manf/manf.component';
import { ManfDetailsComponent } from './manf-details/manf-details.component';
import { BartenderComponent } from './bartender/bartender.component'
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    BarDetailsComponent,
    BeerslistComponent,
    BeerDetailsComponent,
    ManfComponent,
    ManfDetailsComponent,
    BartenderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    DropdownModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
