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

  popular_tags : PopularTags[] = [
    {tag: "foo", pushpins: 5, unique_cb:3},
    {tag: "bar", pushpins: 10, unique_cb:5}
  ];

  pop_tags_displayedColumns: string[] = ['tag', 'pushpins', 'unique_cb'];

  constructor() { }

  ngOnInit() {
  }

  getPopularTags(){

    //TODO make api call to get popular tags

  }


}
