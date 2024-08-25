import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../contact.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    registerForm!: FormGroup;
    passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{8,}$';

    constructor(private fb: FormBuilder,
        private _router: Router, private http: HttpClient, private toastr: ToastrService, private contactService: ContactService,
    ) {
        this.registerForm = this.fb.group({
            userID: [0],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
            confirmPassword: ['', Validators.required],
            terms: [false, Validators.requiredTrue]
        }, { validators: this.passwordsMustMatch  });
    }

    ngOnInit() { }

    passwordsMustMatch(group: FormGroup) {
        const password = group.get('password')?.value;
        
        const confirmPassword = group.get('confirmPassword')?.value;
        
        return password === confirmPassword ? null : { passwordMismatch: true };
      }
      
    onSubmit(): void {
        if (this.registerForm.valid) {
            const registerData = this.registerForm.value;
            
            this.contactService.registerUser(this.registerForm.value).subscribe(
                response => {
                    this.toastr.success('Successfully Regsitered');
                    this._router.navigate(['/home']);
                },
                error => {
                    // Show an error message or handle the error
                }
            );
        }
        else {
            this.registerForm.markAllAsTouched();
        }
    }

    cancel() {
        this._router.navigate(['/login']); // Adjust the route as necessary
    }
}
