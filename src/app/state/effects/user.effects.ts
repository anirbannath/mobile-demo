import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, map, delay } from 'rxjs/operators';
import { appActions } from '../../app-actions';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import { setUser, cancelLoadUser } from '../actions/user.actions';
import { selectUserData } from '../selectors/user.selectors';

@Injectable()
export class UserEffects {

  constructor(
    private store: Store,
    private actions$: Actions,
    private http: HttpClient
  ) { }

  loadUsers = createEffect(() => this.actions$.pipe(
    ofType(appActions.loadUser),
    withLatestFrom(this.store.select(selectUserData)),
    switchMap(([action, userData]) => {
      if (userData) {
        return of(cancelLoadUser());
      } else {
        return this.http.get(environment.dataSource.user).pipe(
          delay(environment.dataDelay),
          map((data: User) => setUser({ user: data })));
      }
    })
  ));

}
