import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  forgotPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private contactService: ContactService, private toastr: ToastrService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() { }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  getemailcheck() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;

      this.contactService.getForgotPasswordByEmailId(email).subscribe({
        next: (response: any) => {
          
          

          if (response.code === "200") { // Adjust based on actual response structure
            this.router.navigate(['resetpassword'], { queryParams: { email: email } });
          } else {
            this.toastr.warning('User not found.');
          }
        },
        error: (error) => {
          
          this.toastr.error('An error occurred while processing your request.');
        }
      });
    }
  }
}
