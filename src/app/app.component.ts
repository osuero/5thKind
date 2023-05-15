import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from './services/spinner/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService, public loadingService: LoadingService) {
    let language = localStorage.getItem('language')?.split('-')[0];
    translate.setDefaultLang(language ? language : 'en');
  }
}
