import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http/http';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: '',
                component: DashboardComponent,
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), HttpClientModule],
    providers: [],
    exports: [RouterModule],
})
export class AppRoutingModule {}
