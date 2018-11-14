import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PopularTagsComponent } from '../popular-tags/popular-tags.component';
import { CorkboardStatsComponent } from '../corkboard-stats/corkboard-stats.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCorkboardComponent } from '../add-corkboard/add-corkboard.component';
import {PopularSitesComponent} from "../popular-sites/popular-sites.component";
import {SearchPushpinComponent} from "../search-pushpin/search-pushpin.component";
import {DataSource} from "@angular/cdk/table";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {PopularSite} from "../../models/popularSite";
import {SearchResults} from "../../models/searchResults";


@Component({
    selector: 'app-homescreen',
    templateUrl: './homescreen.component.html',
    styleUrls: ['./homescreen.component.scss']
})
export class HomescreenComponent implements OnInit {

  search_text = new FormControl('', [Validators.required, Validators.minLength(1)]);

  constructor(public dialog: MatDialog) { }

    ngOnInit() {
    }
    getPopularSites(): void {
      const dialogRef = this.dialog.open(PopularSitesComponent, {
        width: '500x',
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

    getPopularTags(): void {
        const dialogRef = this.dialog.open(PopularTagsComponent, {
            width: '400px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    getCorkBoardStats(): void {
        const dialogRef = this.dialog.open(CorkboardStatsComponent, {
            width: '500x',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    addCorkBoard(): void {
        const dialogRef = this.dialog.open(AddCorkboardComponent, {
            width: '500px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    getPushPinSearchResults(): void {

      const dialogRef = this.dialog.open(SearchPushpinComponent, {
        width: '500px',
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The SearchPushpin dialog was closed');
      });
    }
    }

