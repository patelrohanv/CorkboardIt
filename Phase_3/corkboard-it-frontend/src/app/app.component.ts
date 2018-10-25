import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './components/login/login.component';

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

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent)
  }
}
