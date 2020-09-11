import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { appActions } from '../../app-actions';

@Injectable()
export class DarkThemeEffects {

  private renderer: Renderer2;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private actions$: Actions,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setDarkTheme = createEffect(() => this.actions$.pipe(
    ofType(appActions.setForceDarkTheme),
    tap(action => {
      const forceDarkTheme: boolean = (<any>action).force;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('forceDarkTheme', forceDarkTheme.toString())
      }
      if (forceDarkTheme) {
        this.renderer.addClass(this.document.body, 'dark');
      } else {
        this.renderer.removeClass(this.document.body, 'dark');
      }
    })
  ), { dispatch: false });
}
