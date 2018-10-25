import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
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

    constructor(public dialogRef: MatDialogRef<LoginComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
    }

    checkPassword() {
        // TODO make call to api to check if entered pin is the same as the one on the database
        let correct = true

        if (this.pin.length != 4) { correct = false }

        if (!correct) { this.pinFormControl.setErrors({ 'incorrect': true }) }
        else { this.dialogRef.close() }
    }
}
