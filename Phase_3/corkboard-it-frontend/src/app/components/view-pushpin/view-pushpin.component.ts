import {Component, Inject, OnInit} from '@angular/core';
import { Comment } from '../../models/comment';
import {DataSource} from "@angular/cdk/table";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {SearchResults} from "../../models/searchResults";
import {ViewPushPin} from "../../models/ViewPushPin";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {SearchResultsDataSource} from "../search-pushpin/search-pushpin.component";
@Component({
    selector: 'app-view-pushpin',
    templateUrl: './view-pushpin.component.html',
    styleUrls: ['./view-pushpin.component.scss']
})
export class ViewPushpinComponent implements OnInit {

  pushpin_id: string;
  corkboard_id: string;

  comments: Comment[] = [];
  pushpin_displayedColumns: string[] = ['Commenter', 'Comment'];
  private data: Observable<ViewPushPin>;

  private name: any;
  private date: any;
  private title: any;
  private description: any;
  private url : any;


  constructor(public dialogRef: MatDialogRef<ViewPushpinComponent>, private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    console.log("pushpin id ", this.data.pushpin_id);
    console.log("cb id ", this.data.corkboard_id);
    this.pushpin_id = this.data.pushpin_id;
    this.corkboard_id = this.data.corkboard_id;
    this.get_view_pushpin_data();
    //this.view_pushpin_ds = new ViewPushPinDataSource(this.userService, this.data.pushpin_id);
  }

  get_view_pushpin_data() {

    this.userService.ViewPushpin(this.corkboard_id, this.pushpin_id, ).subscribe((pushpin) => {
      // 0 = owner
         this.name = pushpin[0]['first_name'];
        this.name = this.name + " " + pushpin[0]['last_name'];
        console.log(this.name);

        // 1 = date
      this.date = pushpin[1]['date_time'];

      //2 = title & desc
      this.title = pushpin[2]['title'];

      this.description = pushpin[3]['description'];
      this.url = pushpin[3]['url'];


      }
    );
  }
}

// export class ViewPushPinDataSource extends DataSource<any> {
//   private readonly pushpin_id: string;
//   constructor(private userService: UserService, pushpin_id: string) {
//     super();
//     this.pushpin_id = pushpin_id;
//   }
//   connect(): Observable<ViewPushPin[]> {
//     console.log('connecting');
//     return this.userService.ViewPushpin(this.pushpin_id);
//   }
//   disconnect() { }
// }
