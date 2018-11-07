import { Component, OnInit , } from '@angular/core';
import {MatTableModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../services/user.service';
import { PopularSite } from '../../models/popularSite';

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
  // popular_sites: PopularSites[] =  [
  //   {site: 'www.google.com', push_pins: 4},
  //   {site: 'www.gatech.edu', push_pins: 5 },
  //   {site: 'www.weather.com', push_pins: 2},
  //   {site : 'www.reddit.com', push_pins: 10}
  // ];

  popular_sites: PopularSite[] = [];

  pop_sites_displayedColumns: string[] = ['site', 'push_pins'];

    constructor(public dialogRef: MatDialogRef<PopularSitesComponent>, private userService: UserService) {
      userService.PopularSites().subscribe((data) => {
          console.log(data);
          this.popular_sites.push(data);
      });
  }

  ngOnInit() {
  }

  getPopularSites() {
    //  todo make api call to get popular tags
    //  todo load into PopularSites obj
    //  todo display data



  }


}
