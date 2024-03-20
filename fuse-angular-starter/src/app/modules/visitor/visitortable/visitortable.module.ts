import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';

import { VisitorTableComponent } from './visitortable.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';


export const VisitorTableRoutes: Route[] = [
    {
        path     : '',
        component: VisitorTableComponent
    }
];



@NgModule({
    declarations: [
        VisitorTableComponent
    ],
    imports: [
        RouterModule.forChild(VisitorTableRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule
    ]
})
export class VisitorTableModule { }
