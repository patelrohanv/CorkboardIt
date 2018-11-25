import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CorkboardStat } from '../../models/corkboardStat';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-corkboard-stats',
    templateUrl: './corkboard-stats.component.html',
    styleUrls: ['./corkboard-stats.component.scss']
})
export class CorkboardStatsComponent implements OnInit {


    dataSource = new CorkboardStatsDataSource(this.userService);

    cb_stats_displayedColumns: string[] = ['user_name', 'public_cb', 'pub_pushpins', 'private_cb', 'private_pushpins'];
    
    u: string;

    constructor(public dialogRef: MatDialogRef<CorkboardStatsComponent>, private userService: UserService,
        @Inject(MAT_DIALOG_DATA) public data: User) { 
            this.u = data.first_name + "_" + data.last_name;
        }

    ngOnInit() {
        document.getElementById(this.u).style.color = 'red';
    }
    
    logRow(row): void {
        console.log(row);
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

