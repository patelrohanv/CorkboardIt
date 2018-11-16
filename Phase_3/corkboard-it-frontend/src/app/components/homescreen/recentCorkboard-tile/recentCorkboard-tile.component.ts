import { Component, OnInit, Input } from '@angular/core';
import { RecentCorkBoard } from 'src/app/models/recentCorkBoard';

@Component({
  selector: 'app-recentCorkboard-tile',
  templateUrl: './recentCorkboard-tile.component.html',
  styleUrls: ['./recentCorkboard-tile.component.scss']
})
export class RecentCorkboardTileComponent implements OnInit {
  @Input() corkboard: RecentCorkBoard

  constructor() { }

  ngOnInit() {
  }

}
