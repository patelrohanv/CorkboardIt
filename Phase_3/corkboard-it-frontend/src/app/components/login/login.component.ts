import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RouterModule, Router, Route } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email]);
    pin = new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]);

    email_input: string;
    pin_input: string;
    constructor(private router: Router, private userService: UserService) {

    }

    ngOnInit() {
    }

    checkPassword() {
        console.log(this.email_input, this.pin_input)
        this.userService.getUser_Email(this.email_input).subscribe((user) => {
            const id = user['user_id']
            console.log(user);
            this.userService.postLogin(id, this.pin_input).subscribe((user) => {
                console.log(user);
                if (user) {
                    localStorage.setItem('cur_user_id', id);
                    this.router.navigate(['/home/', id]);
                } else {
                    console.log('Incorrect!');
                }
            })
        })
      
    }
}
