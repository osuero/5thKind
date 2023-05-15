import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ILocationOption } from 'src/app/shared/model/ILocationOption';
@Injectable({
    providedIn: 'root'
})
export class CoreUiService {
    languageList$: BehaviorSubject<ILocationOption[]> =  new BehaviorSubject<ILocationOption[]>([]);;

    setDefaultLanguages = (availableLanguages: ILocationOption[]) => {
        this.languageList$.next(availableLanguages);
    }
    getLanguageSelected = (languageList: any[]) =>{
        let languageSelected = '';
        let languageApp = localStorage.getItem('language');
        if(languageApp){
            let languageSplit = languageApp.split('-');
            languageList.forEach(element => {
                let language = element.locale.split('-');
                if(languageSplit[0] == language[0]){
                    languageSelected = element.locale;
                }
            });
        }

        return languageSelected;
    }
}