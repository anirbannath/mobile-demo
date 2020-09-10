import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { environment } from '../environments/environment';
import { VoiceAssistantService } from './services/voice-assistant.service';
import { setVoiceAssistantSupport } from './state/actions/voice-assistant.actions';

@Injectable()
export class AppBootstrapService {

  constructor(
    private http: HttpClient,
    private store: Store,
    private voiceAssistantService: VoiceAssistantService
  ) { }

  bootstrap() {
    return new Promise<boolean>((resolve, reject) => {

      this.store.dispatch(setVoiceAssistantSupport({ support: this.voiceAssistantService.isSupported }));

      if (!window.indexedDB) {
        console.error(`Your browser doesn't support a stable version of IndexedDB.`);
        resolve(true);
      }

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
          console.error("IndexedDB Error", openRequest.error);
          resolve(true);
        };

        openRequest.onsuccess = () => {
          console.log('Database status checked and is running!');
          resolve(true);
        };
      });
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
