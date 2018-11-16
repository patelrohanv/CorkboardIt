import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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
        console.log(this.url.value);
        console.log(this.description.value);
        console.log(this.tags.value);
    }
}
