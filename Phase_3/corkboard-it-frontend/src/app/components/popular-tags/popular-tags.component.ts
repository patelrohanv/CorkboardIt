import { Component, OnInit, Inject } from '@angular/core';
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
export class PopularTagsComponent implements OnInit {

    // popular_tags : PopularTags[] = [
    //   {tag: "foo", pushpins: 5, unique_cb:3},
    //   {tag: "bar", pushpins: 10, unique_cb:5}
    // ];

    popular_tags: PopularTag[] = [];
    pop_tags_displayedColumns: string[] = ['tag', 'pushpins', 'unique_cb'];

    constructor(public dialogRef: MatDialogRef<PopularTagsComponent>, private userService: UserService) {
        userService.CorkboardStats().subscribe((data: PopularTag) => {
            console.log(data)
            this.popular_tags.push(data)
        });
    }

    ngOnInit() {
    }

    getPopularTags() {

        //TODO make api call to get popular tags

    }


}
