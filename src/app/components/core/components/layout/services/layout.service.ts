import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SideRoutes } from '../../../model/side-routes';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getLayoutRoutes():Observable<SideRoutes[]> {
    return this.http.get<SideRoutes[]>(`${ this.baseUrl }routes`);
  }

  getLayoutRoutesById( id: string ): Observable<SideRoutes|undefined> {
    return this.http.get<SideRoutes>(`${ this.baseUrl }routes/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }
}