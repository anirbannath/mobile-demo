(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"64/j":function(t,e,n){"use strict";n.r(e),n.d(e,"HomePageModule",(function(){return O}));var o=n("Valr"),a=n("DUip"),i=n("TYT/"),s=n("aPFg"),r=n("Wd7v"),c=n("WIi7"),b=n("XUUN"),d=n("6onV"),u=n("SutP"),l=n("INvn"),p=n("DgJq");function h(t,e){if(1&t&&(i.Ob(0,"div",4),i.nc(1),i.ac(2,"date"),i.Nb()),2&t){var n=i.Zb();i.zb(1),i.pc(" Your next meeting for the day is scheduled at ",i.cc(2,1,n.nextMeeting,"h:mm a")," ")}}var m=function(){function t(){this.now=new Date,this.meetingCount=0,this.nextMeeting=null,this.selectNote=new i.n}return Object.defineProperty(t.prototype,"notesData",{get:function(){return this._notes},set:function(t){var e,n=this;this._notes=t;var o=(null===(e=this._notes)||void 0===e?void 0:e.length)>0?this._notes.filter((function(t){var e=t.meeting&&new Date(t.meeting);return e&&e.getFullYear()===n.now.getFullYear()&&e.getMonth()===n.now.getMonth()&&e.getDate()===n.now.getDate()})).map((function(t){return t.meeting})).sort((function(t,e){return new Date(t).getTime()-new Date(e).getTime()})):[];this.meetingCount=o.length,this.nextMeeting=o[0]},enumerable:!0,configurable:!0}),t.prototype.onSelectNote=function(t){this.selectNote.emit(t)},t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Db({type:t,selectors:[["app-home-page"]],inputs:{tagsData:"tagsData",notesLoading:"notesLoading",notesData:"notesData",notesError:"notesError"},outputs:{selectNote:"selectNote"},decls:62,vars:8,consts:[[3,"settings"],[1,"card"],[1,"card-title"],["va-article","home-summary","va-article-keywords","summary,schedule,routine","va-question","Should I go through your routine for the day?",1,"card-body","py-4"],[1,"sr-only"],[1,"row"],[1,"col-6","mb-3"],[1,"d-flex","align-items-center"],[1,"symbol","symbol-info","mr-3"],["aria-hidden","true",1,"fa","fa-calendar"],[1,"h6"],[1,"text-muted"],[1,"symbol","symbol-danger","mr-3"],["aria-hidden","true",1,"fa","fa-tasks"],[1,"col-6"],[1,"symbol","symbol-success","mr-3"],["aria-hidden","true",1,"fa","fa-newspaper-o"],[1,"symbol","symbol-primary","mr-3"],["aria-hidden","true",1,"fa","fa-comment-o"],["class","sr-only",4,"ngIf"],[3,"tags","isLoading","notes","error","selectNote"],["routerLink","/note",1,"btn","btn-float","btn-primary"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 512 512","aria-hidden","true",1,"add-note-icon"],["stroke-linecap","round","stroke-linejoin","round","d","M256 112v288M400 256H112"]],template:function(t,e){1&t&&(i.Ob(0,"app-header",0),i.nc(1,"My Home"),i.Nb(),i.Ob(2,"div"),i.Ob(3,"div",1),i.Ob(4,"div",2),i.nc(5,"Today's Stats"),i.Nb(),i.Ob(6,"div",3),i.Ob(7,"div",4),i.nc(8," Here's what your day looks like. You have "),i.Nb(),i.Ob(9,"div",5),i.Ob(10,"div",6),i.Ob(11,"div",7),i.Ob(12,"div",8),i.Kb(13,"i",9),i.Nb(),i.Ob(14,"div"),i.Ob(15,"div",10),i.nc(16),i.Nb(),i.Ob(17,"small",11),i.nc(18,"Meetings "),i.Ob(19,"span",4),i.nc(20,"scheduled, "),i.Nb(),i.Nb(),i.Nb(),i.Nb(),i.Nb(),i.Ob(21,"div",6),i.Ob(22,"div",7),i.Ob(23,"div",12),i.Kb(24,"i",13),i.Nb(),i.Ob(25,"div"),i.Ob(26,"div",10),i.nc(27,"0"),i.Nb(),i.Ob(28,"small",11),i.nc(29,"Tasks "),i.Ob(30,"span",4),i.nc(31,"due, "),i.Nb(),i.Nb(),i.Nb(),i.Nb(),i.Nb(),i.Ob(32,"div",14),i.Ob(33,"div",7),i.Ob(34,"div",15),i.Kb(35,"i",16),i.Nb(),i.Ob(36,"div"),i.Ob(37,"div",10),i.nc(38),i.Nb(),i.Ob(39,"small",11),i.nc(40," Notes "),i.Ob(41,"span",4),i.nc(42,"and "),i.Nb(),i.Nb(),i.Nb(),i.Nb(),i.Nb(),i.Ob(43,"div",14),i.Ob(44,"div",7),i.Ob(45,"div",17),i.Kb(46,"i",18),i.Nb(),i.Ob(47,"div"),i.Ob(48,"div",10),i.nc(49,"2"),i.Nb(),i.Ob(50,"small",11),i.nc(51,"Messages"),i.Ob(52,"span",4),i.nc(53,"."),i.Nb(),i.Nb(),i.Nb(),i.Nb(),i.Nb(),i.mc(54,h,3,4,"div",19),i.Nb(),i.Nb(),i.Nb(),i.Ob(55,"div",1),i.Ob(56,"div",2),i.nc(57,"Notes"),i.Nb(),i.Ob(58,"app-notes",20),i.Wb("selectNote",(function(t){return e.onSelectNote(t)})),i.Nb(),i.Nb(),i.Nb(),i.Ob(59,"a",21),i.Yb(),i.Ob(60,"svg",22),i.Kb(61,"path",23),i.Nb(),i.Nb()),2&t&&(i.fc("settings",!0),i.zb(16),i.oc(e.meetingCount),i.zb(22),i.oc((null==e.notesData?null:e.notesData.length)||0),i.zb(16),i.fc("ngIf",e.nextMeeting),i.zb(4),i.fc("tags",e.tagsData)("isLoading",e.notesLoading)("notes",e.notesData)("error",e.notesError))},directives:[l.a,o.l,p.a,a.g],pipes:[o.f],styles:[""],changeDetection:0}),t}(),g=[{path:"",component:function(){function t(t,e,n){this.platformId=t,this.store=e,this.appStore=n}return t.prototype.ngOnInit=function(){this.tagsData$=this.store.select(b.a),this.notesLoading$=this.store.select(s.e),this.notesData$=this.store.select(s.d),this.notesError$=this.store.select(s.c)},t.prototype.ngAfterViewInit=function(){var t;Object(o.p)(this.platformId)&&!this.appStore.isHomeLoadedOnce&&this.appStore.isAssistantActive&&(this.appStore.isHomeLoadedOnce=!0,this.store.dispatch(Object(c.c)({context:{type:"DOM",target:'[va-article="home-summary"]',text:null===(t=document.querySelector('[va-article="home-summary"]'))||void 0===t?void 0:t.getAttribute("va-question")}})))},t.prototype.onSelectNote=function(t){this.store.dispatch(Object(r.f)({id:t}))},t.\u0275fac=function(e){return new(e||t)(i.Jb(i.B),i.Jb(d.h),i.Jb(u.a))},t.\u0275cmp=i.Db({type:t,selectors:[["app-home-container"]],decls:5,vars:12,consts:[[3,"tagsData","notesLoading","notesData","notesError","selectNote"]],template:function(t,e){1&t&&(i.Ob(0,"app-home-page",0),i.Wb("selectNote",(function(t){return e.onSelectNote(t)})),i.ac(1,"async"),i.ac(2,"async"),i.ac(3,"async"),i.ac(4,"async"),i.Nb()),2&t&&i.fc("tagsData",i.bc(1,4,e.tagsData$))("notesLoading",i.bc(2,6,e.notesLoading$))("notesData",i.bc(3,8,e.notesData$))("notesError",i.bc(4,10,e.notesError$))},directives:[m],pipes:[o.b],encapsulation:2,changeDetection:0}),t}()}],f=function(){function t(){}return t.\u0275mod=i.Hb({type:t}),t.\u0275inj=i.Gb({factory:function(e){return new(e||t)},imports:[[a.h.forChild(g)],a.h]}),t}(),v=n("RXI8"),N=n("rehU"),O=function(){function t(){}return t.\u0275mod=i.Hb({type:t}),t.\u0275inj=i.Gb({factory:function(e){return new(e||t)},imports:[[o.c,f,v.a,N.a]]}),t}()}}]);