import { AfterViewInit, ChangeDetectorRef , Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserlistService } from './userlist.service';
import { adduserComponent } from './adduser/adduser.component';
import { AddUserAccountComponent } from './addaccount/addaccount.component';
import Swal from 'sweetalert2';
import { UpdateUserComponent } from './updateuser/updateuser.component';
import { UpdateUserAccountComponent } from './updateaccount/updateaccount.component';

// Generated by https://quicktype.io

export interface Userlist {
  id:          number;
  fname:       string;
  mname:       string;
  lname:       string;
  position:    string;
  useraccount: Useraccount;
  isActive:    boolean;
}

export interface Useraccount {
  id:         number;
  username:   string;
  email:      string;
  password:   string;
  agreeTerms: boolean;
  userInfoID: number;
}



@Component({
  selector: 'app-userlist-table',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Userlist>;
  displayedColumns: string[] = ['Id','Image', 'Full Name', 'Position', 'User Status', 'Actions'];
  isLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private UserService: UserlistService, private cdr: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource<Userlist>();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadUser();
  }

  Userlist: Userlist[] = [];





  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  loadUser(): void {
    this.isLoading = true;
    this.UserService.getAllUser().subscribe((res: Userlist[]) => {
    this.dataSource.data = res;
    this.isLoading = false;
    this.cdr.detectChanges(); // Manually trigger change detection
    });


    console.log(this.UserService.getAllUser())
  }

  adduser(): void {
    const dialogRef = this.dialog.open(adduserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Compose dialog was closed!');
    });
  }

  AddAccount(user: any): void {
    const dialogRef = this.dialog.open(AddUserAccountComponent,{
      data: user
    });
    console.log(user.id)
    dialogRef.afterClosed().subscribe(result => {
      console.log('Compose dialog was closed!');
    });
  }



  UpdateUser(user): void {
    if (user && user.id) {
      console.log('Selected ID:', user.id); // Log the selected ID
      const dialogRef = this.dialog.open(UpdateUserComponent, {
        data: user
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('Compose dialog was closed!');
      });
    } else {
      console.error('Invalid visitor object or missing id property');
    }
  }


  UpdateAccount(user): void {
    if (user && user.id) {
      console.log('Selected ID:', user.id); // Log the selected ID
      const dialogRef = this.dialog.open(UpdateUserAccountComponent, {
        data: user
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('Compose dialog was closed!');
      });
    } else {
      console.error('Invalid visitor object or missing id property');
    }
  }





  deactivateDeleteUser(Userlist: Userlist): void  {
    const id = Userlist.id;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Deactivate/Delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.UserService.DeactivateDeleteUser(id).subscribe(
          () => {
            this.Userlist = this.Userlist.filter(v => v.id !== id); // Corrected property name
            Swal.fire(
              'User Account Deactivated!',
              'Your user account  has been deleted/deactivated.',
              'success'
            ).then(() => {
              window.location.reload(); // Reload window after deletion
            });
          },
          error => {
            console.error('Error deleting user:', error);
            Swal.fire(
              'Error!',
              'Failed to delete user. Please try again later.',
              'error'
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your user is safe :)',
          'error'
        );
      }
    });
 }



}
