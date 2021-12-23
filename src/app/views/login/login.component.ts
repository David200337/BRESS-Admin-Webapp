import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  form!: FormGroup;

  errorMessage: string | undefined = undefined

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toggleLoader: LoaderToggleService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.toggleLoader.loaderVisible();
    this.submitted = true;
    if (this.form.valid) {
      this.authService
        .login(this.form.value.email, this.form.value.password)
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.toggleLoader.loaderInvisible();
            if (err.status === 400) {
              this.errorMessage = "Email of wachtwoord is verkeerd."
            }
          },
        })
      this.submitted = false;
    } else {
      return;
    }
  }
}
