import { Component, OnInit } from '@angular/core';

export interface CorkBoardStats {
  user: string;
  pub_cb: number;
  pub_pins: number;
  private_cb: number;
  private_pins: number;
}

@Component({
  selector: 'app-corkboard-stats',
  templateUrl: './corkboard-stats.component.html',
  styleUrls: ['./corkboard-stats.component.scss']
})
export class CorkboardStatsComponent implements OnInit {

  cork_board_stats : CorkBoardStats[];

  cb_stats_displayedColumns: string[] = ['user', 'pub_cb', 'pub_pp', 'private_cb', 'private_pp'];

  constructor() { }

  ngOnInit() {
  }

  getCorkBoardStats(){

    //TODO make api call
    this.cork_board_stats = [];

    //TODO color current user red


  }


}
