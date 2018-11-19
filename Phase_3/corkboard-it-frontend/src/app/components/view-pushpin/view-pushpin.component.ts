import {Component, Inject, OnInit} from '@angular/core';
import { Comment } from '../../models/comment';
import {DataSource} from "@angular/cdk/table";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {SearchResults} from "../../models/searchResults";
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from "@angular/material";
import {SearchResultsDataSource} from "../search-pushpin/search-pushpin.component";
import {FormControl, Validators} from "@angular/forms";
import {User} from "../../models/user";
@Component({
    selector: 'app-view-pushpin',
    templateUrl: './view-pushpin.component.html',
    styleUrls: ['./view-pushpin.component.scss']
})
export class ViewPushpinComponent implements OnInit {

  pushpin_id: string;
  corkboard_id: string;

  pushpin_displayedColumns: string[] = ['user_commenter', 'user_comment'];

  private name: any;
  private date: any;
  private title: any;
  private description: any;
  private url: any;
  private tags: String = '';
  private likers: String = '';
  private like_btn_disable = false;

  public comment_text = new FormControl('', [Validators.required, Validators.minLength(1)]);


  // Need both of these (tmp_comments & comment)!
  // has to deal with mat-table function. 
  //private tmp_comments: Comment[] = [];
  private comments: Comment[] = [];

  tableDS: MatTableDataSource<Comment>;


  constructor(public dialogRef: MatDialogRef<ViewPushpinComponent>, private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public pushpin_data: any) {
  }


  ngOnInit() {
    console.log("pushpin id ", this.pushpin_data.pushpin_id);
    console.log("cb id ", this.pushpin_data.corkboard_id);
    this.pushpin_id = this.pushpin_data.pushpin_id;
    this.corkboard_id = this.pushpin_data.corkboard_id;
    this.get_view_pushpin_data();
  }

  get_view_pushpin_data() {


    this.userService.ViewPushpin(this.corkboard_id, this.pushpin_id).subscribe((pushpin) => {
        // 0 = owner
        this.name = pushpin[0]['first_name'];
        this.name = this.name + " " + pushpin[0]['last_name'];
        //console.log(this.name);

        // 1 = date
        this.date = pushpin[1]['date_time'];

        //2 = title
        this.title = pushpin[2]['title'];

        //3 = desc & url
        this.description = pushpin[3]['description'];
        this.url = pushpin[3]['url'];

        //get comment & tag out of Object[]
        for (var i = 4; i < (pushpin.length); i++) {

          //if tag
          if (pushpin[i].hasOwnProperty("tag")) {
            if (this.tags != '') {
              this.tags = this.tags + ", "
            }
            this.tags = this.tags + pushpin[i]['tag'];
            //console.log(this.tags)
          }
          // if comment
          if (pushpin[i].hasOwnProperty("text") && pushpin[i].hasOwnProperty("fk_user_id")) {

            //get user_id & text
            const usr = pushpin[i]['fk_user_id'];
            const cmt = pushpin[i]['text'];

            //set comment
            this.comments.push({comment: cmt, commenter: usr.toString()});

            //console.log(this.comments)
          }

          //if liked
          if (pushpin[i].hasOwnProperty("first_name") && pushpin[i].hasOwnProperty("last_name")) {

            if (this.likers != '') {
              this.likers = this.likers + ", "
            }
            this.likers = this.likers + pushpin[i]['first_name'] + ' ' + pushpin[i]['last_name'];

            //if current user already liked
            this.like_btn_disable = true;

            // console.log(this.likers)
          }


        }
        // set comment2 with value of comment
        // needed to do this because mat-table uses a constant of the datasource.. if you just use comment, it wasnt
        // using the values that were added to it after instantiation. There might be a better way to do this,
        // but this was the workaround I found.
        //this.comments = this.tmp_comments;

        this.tableDS = new MatTableDataSource(this.comments);

      }
    );
  }

  postComment() {
    // get current user
    let dt = new Date();
    let iso_str = dt.toISOString().split('T');
    let date = iso_str[0];
    let time = iso_str[1].split('.')[0]

    let dt_str = date.toString() +  ' ' + time.toString();

    console.log(dt_str.toString());

    this.userService.postComment(this.pushpin_id, '3', this.comment_text.value.toString(),
      dt_str).subscribe((cmt) => {
      console.log(cmt);
      if (cmt) {
        console.log('comment posted!');

        this.refresh_comments();

      }
    });
  }

  refresh_comments() {
    //clear comments
    this.comments = [];

    this.userService.ViewPushpin(this.corkboard_id, this.pushpin_id,).subscribe((pushpin) => {

    //get comment & tag out of Object[]
    for (var i = 0; i < (pushpin.length); i++) {


      // if comment
      if (pushpin[i].hasOwnProperty("text") && pushpin[i].hasOwnProperty("fk_user_id")) {



        //get user_id & text
        const usr = pushpin[i]['fk_user_id'];
        const cmt = pushpin[i]['text'];

        // this.userService.getUser_ID(usr).subscribe((user: User) => {
        //   var user_nam = user.first_name + " "
        //
        //   //set comment
        //   this.comments.push({comment: cmt, commenter: current_user.});
        //
        // })

        this.comments.push({comment: cmt, commenter: usr.toString()});

        //console.log(this.comments)
      }
    }
      this.tableDS = new MatTableDataSource(this.comments);

    this.comment_text.reset('');
      });

    }

  likePushpin(){

    //get current user
    //post like

    //this.userService.like

      console.log('hi')
    }

    followUser(){

    console.log('follow')

    }
    }

