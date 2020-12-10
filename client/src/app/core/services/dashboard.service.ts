import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    // tslint:disable-next-line: variable-name
    private _routePrefix = `${environment.apiBaseUrl}engine/`;

    constructor(private http: HttpClient) {}

    getActivities(): Observable<any> {
        return this.http.get(`${this._routePrefix}activities`);
    }

    getKPM(): Observable<any> {
        return this.http.get(`${this._routePrefix}activities/kpm`);
    }


    getActivity(payload): Observable<any> {
        return this.http.get(`${this._routePrefix}activity/type`, { params: payload });
    }


    getActivityDistance(payload): Observable<any> {
        return this.http.get(`${this._routePrefix}activity/distance`, { params: payload });
    }


    authenticate(data: any): Observable<any> {
        return this.http.post(`${this._routePrefix}authenticate`, data);
    }
}
