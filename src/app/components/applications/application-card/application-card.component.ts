import { Component, Input, Output, EventEmitter } from '@angular/core';
import { application } from '../../model/application';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../modals/create/create.component';
import { DeleteComponent } from '../modals/delete/delete.component';
@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.css']
})
export class ApplicationCardComponent {
  @Input() application!: application;
  @Output() dialogClosed = new EventEmitter<boolean>();
  constructor(public dialog: MatDialog) {

  }

  openDialogDelete(event: Event, application: application): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(
      DeleteComponent, {
      width: '350px',
      data: { ...application }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogClosed.emit(true);
      }
    });
  }

  openDialogEdit(event: Event, application: application): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(
      CreateComponent, {
      width: '350px',
      data: { ...application }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogClosed.emit(true);
      }
    });
  }
}
