import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Pushpin } from 'src/app/models/pushpin';

@Component({
    selector: 'app-add-pushpin',
    templateUrl: './add-pushpin.component.html',
    styleUrls: ['./add-pushpin.component.scss']
})
export class AddPushpinComponent implements OnInit {

    url = new FormControl('', [Validators.required]);
    description = new FormControl('', [Validators.required]);
    tags = new FormControl('', [Validators.required]);


    current_cork_board = this.data['corkboard_title'].toString();


    constructor( private router: Router, private userService: UserService,
        private dialogRef: MatDialogRef<AddPushpinComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }

    addPushPin() {
        const pushpin = new Pushpin;
        pushpin.user_id = this.data['user_id'].toString();
        pushpin.corkboard_id = this.data['corkboard_id'].toString();
        pushpin.date_time = new Date().toLocaleString();
        pushpin.url = this.url.value;
        pushpin.description = this.description.value;


        this.userService.postAddPushpin(pushpin).subscribe((pin: string) => {
            
            const id = pin;
            console.log(id, this.tags.value);
            if (this.tags.value.length > 0) {
                this.userService.PostAddTags(id, this.tags.value).subscribe(() => {
                    this.dialogRef.close();
                })
            } else {
                this.dialogRef.close(); 
            }
          
         
        })
    }


}
