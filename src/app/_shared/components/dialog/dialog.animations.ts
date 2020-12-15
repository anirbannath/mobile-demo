import { trigger, transition, style, animate, query, state } from '@angular/animations';

export const dialogAnimations = [
  trigger('dialogScale', [
    state('true', style({
      transform: 'scale(1)',
      opacity: 1
    })),
    state('false', style({
      transform: 'scale(0)',
      opacity: 0
    })),
    transition('* <=> *', [
      animate('0.3s cubic-bezier(0.55, 0.31, 0.15, 0.93)')
    ])
  ]),
  trigger('dialogFade', [
    state('true', style({
      opacity: 1
    })),
    state('false', style({
      opacity: 0
    })),
    transition('* <=> *', [
      animate('0.25s ease')
    ])
  ]),
]
