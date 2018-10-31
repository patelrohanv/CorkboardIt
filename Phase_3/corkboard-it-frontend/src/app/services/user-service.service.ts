import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, ErrorObserver } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserServiceService {
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
    getHomescreen(user_id: string): void {

    }

    // /addCorkboard/<user_id>
    postAddCorkboard(user_id: string): void {

    }

    // /viewCorkboard/<corkboard_id>
    ViewCorkboard(corkboard_id: string): void {

    }

    // /addPushpin/<corkboard_id>
    postAddPushpin(corkboard_id: string): void {

    }

    // /viewPushpin/<pushpin_id>
    ViewPushpin(pushpin_id: string): void {

    }

    // /searchPushpin/<pushpin_id>
    SearchPushpin(pushpin_id: string): void {

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
