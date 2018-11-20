import {Component, Inject, OnInit} from '@angular/core';
import {Comment} from '../../models/comment';
import {UserService} from "../../services/user.service";
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from "@angular/material";
import {FormControl, Validators} from "@angular/forms";

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
  private like = true;
  private like_btn_txt = 'Like!'
  private like_btn_disable = false;

  private cur_usr: string;
  private follow_btn_disable = false;
  private cb_owner: string;

  public comment_text = new FormControl('', [Validators.required, Validators.minLength(1)]);

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
    this.cur_usr = this.pushpin_data.current_user;
    this.cb_owner = this.pushpin_data.cb_owner;

    this.get_view_pushpin_data();

    //run these initially
    // each will be update afterwards if necessary
    this.refresh_tags();
    this.refresh_comments();
    this.refresh_likes();
    this.refresh_follow_data();
  }

  // gets the pushpin data dealing with pin owner name, board name, date it was pinned
  // title, url and description.
  get_view_pushpin_data() {
    this.userService.ViewPushpin(this.corkboard_id, this.pushpin_id).subscribe((pushpin) => {
        // 0 = owner
        this.name = pushpin[0]['first_name'];
        this.name = this.name + " " + pushpin[0]['last_name'];

        // 1 = date
        this.date = pushpin[1]['date_time'];

        //2 = title
        this.title = pushpin[2]['title'];

        //3 = desc & url
        this.description = pushpin[3]['description'];
        this.url = pushpin[3]['url'];
      }
    );
  }

  // gets the tag data from the database
  refresh_tags(){
    // reset the tags, even though this should only be called once
    this.tags = '';
    this.userService.ViewPushpin(this.corkboard_id, this.pushpin_id).subscribe((pushpin) => {
      for (var i = 4; i < (pushpin.length); i++) {

        //if tag
        if (pushpin[i].hasOwnProperty("tag")) {
          // add comma if more than 1
          if (this.tags != '') {
            this.tags = this.tags + ", "
          }
          // concat tags
          this.tags = this.tags + pushpin[i]['tag'];
        }
      }
    });
  }


  // posts a comment to the database
  postComment() {
    // make sure the comment isnt empty
    if(this.comment_text.valid) {

      // find the current date_time and format it like in the database
      let dt = new Date();
      let iso_str = dt.toISOString().split('T');
      let date = iso_str[0];
      let time = iso_str[1].split('.')[0];

      let dt_str = date.toString() + ' ' + time.toString();

      //post comment
      this.userService.postComment(this.pushpin_id, this.cur_usr, this.comment_text.value.toString(),
        dt_str).subscribe((cmt) => {
        if (cmt) {
          console.log('comment posted!');

          // reload the comments on the screen
          // not the most efficient, but it works
          this.refresh_comments();

        }
      });
    }
  }

  // reads comment data from the database
  refresh_comments() {
    //clear comments
    this.comments = [];

    //get the comments
    this.userService.ViewPushpin(this.corkboard_id, this.pushpin_id,).subscribe((pushpin) => {

      // loop through array of json objs
      for (var i = 0; i < (pushpin.length); i++) {

        // if comment
        if (pushpin[i].hasOwnProperty("text") && pushpin[i].hasOwnProperty("first_name") &&
          pushpin[i].hasOwnProperty("last_name")) {

          //get user_id & text
          const usr = pushpin[i]['first_name'] + ' ' + pushpin[i]['last_name'];
          const cmt = pushpin[i]['text'];

          // //set comment
          this.comments.push({comment: cmt, commenter: usr.toString()});

        }
      }
      // must create a new MatTableDataSource so that the table will update
      this.tableDS = new MatTableDataSource(this.comments);

      // clear the comment form
      this.comment_text.reset('');
    });

  }

  // likes or unlikes a pin depending on the current state
  // if the  pin was liked, it will be unliked and vice versa.
  likeUnlikePushpin() {
    // is the pin able to be liked, if not it must be unliked
    if(this.like){
      this.userService.LikePushpin(this.pushpin_id, this.cur_usr).subscribe((like_data) => {
        if (like_data) {
          console.log('pin liked!');
          //sets the text of the button to unliked
          this.like_btn_txt = "Unlike";
          this.like = false;
          this.refresh_likes();
        }
      });
    }
    // the pin was liked, so now were going to unlike it
    else{
      this.userService.UnikePushpin(this.pushpin_id, this.cur_usr).subscribe((like) => {
        if (like) {
          console.log('pin unliked!');
          //this.like_btn_disable = true;
          // sets the text of the button to like!
          this.like_btn_txt = "Like!";
          this.like = true;
          this.refresh_likes();
       }
      });
    }
  }

  // reloads like data from the database
  refresh_likes() {

    this.userService.ViewPushpin(this.corkboard_id, this.pushpin_id,).subscribe((pushpin) => {

      // reset likers, this will be update with new likers data
      this.likers = '';

      for (var i = 4; i < (pushpin.length); i++) {
        //if liked
        if (pushpin[i].hasOwnProperty("first_name") && pushpin[i].hasOwnProperty("last_name") &&
        !pushpin[i].hasOwnProperty("text")) {

          // add comma if more than 1
          if (this.likers != '') {
            this.likers = this.likers + ", "
          }
          this.likers = this.likers + pushpin[i]['first_name'] + ' ' + pushpin[i]['last_name'];

          //if current user already liked
          //TODO
          if (pushpin[i].hasOwnProperty("user_id")) {
            if (pushpin[i]['user_id'] == this.cur_usr.toString()) {
              //this.like = false;
            }
          }
        }
      }
    });

    if(this.cb_owner == this.cur_usr){
      this.like_btn_disable = true;
    }
  }

  // post follow
  followUser() {

    //get owner of cb
    //  if current user doesnt follow owner

    this.userService.PostFollow(this.cur_usr, this.cb_owner);

    console.log('follow')

  }

  // reload follows data, get follow data from db
  refresh_follow_data() {

    //get follow data
    // if current user follows cb_owner or current user is owner disable follow

    //this.follow_btn_disable = true;
  }
}

