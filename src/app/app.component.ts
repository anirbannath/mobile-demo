import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { routerAnimations } from './app-animations';
import { loadNotes } from './state/actions/notes.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimations]
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(loadNotes());
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animationKey;
  }
}
