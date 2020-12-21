import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Note } from '../_shared/models/note';
import { selectNotesLoading, selectNotesError, selectNotesList } from '../_shared/state/selectors/notes.selectors';
import { setSelectedNote } from '../_shared/state/actions/notes.actions';
import { setAssistantContext } from '../_shared/state/actions/voice-assistant.actions';
import { AppStoreService } from '../_shared/services/app-store.service';
import { TagDictionary } from '../_shared/models/tag';
import { selectTagsData } from '../_shared/state/selectors/tags.selectors';

@Component({
  selector: 'app-home-container',
  template: `
    <app-home-page
      [tagsData]="tagsData$ | async"
      [notesLoading]="notesLoading$ | async"
      [notesData]="notesData$ | async"
      [notesError]="notesError$ | async"
      (selectNote)="onSelectNote($event)">
    </app-home-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainerComponent implements OnInit, AfterViewInit {

  tagsData$: Observable<TagDictionary>;
  notesLoading$: Observable<boolean>;
  notesData$: Observable<Array<Note>>;
  notesError$: Observable<string>;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private store: Store,
    private appStore: AppStoreService,
  ) { }

  ngOnInit(): void {
    this.tagsData$ = this.store.select(selectTagsData);
    this.notesLoading$ = this.store.select(selectNotesLoading);
    this.notesData$ = this.store.select(selectNotesList);
    this.notesError$ = this.store.select(selectNotesError);
  }

  ngAfterViewInit() {
    if (!this.appStore.isHomeLoadedOnce && this.appStore.isAssistantActive) {
      if (isPlatformBrowser(this.platformId)) {
        this.appStore.isHomeLoadedOnce = true;
        this.store.dispatch(setAssistantContext({
          context: {
            type: 'DOM',
            target: '[va-article="home-summary"]',
            text: (<HTMLElement>document.querySelector('[va-article="home-summary"]')).getAttribute('va-question')
          }
        }))
      }
    }
  }

  onSelectNote(id: number) {
    this.store.dispatch(setSelectedNote({ id: id }));
  }

}
