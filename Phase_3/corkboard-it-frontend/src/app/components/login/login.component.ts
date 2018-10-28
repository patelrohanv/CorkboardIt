import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RouterModule, Router, Route } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email])
    pin = new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4)])

    constructor(private router: Router) {
        
    }

    ngOnInit() {
    }

    checkPassword() {
        // TODO make call to api to check if entered pin is the same as the one on the database
        let correct = true

        if (!correct) { this.pin.setErrors({ 'incorrect': true }) }
        else {
            console.log(`${this.email.value}: ${this.pin.value}`)
            this.router.navigate(['/home/', this.email.value]);
        }
    }
}
