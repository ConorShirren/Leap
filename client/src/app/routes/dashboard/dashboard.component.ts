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
    max_heartrate: number[];
}

interface KeyPerformanceMetrics {
    latest_run: any;
    pr2k: any;
    pr5k: any;
    pr8k: any;
    pr10k: any;
    breakdown: any;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public activities: Activities;
    public activity: Activities;
    public distanceActivity: Activities;
    public kpm: KeyPerformanceMetrics;
    public pr2k: any;
    public pr5k: any;
    public pr10k: any;
    public latestRun: any;
    public hide: boolean;
    public email: string;
    public password: string;
    public loggedIn: boolean;
    public barChartType = 'line';
    public pieChartType = 'pie';
    public barChartLabels = [];
    public distanceChartLabels = [];
    public pieChartLabels = [];
    public barChartData = [];
    public distanceChartData = [];
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
                    type: 'time',
                    ticks: {
                        display: true, //this will remove only the label
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
        this.distanceActivity = {} as Activities;
        this.kpm = {} as KeyPerformanceMetrics;
        this.hide = true;
        this.loggedIn = false;
    }

    ngOnInit() {}

    authenticate(): void {
        const payload = {
            email: 'cshirren@gmail.com', //this.email,
            password: '2p6BbDeyzidxAWahNUdh', //this.password,
        };
        this.dashboardService.authenticate(payload).subscribe(
            (data) => {
                if (data === 'success') {
                    this.getActivity('Run');
                    this.getKPM();
                    this.getDistance("5k");
                }
            },
            (error) => {}
        );
    }
    getActivities(): void {
        this.dashboardService.getActivities().subscribe(
            (data) => {
                this.activities = data;

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
                console.log(this.activity);
                this.barChartLabels = [...this.activity.start_date_local];
                this.barChartData = [
                    { data: this.activity.distance, label: 'Distance', fill: false },
                    { data: this.activity.average_speed, label: 'Avg Speed', fill: false },
                    { data: this.activity.average_heartrate, label: 'Max HR', fill: false },
                    { data: this.activity.max_heartrate, label: 'Avg HR', fill: false },
                    { data: this.activity.total_elevation_gain, label: 'El. Gain', fill: false },
                ];
                this.activityLabels = [...this.activity.start_date_local];
                this.activityData = [
                    // { data: this.activity.distance, label: 'Distance', fill: false },
                    { data: this.activity.average_speed, label: 'Pace', fill: false },
                    // { data: this.activities.total_elevation_gain, label: 'Elevation Gain', fill: false },
                ];
                this.loggedIn = true;
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

    getDistance(distance: string): void {
        const payload = {
            distance
        }
        this.dashboardService.getActivityDistance(payload).subscribe(
            (data) => {
                this.distanceActivity = data;
                this.distanceChartLabels = [...this.distanceActivity.start_date_local];
                this.distanceChartData = [
                    { data: this.distanceActivity.average_speed, label: 'Avg Speed', fill: false },
                    // { data: this.distanceActivity.average_heartrate, label: 'Max HR', fill: false },
                    // { data: this.distanceActivity.max_heartrate, label: 'Avg HR', fill: false },
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

    getKPM(): void {
        this.dashboardService.getKPM().subscribe(
            (data) => {
                this.kpm = data;
                console.log(this.kpm);
                this.pr2k = this.kpm.pr2k;
                this.pr5k = this.kpm.pr5k;
                this.pr10k = this.kpm.pr10k;
                this.latestRun = this.kpm.latest_run;
                this.pieChartData = [{ data: this.kpm.breakdown.counts, label: 'Activities' }];
                this.pieChartLabels = this.kpm.breakdown.activity;
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

    floor(time: number): number {
        return Math.floor(time / 60);
    }

    pace(speed: number): string {
        var pace = ((1 / speed) * 1000) / 60;
        var min = Math.floor(pace);
        var sec = Math.floor((pace * 60) % 60);
        return min + ':' + sec;
    }

    ngOnDestroy() {}
}
