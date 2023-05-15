
import { Component, OnInit, OnDestroy, Self } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CoreUiService } from 'src/app/services/ui/core-ui.service';
import { BROWSER_STORAGE, StorageService } from 'src/app/services/ui/local-data/storage.service';
import { ILocationOption } from 'src/app/shared/model/ILocationOption';

@Component({
    selector: 'language-selector',
    templateUrl: './language-selector.component.html',
    providers: [
        StorageService,
        {provide: BROWSER_STORAGE, useFactory: () => localStorage},
    ]
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
    subscriptions: Subscription = new Subscription();
    languageList: ILocationOption[] = [];
    selectedLanguage!: string;
    
    constructor(        
        private translate: TranslateService,
        private coreUIService: CoreUiService,
        @Self() private storageService: StorageService ) {}
        
    ngOnInit() {
        this.languageList = this.defaultLanguageValue();
        this.loadLanguageValues();
        if (this.storageService.get('defaultLocale')) {
            this.selectedLanguage = this.coreUIService.getLanguageSelected(this.languageList);
            if(!this.selectedLanguage){
                this.selectedLanguage = this.languageList[0].locale;
            }
            this.translate.use(this.selectedLanguage);
        }else{
            this.subscriptions.add(
                this.coreUIService.languageList$.subscribe(data => {
                    if (data.length > 0) {
                        this.selectedLanguage = this.coreUIService.getLanguageSelected(data);
                        if(!this.selectedLanguage){
                            this.selectedLanguage = data[0].locale;
                        }
                        this.storageService.set('defaultLocale', data[0].locale);
                    } else {
                        this.selectedLanguage = this.coreUIService.getLanguageSelected(this.languageList);
                        if(!this.selectedLanguage){
                            this.selectedLanguage = this.languageList[0].locale;
                        }
                        this.storageService.set('defaultLocale', this.languageList[0].locale);
                    }
                    this.translate.use(this.selectedLanguage);
                    this.storageService.set('language', this.selectedLanguage);
                })
            );
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    loadLanguageValues = () => {
        this.subscriptions.add(
            this.coreUIService.languageList$.subscribe(data => {
                if (data.length > 0) {
                    this.languageList = data;
                    this.selectedLanguage = this.storageService.get('language')?? 'en';
                }
            })
        );
    }
    changeLanguage(data: string) {
        this.translate.use(data);
        this.storageService.set('language', data);
    }
    defaultLanguageValue() {
        return [{ displayName: 'language.en', locale: 'en' }, { displayName: 'language.es', locale: 'es' }];
    }
}