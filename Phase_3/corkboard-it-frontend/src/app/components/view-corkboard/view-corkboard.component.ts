import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { AddPushpinComponent } from '../add-pushpin/add-pushpin.component';
import { DataSource } from '@angular/cdk/table';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { PopularSite } from '../../models/popularSite';
import { SearchResults } from '../../models/searchResults';
import { Corkboard } from 'src/app/models/corkboard';
import { Router, ActivatedRoute } from '@angular/router';
import {ViewPushpinComponent} from "../view-pushpin/view-pushpin.component";

@Component({
    selector: 'app-view-corkboard',
    templateUrl: './view-corkboard.component.html',
    styleUrls: ['./view-corkboard.component.scss']
})
export class ViewCorkboardComponent implements OnInit {
    cb: Corkboard = null;

    fakeCd = 'test';
    watch: boolean;
    follow: boolean;
    pushpins = [];
    current_corkboard: Corkboard;
    constructor(public dialog: MatDialog, private userService: UserService, private router: ActivatedRoute) { }
    ngOnInit() {

        const cbid = this.router.snapshot.params['cbid'];
        this.userService.ViewCorkboard(cbid).subscribe((cb: Corkboard) => {
            this.current_corkboard = cb;
        });
    }
    addPushpin(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = this.current_corkboard

        const dialogRef = this.dialog.open(AddPushpinComponent, dialogConfig);
    }
    followCorkboard(): void {

    }
    watchCorkboard(): void {
    }

}
