import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatButtonToggleModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as rxjs from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
        CorkboardStatsComponent,
    ],
    imports: [
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatCardModule,
        MatCheckboxModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        HttpClientModule,
        MatButtonToggleModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [LoginComponent,
        HomescreenComponent,
        AddCorkboardComponent,
        AddPushpinComponent,
        PopularTagsComponent,
        PopularTagsComponent,
        CorkboardStatsComponent,
        SearchPushpinComponent]
})
export class AppModule { }
