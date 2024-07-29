import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-add',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, CommonModule],
  providers: [],
  templateUrl: './contact-add.component.html',
  styleUrl: './contact-add.component.scss'
})
export class ContactAddComponent {
  form!: FormGroup;
  cities: string[] = ['Chennai', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  states: string[] = ['TamilNadu', 'California', 'Illinois', 'Texas', 'Arizona'];
  countries: string[] = ['India', 'Canada', 'UK', 'Australia', 'USA'];
  contactID: any;
  flag: any;
  formvalues: any;
  firstName: any;
  lastName: any;
  email: any;
  phoneNumber: any;
  address: any;
  country: any;
  state: any;
  city: any;
  postalCode: any;

  constructor(private formBuilder: FormBuilder,
    private _router: Router,
    private contactService: ContactService,
    private route: ActivatedRoute) {

    this.form = this.formBuilder.group({
      contactID: [0],
      firstName: ['', Validators.required],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+?[1-9]\d{1,14}$/)
        ]
      ],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required]
    });

    this.route.queryParams.subscribe(queryParams => {
      this.contactID = queryParams['contactID'];
      this.flag = queryParams['flag'];
      const firstName = queryParams['firstName'];
      const lastName = queryParams['lastName'];
      const email = queryParams['email'];
      const phoneNumber = queryParams['phoneNumber'];
      const address = queryParams['address'];
      const city = queryParams['city'];
      const state = queryParams['state'];
      const country = queryParams['country'];
      const postalCode = queryParams['postalCode'];

      if (this.flag === 'Edit') {

        //this.getbyContactId(this.contactID);

        this.form.patchValue({
          contactID: this.contactID,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          address: address,
          city: city,
          state: state,
          country: country,
          postalCode: postalCode
        });
      }
    });
  }

  ngOnInit() { }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.valid) {
      this.contactService.addContact(this.form.value).subscribe(
        response => {
          this._router.navigate(['/contactlist']);
        },
        error => {
          // Show an error message or handle the error
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  onUpdate() {
    if (this.form.valid) {

      this._router.navigate(['/contactlist']);
      this.contactService.updateContact(this.form.value).subscribe(
        response => {
          this._router.navigate(['/contactlist']);
        },
        error => {
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  // getbyContactId(id: any) { 
  //   this.contactService.getContactsById(id).subscribe((response: any) => {  
  //     this.form.patchValue(response);
  //   });
  // }

  onReset() {
    this._router.navigate(['/contactlist']);
  }
}
