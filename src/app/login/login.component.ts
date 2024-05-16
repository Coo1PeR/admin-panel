import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import {DashboardService} from "../dashboard.service";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  dashboardService = inject(DashboardService);
  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  loginApplication() {
    this.dashboardService.loginApplication(
      this.loginForm.value.login ?? '',
      this.loginForm.value.password ?? ''
    )

  }
}
