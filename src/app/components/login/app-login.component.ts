import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Cache } from "../../shared/services/cache.service";
import { CustomerService } from "../../services/customer.service";
import { AuthService } from "../../shared/services/auth.service";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [RouterModule, ReactiveFormsModule],
    templateUrl: "./app-login.component.html",
    styleUrl: "./app-login.component.css"
})

export class AppLoginComponent implements OnInit {
    loginForm!: FormGroup;
    showPassword: boolean = false;
    constructor(private fb: FormBuilder, private customerService: CustomerService, private authService: AuthService, private cache: Cache, private toastr: ToastrService, private router: Router) {
        this.cache.clearUserInfo();
        this.authService.clearToken();
        this.createForm()
    }
    ngOnInit(): void { }

    createForm(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    togglePassword(): void {
        this.showPassword = !this.showPassword;
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const postData = this.loginForm.value;
            this.customerService.loginUser(postData).then((resp:any)=>{
                if(resp.statusCode === 200){
                    const user = resp.user;
                    user.authToken = resp.authToken;
                    this.cache.user = user;
                    this.authService.setToken('authToken', resp.authToken);
                    this.cache.updateCache();

                    this.router.navigate(['dashboard']);
                }else{
                    this.toastr.error(resp.statusMessage);
                    this.loginForm.reset();
                }
            }, (error)=>{
                this.toastr.error(error.message);
                this.loginForm.reset();
            })
        }
    }
}