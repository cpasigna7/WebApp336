import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';
import { BeerslistComponent } from './beerslist/beerslist.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import {ManfComponent} from './manf/manf.component';
import { ManfDetailsComponent } from './manf-details/manf-details.component';
import {BartenderComponent} from './bartender/bartender.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bars'
  },
  {
    path: 'bars',
    pathMatch: 'full',
    component: WelcomeComponent
  },
  {
    path: 'bars/:bar',
    pathMatch: 'full',
    component: BarDetailsComponent
  },
  {
    path: 'beers',
    pathMatch: 'full',
    component: BeerslistComponent
  },
  {
    path: 'beers/:beer',
    pathMatch: 'full',
    component: BeerDetailsComponent
  },
  {
    path: 'manfs',
    pathMatch: 'full',
    component: ManfComponent
  },
  {
    path: 'manfs/:manfs',
    pathMatch: 'full',
    component: ManfDetailsComponent
  },

  {
    path:'bartender',
    pathMatch: 'full',
    component: BartenderComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
