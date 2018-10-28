import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomescreenComponent } from './components/homescreen/homescreen.component';
import { AddCorkboardComponent } from './components/add-corkboard/add-corkboard.component';
import { ViewCorkboardComponent } from './components/view-corkboard/view-corkboard.component';
import { AddPushpinComponent } from './components/add-pushpin/add-pushpin.component';
import { ViewPushpinComponent } from './components/view-pushpin/view-pushpin.component';
import { SearchPushpinComponent } from './components/search-pushpin/search-pushpin.component';
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import { PopularSitesComponent } from './components/popular-sites/popular-sites.component';
import { CorkboardStatsComponent } from './components/corkboard-stats/corkboard-stats.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "home/:cbuid", component: HomescreenComponent},
  {path: "addcorkboard", component: AddCorkboardComponent},
  {path: "viewcorkboard/:cbid", component: ViewCorkboardComponent},
  {path: "viewcorkboard/:cbid", component: AddPushpinComponent},
  {path: "viewcorkboard/:ppid", component: ViewPushpinComponent},
  {path: "search", component: SearchPushpinComponent},
  {path: "populartags", component: PopularTagsComponent},
  {path: "popularsites", component: PopularSitesComponent},
  {path: "stats", component: CorkboardStatsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
