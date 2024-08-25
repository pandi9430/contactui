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
import { ToastrService } from 'ngx-toastr';

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
  userID: any;
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
    private route: ActivatedRoute,private toastr: ToastrService) {

    this.form = this.formBuilder.group({
      userID: [0],
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
      postalCode: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
    });

    this.route.queryParams.subscribe(queryParams => {
      this.userID = queryParams['userID'];
      this.flag = queryParams['flag'];

      if (this.flag === 'Edit') {
        this.getbyUserId(this.userID);
      }
    });
  }

  ngOnInit() { }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.valid) {
      this.contactService.addUser(this.form.value).subscribe(
        response => {
          this.toastr.success(response.message);
          this._router.navigate(['/contactlist']);
        },
        error => {
          // Show an error message or handle the error
        }
      );
    } else {
      this.toastr.warning('Please fill all the required fields correctly.');
      this.form.markAllAsTouched();
    }
  }

  onUpdate() {
    if (this.form.valid) {

      this._router.navigate(['/contactlist']);
      this.contactService.updateUser(this.form.value).subscribe(
        response => {
          this.toastr.success(response.message);
          this._router.navigate(['/contactlist']);
        },
        error => {
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  getbyUserId(id: any) { 
    this.contactService.getUserById(id).subscribe((response: any) => {  
      this.form.patchValue(response.result);
    });
  }

  onReset() {
    this._router.navigate(['/contactlist']);
  }
}

