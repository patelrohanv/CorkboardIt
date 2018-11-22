import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Corkboard } from '../../models/corkboard';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewCorkBoard } from 'src/app/models/viewCorkBoard';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { AddPushpinComponent } from '../add-pushpin/add-pushpin.component';

@Component({
    selector: 'app-view-corkboard',
    templateUrl: './view-corkboard.component.html',
    styleUrls: ['./view-corkboard.component.scss']
})
export class ViewCorkboardComponent implements OnInit {
    user_id = "";
    corkboard_details: ViewCorkBoard
    current_corkboard: Corkboard
    cbid: string
    canAdd: boolean
    canWatch: boolean
    canFollow: boolean
    constructor(public dialog: MatDialog, private userService: UserService, private router: ActivatedRoute) { }
    ngOnInit() {
        this.cbid = this.router.snapshot.params['cbid'];
        this.userService.getViewCorkboard(this.cbid).subscribe((data: ViewCorkBoard) => {
            console.log(data);
            this.user_id = this.userService.getCurrentUser()
            this.corkboard_details = data
            console.log(this.corkboard_details, this.user_id)
            this.updateCanAdd()
            this.updateCanFollow()
            this.updateCanWatch()
            this.setCurrentCorkBoard()
            console.log('here', this.corkboard_details, this.user_id, this.canAdd)
            
        })
      

    }

    setCurrentCorkBoard() {
        this.current_corkboard.category = this.corkboard_details.stat.category;
        this.current_corkboard.corkboard_id = this.cbid;
        this.current_corkboard.date_time = this.corkboard_details.stat.date;
        this.current_corkboard.email = this.corkboard_details.owner.email;
        this.current_corkboard.fk_user_id = this.corkboard_details.owner.user_id;
        this.current_corkboard.title = this.corkboard_details.stat.title;
        this.current_corkboard.visibility = this.corkboard_details.stat.visibility;
    }

    updateCanAdd() {
        this.canAdd = this.user_id == this.corkboard_details.owner.user_id ?
                      true : false;
    }

    updateCanWatch() {
        this.canWatch = this.corkboard_details.stat.visibility == true &&
                        this.user_id != this.corkboard_details.owner.user_id ?
                        true : false;
    }

    updateCanFollow() {
        this.canFollow = this.corkboard_details.owner.user_id != this.user_id ? true : false
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
