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
                        fontColor: '#FFFFFF'
                    },
                },
            ],
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        legend: {
            display: true,
            labels: {
                fontColor: '#FFFFFF'
            }
        },

        tooltips: {
            mode: 'index',
            intersect: true,
        },
    };
    public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType = 'line';
    public barChartData = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'DI+', fill: false },
        { data: [48, 48, 23, 14, 46, 24, 50], label: 'DI-', fill: false },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'ADX', fill: false },
    ];


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

                this.barChartLabels = [...this.activities.start_date_local];
                this.barChartData = [
                    { data: this.activities.distance, label: 'Distance', fill: false },
                    { data: this.activities.elapsed_time, label: 'Time', fill: false },
                    { data: this.activities.total_elevation_gain, label: 'Elevation Gain', fill: false },
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
