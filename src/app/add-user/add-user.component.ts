import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { UsersComponent } from '../users-table/users-table.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  dashboardService = inject(DashboardService);

  newUserForm = new FormGroup({
    lastName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  addUser() {
    this.dashboardService.addUser(
      this.newUserForm.value.lastName?.toLowerCase() ?? '',
      this.newUserForm.value.firstName?.toLowerCase() ?? '',
      this.newUserForm.value.email?.toLowerCase() ?? '',
      this.newUserForm.value.phone ?? '',
    );
  }
}
