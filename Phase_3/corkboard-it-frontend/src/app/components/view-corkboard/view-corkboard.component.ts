import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Corkboard } from '../../models/corkboard';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewCorkBoard } from 'src/app/models/viewCorkBoard';

@Component({
    selector: 'app-view-corkboard',
    templateUrl: './view-corkboard.component.html',
    styleUrls: ['./view-corkboard.component.scss']
})
export class ViewCorkboardComponent implements OnInit {
    cb: Corkboard = null;

    user_id = "";
    corkBoardDetails: ViewCorkBoard
    canAdd: boolean
    canWatch: boolean
    canFollow: boolean
    constructor(private userService: UserService, private router: ActivatedRoute) { }
    ngOnInit() {
        const cbid = this.router.snapshot.params['cbid'];
        this.userService.getViewCorkboard(cbid).subscribe((data: ViewCorkBoard) => {
            this.user_id = this.userService.getCurrentUser()
            this.corkBoardDetails = data
            this.updateCanAdd()
            this.updateCanFollow()
            this.updateCanWatch()
            console.log(this.corkBoardDetails, this.user_id, this.canAdd)
            
        })
        // console.log(this.userService.getCurrentUser);
      

    }

    updateCanAdd() {
        this.canAdd = this.user_id == this.corkBoardDetails.owner.user_id ?
                      true : false;
    }

    updateCanWatch() {
        this.canWatch = this.corkBoardDetails.stat.visibility == true &&
                        this.user_id != this.corkBoardDetails.owner.user_id ?
                        true : false;
    }

    updateCanFollow() {
        console.log(this.corkBoardDetails.owner.user_id, this.user_id)
        console.log(this.corkBoardDetails.owner.user_id != this.user_id)
        if(this.corkBoardDetails.owner.user_id != this.user_id) {
            this.canFollow = true;
        } else {
            this.canFollow = false;
        }
    }
}
