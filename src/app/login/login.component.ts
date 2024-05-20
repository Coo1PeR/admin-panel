import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { RouterModule } from '@angular/router';
import { StartPageComponent } from '../start-page/start-page.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  dashboardService = inject(DashboardService);
  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', Validators.required),
  });

  @Input() startPage!: StartPageComponent;

  async loginApplication() {
    await this.dashboardService.loginApplication(
      this.loginForm.value.login ?? '',
      this.loginForm.value.password ?? '',
    );
  }
}
