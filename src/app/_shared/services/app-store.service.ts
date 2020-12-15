import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {

  isAssistantActive: boolean;
  isHomeLoadedOnce: boolean;

}
