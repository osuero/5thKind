import { Component } from '@angular/core';
import { SideRoutes } from '../../model/side-routes';
import { LayoutService } from './services/layout.service';
import { LoadingService } from 'src/app/services/spinner/loading.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  public sideBarRoutes: SideRoutes[] = [];
  constructor(private layoutService: LayoutService, public loadingService: LoadingService) {
    this.setSideBarList();
  }

  public setSideBarList() {
    this.layoutService.getLayoutRoutes()
      .subscribe(x => this.sideBarRoutes = x);
  }
}
