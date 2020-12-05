import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { DashboardService } from '../../core/services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

interface Activities {
    start_date_local: string[];
    type: string[];
    distance: number[];
    elapsed_time: number[];
    total_elevation_gain: number[];
}


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public activities: Activities;
    public hide: boolean;
    public email: string;
    public password: string;
    public loggedIn: boolean;

    constructor(private dashboardService: DashboardService, private spinner: NgxSpinnerService) {
        this.activities = {} as Activities;
        this.hide = true;
        this.loggedIn = false;
    }

    ngOnInit() {
    }
    authenticate(): void {
        const payload = {
            email: this.email,
            password: this.password,
        };
        this.dashboardService.authenticate(payload).subscribe(
            (data) => {
                if(data === 'success') {
                    this.loggedIn = true;
                }
                this.getActivities();
            },
            (error) => {}
        );
    }
    getActivities(): void {
        this.dashboardService.getActivities().subscribe(
            (data) => {
                this.activities = data;
                console.log('data', data);
                setTimeout(() => {
                    this.spinner.hide();
                }, 1000);
            },
            (error) => {
                console.log(error);
                this.spinner.hide();
            }
        );
    }

    onLogin(): void {
        this.spinner.show();
        this.authenticate();
    }

    ngOnDestroy() {}
}
