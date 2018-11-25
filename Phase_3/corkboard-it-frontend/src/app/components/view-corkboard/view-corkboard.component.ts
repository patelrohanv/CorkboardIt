import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Corkboard } from '../../models/corkboard';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewCorkBoard, PushpinImage, ViewCorkBoardStat } from 'src/app/models/viewCorkBoard';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { AddPushpinComponent } from '../add-pushpin/add-pushpin.component';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-view-corkboard',
    templateUrl: './view-corkboard.component.html',
    styleUrls: ['./view-corkboard.component.scss']
})
export class ViewCorkboardComponent implements OnInit {
    cur_user_id = "";
    owner: User;
    corkboard_stat: ViewCorkBoardStat
    pushpins: PushpinImage[]

    cbid: string
    add_btn_disable: boolean
    watch_btn_disable: boolean
    follow_btn_disable: boolean

    constructor(public dialog: MatDialog, private userService: UserService, private router: ActivatedRoute, private navigator: Router) { }
    ngOnInit() {
        console.log('load')
        this.cbid = this.router.snapshot.params['cbid'];
        this.updateData()
    }

    updateData() {
        this.userService.getViewCorkboard(this.cbid).subscribe((data: ViewCorkBoard) => {
            this.cur_user_id = localStorage.getItem('cur_user_id')
            this.owner = data.owner
            this.corkboard_stat = data.stat
            this.pushpins = data.images
            this.load_watch()
            this.updateCanAdd()
            this.updateCanFollow()
            this.updateCanWatch()
            this.load_follow()
        })
    }

    updateCanAdd() {
        this.add_btn_disable = this.cur_user_id == this.owner.user_id ?
                      false : true;
    }

    updateCanWatch() {
        this.watch_btn_disable = this.corkboard_stat.visibility == true &&
                        this.cur_user_id != this.owner.user_id ?
                        false : true;
    }

    updateCanFollow() {
        this.follow_btn_disable = this.owner.user_id != this.cur_user_id ? false : true
    }

    addPushpin(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            user_id: this.owner.user_id,
            corkboard_id: this.cbid
          };
      

        const dialogRef = this.dialog.open(AddPushpinComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
            this.updateData();
        })
    }

    watch_corkboard() {
        this.userService.PostWatch(this.cur_user_id, this.cbid).subscribe((f) => {
            this.updateData()
        })
    }

    load_watch() {
        this.userService.GetWatch(this.cbid).subscribe((watch: []) => {
            for(let i = 0; i < watch.length; i++) {
                console.log(watch[i]['fk_user_id'])
                if(watch[i]['fk_user_id'] == this.cur_user_id) {
                    this.watch_btn_disable = true;
                    break;
                }
            }
        })
    }

    follow_user() {
        console.log('post follow');
        console.log(localStorage.getItem('cur_user_id'))
        console.log(this.cur_user_id, this.owner.user_id)
        this.userService.PostFollow(this.cur_user_id, this.owner.user_id).subscribe((f) => {
            if (f) {
                console.log('now following!');
                this.load_follow();
            }
        });
        console.log('follow')
    }

    load_follow() {
        this.userService.GetFollow(this.cur_user_id).subscribe((following)=>{

        for(var i = 0; i < following.length; i++)
        {
            console.log(following[i]['fk_user_followee_id']);

            if(this.owner.user_id != following[i]['fk_user_followee_id'] &&  this.owner.user_id != this.cur_user_id){

            // do nothing
            }
            else{
            //TODO unfollow?
            this.follow_btn_disable = true;
            }
        }
        });
    }

    navigateToPushPin(id): void {
        console.log('clikced')
        this.navigator.navigate(['/viewpushpin/', id]);
    }
}
