import { trigger, transition, style, animate } from '@angular/animations';

export const toastAnimation =
  trigger('toastAnimation', [
    transition(':enter', [
      style({ opacity: '0' }),
      animate('300ms ease-out', style({ opacity: '1' }))
    ]),
    transition(':leave', [
      style({ opacity: '1' }),
      animate('300ms ease-out', style({ opacity: '0' }))
    ])
  ]);
