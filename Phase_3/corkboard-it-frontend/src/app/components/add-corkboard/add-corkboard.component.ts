import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Categories } from 'src/app/models/category';
import { inject } from '@angular/core/testing';
import { DISABLED } from '@angular/forms/src/model';

@Component({
    selector: 'app-add-corkboard',
    templateUrl: './add-corkboard.component.html',
    styleUrls: ['./add-corkboard.component.scss']
})
export class AddCorkboardComponent implements OnInit {
    public = true;

    title = new FormControl('', [Validators.required]);
    category = new FormControl('', [Validators.required]);
    visibility = new FormControl('', [Validators.required]);
    password = new FormControl('', []);

    categories: string[];

    constructor() {
        this.categories = Categories;
    }
    ngOnInit() {
        console.log(this.categories);
    }

    addCorkBoard() {
        console.log(this.title.value);
        console.log(this.category.value);
        console.log(this.visibility.value);
        console.log(this.password.value);
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
