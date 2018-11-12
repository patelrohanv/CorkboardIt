import { Component, OnInit, Inject, AfterViewInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../services/user.service';
import { PopularTag } from '../../models/popularTag';
import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs';

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

    // popular_tags : PopularTag[] = [
    //   {tag: "foo", pushpin: 5, unique_cb:3},
    //   {tag: "bar", pushpin: 10, unique_cb:5}
    // ];

    dataSource = new PopularTagDataSource(this.userService);
    pop_tags_displayedColumns: string[] = ['tag', 'pushpin', 'unique_cb'];

    constructor(public dialogRef: MatDialogRef<PopularTagsComponent>, private userService: UserService) { }

    ngOnInit() {
    }

}

export class PopularTagDataSource extends DataSource<any> {
    constructor(private userService: UserService) {
      super();
    }
    connect(): Observable<PopularTag[]> {
        console.log('connecting');
        return this.userService.PopularTags();
    }
    disconnect() {}
  }
