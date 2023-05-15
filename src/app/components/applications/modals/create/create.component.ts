import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { application } from 'src/app/components/model/application';
import { ApplicationService } from '../../services/application.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  currentDate: string = "";
  applicationForm!: FormGroup;
  buttonActionName: string = "card.actions.create"
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateComponent>,
    public applicationService: ApplicationService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: application) {
  }

  ngOnInit() {
    this.buttonActionName = 'card.actions.save'
    this.applicationForm = this.fb.group({
      name: ['', Validators.required],
      version: ['', [Validators.required, this.versionValidator()]],
      contactName: ['', [Validators.required]],
      patch: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, this.phoneValidator()]],
    });
    if (this.data) {
      this.buttonActionName = ''
      this.applicationForm.setValue({
        name: this.data.name || '',
        version: this.data.version || '',
        contactName: this.data.contactName || '',
        patch: this.data.patch || '',
        contactNumber: this.data.contactNumber || '',
      });
    }
  }

  get currentApp(): application {
    const app = this.applicationForm.value as application;
    return app;
  }

  onSubmit() {
    if (this.applicationForm.invalid) return;
    if (this.data?.id) {
      this.currentApp.id = this.data.id;
      this.currentApp.createdDate = this.data.createdDate
      this.applicationService.updateApplication(this.currentApp)
        .subscribe(hero => {
          this.closeDialog(true);
        });
      return;
    } else {
      const guid = uuidv4();
      this.currentApp.id = guid;
      this.currentApp.createdDate = this.applicationService.getCurrentDate();
      this.applicationService.addApplication(this.currentApp)
        .subscribe(app => {
          this.closeDialog(true);
        });
    }
  }

  closeDialog(hasAction?: boolean) {
    this.dialogRef.close({ "result": hasAction });
  }

  phoneValidator(): { [key: string]: any } | null {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^1-\d{3}-\d{3}-\d{4}$/.test(control.value);
      return valid ? null : { invalidNumber: { valid: false, value: control.value } };
    }
  }
  versionValidator(): { [key: string]: any } | null {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const valid = /^\d+\.\d+\.\d+$/.test(value);
      return valid ? null : { invalidSemver: { valid: false, value: control.value } };
    };

  }
}

