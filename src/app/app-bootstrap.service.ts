import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class AppBootstrapService {

  private readonly DATA_SOURCE = {
    profiles: '/data/profiles.json',
    contacts: '/data/contacts.json'
  };

  constructor(
    private http: HttpClient
  ) { }

  async seedDatabase() {
    if (!window.indexedDB) {
      console.error(`Your browser doesn't support a stable version of IndexedDB.`);
      return true;
    }

    const dbName = 'mobileDemo';
    const sourceObservables = Object.keys(this.DATA_SOURCE).map(key => this.http.get(this.DATA_SOURCE[key]));

    forkJoin(sourceObservables).subscribe((response: Array<Array<any>>) => {
      const openRequest = indexedDB.open(dbName, environment.dbVersion);

      openRequest.onupgradeneeded = (event) => {
        let db = openRequest.result;
        switch (event.oldVersion) {
          case 0:
            // perform initialization
            response.forEach((collection, index) => {
              this.initializeData(db, dbName, Object.keys(this.DATA_SOURCE)[index], collection);
            });
        }
      };

      openRequest.onerror = () => {
        console.error("IndexedDB Error", openRequest.error);
      };

      openRequest.onsuccess = () => {
        console.log('Database status checked and is running!');
      };
    });


    return true;
  }

  private initializeData(db: IDBDatabase, dbName: string, collectionName: string, collectionData: Array<any>) {
    if (!db.objectStoreNames.contains(collectionName)) {
      const objectStore = db.createObjectStore(collectionName, { keyPath: 'id' });
      collectionData.forEach(item => {
        objectStore.add(item);
      });
    }
  }

}
