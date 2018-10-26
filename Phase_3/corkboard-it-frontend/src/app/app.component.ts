import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'corkboard-it-frontend';

  constructor(public dialog: MatDialog) {

  }
  ngOnInit() {
  }
}
