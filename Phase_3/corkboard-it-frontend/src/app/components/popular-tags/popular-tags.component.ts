import { Component, OnInit } from '@angular/core';

export interface PopularTags {
  tag: string;
  pushpins: number;
  unique_cb: number;
}

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss']
})
export class PopularTagsComponent implements OnInit {

  popular_tags : PopularTags[];
  constructor() { }

  ngOnInit() {
  }

  getPopularTags(){

    //TODO make api call to get popular tags
    this.popular_tags = [];


  }


}
