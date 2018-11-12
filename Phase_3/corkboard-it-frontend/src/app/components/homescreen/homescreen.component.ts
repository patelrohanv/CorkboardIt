import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PopularTagsComponent } from '../popular-tags/popular-tags.component';
import { CorkboardStatsComponent } from '../corkboard-stats/corkboard-stats.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCorkboardComponent } from '../add-corkboard/add-corkboard.component';

@Component({
    selector: 'app-homescreen',
    templateUrl: './homescreen.component.html',
    styleUrls: ['./homescreen.component.scss']
})
export class HomescreenComponent implements OnInit {

    constructor(public dialog: MatDialog) { }

    ngOnInit() {
    }
    getPopularSites(): void {
        return null;
    }

    getPopularTags(): void {


        const dialogRef = this.dialog.open(PopularTagsComponent, {
            width: '250px',
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

}
