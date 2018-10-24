import { Component, OnInit } from '@angular/core';

export interface PopularSites {
  site: string;
  push_pins: number;
}

@Component({
  selector: 'app-popular-sites',
  templateUrl: './popular-sites.component.html',
  styleUrls: ['./popular-sites.component.scss']
})
export class PopularSitesComponent implements OnInit {

  // vars
  popular_sites : PopularSites[];

  constructor() { }

  ngOnInit() {
  }

  getPopularSites(){
    //  todo make api call to get popular tags
    //  todo load into PopularSites obj
    //  todo display data

    //  dummy data for now
    this.popular_sites =  [
      {site: 'www.google.com', push_pins: 4},
      {site:'www.gatech.edu', push_pins: 5 },
      {site: 'www.weather.com', push_pins: 2},
      {site : 'www.reddit.com', push_pins:10}
    ];

  }


}
