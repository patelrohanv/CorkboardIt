import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, ErrorObserver } from 'rxjs';
import { PopularTag } from '../models/popularTag';
import { PopularSite } from '../models/popularSite';
import { CorkboardStat } from '../models/corkboardStat';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl;
    }

    // /login
    postLogin(user_id: string, password: string): void {

    }

    // /user/
    user(email: string): void {

    }

    // /homescreen/<user_id>
    getHomescreen(user_id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/homescreen/' + user_id;
        return this.http.get<Object>(requestURL);

    }
    // /addCorkboard/<user_id>
    postAddCorkboard(user_id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/addcorkboard/' + user_id;
        return this.http.post<Object>(requestURL, '');

    }

    // /viewCorkboard/<corkboard_id>
    ViewCorkboard(corkboard_id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/viewcorkboard/' + corkboard_id;
        return this.http.get<Object>(requestURL);

    }

    // /addPushpin/<corkboard_id>
    postAddPushpin(corkboard_id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/addpushpin/' + corkboard_id;
        return this.http.post<Object>(requestURL, '');
    }

    // /viewPushpin/<pushpin_id>
    ViewPushpin(pushpin_id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/viewpushpin/' + pushpin_id;
        return this.http.get<Object>(requestURL);

    }

    // /searchPushpin/<pushpin_id>
    SearchPushpin(pushpin_id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/searchpushpin/' + pushpin_id;
        return this.http.get<Object>(requestURL);

    }

    // /popularTags
    PopularTags(): Observable<PopularTag> {
        const requestURL = this.baseUrl + '/populartags';
        return this.http.get<PopularTag>(requestURL);

    }

    // /popularSits
    PopularSites(): Observable<PopularSite> {
        const requestURL = this.baseUrl + '/popularsites';
        return this.http.get<PopularSite>(requestURL);
    }

    // /corkboardStats
    CorkboardStats(): Observable<CorkboardStat> {
        const requestURL = this.baseUrl + '/corkboardstats';
        return this.http.get<CorkboardStat>(requestURL);
    }

}
