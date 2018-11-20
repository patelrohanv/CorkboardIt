import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

    current_cork_board = 'Gardens I Love';

    constructor() { }

    ngOnInit() {
    }

    addPushPin() {
        const pushpin = new Pushpin;
        pushpin.url = this.url.value;
        pushpin.description = this.description.value;
    }
}
