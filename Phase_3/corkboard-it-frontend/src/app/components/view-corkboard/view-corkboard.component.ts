import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Corkboard } from '../../models/corkboard';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewCorkBoard, PushpinImage } from 'src/app/models/viewCorkBoard';
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
    pushpins: PushpinImage[]
    constructor(public dialog: MatDialog, private userService: UserService, private router: ActivatedRoute, private navigator: Router) { }
    ngOnInit() {
        this.cbid = this.router.snapshot.params['cbid'];
        this.userService.getViewCorkboard(this.cbid).subscribe((data: ViewCorkBoard) => {
            console.log(data);
            this.user_id = localStorage.getItem['cur_user_id']
            this.corkboard_details = data
            console.log(this.corkboard_details, this.user_id)
            this.updateCanAdd()
            this.updateCanFollow()
            this.updateCanWatch()
            this.pushpins = this.corkboard_details.images
            console.log(this.pushpins)
            console.log('here', this.corkboard_details, this.user_id, this.canAdd)
            
        })
    
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

    navigateToPushPin(id): void {
        console.log('clikced')
        this.navigator.navigate(['/viewpushpin/', id]);
    }
}
