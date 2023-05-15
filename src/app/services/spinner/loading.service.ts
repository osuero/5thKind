import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingService {
  public isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.hideWidelay();
  }
  hideWidelay = (): boolean => {
    setTimeout(() => {                          
      this.isLoading.next(false);
    }, 2000); 
    return true
  }
}