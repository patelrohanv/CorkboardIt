import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, ErrorObserver } from 'rxjs';
import { PopularTag } from '../models/popularTag';
import { PopularSite } from '../models/popularSite';
import { CorkboardStat } from '../models/corkboardStat';
import {SearchResults} from "../models/searchResults";
import {RequestOptions} from "@angular/http"

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl;
    }

    // /logi
    postLogin(user_id: string, password: string): Observable<Object> {
        const requestURL = this.baseUrl + '/login';
        const user_login = {'user_id': user_id, 'pin': password};
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
        }
        return this.http.post<Object>(requestURL, user_login, httpOptions);
    }

    // /user/
    getUser_ID(id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/user/?id=' + id
        return this.http.get<Object>(requestURL);
    }

    // /user/
    getUser_Email(email: string): Observable<Object> {
        const requestURL = this.baseUrl + '/user/?email=' + email
        return this.http.get<Object>(requestURL);
    }

    // /homescreen/<user_id>
    getHomescreenOwned(user_id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/homescreen_owned/' + user_id;
        return this.http.get<Object>(requestURL);

    }

    getHomescreenRecent(user_id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/homescreen_recent/' + user_id;
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

    // /viewPushpin/<corkboard_id>/<pushpin_id>
    ViewPushpin(corkboard_id: string, pushpin_id: string, ): Observable<Object[]> {
        const requestURL = this.baseUrl + '/viewpushpin/' + corkboard_id +'/' + pushpin_id;
        console.log(requestURL);
        return this.http.get<Object[]>(requestURL);
    }

    // '/searchpushpin/<search_text>)'
    SearchPushpin(search_text: string): Observable<SearchResults[]> {
        const requestURL = this.baseUrl + '/searchpushpin/' + search_text;
        return this.http.get<SearchResults[]>(requestURL);

    }

    // /popularTags
    PopularTags(): Observable<PopularTag[]> {
        const requestURL = this.baseUrl + '/populartags';
        return this.http.get<PopularTag[]>(requestURL);

    }

    // /popularSits
    PopularSites(): Observable<PopularSite[]> {
        const requestURL = this.baseUrl + '/popularsites';
        return this.http.get<PopularSite[]>(requestURL);
    }

    // /corkboardStats
    CorkboardStats(): Observable<CorkboardStat[]> {
        const requestURL = this.baseUrl + '/corkboardstats';
        return this.http.get<CorkboardStat[]>(requestURL);
    }

}
