import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CorkboardStat } from '../../models/corkboardStat';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-corkboard-stats',
    templateUrl: './corkboard-stats.component.html',
    styleUrls: ['./corkboard-stats.component.scss']
})
export class CorkboardStatsComponent implements OnInit {


    dataSource = new CorkboardStatsDataSource(this.userService);

    cb_stats_displayedColumns: string[] = ['user_name', 'public_cb', 'pub_pushpins', 'private_cb', 'private_pushpins'];

    constructor(public dialogRef: MatDialogRef<CorkboardStatsComponent>, private userService: UserService) { }

    ngOnInit() {
    }
}

export class CorkboardStatsDataSource extends DataSource<any> {
    constructor(private userService: UserService) {
        super();
    }
    connect(): Observable<CorkboardStat[]> {
        console.log('connecting');
        return this.userService.CorkboardStats();
    }
    disconnect() { }
}

