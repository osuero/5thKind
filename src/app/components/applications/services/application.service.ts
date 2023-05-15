import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, throwError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { application } from '../../model/application';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/ui/alerts/alert.service';


@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private baseUrl: string = environment.baseUrl;
  public currentDate: string = "";
  constructor(private http: HttpClient, public alertService: AlertService) { }

  getApplications(): Observable<application[]> {
    return this.http.get<application[]>(`${this.baseUrl}applications`).pipe(
      map(applications => {
        if (applications && applications.length > 0) {
          applications.sort((a, b) => {
            const dateA = moment(a.createdDate, "MM/DD/YYYY: h:mm:ss A").toDate();
            const dateB = moment(b.createdDate, "MM/DD/YYYY: h:mm:ss A").toDate();
            return dateB.getTime() - dateA.getTime();
          });
        }
        return applications;
      })
    );
  }

  getApplicationById(id: string): Observable<application | undefined> {
    return this.http.get<application>(`${this.baseUrl}applications/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  addApplication(application: application): Observable<application> {
    return this.http.post<application>(`${this.baseUrl}applications`, application);
  }

  updateApplication(application: application): Observable<application> {
    return this.http.put<application>(`${this.baseUrl}applications/${application.id}`, application)
      .pipe(
        tap(() => {
          this.alertService.success('form.confirmation.update.actionSucced');
        }
        ), 
        catchError(error => {
          this.alertService.error('form.confirmation.update.actionFailed');
          return throwError(error);
        })
      );
  }
 
  deleteById(application: application): Observable<boolean> {
    return this.http.delete<application>(`${this.baseUrl}applications/${application.id}`).pipe(
      catchError(error => of(undefined)),
      map(res => true)
    );
  }
  getCurrentDate(): string {
    const date = new Date();
    this.currentDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}: ${date.getHours()}:${date.getMinutes()}`;
    return this.currentDate;
  }
}