import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Categories } from 'src/app/models/category';
import { DISABLED } from '@angular/forms/src/model';
import { Corkboard } from '../../models/corkboard';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-corkboard',
    templateUrl: './add-corkboard.component.html',
    styleUrls: ['./add-corkboard.component.scss']
})
export class AddCorkboardComponent implements OnInit {
    public = true;
    user: User;
    title = new FormControl('', [Validators.required]);
    category = new FormControl('', [Validators.required]);
    visibility = new FormControl('', [Validators.required]);
    password = new FormControl('', []);

    categories: string[];

    constructor( private router: Router, private userService: UserService,
        dialogRef: MatDialogRef<AddCorkboardComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User) {
            console.log(data);
        this.categories = Categories;
        this.user = data;
        console.log(this.user);
    }
    ngOnInit() {
    }

    addCorkBoard() {
        const user_id = this.user.id;
        const email = this.user.email;
        let cb = new Corkboard();
        cb.title = this.title.value;
        cb.fk_user_id = +user_id;
        cb.email = email;
        cb.date_time = new Date().toLocaleString();
        cb.category = this.category.value;
        cb.visibility = this.visibility.value;
        if (!cb.visibility) {
            cb.password = this.password.value;
        }
        console.log(cb);
        this.userService.postAddCorkboard(cb).subscribe((corkboard) => {
            const id = corkboard['id'];
            this.router.navigate(['/viewcorkboard/', id]);
        });
    }

    disablePassword() {
        console.log(this.visibility);
        if (this.visibility.value) {
            this.public = true;
            this.password.reset();
        } else if (!this.visibility.value) {
            this.public = false;
        }
    }

}
