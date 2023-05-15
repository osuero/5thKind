import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { application } from 'src/app/components/model/application';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  applicationData!: application;
  versionNumber: string = '';
  contactName: string = '';
  contactNumber: string = '';
  applicationName: string = '';
  patch: string = 'hola hola';
  constructor(public dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: application) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
