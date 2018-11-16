import { Component, OnInit, Input } from '@angular/core';
import { Corkboard } from 'src/app/models/corkboard';
import { OwnedCorkBoard } from 'src/app/models/ownedCorkBoard';

@Component({
  selector: 'app-ownedCorkboard-tile',
  templateUrl: './ownedCorkboard-tile.component.html',
  styleUrls: ['./ownedCorkboard-tile.component.scss']
})
export class OwnedCorkboardTileComponent implements OnInit {
  @Input() corkboard: OwnedCorkBoard

  constructor() { }

  ngOnInit() {
  }

}
