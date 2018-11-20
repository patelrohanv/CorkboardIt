import { Component, OnInit, Input } from '@angular/core';
import { RecentCorkBoard } from 'src/app/models/recentCorkBoard';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { PrivateLoginComponent } from '../private-login/private-login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recentCorkboard-tile',
  templateUrl: './recentCorkboard-tile.component.html',
  styleUrls: ['./recentCorkboard-tile.component.scss']
})
export class RecentCorkboardTileComponent implements OnInit {
  @Input() corkboard: RecentCorkBoard

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }

  openCorkBoard(): void {
    if (this.corkboard.visibility == false) {
      this.openLoginDialog()
      return;
    } else {
      this.router.navigate(['/viewcorkboard/', this.corkboard.corkboard_id]);
    }
  }

  openLoginDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: this.corkboard.corkboard_id,
      title: this.corkboard.title
    };

    const dialogRef = this.dialog.open(PrivateLoginComponent, dialogConfig);
  }

}
