(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{bt2F:function(t,n,c){"use strict";c.r(n),c.d(n,"ContactsPageModule",(function(){return C}));var e=c("Valr"),o=c("DUip"),i=c("LGHr"),r=c("SrkI"),a=c("TYT/"),s=c("6onV"),l=c("fECr");function b(t,n){if(1&t&&(a.Kb(0,"div",2),a.hc(1),a.Jb()),2&t){var c=a.Ub(2);a.wb(1),a.jc(" ",c.error," ")}}function d(t,n){1&t&&(a.Kb(0,"div",2),a.hc(1," No records to show. "),a.Jb())}function u(t,n){if(1&t){var c=a.Lb();a.Kb(0,"div",4),a.Sb("click",(function(){a.dc(c);var t=n.$implicit;return a.Ub(3).onSelectContact(null==t?null:t.id)})),a.Kb(1,"div",5),a.hc(2),a.Jb(),a.Kb(3,"div",6),a.hc(4),a.Jb(),a.Jb()}if(2&t){var e=n.$implicit;a.wb(2),a.kc("",null==e?null:e.lastName,", ",null==e?null:e.firstName,""),a.wb(2),a.ic(null==e?null:e.type)}}function f(t,n){if(1&t&&(a.Ib(0),a.gc(1,u,5,3,"div",3),a.Hb()),2&t){var c=a.Ub(2);a.wb(1),a.ac("ngForOf",c.data)}}function p(t,n){if(1&t&&(a.Ib(0),a.gc(1,b,2,1,"div",1),a.gc(2,d,2,0,"div",1),a.gc(3,f,2,1,"ng-container",0),a.Hb()),2&t){var c=a.Ub();a.wb(1),a.ac("ngIf",c.error),a.wb(1),a.ac("ngIf",!c.error&&(null==c.data?null:c.data.length)<=0),a.wb(1),a.ac("ngIf",!c.error&&(null==c.data?null:c.data.length)>0)}}function g(t,n){1&t&&(a.Kb(0,"div",8),a.Gb(1,"div",9),a.Gb(2,"div",10),a.Jb())}function h(t,n){if(1&t&&(a.Kb(0,"div"),a.gc(1,g,3,0,"div",7),a.Jb()),2&t){var c=a.Ub();a.wb(1),a.ac("ngForOf",c.loaders)}}var v=function(){function t(){this.loaders=Array.from(Array(10)),this.selectContact=new a.n}return t.prototype.onSelectContact=function(t){t&&this.selectContact.emit(t)},t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=a.zb({type:t,selectors:[["app-contacts-page"]],inputs:{loading:"loading",data:"data",error:"error"},outputs:{selectContact:"selectContact"},decls:4,vars:2,consts:[[4,"ngIf"],["class","card-body text-center",4,"ngIf"],[1,"card-body","text-center"],["class","card-body list-item",3,"click",4,"ngFor","ngForOf"],[1,"card-body","list-item",3,"click"],[1,"item-title","text-truncate"],[1,"text-muted"],["class","card-body list-item",4,"ngFor","ngForOf"],[1,"card-body","list-item"],[1,"skeleton","w-75"],[1,"skeleton","w-25"]],template:function(t,n){1&t&&(a.Kb(0,"app-header"),a.hc(1,"Contacts"),a.Jb(),a.gc(2,p,4,3,"ng-container",0),a.gc(3,h,2,1,"div",0)),2&t&&(a.wb(2),a.ac("ngIf",!n.loading),a.wb(1),a.ac("ngIf",n.loading))},directives:[l.a,e.l,e.k],styles:[""],changeDetection:0}),t}(),w=[{path:"",component:function(){function t(t,n){this.store=t,this.router=n}return t.prototype.ngOnInit=function(){this.loading$=this.store.select(i.d),this.contactsData$=this.store.select(i.c),this.error$=this.store.select(i.b),this.store.dispatch(Object(r.c)())},t.prototype.onSelectContact=function(t){this.store.dispatch(Object(r.e)({id:t})),this.router.navigate(["client"])},t.\u0275fac=function(n){return new(n||t)(a.Fb(s.h),a.Fb(o.a))},t.\u0275cmp=a.zb({type:t,selectors:[["app-contacts-container"]],decls:4,vars:9,consts:[[3,"loading","data","error","selectContact"]],template:function(t,n){1&t&&(a.Kb(0,"app-contacts-page",0),a.Sb("selectContact",(function(t){return n.onSelectContact(t)})),a.Vb(1,"async"),a.Vb(2,"async"),a.Vb(3,"async"),a.Jb()),2&t&&a.ac("loading",a.Wb(1,3,n.loading$))("data",a.Wb(2,5,n.contactsData$))("error",a.Wb(3,7,n.error$))},directives:[v],pipes:[e.b],encapsulation:2,changeDetection:0}),t}()}],y=function(){function t(){}return t.\u0275mod=a.Db({type:t}),t.\u0275inj=a.Cb({factory:function(n){return new(n||t)},imports:[[o.d.forChild(w)],o.d]}),t}(),m=c("H6Li"),C=function(){function t(){}return t.\u0275mod=a.Db({type:t}),t.\u0275inj=a.Cb({factory:function(n){return new(n||t)},imports:[[e.c,y,m.a]]}),t}()}}]);