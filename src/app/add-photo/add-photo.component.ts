import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DashboardService } from '../dashboard.service';
import { DialogRef, DialogModule } from '@angular/cdk/dialog';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-photo',
  standalone: true,
  imports: [MatButtonModule, DialogModule, NgIf],
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})
export class AddPhotoComponent {
  @ViewChild('dropZone', { static: true }) dropZone!: ElementRef;
  imageUrl: string | ArrayBuffer | null = '';

  constructor(
    private dashboardService: DashboardService,
    public dialogRef: DialogRef<AddPhotoComponent>,
  ) {}

  ngOnInit() {
    this.initializeDragAndDrop();
  }

  initializeDragAndDrop() {
    const dropZoneElement = this.dropZone.nativeElement;

    dropZoneElement.addEventListener('dragover', (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      dropZoneElement.classList.add('drag-over');
    });

    dropZoneElement.addEventListener('dragleave', (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      dropZoneElement.classList.remove('drag-over');
    });

    dropZoneElement.addEventListener('drop', (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      dropZoneElement.classList.remove('drag-over');

      if (event.dataTransfer?.files.length) {
        const file = event.dataTransfer.files[0];
        this.handleFile(file);
      }
    });
  }

  handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
      // Save the image to the server or to the user profile
      // this.dashboardService.saveUserProfileImage(file);
      if (typeof this.imageUrl === 'string') {
        this.dashboardService.users[
          this.dashboardService.users.length - 1
        ].address.zipcode = this.imageUrl;
      }
    };
    reader.readAsDataURL(file);
  }

  complete() {
    this.dialogRef.close();
  }
}
