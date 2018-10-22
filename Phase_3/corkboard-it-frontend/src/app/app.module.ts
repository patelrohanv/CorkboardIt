import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { AddCorkboardComponent } from './add-corkboard/add-corkboard.component';
import { ViewCorkboardComponent } from './view-corkboard/view-corkboard.component';
import { AddPushpinComponent } from './add-pushpin/add-pushpin.component';
import { ViewPushpinComponent } from './view-pushpin/view-pushpin.component';
import { SearchPushpinComponent } from './search-pushpin/search-pushpin.component';
import { PopularTagsComponent } from './popular-tags/popular-tags.component';
import { PopularSitesComponent } from './popular-sites/popular-sites.component';
import { CorkboardStatsComponent } from './corkboard-stats/corkboard-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomescreenComponent,
    AddCorkboardComponent,
    ViewCorkboardComponent,
    AddPushpinComponent,
    ViewPushpinComponent,
    SearchPushpinComponent,
    PopularTagsComponent,
    PopularSitesComponent,
    CorkboardStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
