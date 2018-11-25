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
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSnackBarModule,
    MatChipsModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as rxjs from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AddCorkboardComponent } from './components/add-corkboard/add-corkboard.component';
import { ViewCorkboardComponent } from './components/view-corkboard/view-corkboard.component';
import { AddPushpinComponent } from './components/add-pushpin/add-pushpin.component';
import { ViewPushpinComponent } from './components/view-pushpin/view-pushpin.component';
import { SearchPushpinComponent } from './components/search-pushpin/search-pushpin.component';
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import { PopularSitesComponent } from './components/popular-sites/popular-sites.component';
import { CorkboardStatsComponent } from './components/corkboard-stats/corkboard-stats.component';
import { HomeScreenModule } from './components/homescreen/homescreen.module';
import { UiModule } from './ui.module';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
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
        HomeScreenModule,
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        UiModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatRadioModule,
        MatFormFieldModule,
        MatGridListModule,
        MatSnackBarModule,
        MatChipsModule,
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        LoginComponent,
        AddCorkboardComponent,
        AddPushpinComponent,
        PopularTagsComponent,   
        PopularTagsComponent,
        CorkboardStatsComponent,
        SearchPushpinComponent, ViewPushpinComponent]
})
export class AppModule { }
