import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { VisitorTableComponent } from './visitortable.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { addvisitorComponent } from './addvisitor/addvisitor.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ViewVisitorComponent } from './viewvisitor/viewvisitor.component';
import { UpdateVisitorComponent } from './updatevisitor/updatevisitor.component';
import { AppointVisitorComponent } from './appointvisitor/appointvisitor.component';



export const VisitorTableRoutes: Route[] = [
    {
        path     : '',
        component: VisitorTableComponent
    }
];



@NgModule({
    declarations: [
        VisitorTableComponent,
        addvisitorComponent,
        ViewVisitorComponent,
        UpdateVisitorComponent,
        AppointVisitorComponent
    ],
    imports: [
        RouterModule.forChild(VisitorTableRoutes),
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
export class VisitorTableModule { }
