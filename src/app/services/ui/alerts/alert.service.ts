import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  constructor(private snackBar: MatSnackBar, private translate: TranslateService) { }

  success(message: string,  action = 'Close', duration = 5000): void {
    this.snackBar.open(this.translate.instant(message), action, {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  error(message: string,  action = 'Close', duration = 5000): void {
    this.snackBar.open(this.translate.instant(message), action, {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'right'
      
    });
  }
}