import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';
import { appActions } from '../app-actions';
import { environment } from '../../../../environments/environment';
import { selectTagsList } from '../selectors/tags.selectors';
import { cancelLoadTags, setTags } from '../actions/tags.actions';
import { Tag } from '../../models/tag';

@Injectable()
export class TagsEffects {

  constructor(
    private store: Store,
    private actions$: Actions,
    private http: HttpClient
  ) { }

  loadTags = createEffect(() => this.actions$.pipe(
    ofType(appActions.loadTags),
    withLatestFrom(this.store.select(selectTagsList)),
    switchMap(([action, tags]) => {
      if (tags?.length > 0) {
        return of(cancelLoadTags());
      } else {
        return this.http.get(environment.dataSource.tags).pipe(
          map((data: Array<Tag>) => setTags({ tags: data })));
      }
    })
  ));

}
