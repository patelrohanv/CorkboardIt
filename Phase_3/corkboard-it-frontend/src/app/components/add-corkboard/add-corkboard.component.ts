import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Categories } from 'src/app/models/category';
import { DISABLED } from '@angular/forms/src/model';
import { Corkboard } from '../../models/corkboard';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-corkboard',
    templateUrl: './add-corkboard.component.html',
    styleUrls: ['./add-corkboard.component.scss']
})
export class AddCorkboardComponent implements OnInit {
    isPublic = true;
    title = new FormControl('', [Validators.required]);
    category = new FormControl('', [Validators.required]);
    visibility = new FormControl('', [Validators.required]);
    password = new FormControl('', []);

    categories: string[];

    constructor( private router: Router, private userService: UserService,
        private dialogRef: MatDialogRef<AddCorkboardComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User, public snackBar: MatSnackBar) {
            this.userService.GetCategories().subscribe((categories: any) => {
                this.categories = []
                for(let c of categories) {
                    this.categories.push(c['category'])
                }
            })
    }
    ngOnInit() {
    }

    addCorkBoard() {
      if(this.visibility.valid && this.title.valid && this.category.valid) {
        console.log(this.data);
        const cb = new Corkboard();
        cb.title = this.title.value;
        cb.fk_user_id = this.data.user_id;
        cb.email = this.data.email;
        cb.date_time = new Date().toLocaleString();
        cb.category = this.category.value;
        cb.visibility = this.visibility.value == 'true' ? true : false;
        console.log(cb.visibility);
        if (!cb.visibility) {
           if (this.password.value.length == 0) {
               this.openSnackBar();
               return;
           } 
           cb.password = this.password.value;
        }
        // console.log(cb);
        this.userService.postAddCorkboard(cb).subscribe((corkboard) => {
          console.log(corkboard)
          this.dialogRef.close()
          this.router.navigate(['/viewcorkboard/', corkboard]);
        });
      }
    }

    openSnackBar() {
        this.snackBar.openFromComponent(PasswordErrorComponent, {
          duration: 700,
        });
      }

    changeVisibility() {
        console.log(this.visibility);
        if (this.visibility.value == 'true') {
            console.log('public')
            this.isPublic = true;
            this.password.reset();
        } else if (this.visibility.value == 'false') {
            console.log('private')
            this.isPublic = false;
        }
    }

}

@Component({
    selector: 'snack-bar-component-password-error',
    template: '<span class="error">Please enter password!</span>',
    styles: [`
      .error {
        color: hotpink;
      }
    `],
  })
  export class PasswordErrorComponent {}
