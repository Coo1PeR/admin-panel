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
import {
  Dialog,
  DialogRef,
  DIALOG_DATA,
  DialogModule,
} from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { UserFull } from '../interfaces/userFull';
import { UserCartComponent } from '../user-cart/user-cart.component';
import { AddPhotoComponent } from '../add-photo/add-photo.component';

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
    FormsModule,
    DialogModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  dashboardService = inject(DashboardService);
  dialog = inject(Dialog);
  dialogRef = DialogRef<AddUserComponent>;

  newUserForm = new FormGroup({
    lastName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  // constructor(
  //   public dialog: Dialog,
  //   public dialogRef: DialogRef<AddUserComponent>, // Инжектируем DialogRef
  // ) {}

  addUser() {
    this.dashboardService.addUser(
      this.newUserForm.value.lastName?.toLowerCase() ?? '',
      this.newUserForm.value.firstName?.toLowerCase() ?? '',
      this.newUserForm.value.email?.toLowerCase() ?? '',
      this.newUserForm.value.phone ?? '',
    );
  }

  async openAddPhoto() {
    this.dialog.open(AddPhotoComponent, {}); // Открываем новое диалоговое окно
  }
}
