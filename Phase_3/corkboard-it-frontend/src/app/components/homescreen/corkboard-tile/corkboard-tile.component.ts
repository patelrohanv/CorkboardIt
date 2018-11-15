import { Component, OnInit, Input } from '@angular/core';
import { Corkboard } from 'src/app/models/corkboard';

@Component({
  selector: 'app-corkboard-tile',
  templateUrl: './corkboard-tile.component.html',
  styleUrls: ['./corkboard-tile.component.scss']
})
export class CorkboardTileComponent implements OnInit {
  @Input() corkboard: Corkboard

  constructor() { }

  ngOnInit() {
  }

}
