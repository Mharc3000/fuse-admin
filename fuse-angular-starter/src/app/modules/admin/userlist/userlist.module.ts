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
import { UserlistComponent } from './userlist.component';
import { adduserComponent } from './adduser/adduser.component';
import { AddUserAccountComponent } from './addaccount/addaccount.component';
import { UpdateUserComponent } from './updateuser/updateuser.component';
import { UpdateUserAccountComponent } from './updateaccount/updateaccount.component';



export const UserTableRoutes: Route[] = [
    {
        path     : '',
        component: UserlistComponent
    }
];



@NgModule({
    declarations: [
        UserlistComponent,
        adduserComponent,
        AddUserAccountComponent,
        UpdateUserComponent,
        UpdateUserAccountComponent
    
    ],
    imports: [
        RouterModule.forChild(UserTableRoutes),
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
export class UserlistModule { }
