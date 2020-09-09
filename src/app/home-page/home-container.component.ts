import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { selectUserLoading, selectUserData, selectUserError } from '../state/selectors/user.selectors';
import { loadUser } from '../state/actions/user.actions';

@Component({
  selector: 'app-home-container',
  template: `
    <app-home-page
      [loading]="loading$ | async"
      [data]="userData$ | async"
      [error]="error$ | async">
    </app-home-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainerComponent implements OnInit {

  loading$: Observable<boolean>;
  userData$: Observable<User>;
  error$: Observable<string>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectUserLoading);
    this.userData$ = this.store.select(selectUserData);
    this.error$ = this.store.select(selectUserError);
    this.store.dispatch(loadUser());
  }

}
