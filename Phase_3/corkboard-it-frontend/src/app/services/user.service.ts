import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, ErrorObserver } from 'rxjs';

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
        const requestURL = this.baseUrl + '/homescreen/' + user_id
        return this.http.get<Object>(requestURL)

    }
    // /addCorkboard/<user_id>
    postAddCorkboard(user_id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/addCorkboard/' + user_id
        return this.http.post<Object>(requestURL, '')

    }

    // /viewCorkboard/<corkboard_id>
    ViewCorkboard(corkboard_id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/viewCorkboard/' + corkboard_id
        return this.http.get<Object>(requestURL)

    }

    // /addPushpin/<corkboard_id>
    postAddPushpin(corkboard_id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/addPushpin/' + corkboard_id
        return this.http.post<Object>(requestURL, '')
 
    }

    // /viewPushpin/<pushpin_id>
    ViewPushpin(pushpin_id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/viewPushpin/' + pushpin_id
        return this.http.get<Object>(requestURL)

    }

    // /searchPushpin/<pushpin_id>
    SearchPushpin(pushpin_id: string): Observable<Object> {
        const requestURL = this.baseUrl + '/searchPushpin/' + pushpin_id
        return this.http.get<Object>(requestURL)

    }

    // /popularTags
    PopularTags(): Observable<Object> {
        const requestURL = this.baseUrl + '/popularTags'
        return this.http.get<Object>(requestURL)

    }

    // /popularSits
    PopularSites(): Observable<Object> {
        const requestURL = this.baseUrl + '/popularSits'
        return this.http.get<Object>(requestURL)
    }

    // /corkboardStats
    CorkboardStats(): Observable<Object> {
        const requestURL = this.baseUrl + '/corkboardStats'
        return this.http.get<Object>(requestURL)
    }

}
