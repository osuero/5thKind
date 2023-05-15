import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationCardComponent } from './application-card/application-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { ApplicationsListComponent } from './applications-list/applications-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule  } from '@angular/forms';
import { DetailsComponent } from './modals/details/details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateComponent } from './modals/create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DeleteComponent } from './modals/delete/delete.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ApplicationsListComponent,
    ApplicationCardComponent,
    DetailsComponent,
    CreateComponent,
    DeleteComponent,
    
  ],
  imports: [
    MatSnackBarModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    TranslateModule,
    CommonModule,
    ApplicationsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    FormsModule,
    MatDialogModule,
  
  ]
})
export class ApplicationsModule { }
