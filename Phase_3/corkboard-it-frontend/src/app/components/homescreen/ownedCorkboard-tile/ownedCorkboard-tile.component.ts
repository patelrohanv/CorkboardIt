import { Component, OnInit, Input } from '@angular/core';
import { Corkboard } from 'src/app/models/corkboard';
import { OwnedCorkBoard } from 'src/app/models/ownedCorkBoard';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { PrivateLoginComponent } from '../private-login/private-login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ownedCorkboard-tile',
  templateUrl: './ownedCorkboard-tile.component.html',
  styleUrls: ['./ownedCorkboard-tile.component.scss']
})
export class OwnedCorkboardTileComponent implements OnInit {
  @Input() corkboard: OwnedCorkBoard

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }

  openCorkBoard(): void {
    if (this.corkboard.visibility == true) {
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
