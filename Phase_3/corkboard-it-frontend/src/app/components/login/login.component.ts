import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    email: String
    pin: String

    emailFormControl = new FormControl('', [Validators.required])
    pinFormControl = new FormControl('', [Validators.required])

    constructor() { }

    ngOnInit() {
    }

    checkPassword() {
        // TODO make call to api to check if entered pin is the same as the one on the database
        let correct = true

        if (this.pin.length != 4) {    correct = false  }

        if (!correct) {    this.pinFormControl.setErrors({ 'incorrect': true })    }
    }
}
