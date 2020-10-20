import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { setAssistantAcknowledgement } from '../state/actions/voice-assistant.actions';
import { selectIndividualContactData } from '../state/selectors/contacts.selectors';

@Injectable({
  providedIn: 'root'
})
export class CanActivateContactGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.select(selectIndividualContactData).pipe(
      switchMap((selectedContact) => {
        if (selectedContact) {
          return of(true);
        } else {
          this.store.dispatch(setAssistantAcknowledgement({ acknowledgement: `Please select a contact before proceeding.` }))
          this.router.navigateByUrl('/contacts');
          return of(false);
        }
      })
    );

  }

}
