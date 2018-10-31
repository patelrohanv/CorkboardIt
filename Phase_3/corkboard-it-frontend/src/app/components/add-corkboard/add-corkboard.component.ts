import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Categories } from 'src/app/models/category';
import { inject } from '@angular/core/testing';

@Component({
    selector: 'app-add-corkboard',
    templateUrl: './add-corkboard.component.html',
    styleUrls: ['./add-corkboard.component.scss']
})
export class AddCorkboardComponent implements OnInit {
    title = new FormControl('', [Validators.required])
    category = new FormControl('', [Validators.required])
    visibility = new FormControl('', [Validators.required])
    password = new FormControl('',[])
    constructor() { }

    ngOnInit() {
    }

    addCorkBoard(){

    }

}
