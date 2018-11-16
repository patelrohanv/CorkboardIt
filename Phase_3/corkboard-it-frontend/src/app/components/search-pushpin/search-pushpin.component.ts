import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { SearchResults} from '../../models/searchResults';
import {PopularSitesDataSource} from "../popular-sites/popular-sites.component";
import {MatDialogRef} from "@angular/material";
import {UserService} from "../../services/user.service";
import {DataSource} from "@angular/cdk/table";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-search-pushpin',
  templateUrl: './search-pushpin.component.html',
  styleUrls: ['./search-pushpin.component.scss']
})
export class SearchPushpinComponent implements OnInit {

  search_displayedColumns: string[] = ['description', 'corkBoard', 'owner'];
  private search_results_ds: SearchResultsDataSource;

  constructor(public dialogRef: MatDialogRef<SearchPushpinComponent>, private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log("received data");
    console.log(this.data);
    this.search_results_ds = new SearchResultsDataSource(this.userService, this.data.dataKey);
  }
}

export class SearchResultsDataSource extends DataSource<any> {
  private readonly _search_string: string;
  constructor(private userService: UserService, search_string: string) {
    super();
    this._search_string = search_string;
  }
  connect(): Observable<SearchResults[]> {
    console.log('connecting');
    return this.userService.SearchPushpin(this._search_string);
  }
  disconnect() {}
}
