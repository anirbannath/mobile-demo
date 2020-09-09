import { trigger, transition, style, animateChild, animate, query, group } from '@angular/animations';

export const forwardSlide = [
  style({ position: 'fixed' }),
  query(':enter, :leave', [
    style({
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%'
    })
  ], { optional: true }),
  query(':enter', [
    style({ left: '100%' })
  ], { optional: true }),
  query(':leave', animateChild(), { optional: true }),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ left: '-100%' }))
    ], { optional: true }),
    query(':enter', [
      animate('300ms ease-out', style({ left: '0%' }))
    ], { optional: true })
  ]),
  query(':enter', animateChild(), { optional: true }),
];

export const backwardSlide = [
  style({ position: 'fixed' }),
  query(':enter, :leave', [
    style({
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%'
    })
  ], { optional: true }),
  query(':enter', [
    style({ left: '-100%' })
  ], { optional: true }),
  query(':leave', animateChild(), { optional: true }),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ left: '100%' }))
    ], { optional: true }),
    query(':enter', [
      animate('300ms ease-out', style({ left: '0%' }))
    ], { optional: true })
  ]),
  query(':enter', animateChild(), { optional: true }),
];


export const routerAnimations =
  trigger('routeAnimations', [
    transition('HomePage => ContactsPage', forwardSlide),
    transition('HomePage => ClientPage', forwardSlide),

    transition('ContactsPage => ClientPage', forwardSlide),
    transition('ContactsPage => HomePage', backwardSlide),

    transition('ClientPage => HomePage', backwardSlide),
    transition('ClientPage => ContactsPage', backwardSlide),
  ]);
