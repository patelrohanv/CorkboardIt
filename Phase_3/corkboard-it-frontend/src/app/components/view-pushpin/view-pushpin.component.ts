import { Component, OnInit } from '@angular/core';
import { Comment } from '../../models/comment';
@Component({
    selector: 'app-view-pushpin',
    templateUrl: './view-pushpin.component.html',
    styleUrls: ['./view-pushpin.component.scss']
})
export class ViewPushpinComponent implements OnInit {

    comments: Comment[] = [];
    pushpin_displayedColumns: string[] = ['Commenter', 'Comment'];
    constructor() { }

    ngOnInit() {
    }

}
