import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Cache } from "../../shared/services/cache.service";
import { CustomerService } from "../../services/customer.service";
import { AuthService } from "../../shared/services/auth.service";

@Component({
    selector: "app-signup",
    standalone: true,
    imports: [RouterModule, ReactiveFormsModule],
    templateUrl: "./app-signup.component.html",
    styleUrl: "./app-sign-up.component.css"
})

export class AppSignUpComponent implements OnInit {
    signUpForm!: FormGroup;
    showPassword: boolean = false;
    constructor(private fb: FormBuilder, private customerService: CustomerService, private cache: Cache, private authService: AuthService, private router: Router, private toastr: ToastrService) {
        this.createForm()
    }
    ngOnInit(): void { }

    createForm(): void {
        this.signUpForm = this.fb.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    togglePassword(): void {
        this.showPassword = !this.showPassword;
    }

    onSubmit(): void {
        if (this.signUpForm.valid) {
            const postData = this.signUpForm.value
            postData.role = 1;
            this.customerService.signUpUser(postData).then((resp: any) => {
                if (resp.statusCode === 200) {
                    const user = resp.user;
                    user.authToken = resp.authToken;
                    this.cache.user = user;
                    this.authService.setToken('authToken', resp.authToken);
                    this.cache.updateCache();

                    this.router.navigate(['dashboard']);
                } else {
                    this.toastr.error(resp.statusMessage);
                    this.signUpForm.reset();
                }
            }, (error) => {
                this.toastr.error(error.message);
                this.signUpForm.reset();
            })
        }
    }
}