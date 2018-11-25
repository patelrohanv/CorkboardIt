import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {Comment} from '../../models/comment';
import {UserService} from "../../services/user.service";
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from "@angular/material";
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

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
  private tagsList: String[] = [];

  private website : string;
  private http: string;
  private domainName: string = '';

  private likers: String = '';
  private like = true;
  private like_btn_txt = 'LIKE!';
  private like_btn_disable = false;

  private cur_usr: string;
  private follow_btn_disable = false;
  private cb_owner: string;

  public comment_text = new FormControl('', [Validators.required, Validators.minLength(1)]);

  private comments: Comment[] = [];
  tableDS: MatTableDataSource<Comment>;


  constructor( private userService: UserService, private router: ActivatedRoute) {

  }

  ngOnInit() {
    const ppid = this.router.snapshot.params['ppid'];
    this.pushpin_id = ppid.toString();
    this.cur_usr = localStorage.getItem('cur_user_id');
    this.get_view_pushpin_data();
  }

  // gets the pushpin data dealing with pin owner name, board name, date it was pinned
  // title, url and description.
  get_view_pushpin_data() {
    this.userService.ViewPushpin(this.pushpin_id).subscribe((pushpin) => {
        // 0 = owner
        this.name = pushpin[0]['first_name'];
        this.name = this.name + " " + pushpin[0]['last_name'];

        // 1 = date
        this.date = pushpin[1]['date_time'];

        //2 = title
        this.title = pushpin[2]['title'];
        this.cb_owner = '' + pushpin[2]['fk_user_id'] +'';
        this.corkboard_id = '' + pushpin[2]['corkboard_id'] +'';

        //3 = desc & url
        this.description = pushpin[3]['description'];
        this.url = pushpin[3]['url'];


        //get website from url
        var raw = this.url.split('/');

        for(var j = 0; j < raw.length; j++){
          if(raw[j].startsWith('http')){
            this.http = raw[j];
          }
          if(!raw[j].startsWith('http') && raw[j] != ''){

            this.website = raw[j];

            var tmp = raw[j].split('.');
            for(var k = 0; k < tmp.length; k++){
              if(this.domainName.length > 0){
                this.domainName = this.domainName + ".";
              }
              if(!tmp[k].startsWith('www')){
                this.domainName = this.domainName +tmp[k];
              }
            }

            //this.website = raw[j];
            break;
        }
      }

      console.log('current user: ', this.cur_usr);
        console.log('cb owner: ', this.cb_owner);

      //disable like btn
      if(this.cb_owner == this.cur_usr){
        this.like_btn_disable = true;
        this.follow_btn_disable = true;
      }

      //run these initially
      // each will be update afterwards if necessary
        this.load_tags(pushpin);
        this.load_comments(pushpin);
        this.load_likers(pushpin);
        this.load_follow();

      }
    );
  }

  // get tag data ouf of pushpin
  load_tags(pushpin){

    for (var i = 4; i < (pushpin.length); i++) {

      //if tag
      if (pushpin[i].hasOwnProperty("tag")) {
        // add comma if more than 1
        if (this.tags != '') {
          this.tags = this.tags + ", "
        }
        // concat tags
        this.tags = this.tags + pushpin[i]['tag'];
        this.tagsList = this.tags.split(',');
      }
    }
  }

  //get comment data put of pushpin
  load_comments(pushpin){

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

  }

// get like data out of pushpin
  load_likers(pushpin){

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
        if (pushpin[i].hasOwnProperty("user_id")) {
          if (pushpin[i]['user_id'] == this.cur_usr.toString()) {
              this.like = false;
              this.like_btn_txt = "Unlike"
          }
        }
      }
    }
  }


  // gets the tag data from the database
  refresh_tags(){
    // reset the tags, even though this should only be called once
    this.tags = '';
    this.userService.ViewPushpin(this.pushpin_id).subscribe((pushpin) => {

      this.load_tags(pushpin);

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

    // //get the comments
    this.userService.ViewPushpin(this.pushpin_id,).subscribe((pushpin) => {
      this.load_comments(pushpin);

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

    this.userService.ViewPushpin(this.pushpin_id,).subscribe((pushpin) => {

      // reset likers, this will be update with new likers data
      this.likers = '';

      this.load_likers(pushpin);

    });
  }

  // post follow
  followUser() {

    // post follow
    console.log('post follow');

    this.userService.PostFollow(this.cur_usr, this.cb_owner).subscribe((f) => {
      if (f) {
        console.log('now following!');

        this.load_follow();

      }
    });


    console.log('follow')

  }

  load_follow(){

    this.userService.GetFollow(this.cur_usr).subscribe((following)=>{

      for(var i = 0; i < following.length; i++)
      {
        console.log(following[i]['fk_user_followee_id']);

        if(this.cb_owner != following[i]['fk_user_followee_id'] &&  this.cb_owner != this.cur_usr){

         // do nothing
        }
        else{
          //TODO unfollow?
          this.follow_btn_disable = true;
        }
      }
    });

  }


}


// Following API
// """
// Get FOLLOWING
// """
// @app.route('/getfollowers/<user_id>', methods=['GET'])
// def get_followers(user_id):
//
// content = request.get_json()
// print('CONTENT:', content, file=sys.stderr)
//
// if request.method == 'GET':
//
// data = []
//
// cur.execute(""" SELECT fk_user_followee_id FROM follow WHERE fk_user_follower_id = %(user_id)s""",
//   {'user_id':user_id})
//
// headers = [x[0] for x in cur.description]
// rows = cur.fetchall()
// for stuff in rows:
// data.append(dict(zip(headers, stuff)))
//
// return jsonify(data)
//
//
// """
// FOLLOW USER
// """
// @app.route('/followuser', methods=['POST'])
// def follow_user():
//
// content = request.get_json()
// print('CONTENT:', content, file=sys.stderr)
//
// if request.method == 'POST':
//
// follower = content['follower_id']
// followee = content['followee_id']
//
// cur.execute("""INSERT INTO follow (fk_user_follower_id, fk_user_followee_id)
// VALUES (%s, %s)""", (follower, followee))
//
// conn.commit()
//
// return jsonify(status_code=201)


