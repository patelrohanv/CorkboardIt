import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { SearchResults} from '../../models/searchResults';

@Component({
  selector: 'app-search-pushpin',
  templateUrl: './search-pushpin.component.html',
  styleUrls: ['./search-pushpin.component.scss']
})
export class SearchPushpinComponent implements OnInit {

  // search_text: String;
  // searchFormControl = new FormControl('', [Validators.required]);]
  search_results: SearchResults[] = [];
  search_displayedColumns: string[] = ['PushPin Description', 'CorkBoard', 'Owner'];

  constructor() { }

  ngOnInit() {
  }

  searchForPushpins(search_text) {

    // TODO make api call with search text

  }

}
