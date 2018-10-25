import { Component, OnInit , } from '@angular/core';
import {MatTableModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

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
  //  dummy data for now
  popular_sites : PopularSites[] =  [
    {site: 'www.google.com', push_pins: 4},
    {site:'www.gatech.edu', push_pins: 5 },
    {site: 'www.weather.com', push_pins: 2},
    {site : 'www.reddit.com', push_pins:10}
  ];

  pop_sites_displayedColumns: string[] = ['site', 'push_pins'];

  constructor() { }

  ngOnInit() {
  }

  getPopularSites(){
    //  todo make api call to get popular tags
    //  todo load into PopularSites obj
    //  todo display data



  }


}
