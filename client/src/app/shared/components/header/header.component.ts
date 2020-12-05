import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ColorSchemeService } from 'src/app/core/services/color-scheme.service';
import { Router } from '@angular/router';
import { DashboardService } from '../../../core/services/dashboard.service';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public mobile: boolean;
    public btc: string;
    public eth: string;
    public xrp: string;
    public btcOld: string;
    public ethOld: string;
    public xrpOld: string;
    public trend: string;
    public refreshPeriod: number;
    public subscription: Subscription;


    @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

    constructor(
        private dashboardService: DashboardService,
        private colorSchemeService: ColorSchemeService,
        private router: Router
    ) {
        this.mobile = false;
    }

    ngOnInit() {
        if (window.screen.width < 600) {
            // 768px portrait
            this.mobile = true;
        }
    }

    
    redirect(route: string, external: boolean): void {
        if (external) {
            window.open('http://localhost:8082', '_blank');
        } else {
            this.router.navigate([route]);
        }
    }

    changeTheme(): void {
        const scheme = this.colorSchemeService.currentActive();
        if (scheme === 'dark') {
            this.colorSchemeService.update('light');
        } else {
            this.colorSchemeService.update('dark');
        }

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/']);
        });
    }
}

