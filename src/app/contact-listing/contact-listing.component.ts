import { Component, ViewChild } from '@angular/core';
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


@Component({
  selector: 'app-contact-listing',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSortModule,MatTooltipModule],
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

  //STATIC VALUE FOR TESTING//

  // private staticData = [
  //   {
  //     contactID: 1,
  //     firstName: "John",
  //     lastName: "Doe",
  //     email: "john.doe@example.com",
  //     phoneNumber: "+1234567890",
  //     address: "123 Elm Street",
  //     country: "India",
  //     state: "TamilNadu",
  //     city: "Chennai",
  //     postalCode: "12345"
  //   },
  //   {
  //     contactID: 2,
  //     firstName: "Jane",
  //     lastName: "Smith",
  //     email: "jane.smith@example.com",
  //     phoneNumber: "+0987654321",
  //     address: "456 Oak Avenue", 
  //     country: "India",
  //     state: "TamilNadu",
  //     city: "Chennai",
  //     postalCode: "67890"
  //   }
  // ];

  constructor(private _router: Router, private contactService: ContactService, public dialog: MatDialog) {

  }

  ngOnInit() {
    //this.dataSource.data = this.staticData;

    this.contactService.getContacts().subscribe((response: any) => {
      console.log(response);
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
          if (response.success) {
            this.dataSource.data = this.dataSource.data.filter((item: any) => item.contactID !== element.contactID);
          }
        });
      }
    });
  }
}
