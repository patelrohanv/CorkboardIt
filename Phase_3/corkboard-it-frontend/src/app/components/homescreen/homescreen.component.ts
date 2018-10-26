import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss']
})
export class HomescreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  getPopularSites(): void {
    return null;
  }

  getPopularTags(): void {
    return null;
  }

  getCorkBoardStats(): void {
    return null;
  }


}
