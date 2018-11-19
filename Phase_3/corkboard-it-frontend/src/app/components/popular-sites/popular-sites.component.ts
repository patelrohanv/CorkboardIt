import { Component, OnInit , } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../services/user.service';
import { PopularSite } from '../../models/popularSite';


@Component({
  selector: 'app-popular-sites',
  templateUrl: './popular-sites.component.html',
  styleUrls: ['./popular-sites.component.scss']
})
export class PopularSitesComponent implements OnInit {


  // popular_sites_ds = new PopularSitesDataSource(this.userService);

  popular_sites : PopularSite [] = [];

  tableDS: MatTableDataSource<PopularSite>;

  pop_sites_displayedColumns: string[] = ['site', 'pushpins'];

  constructor(public dialogRef: MatDialogRef<PopularSitesComponent>, private userService: UserService) { }

  ngOnInit() {

    this.get_pop_sites();
  }

  get_pop_sites(){

    this.userService.PopularSites().subscribe((sites) => {

      for(var i = 0; i < sites.length; i++)
      {

        let url = '';

        var raw = sites[i].site.split('/');

        for(var j = 0; j < raw.length; j++){

          if(!raw[j].startsWith('http') && raw[j] != ''){

            url = raw[j];

            break;

          }

        }

        //console.log(url);
        this.popular_sites.push({site: url, pushpins: sites[i].pushpins})

      }

      //console.log(this.popular_sites);

      this.tableDS = new MatTableDataSource(this.popular_sites);

    });



  }

}

// export class PopularSitesDataSource extends DataSource<any> {
//   constructor(private userService: UserService) {
//     super();
//   }
//   connect(): Observable<PopularSite[]> {
//     console.log('connecting');
//
//
//
//     var pop_sites = this.userService.PopularSites();
//
//
//
//     return this.userService.PopularSites();
//   }
//   disconnect() {}
// }
