import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { Error404PageComponent } from 'src/app/shared/error404-page/error404-page.component';
const routes: Routes = [
  {        
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'application',
        pathMatch: 'full'
      }
      ,
      {
        path: 'application',
        loadChildren: () => import('../applications/applications.module').then(m => m.ApplicationsModule)
      },
      {
        path: '404',
        component: Error404PageComponent,
      },
      {
        path: '**',
        redirectTo: '404',
      }
    ]   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
