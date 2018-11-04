import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Corkboard } from '../../models/corkboard';

@Component({
    selector: 'app-view-corkboard',
    templateUrl: './view-corkboard.component.html',
    styleUrls: ['./view-corkboard.component.scss']
})
export class ViewCorkboardComponent implements OnInit {
    cb: Corkboard = null;

    fakeCd = 'test';
    watch: boolean;
    follow: boolean;
    pushpins = [];
    constructor(private userService: UserService) { }
    ngOnInit() {
    }

}
