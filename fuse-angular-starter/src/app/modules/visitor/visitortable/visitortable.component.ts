import { AfterViewInit, ChangeDetectorRef , Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { addvisitorComponent } from './addvisitor/addvisitor.component';
import { VisitorService } from './visitortable.service';
import { ViewVisitorComponent } from './viewvisitor/viewvisitor.component';
import Swal from 'sweetalert2';
import { UpdateVisitorComponent } from './updatevisitor/updatevisitor.component';
import { AppointVisitorComponent } from './appointvisitor/appointvisitor.component';

export interface Visitor {
  id: number;
  fname: string;
  mname: string;
  lname: string;
  email: string;
  purpose: string;
  visitation_Sched: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
}

@Component({
  selector: 'app-visitor-table',
  templateUrl: './visitortable.component.html',
  styleUrls: ['./visitortable.component.css']
})
export class VisitorTableComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Visitor>;
  displayedColumns: string[] = ['id', 'Full Name', 'email', 'purpose', 'visitation_Sched', 'checkInDate', 'checkInTime', 'checkOutDate', 'checkOutTime' ,'Actions'];
  isLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private visitorService: VisitorService, private cdr: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource<Visitor>();
  }

  Visitors: Visitor[] = [];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadVisitors();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addvisitor(): void {
    const dialogRef = this.dialog.open(addvisitorComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Compose dialog was closed!');
    });
  }


 
  appointvisitor(): void {
    const dialogRef = this.dialog.open(AppointVisitorComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Compose dialog was closed!');
    });
  }

  viewVisitor(visitor): void {
    if (visitor && visitor.id) {
      console.log('Selected ID:', visitor.id); // Log the selected ID
      const dialogRef = this.dialog.open(ViewVisitorComponent, {
        data: visitor
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('Compose dialog was closed!');
      });
    } else {
      console.error('Invalid visitor object or missing id property');
    }
  }

  UpdateVisitor(visitor): void {
    if (visitor && visitor.id) {
      console.log('Selected ID:', visitor.id); // Log the selected ID
      const dialogRef = this.dialog.open(UpdateVisitorComponent, {
        data: visitor
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('Compose dialog was closed!');
      });
    } else {
      console.error('Invalid visitor object or missing id property');
    }
  }

  loadVisitors(): void {
    this.isLoading = true;
    this.visitorService.getAllVisitors().subscribe((res: Visitor[]) => {
      this.dataSource.data = res;
      this.isLoading = false;
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }


  deleteVisitor(visitor: Visitor): void  {
    const id = visitor.id;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.visitorService.deleteVisitor(id).subscribe(
          () => {
            this.Visitors = this.Visitors.filter(v => v.id !== id); // Corrected property name
            Swal.fire(
              'Deleted!',
              'Your visitor has been deleted.',
              'success'
            ).then(() => {
              window.location.reload(); // Reload window after deletion
            });
          },
          error => {
            console.error('Error deleting visitor:', error);
            Swal.fire(
              'Error!',
              'Failed to delete visitor. Please try again later.',
              'error'
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your visitor is safe :)',
          'error'
        );
      }
    });
 }


 CheckIn(id:any): void  {  
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const options: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Manila', hour12: true, hour: 'numeric', minute: 'numeric' };
  const formattedTime = currentDate.toLocaleTimeString('en-US', options);

  const CheckIn = {
    id:           id.id,
    fname:        id.fname,
    mname:        id.mname,
    lname:        id.lname,
    email:        id.email,
    purpose:      id.purpose,
    visitation_Sched: id.visitation_Sched,
    checkInDate:  formattedDate,
    checkInTime:  formattedTime,

  }
  Swal.fire({
    title: 'Confirm Check-In',
    text: 'Are you sure you want to check In this visitor?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, check In!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.visitorService.updateVisitor(id.id, CheckIn).subscribe(
        () => {
          Swal.fire(
            'Checked In!',
            'Visitor has been checked In successfully.',
            'success'
          ).then(() => {
            window.location.reload();
          });
        },
        error => {
          console.error('Error checking In visitor:', error);
          Swal.fire(
            'Error!',
            'Failed to check out visitor. Please try again later.',
            'error'
          );
        }
      );
    }
  });
  console.log(id)
}


CheckOut(id:any): void {  
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const options: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Manila', hour12: true, hour: 'numeric', minute: 'numeric' };
  const formattedTime = currentDate.toLocaleTimeString('en-US', options);

  const checkOut = {
    id:           id.id,
    fname:        id.fname,
    mname:        id.mname,
    lname:        id.lname,
    email:        id.email,
    purpose:      id.purpose,
    visitation_Sched: id.visitation_Sched,
    checkInDate:  id.checkInDate,
    checkInTime:  id.checkInTime,
    checkOutDate: formattedDate,
    checkOutTime: formattedTime

  }
  Swal.fire({
    title: 'Confirm Check-Out',
    text: 'Are you sure you want to check out this visitor?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, check out!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.visitorService.updateVisitor(id.id, checkOut).subscribe(
        () => {
          Swal.fire(
            'Checked Out!',
            'Visitor has been checked out successfully.',
            'success'
          ).then(() => {
            window.location.reload();
          });
        },
        error => {
          console.error('Error checking out visitor:', error);
          Swal.fire(
            'Error!',
            'Failed to check out visitor. Please try again later.',
            'error'
          );
        }
      );
    }
  });
  console.log(id)
}





}
