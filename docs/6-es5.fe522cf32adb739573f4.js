function _defineProperties(t,n){for(var e=0;e<n.length;e++){var c=n[e];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(t,c.key,c)}}function _createClass(t,n,e){return n&&_defineProperties(t.prototype,n),e&&_defineProperties(t,e),t}function _classCallCheck(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"0V62":function(t,n,e){"use strict";e.r(n),e.d(n,"ClientPageModule",(function(){return $}));var c=e("ofXK"),o=e("tyNb"),a=e("SrkI"),i=e("LGHr"),r=e("mpAh"),b=e("fXoL"),s=e("kt0X"),l=e("fECr");function d(t,n){1&t&&(b.Lb(0,"div",2),b.Lb(1,"div",3),b.ic(2," No contact selected."),b.Hb(3,"br"),b.ic(4," Please select a contact before proceeding."),b.Hb(5,"br"),b.Kb(),b.Lb(6,"a",4),b.ic(7,"Go to Contacts"),b.Kb(),b.Kb())}function u(t,n){if(1&t&&(b.Jb(0),b.Lb(1,"div"),b.Lb(2,"div",8),b.ic(3),b.Wb(4,"currency"),b.Kb(),b.Lb(5,"div",9),b.ic(6,"Net worth"),b.Kb(),b.Lb(7,"h1",10),b.ic(8),b.Kb(),b.Lb(9,"div",11),b.ic(10),b.Kb(),b.Kb(),b.Ib()),2&t){var e=b.Vb(2);b.wb(3),b.kc("",b.Xb(4,4,(null==e.contactData?null:e.contactData.netWorth)/1e9)," B"),b.wb(5),b.lc("",null==e.contactData?null:e.contactData.lastName,", ",null==e.contactData?null:e.contactData.firstName,""),b.wb(2),b.jc(null==e.contactData?null:e.contactData.type)}}function f(t,n){1&t&&(b.Jb(0),b.Lb(1,"div"),b.Hb(2,"div",12),b.Hb(3,"div",13),b.Kb(),b.Ib())}function h(t,n){1&t&&(b.Lb(0,"div",2),b.ic(1," No records to show. "),b.Kb())}function p(t,n){if(1&t&&(b.Lb(0,"div",15),b.Lb(1,"div",16),b.ic(2),b.Kb(),b.Lb(3,"div",17),b.ic(4),b.Kb(),b.Lb(5,"div",18),b.ic(6),b.Wb(7,"date"),b.Kb(),b.Kb()),2&t){var e=n.$implicit;b.wb(2),b.jc(null==e?null:e.title),b.wb(2),b.jc(null==e?null:e.description),b.wb(2),b.jc(b.Yb(7,3,null==e?null:e.occurredOn,"EEEE, MMM d, y, h:mm a"))}}function v(t,n){if(1&t&&(b.Lb(0,"div"),b.hc(1,p,8,6,"div",14),b.Kb()),2&t){var e=b.Vb(3);b.wb(1),b.bc("ngForOf",e.notesData)}}function g(t,n){if(1&t&&(b.Jb(0),b.hc(1,h,2,0,"div",0),b.hc(2,v,2,1,"div",1),b.Ib()),2&t){var e=b.Vb(2);b.wb(1),b.bc("ngIf",!e.notesError&&(null==e.notesData?null:e.notesData.length)<=0),b.wb(1),b.bc("ngIf",!e.notesError&&(null==e.notesData?null:e.notesData.length)>0)}}function L(t,n){1&t&&(b.Lb(0,"div",15),b.Hb(1,"div",19),b.Hb(2,"div",20),b.Hb(3,"div",21),b.Kb())}function w(t,n){if(1&t&&(b.Lb(0,"div"),b.hc(1,L,4,0,"div",14),b.Kb()),2&t){var e=b.Vb(2);b.wb(1),b.bc("ngForOf",e.loaders)}}function m(t,n){if(1&t&&(b.Jb(0),b.Lb(1,"div",5),b.Lb(2,"div",6),b.ic(3,"Overview"),b.Kb(),b.Lb(4,"div",7),b.hc(5,u,11,6,"ng-container",1),b.hc(6,f,4,0,"ng-container",1),b.Kb(),b.Kb(),b.Lb(7,"div",5),b.Lb(8,"div",6),b.ic(9,"Notes"),b.Kb(),b.hc(10,g,3,2,"ng-container",1),b.hc(11,w,2,1,"div",1),b.Kb(),b.Ib()),2&t){var e=b.Vb();b.wb(5),b.bc("ngIf",!e.contactLoading),b.wb(1),b.bc("ngIf",e.contactLoading),b.wb(4),b.bc("ngIf",!e.notesLoading),b.wb(1),b.bc("ngIf",e.notesLoading)}}var y,D,x,K,E=((y=function t(){_classCallCheck(this,t),this.loaders=Array.from(Array(5))}).\u0275fac=function(t){return new(t||y)},y.\u0275cmp=b.Ab({type:y,selectors:[["app-client-page"]],inputs:{context:"context",contactLoading:"contactLoading",contactData:"contactData",contactError:"contactError",notesLoading:"notesLoading",notesData:"notesData",notesError:"notesError"},decls:4,vars:2,consts:[["class","card-body text-center text-muted",4,"ngIf"],[4,"ngIf"],[1,"card-body","text-center","text-muted"],[1,"mb-20","card-body","text-muted"],["routerLink","/contacts",1,"btn","btn-primary"],[1,"card"],[1,"card-title"],[1,"card-body","text-center"],[1,"h1",2,"line-height","1.3"],[1,"text-muted"],[1,"h2","text-truncate"],[1,"text-muted","mb-10"],[1,"skeleton","mx-auto","w-25","mb-10"],[1,"skeleton","mx-auto","w-50"],["class","card-body list-item",4,"ngFor","ngForOf"],[1,"card-body","list-item"],[1,"item-title","text-primary","text-truncate"],[1,"text-clamp"],[1,"text-muted","text-truncate"],[1,"skeleton","w-50"],[1,"skeleton","w-75"],[1,"skeleton","w-35"]],template:function(t,n){1&t&&(b.Lb(0,"app-header"),b.ic(1,"Client Info"),b.Kb(),b.hc(2,d,8,0,"div",0),b.hc(3,m,12,4,"ng-container",1)),2&t&&(b.wb(2),b.bc("ngIf",0===n.context),b.wb(1),b.bc("ngIf",n.context>0))},directives:[l.a,c.l,o.c,c.k],pipes:[c.d,c.f],styles:[""],changeDetection:0}),y),k=[{path:"",component:(D=function(){function t(n){_classCallCheck(this,t),this.store=n}return _createClass(t,[{key:"ngOnInit",value:function(){this.context$=this.store.select(i.f),this.contactLoading$=this.store.select(i.d),this.contactData$=this.store.select(i.e),this.contactError$=this.store.select(i.b),this.notesLoading$=this.store.select(r.e),this.notesData$=this.store.select(r.a),this.notesError$=this.store.select(r.c),this.store.dispatch(Object(a.c)())}}]),t}(),D.\u0275fac=function(t){return new(t||D)(b.Gb(s.h))},D.\u0275cmp=b.Ab({type:D,selectors:[["app-client-container"]],decls:8,vars:21,consts:[[3,"context","contactLoading","contactData","contactError","notesLoading","notesData","notesError"]],template:function(t,n){1&t&&(b.Hb(0,"app-client-page",0),b.Wb(1,"async"),b.Wb(2,"async"),b.Wb(3,"async"),b.Wb(4,"async"),b.Wb(5,"async"),b.Wb(6,"async"),b.Wb(7,"async")),2&t&&b.bc("context",b.Xb(1,7,n.context$))("contactLoading",b.Xb(2,9,n.contactLoading$))("contactData",b.Xb(3,11,n.contactData$))("contactError",b.Xb(4,13,n.contactError$))("notesLoading",b.Xb(5,15,n.notesLoading$))("notesData",b.Xb(6,17,n.notesData$))("notesError",b.Xb(7,19,n.notesError$))},directives:[E],pipes:[c.b],encapsulation:2,changeDetection:0}),D)}],C=((x=function t(){_classCallCheck(this,t)}).\u0275mod=b.Eb({type:x}),x.\u0275inj=b.Db({factory:function(t){return new(t||x)},imports:[[o.d.forChild(k)],o.d]}),x),I=e("H6Li"),$=((K=function t(){_classCallCheck(this,t)}).\u0275mod=b.Eb({type:K}),K.\u0275inj=b.Db({factory:function(t){return new(t||K)},imports:[[c.c,C,I.a]]}),K)}}]);