import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CorkboardStat } from '../../models/corkboardStat';

// export interface CorkBoardStats {
//   user: string;
//   pub_cb: number;
//   pub_pins: number;
//   private_cb: number;
//   private_pins: number;
// }

@Component({
    selector: 'app-corkboard-stats',
    templateUrl: './corkboard-stats.component.html',
    styleUrls: ['./corkboard-stats.component.scss']
})
export class CorkboardStatsComponent implements OnInit {

    // cork_board_stats : CorkBoardStats[] = [
    //   {user: 'Jane Doe', pub_cb: 4, pub_pins: 5, private_cb: 0, private_pins: 0},
    //   {user: 'John Doe', pub_cb: 5, pub_pins: 6, private_cb: 1, private_pins: 2},
    //   {user: 'Foo Bar', pub_cb: 7, pub_pins: 9, private_cb: 5, private_pins: 10},
    //   ];
    cork_board_stats: CorkboardStat[] = [];

    cb_stats_displayedColumns: string[] = ['user', 'pub_cb', 'pub_pp', 'private_cb', 'private_pp'];

    constructor(private userService: UserService) {
        userService.CorkboardStats().subscribe((data: CorkboardStat) => {
            console.log(data);
            this.cork_board_stats.push(data);
        });
    }

    ngOnInit() {
    }

    getCorkBoardStats() {

        // TODO make api call
        // this.cork_board_stats = [];

        // TODO color current user red


    }


}
