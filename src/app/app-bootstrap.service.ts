import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { environment } from '../environments/environment';
import { VoiceAssistantService } from './services/voice-assistant.service';
import { setVoiceAssistantSupport } from './state/actions/voice-assistant.actions';
import { isPlatformBrowser } from '@angular/common';
import { setForceDarkTheme, setSupportDarkTheme } from './state/actions/dark-theme.actions';

@Injectable()
export class AppBootstrapService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private store: Store,
    private voiceAssistantService: VoiceAssistantService
  ) { }

  bootstrap() {
    return new Promise<boolean>((resolve, reject) => {

      if (isPlatformBrowser(this.platformId)) {
        const forceDarkTheme = localStorage.getItem('forceDarkTheme') === 'true' ? true : false;
        const supportDarkTheme = CSS && CSS.supports && CSS.supports('color', 'var(--fake-var)');
        this.store.dispatch(setForceDarkTheme({ force: forceDarkTheme }));
        this.store.dispatch(setSupportDarkTheme({ support: supportDarkTheme }));
      }

      this.store.dispatch(setVoiceAssistantSupport({ support: this.voiceAssistantService.isSupported }));

      if (isPlatformBrowser(this.platformId)) {
        if (!window.indexedDB) {
          console.log(`Your browser doesn't support a stable version of IndexedDB.`);
          resolve(true);
        } else {
          const dataSourceKeys = Object.keys(environment.dbDataSource),
            sourceObservables = dataSourceKeys.map(key => this.http.get(environment.dbDataSource[key]));

          forkJoin(sourceObservables).subscribe((response: Array<Array<any>>) => {
            const openRequest = indexedDB.open(environment.dbName, environment.dbVersion);

            openRequest.onupgradeneeded = (event) => {
              let db = openRequest.result;
              switch (event.oldVersion) {
                case 0:
                  // perform initialization
                  response.forEach((collection, index) => {
                    this.initializeLocalDB(db, environment.dbName, dataSourceKeys[index], collection);
                  });
              }
            };

            openRequest.onerror = () => {
              console.log("IndexedDB Error", openRequest.error);
              resolve(true);
            };

            openRequest.onsuccess = () => {
              console.log('Database status checked and is running!');
              resolve(true);
            };
          });
        }
      } else {
        resolve(true);
      }
    });

  }

  private initializeLocalDB(db: IDBDatabase, dbName: string, collectionName: string, collectionData: Array<any>) {
    if (!db.objectStoreNames.contains(collectionName)) {
      const objectStore = db.createObjectStore(collectionName, { keyPath: 'id' });
      collectionData.forEach(item => {
        objectStore.add(item);
      });
    }
  }

}
