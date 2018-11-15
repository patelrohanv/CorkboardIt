import { Component, OnInit , } from '@angular/core';
import {MatTableModule} from '@angular/material';
import {CdkTableModule, DataSource} from '@angular/cdk/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../services/user.service';
import { PopularSite } from '../../models/popularSite';
import {Observable} from "rxjs";

@Component({
  selector: 'app-popular-sites',
  templateUrl: './popular-sites.component.html',
  styleUrls: ['./popular-sites.component.scss']
})
export class PopularSitesComponent implements OnInit {


  popular_sites_ds = new PopularSitesDataSource(this.userService);

  pop_sites_displayedColumns: string[] = ['site', 'pushpins'];

  constructor(public dialogRef: MatDialogRef<PopularSitesComponent>, private userService: UserService) { }

  ngOnInit() {
  }
}

export class PopularSitesDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super();
  }
  connect(): Observable<PopularSite[]> {
    console.log('connecting');
    return this.userService.PopularSites();
  }
  disconnect() {}
}
