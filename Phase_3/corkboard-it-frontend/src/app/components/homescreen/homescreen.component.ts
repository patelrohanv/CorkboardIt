import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PopularTagsComponent } from '../popular-tags/popular-tags.component';
import { CorkboardStatsComponent } from '../corkboard-stats/corkboard-stats.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCorkboardComponent } from '../add-corkboard/add-corkboard.component';
import {PopularSitesComponent} from "../popular-sites/popular-sites.component";
import { UserService } from 'src/app/services/user.service';
import { Corkboard } from 'src/app/models/corkboard';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-homescreen',
    templateUrl: './homescreen.component.html',
    styleUrls: ['./homescreen.component.scss']
})
export class HomescreenComponent implements OnInit {
    current_user: User = {
        email: 'binglin@',
        id: '1',
        first_name: 'Bing',
        last_name: 'Lin' 
    } 
    owned_corkboards: Corkboard[]
    recent_corkboards: Corkboard[]

    constructor(public dialog: MatDialog, private userService: UserService) { }

    ngOnInit() {
        this.getOwnedCorkBoards()
        this.getRecentCorkBoards()
        this.current_user = {    
            email: 'binglin@',
            id: '1',
            first_name: 'Bing',
            last_name: 'Ling'
        }
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

    getOwnedCorkBoards() {
        this.userService.getHomescreenOwned(this.current_user.id).subscribe((res: Corkboard[]) => {
            this.owned_corkboards = res
        })
    }

    getRecentCorkBoards() {
        this.userService.getHomescreenRecent(this.current_user.id).subscribe((res: Corkboard[]) => {
            this.recent_corkboards = res
        })
    }

}
