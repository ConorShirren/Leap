import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { DashboardService } from '../../core/services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CommonModule } from '@angular/common';

interface Activities {
    start_date_local: string[];
    type: string[];
    distance: number[];
    elapsed_time: number[];
    average_speed: number[];
    kudos_count: number[];
    total_elevation_gain: number[];
    average_heartrate: number[];
    max_heartrate: number [];
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public activities: Activities;
    public activity: Activities;
    public hide: boolean;
    public email: string;
    public password: string;
    public loggedIn: boolean;
    public barChartType = 'line';
    public pieChartType = 'pie';
    public barChartLabels = [];
    public pieChartLabels = [];
    public barChartData = [];
    public pieChartData = [];
    public activityLabels = [];
    public activityData = [];
    //Chart.js
    public barChartOptions = {
        scaleShowVerticalLines: true,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
                    ticks: {
                        display: false, //this will remove only the label
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        fontColor: '#FFFFFF',
                    },
                },
            ],
        },
        // elements: {
        //     point: {
        //         radius: 0,
        //     },
        // },
        legend: {
            display: true,
            labels: {
                fontColor: '#FFFFFF',
            },
        },

        tooltips: {
            mode: 'index',
            intersect: true,
        },
    };

    constructor(private dashboardService: DashboardService, private spinner: NgxSpinnerService) {
        this.activities = {} as Activities;
        this.activity = {} as Activities;
        this.hide = true;
        this.loggedIn = false;
    }

    ngOnInit() {}
    authenticate(): void {
        const payload = {
            email: this.email,
            password: this.password,
        };
        this.dashboardService.authenticate(payload).subscribe(
            (data) => {
                if (data === 'success') {
                    this.loggedIn = true;
                }
                this.getActivities();
                this.getActivity('Run');
            },
            (error) => {}
        );
    }
    getActivities(): void {
        this.dashboardService.getActivities().subscribe(
            (data) => {
                this.activities = data;
                this.pieChartData = [{ data: [25, 18, 3], label: 'Activities' }];
                this.pieChartLabels = ['Walk', 'Run', 'Cycle'];

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

    getActivity(type): void {
        const payload = {
            Activity: type,
        };
        this.dashboardService.getActivity(payload).subscribe(
            (data) => {
                this.activity = data;
                this.barChartLabels = [...this.activity.start_date_local];
                this.barChartData = [
                    { data: this.activity.distance, label: 'Distance', fill: false }
                ];
                this.activityLabels = [...this.activity.start_date_local];
                this.activityData = [
                    // { data: this.activity.distance, label: 'Distance', fill: false },
                    { data: this.activity.average_speed, label: 'Pace', fill: false },
                    // { data: this.activities.total_elevation_gain, label: 'Elevation Gain', fill: false },
                ];
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
