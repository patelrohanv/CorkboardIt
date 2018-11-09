import { Component, OnInit, Inject, AfterViewInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../services/user.service';
import { PopularTag } from '../../models/popularTag';

// export interface PopularTags {
//   tag: string;
//   pushpins: number;
//   unique_cb: number;
// }

@Component({
    selector: 'app-popular-tags',
    templateUrl: './popular-tags.component.html',
    styleUrls: ['./popular-tags.component.scss']
})
export class PopularTagsComponent implements OnInit, AfterViewInit {

    // popular_tags : PopularTags[] = [
    //   {tag: "foo", pushpins: 5, unique_cb:3},
    //   {tag: "bar", pushpins: 10, unique_cb:5}
    // ];

    popular_tags: PopularTag[] = [];
    pop_tags_displayedColumns: string[] = ['tag', 'pushpins', 'unique_cb'];

    constructor(public dialogRef: MatDialogRef<PopularTagsComponent>, private userService: UserService) {

    }

    ngOnInit() {
        this.userService.PopularTags().subscribe((data) => {
            console.log('data', data);
            for(let d of data) {
                console.log(d)
                this.popular_tags.push(d)
            }
        });
    }

    ngAfterViewInit() {

    }



    getPopularTags() {

        // TODO make api call to get popular tags

    }


}
