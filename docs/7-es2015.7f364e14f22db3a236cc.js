(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{bt2F:function(t,n,c){"use strict";c.r(n),c.d(n,"ContactsPageModule",(function(){return C}));var e=c("ofXK"),o=c("tyNb"),a=c("LGHr"),r=c("SrkI"),i=c("fXoL"),s=c("kt0X"),l=c("fECr");function b(t,n){if(1&t&&(i.Kb(0,"div",2),i.hc(1),i.Jb()),2&t){const t=i.Ub(2);i.wb(1),i.jc(" ",t.error," ")}}function d(t,n){1&t&&(i.Kb(0,"div",2),i.hc(1," No records to show. "),i.Jb())}function u(t,n){if(1&t){const t=i.Lb();i.Kb(0,"div",4),i.Sb("click",(function(){i.dc(t);const c=n.$implicit;return i.Ub(3).onSelectContact(null==c?null:c.id)})),i.Kb(1,"div",5),i.hc(2),i.Jb(),i.Kb(3,"div",6),i.hc(4),i.Jb(),i.Jb()}if(2&t){const t=n.$implicit;i.wb(2),i.kc("",null==t?null:t.lastName,", ",null==t?null:t.firstName,""),i.wb(2),i.ic(null==t?null:t.type)}}function f(t,n){if(1&t&&(i.Ib(0),i.gc(1,u,5,3,"div",3),i.Hb()),2&t){const t=i.Ub(2);i.wb(1),i.ac("ngForOf",t.data)}}function g(t,n){if(1&t&&(i.Ib(0),i.gc(1,b,2,1,"div",1),i.gc(2,d,2,0,"div",1),i.gc(3,f,2,1,"ng-container",0),i.Hb()),2&t){const t=i.Ub();i.wb(1),i.ac("ngIf",t.error),i.wb(1),i.ac("ngIf",!t.error&&(null==t.data?null:t.data.length)<=0),i.wb(1),i.ac("ngIf",!t.error&&(null==t.data?null:t.data.length)>0)}}function p(t,n){1&t&&(i.Kb(0,"div",8),i.Gb(1,"div",9),i.Gb(2,"div",10),i.Jb())}function h(t,n){if(1&t&&(i.Kb(0,"div"),i.gc(1,p,3,0,"div",7),i.Jb()),2&t){const t=i.Ub();i.wb(1),i.ac("ngForOf",t.loaders)}}let w=(()=>{class t{constructor(){this.loaders=Array.from(Array(10)),this.selectContact=new i.n}onSelectContact(t){t&&this.selectContact.emit(t)}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=i.zb({type:t,selectors:[["app-contacts-page"]],inputs:{loading:"loading",data:"data",error:"error"},outputs:{selectContact:"selectContact"},decls:4,vars:2,consts:[[4,"ngIf"],["class","card-body text-center",4,"ngIf"],[1,"card-body","text-center"],["class","card-body list-item",3,"click",4,"ngFor","ngForOf"],[1,"card-body","list-item",3,"click"],[1,"item-title","text-truncate"],[1,"text-muted"],["class","card-body list-item",4,"ngFor","ngForOf"],[1,"card-body","list-item"],[1,"skeleton","w-75"],[1,"skeleton","w-25"]],template:function(t,n){1&t&&(i.Kb(0,"app-header"),i.hc(1,"Contacts"),i.Jb(),i.gc(2,g,4,3,"ng-container",0),i.gc(3,h,2,1,"div",0)),2&t&&(i.wb(2),i.ac("ngIf",!n.loading),i.wb(1),i.ac("ngIf",n.loading))},directives:[l.a,e.l,e.k],styles:[""],changeDetection:0}),t})();const m=[{path:"",component:(()=>{class t{constructor(t,n){this.store=t,this.router=n}ngOnInit(){this.loading$=this.store.select(a.d),this.contactsData$=this.store.select(a.c),this.error$=this.store.select(a.b),this.store.dispatch(Object(r.c)())}onSelectContact(t){this.store.dispatch(Object(r.e)({id:t})),this.router.navigate(["client"])}}return t.\u0275fac=function(n){return new(n||t)(i.Fb(s.h),i.Fb(o.a))},t.\u0275cmp=i.zb({type:t,selectors:[["app-contacts-container"]],decls:4,vars:9,consts:[[3,"loading","data","error","selectContact"]],template:function(t,n){1&t&&(i.Kb(0,"app-contacts-page",0),i.Sb("selectContact",(function(t){return n.onSelectContact(t)})),i.Vb(1,"async"),i.Vb(2,"async"),i.Vb(3,"async"),i.Jb()),2&t&&i.ac("loading",i.Wb(1,3,n.loading$))("data",i.Wb(2,5,n.contactsData$))("error",i.Wb(3,7,n.error$))},directives:[w],pipes:[e.b],encapsulation:2,changeDetection:0}),t})()}];let v=(()=>{class t{}return t.\u0275mod=i.Db({type:t}),t.\u0275inj=i.Cb({factory:function(n){return new(n||t)},imports:[[o.d.forChild(m)],o.d]}),t})();var y=c("H6Li");let C=(()=>{class t{}return t.\u0275mod=i.Db({type:t}),t.\u0275inj=i.Cb({factory:function(n){return new(n||t)},imports:[[e.c,v,y.a]]}),t})()}}]);