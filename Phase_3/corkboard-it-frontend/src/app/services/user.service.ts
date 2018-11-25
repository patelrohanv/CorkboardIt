import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, ErrorObserver } from 'rxjs';
import { PopularTag } from '../models/popularTag';
import { PopularSite } from '../models/popularSite';
import { CorkboardStat } from '../models/corkboardStat';
import { SearchResults } from "../models/searchResults";
import { RequestOptions } from "@angular/http"
import { Corkboard } from '../models/corkboard';
import { Pushpin } from '../models/pushpin';

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
        const user_login = { 'user_id': user_id, 'pin': password };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }
        return this.http.post<Object>(requestURL, user_login, httpOptions);
    }


    // login for private corkboard
    postLoginPrivateCorkBoard(corkboard_id: string, password: string): Observable<Object> {
        const requestURL = this.baseUrl + '/private_login/' + corkboard_id;
        const user_login = { 'password': password };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }

        return this.http.post<Object>(requestURL, user_login, httpOptions);
    }

    // /user/
    getUser_ID(id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/user/?id=' + id;
        return this.http.get<Object>(requestURL);
    }

    // /user/
    getUser_Email(email: string): Observable<Object> {
        const requestURL = this.baseUrl + '/user/?email=' + email;
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
    postAddCorkboard(cb: Corkboard): Observable<Object> {
        const requestURL = this.baseUrl + '/addcorkboard';
        return this.http.post<Object>(requestURL, cb);

    }

    // /viewCorkboard/<corkboard_id>
    getViewCorkboard(corkboard_id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/viewcorkboard/' + corkboard_id;
        return this.http.get<Object>(requestURL);

    }

    // /addPushpin/<corkboard_id>
    postAddPushpin(pushpin: Pushpin): Observable<Object> {
        const requestURL = this.baseUrl + '/addpushpin';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }
        return this.http.post<Object>(requestURL, pushpin, httpOptions);
    }

    // /viewPushpin/<corkboard_id>/<pushpin_id>
    ViewPushpin(pushpin_id: string): Observable<Object[]> {
        const requestURL = this.baseUrl + '/viewpushpin/' + pushpin_id;
        return this.http.get<Object[]>(requestURL);
    }

    //postcomment
    postComment(pushpin_id: string, user_id: string, text: string, date_time: string): Observable<Object> {
        const requestURL = this.baseUrl + '/postcomment';
        const body = {
            'pushpin_id': pushpin_id,
            'user_id': user_id,
            'text': text,
            'date_time': date_time
        };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.post<Object>(requestURL, body, httpOptions);
    }

    LikePushpin(pushpin_id: string, user_id: string): Observable<Object> {

        const requestURL = this.baseUrl + '/likepushpin';
        const body = {
            'pushpin_id': pushpin_id,
            'user_id': user_id
        };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.post<Object>(requestURL, body, httpOptions);
    }

    UnikePushpin(pushpin_id: string, user_id: string): Observable<Object> {

        const requestURL = this.baseUrl + '/unlikepushpin';
        const body = {
            'pushpin_id': pushpin_id,
            'user_id': user_id
        };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.post<Object>(requestURL, body, httpOptions);
    }
    
    GetWatch(current_corkboard_id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/corkboardwatchers/' + current_corkboard_id;
        return this.http.get(requestURL);
    }

    PostWatch(current_user_id: string, corkboard_id: string): Observable<Object> {
        console.log('posting watch', current_user_id)
        const requestURL = this.baseUrl + '/watchcorkboard';
        const body = {
            'user_id': current_user_id,
            'corkboard_id': corkboard_id
        };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.post<Object>(requestURL, body, httpOptions);
    }

    // TODO: Need to test this
    PostFollow(current_user_id: string, follow_user_id: string): Observable<Object> {

        const requestURL = this.baseUrl + '/followuser';
        const body = {
            'follower_id': current_user_id,
            'followee_id': follow_user_id
        };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.post<Object>(requestURL, body, httpOptions);
    }

    // TODO: need this call
    GetFollow(current_user_id: string): Observable<Object[]> {
        const requestURL = this.baseUrl + '/getfollowers/' + current_user_id;

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
