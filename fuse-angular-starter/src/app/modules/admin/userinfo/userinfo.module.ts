import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { UserinfoComponent } from './userinfo.component';




export const UserinfoRoutes: Route[] = [
    {
        path     : '',
        component: UserinfoComponent
    }
];



@NgModule({
    declarations: [
        UserinfoComponent
    
    ],
    imports: [
        RouterModule.forChild(UserinfoRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatSortModule,
        MatDialogModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatMenuModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMomentDateModule,
        MatNativeDateModule
        
    ]
})
export class UserInfoModule { }
