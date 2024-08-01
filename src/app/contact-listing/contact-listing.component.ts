import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contact-listing',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSortModule, MatTooltipModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  templateUrl: './contact-listing.component.html',
  styleUrls: ['./contact-listing.component.scss']
})
export class ContactListingComponent {
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'email', 'address', 'phoneNumber', 'city', 'state', 'country', 'postalCode', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatSort) sort!: MatSort;
  contactID: number = 0;

  constructor(private _router: Router, private contactService: ContactService, public dialog: MatDialog,private toastr: ToastrService) {
    this.getcontactlists();
  }

  ngOnInit() {
    this.getcontactlists();
  }

  getcontactlists() {
    this.contactService.getContacts().subscribe((response: any) => {     
      this.dataSource.data = response.result;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  clickAdd() {
    let reqdata = {
      contactID: 0,
      flag: 'Add'
    };
    this._router.navigate(['/contactadd'], { queryParams: reqdata });
  }

  clickEdit(element: any) {
    let reqdata = {
      contactID: element.contactID,
      flag: 'Edit',
      firstName: element.firstName,
      lastName: element.lastName,
      email: element.email,
      phoneNumber: element.phoneNumber,
      address: element.address,
      country: element.country,
      state: element.state,
      city: element.city,
      postalCode: element.postalCode
    };
    this._router.navigate(['/contactadd'], { queryParams: reqdata });
  }

  clickDelete(element: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactService.deleteContact(element.contactID).subscribe(response => {
          if (response.status=='SUCCESS') {
            this.toastr.success(response.message);
            this.getcontactlists();
          }
        });
      }
    });
  }
}
