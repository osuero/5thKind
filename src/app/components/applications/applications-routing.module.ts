import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsListComponent } from './applications-list/applications-list.component';


const routes: Routes = [
  {
    path: '',
    component: ApplicationsListComponent,
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ApplicationsListComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
