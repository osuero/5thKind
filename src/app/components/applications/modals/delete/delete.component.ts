import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { application } from 'src/app/components/model/application';
import { ApplicationService } from '../../services/application.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})

export class DeleteComponent {

  constructor(private dialogRef: MatDialogRef<DeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: application, public applicationService: ApplicationService) {

  }

  onConfirm(): void {
    this.applicationService.deleteById(this.data)
    .subscribe(hero => {
      this.closeDialog(true);
    });
    this.dialogRef.close(true);
  }
  closeDialog(hasAction?: boolean) {
    this.dialogRef.close({ "result": hasAction });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
