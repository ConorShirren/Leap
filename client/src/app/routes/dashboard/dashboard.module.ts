import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ChartsModule } from 'ng2-charts';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    ChartsModule
  ],
  exports: [
    DashboardComponent, 
  ],
  providers: [
    DashboardService, 
  ]
})
export class DashboardModule { }
