import { Component, OnInit, Inject, AfterViewInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../services/user.service';
import { PopularTag } from '../../models/popularTag';
import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-popular-tags',
    templateUrl: './popular-tags.component.html',
    styleUrls: ['./popular-tags.component.scss']
})
export class PopularTagsComponent implements OnInit {

    pop_tags_ds = new PopularTagDataSource(this.userService);
    pop_tags_displayedColumns: string[] = ['tag', 'pushpins', 'unique_cb'];

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
