(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"0V62":function(t,n,c){"use strict";c.r(n),c.d(n,"ClientPageModule",(function(){return L}));var e=c("ofXK"),o=c("tyNb"),a=c("SrkI"),i=c("LGHr"),r=c("mpAh"),s=c("fXoL"),b=c("kt0X"),d=c("fECr");function l(t,n){1&t&&(s.Kb(0,"div",2),s.Kb(1,"div",3),s.hc(2," No contact selected."),s.Gb(3,"br"),s.hc(4," Please select a contact before proceeding."),s.Gb(5,"br"),s.Jb(),s.Kb(6,"a",4),s.hc(7,"Go to Contacts"),s.Jb(),s.Jb())}function u(t,n){if(1&t&&(s.Ib(0),s.Kb(1,"div"),s.Kb(2,"div",8),s.hc(3),s.Vb(4,"currency"),s.Jb(),s.Kb(5,"div",9),s.hc(6,"Net worth"),s.Jb(),s.Kb(7,"h1",10),s.hc(8),s.Jb(),s.Kb(9,"div",11),s.hc(10),s.Jb(),s.Jb(),s.Hb()),2&t){const t=s.Ub(2);s.wb(3),s.jc("",s.Wb(4,4,(null==t.contactData?null:t.contactData.netWorth)/1e9)," B"),s.wb(5),s.kc("",null==t.contactData?null:t.contactData.lastName,", ",null==t.contactData?null:t.contactData.firstName,""),s.wb(2),s.ic(null==t.contactData?null:t.contactData.type)}}function g(t,n){1&t&&(s.Ib(0),s.Kb(1,"div"),s.Gb(2,"div",12),s.Gb(3,"div",13),s.Jb(),s.Hb())}function f(t,n){1&t&&(s.Kb(0,"div",2),s.hc(1," No records to show. "),s.Jb())}function h(t,n){if(1&t&&(s.Kb(0,"div",15),s.Kb(1,"div",16),s.hc(2),s.Jb(),s.Kb(3,"div",17),s.hc(4),s.Jb(),s.Kb(5,"div",18),s.hc(6),s.Vb(7,"date"),s.Jb(),s.Jb()),2&t){const t=n.$implicit;s.wb(2),s.ic(null==t?null:t.title),s.wb(2),s.ic(null==t?null:t.description),s.wb(2),s.ic(s.Xb(7,3,null==t?null:t.occurredOn,"EEEE, MMM d, y, h:mm a"))}}function p(t,n){if(1&t&&(s.Kb(0,"div"),s.gc(1,h,8,6,"div",14),s.Jb()),2&t){const t=s.Ub(3);s.wb(1),s.ac("ngForOf",t.notesData)}}function v(t,n){if(1&t&&(s.Ib(0),s.gc(1,f,2,0,"div",0),s.gc(2,p,2,1,"div",1),s.Hb()),2&t){const t=s.Ub(2);s.wb(1),s.ac("ngIf",!t.notesError&&(null==t.notesData?null:t.notesData.length)<=0),s.wb(1),s.ac("ngIf",!t.notesError&&(null==t.notesData?null:t.notesData.length)>0)}}function w(t,n){1&t&&(s.Kb(0,"div",15),s.Gb(1,"div",19),s.Gb(2,"div",20),s.Gb(3,"div",21),s.Jb())}function m(t,n){if(1&t&&(s.Kb(0,"div"),s.gc(1,w,4,0,"div",14),s.Jb()),2&t){const t=s.Ub(2);s.wb(1),s.ac("ngForOf",t.loaders)}}function D(t,n){if(1&t&&(s.Ib(0),s.Kb(1,"div",5),s.Kb(2,"div",6),s.hc(3,"Overview"),s.Jb(),s.Kb(4,"div",7),s.gc(5,u,11,6,"ng-container",1),s.gc(6,g,4,0,"ng-container",1),s.Jb(),s.Jb(),s.Kb(7,"div",5),s.Kb(8,"div",6),s.hc(9,"Notes"),s.Jb(),s.gc(10,v,3,2,"ng-container",1),s.gc(11,m,2,1,"div",1),s.Jb(),s.Hb()),2&t){const t=s.Ub();s.wb(5),s.ac("ngIf",!t.contactLoading),s.wb(1),s.ac("ngIf",t.contactLoading),s.wb(4),s.ac("ngIf",!t.notesLoading),s.wb(1),s.ac("ngIf",t.notesLoading)}}let y=(()=>{class t{constructor(){this.loaders=Array.from(Array(5))}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=s.zb({type:t,selectors:[["app-client-page"]],inputs:{context:"context",contactLoading:"contactLoading",contactData:"contactData",contactError:"contactError",notesLoading:"notesLoading",notesData:"notesData",notesError:"notesError"},decls:4,vars:2,consts:[["class","card-body text-center text-muted",4,"ngIf"],[4,"ngIf"],[1,"card-body","text-center","text-muted"],[1,"mb-20","card-body","text-muted"],["routerLink","/contacts",1,"btn","btn-primary"],[1,"card"],[1,"card-title"],[1,"card-body","text-center"],[1,"h1",2,"line-height","1.3"],[1,"text-muted"],[1,"h2","text-truncate"],[1,"text-muted","mb-10"],[1,"skeleton","mx-auto","w-25","mb-10"],[1,"skeleton","mx-auto","w-50"],["class","card-body list-item",4,"ngFor","ngForOf"],[1,"card-body","list-item"],[1,"item-title","text-primary","text-truncate"],[1,"text-clamp"],[1,"text-muted","text-truncate"],[1,"skeleton","w-50"],[1,"skeleton","w-75"],[1,"skeleton","w-35"]],template:function(t,n){1&t&&(s.Kb(0,"app-header"),s.hc(1,"Client Info"),s.Jb(),s.gc(2,l,8,0,"div",0),s.gc(3,D,12,4,"ng-container",1)),2&t&&(s.wb(2),s.ac("ngIf",0===n.context),s.wb(1),s.ac("ngIf",n.context>0))},directives:[d.a,e.l,o.c,e.k],pipes:[e.d,e.f],styles:[""],changeDetection:0}),t})();const J=[{path:"",component:(()=>{class t{constructor(t){this.store=t}ngOnInit(){this.context$=this.store.select(i.f),this.contactLoading$=this.store.select(i.d),this.contactData$=this.store.select(i.e),this.contactError$=this.store.select(i.b),this.notesLoading$=this.store.select(r.e),this.notesData$=this.store.select(r.a),this.notesError$=this.store.select(r.c),this.store.dispatch(Object(a.c)())}}return t.\u0275fac=function(n){return new(n||t)(s.Fb(b.h))},t.\u0275cmp=s.zb({type:t,selectors:[["app-client-container"]],decls:8,vars:21,consts:[[3,"context","contactLoading","contactData","contactError","notesLoading","notesData","notesError"]],template:function(t,n){1&t&&(s.Gb(0,"app-client-page",0),s.Vb(1,"async"),s.Vb(2,"async"),s.Vb(3,"async"),s.Vb(4,"async"),s.Vb(5,"async"),s.Vb(6,"async"),s.Vb(7,"async")),2&t&&s.ac("context",s.Wb(1,7,n.context$))("contactLoading",s.Wb(2,9,n.contactLoading$))("contactData",s.Wb(3,11,n.contactData$))("contactError",s.Wb(4,13,n.contactError$))("notesLoading",s.Wb(5,15,n.notesLoading$))("notesData",s.Wb(6,17,n.notesData$))("notesError",s.Wb(7,19,n.notesError$))},directives:[y],pipes:[e.b],encapsulation:2,changeDetection:0}),t})()}];let x=(()=>{class t{}return t.\u0275mod=s.Db({type:t}),t.\u0275inj=s.Cb({factory:function(n){return new(n||t)},imports:[[o.d.forChild(J)],o.d]}),t})();var K=c("H6Li");let L=(()=>{class t{}return t.\u0275mod=s.Db({type:t}),t.\u0275inj=s.Cb({factory:function(n){return new(n||t)},imports:[[e.c,x,K.a]]}),t})()}}]);