!function(){"use strict";function v(i,e){return Object.prototype.hasOwnProperty.call(i,e)}function q(i){return i[i.length-1]}function M(i,...e){return e.forEach(t=>{i.includes(t)||i.push(t)}),i}function J(i,e){return i?i.split(e):[]}function z(i,e,t){return(void 0===e||i>=e)&&(void 0===t||i<=t)}function ne(i,e,t){return i<e?e:i>t?t:i}function C(i,e,t={},r=0,a=""){a+=`<${Object.keys(t).reduce((n,d)=>{let c=t[d];return"function"==typeof c&&(c=c(r)),`${n} ${d}="${c}"`},i)}></${i}>`;const s=r+1;return s<e?C(i,e,t,s,a):a}function U(i){return i.replace(/>\s+/g,">").replace(/\s+</,"<")}function X(i){return new Date(i).setHours(0,0,0,0)}function S(){return(new Date).setHours(0,0,0,0)}function x(...i){switch(i.length){case 0:return S();case 1:return X(i[0])}const e=new Date(0);return e.setFullYear(...i),e.setHours(0,0,0,0)}function E(i,e){const t=new Date(i);return t.setDate(t.getDate()+e)}function j(i,e){const t=new Date(i),r=t.getMonth()+e;let a=r%12;a<0&&(a+=12);const s=t.setMonth(r);return t.getMonth()!==a?t.setDate(0):s}function F(i,e){const t=new Date(i),r=t.getMonth(),a=t.setFullYear(t.getFullYear()+e);return 1===r&&2===t.getMonth()?t.setDate(0):a}function de(i,e){return(i-e+7)%7}function _(i,e,t=0){const r=new Date(i).getDay();return E(i,de(e,t)-de(r,t))}function O(i,e){const t=new Date(i).getFullYear();return Math.floor(t/e)*e}const G=/dd?|DD?|mm?|MM?|yy?(?:yy)?/,Ee=/[\s!-/:-@[-`{-~\u5e74\u6708\u65e5]+/;let Q={};const oe={y:(i,e)=>new Date(i).setFullYear(parseInt(e,10)),m(i,e,t){const r=new Date(i);let a=parseInt(e,10)-1;if(isNaN(a)){if(!e)return NaN;const s=e.toLowerCase(),n=d=>d.toLowerCase().startsWith(s);if((a=t.monthsShort.findIndex(n))<0&&(a=t.months.findIndex(n)),a<0)return NaN}return r.setMonth(a),r.getMonth()!==function s(n){return n>-1?n%12:s(n+12)}(a)?r.setDate(0):r.getTime()},d:(i,e)=>new Date(i).setDate(parseInt(e,10))},Fe={d:i=>i.getDate(),dd:i=>K(i.getDate(),2),D:(i,e)=>e.daysShort[i.getDay()],DD:(i,e)=>e.days[i.getDay()],m:i=>i.getMonth()+1,mm:i=>K(i.getMonth()+1,2),M:(i,e)=>e.monthsShort[i.getMonth()],MM:(i,e)=>e.months[i.getMonth()],y:i=>i.getFullYear(),yy:i=>K(i.getFullYear(),2).slice(-2),yyyy:i=>K(i.getFullYear(),4)};function K(i,e){return i.toString().padStart(e,"0")}function ce(i){if("string"!=typeof i)throw new Error("Invalid date format.");if(i in Q)return Q[i];const e=i.split(G),t=i.match(new RegExp(G,"g"));if(0===e.length||!t)throw new Error("Invalid date format.");const r=t.map(s=>Fe[s]),a=Object.keys(oe).reduce((s,n)=>(t.find(d=>"D"!==d[0]&&d[0].toLowerCase()===n)&&s.push(n),s),[]);return Q[i]={parser(s,n){const d=s.split(Ee).reduce((c,h,u)=>{if(h.length>0&&t[u]){const o=t[u][0];"M"===o?c.m=h:"D"!==o&&(c[o]=h)}return c},{});return a.reduce((c,h)=>{const u=oe[h](c,d[h],n);return isNaN(u)?c:u},S())},formatter:(s,n)=>r.reduce((d,c,h)=>d+`${e[h]}${c(s,n)}`,"")+q(e)}}function L(i,e,t){if(i instanceof Date||"number"==typeof i){const r=X(i);return isNaN(r)?void 0:r}if(i){if("today"===i)return S();if(e&&e.toValue){const r=e.toValue(i,e,t);return isNaN(r)?void 0:X(r)}return ce(e).parser(i,t)}}function N(i,e,t){if(isNaN(i)||!i&&0!==i)return"";const r="number"==typeof i?new Date(i):i;return e.toDisplay?e.toDisplay(r,e,t):ce(e).formatter(r,t)}const H=new WeakMap,{addEventListener:Ve,removeEventListener:Le}=EventTarget.prototype;function Z(i,e){let t=H.get(i);t||(t=[],H.set(i,t)),e.forEach(r=>{Ve.call(...r),t.push(r)})}function le(i){let e=H.get(i);e&&(e.forEach(t=>{Le.call(...t)}),H.delete(i))}if(!Event.prototype.composedPath){const i=(e,t=[])=>{let r;return t.push(e),e.parentNode?r=e.parentNode:e.host?r=e.host:e.defaultView&&(r=e.defaultView),r?i(r,t):t};Event.prototype.composedPath=function(){return i(this.target)}}function he(i,e){const t="function"==typeof e?e:r=>r.matches(e);return function r(a,s,n,d=0){const c=a[d];return s(c)?c:c!==n&&c.parentElement?r(a,s,n,d+1):void 0}(i.composedPath(),t,i.currentTarget)}const B={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear",titleFormat:"MM y"}},ee={autohide:!1,beforeShowDay:null,beforeShowDecade:null,beforeShowMonth:null,beforeShowYear:null,calendarWeeks:!1,clearBtn:!1,dateDelimiter:",",datesDisabled:[],daysOfWeekDisabled:[],daysOfWeekHighlighted:[],defaultViewDate:void 0,disableTouchKeyboard:!1,format:"mm/dd/yyyy",language:"en",maxDate:null,maxNumberOfDates:1,maxView:3,minDate:null,nextArrow:'<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>',orientation:"auto",pickLevel:0,prevArrow:'<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/></svg>',showDaysOfWeek:!0,showOnClick:!0,showOnFocus:!0,startView:0,title:"",todayBtn:!1,todayBtnMode:0,todayHighlight:!1,updateOnBlur:!0,weekStart:0},Ne=document.createRange();function D(i){return Ne.createContextualFragment(i)}function A(i){"none"!==i.style.display&&(i.style.display&&(i.dataset.styleDisplay=i.style.display),i.style.display="none")}function Y(i){"none"===i.style.display&&(i.dataset.styleDisplay?(i.style.display=i.dataset.styleDisplay,delete i.dataset.styleDisplay):i.style.display="")}function T(i){i.firstChild&&(i.removeChild(i.firstChild),T(i))}const{language:te,format:Be,weekStart:Ae}=ee;function ue(i,e){return i.length<6&&e>=0&&e<7?M(i,e):i}function ge(i){return(i+6)%7}function fe(i,e,t,r){const a=L(i,e,t);return void 0!==a?a:r}function ie(i,e,t=3){const r=parseInt(i,10);return r>=0&&r<=t?r:e}function re(i,e){const t=Object.assign({},i),r={},a=e.constructor.locales;let{format:s,language:n,locale:d,maxDate:c,maxView:h,minDate:u,pickLevel:o,startView:l,weekStart:p}=e.config||{};if(t.language){let g;if(t.language!==n&&(a[t.language]?g=t.language:void 0===a[g=t.language.split("-")[0]]&&(g=!1)),delete t.language,g){n=r.language=g;const k=d||a[te];d=Object.assign({format:Be,weekStart:Ae},a[te]),n!==te&&Object.assign(d,a[n]),r.locale=d,s===k.format&&(s=r.format=d.format),p===k.weekStart&&(p=r.weekStart=d.weekStart,r.weekEnd=ge(d.weekStart))}}if(t.format){const g="function"==typeof t.format.toDisplay,k="function"==typeof t.format.toValue,I=G.test(t.format);(g&&k||I)&&(s=r.format=t.format),delete t.format}let y=u,f=c;if(void 0!==t.minDate&&(y=null===t.minDate?x(0,0,1):fe(t.minDate,s,d,y),delete t.minDate),void 0!==t.maxDate&&(f=null===t.maxDate?void 0:fe(t.maxDate,s,d,f),delete t.maxDate),f<y?(u=r.minDate=f,c=r.maxDate=y):(u!==y&&(u=r.minDate=y),c!==f&&(c=r.maxDate=f)),t.datesDisabled&&(r.datesDisabled=t.datesDisabled.reduce((g,k)=>{const I=L(k,s,d);return void 0!==I?M(g,I):g},[]),delete t.datesDisabled),void 0!==t.defaultViewDate){const g=L(t.defaultViewDate,s,d);void 0!==g&&(r.defaultViewDate=g),delete t.defaultViewDate}if(void 0!==t.weekStart){const g=Number(t.weekStart)%7;isNaN(g)||(p=r.weekStart=g,r.weekEnd=ge(g)),delete t.weekStart}if(t.daysOfWeekDisabled&&(r.daysOfWeekDisabled=t.daysOfWeekDisabled.reduce(ue,[]),delete t.daysOfWeekDisabled),t.daysOfWeekHighlighted&&(r.daysOfWeekHighlighted=t.daysOfWeekHighlighted.reduce(ue,[]),delete t.daysOfWeekHighlighted),void 0!==t.maxNumberOfDates){const g=parseInt(t.maxNumberOfDates,10);g>=0&&(r.maxNumberOfDates=g,r.multidate=1!==g),delete t.maxNumberOfDates}t.dateDelimiter&&(r.dateDelimiter=String(t.dateDelimiter),delete t.dateDelimiter);let b=o;void 0!==t.pickLevel&&(b=ie(t.pickLevel,2),delete t.pickLevel),b!==o&&(o=r.pickLevel=b);let m=h;void 0!==t.maxView&&(m=ie(t.maxView,h),delete t.maxView),(m=o>m?o:m)!==h&&(h=r.maxView=m);let w=l;if(void 0!==t.startView&&(w=ie(t.startView,w),delete t.startView),w<o?w=o:w>h&&(w=h),w!==l&&(r.startView=w),t.prevArrow){const g=D(t.prevArrow);g.childNodes.length>0&&(r.prevArrow=g.childNodes),delete t.prevArrow}if(t.nextArrow){const g=D(t.nextArrow);g.childNodes.length>0&&(r.nextArrow=g.childNodes),delete t.nextArrow}if(void 0!==t.disableTouchKeyboard&&(r.disableTouchKeyboard="ontouchstart"in document&&!!t.disableTouchKeyboard,delete t.disableTouchKeyboard),t.orientation){const g=t.orientation.toLowerCase().split(/\s+/g);r.orientation={x:g.find(k=>"left"===k||"right"===k)||"auto",y:g.find(k=>"top"===k||"bottom"===k)||"auto"},delete t.orientation}if(void 0!==t.todayBtnMode){switch(t.todayBtnMode){case 0:case 1:r.todayBtnMode=t.todayBtnMode}delete t.todayBtnMode}return Object.keys(t).forEach(g=>{void 0!==t[g]&&v(ee,g)&&(r[g]=t[g])}),r}const Ye=U('<div class="datepicker hidden">\n  <div class="datepicker-picker inline-block rounded-lg bg-white dark:bg-gray-700 shadow-lg p-4">\n    <div class="datepicker-header">\n      <div class="datepicker-title bg-white dark:bg-gray-700 dark:text-white px-2 py-3 text-center font-semibold"></div>\n      <div class="datepicker-controls flex justify-between mb-2">\n        <button type="button" class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 prev-btn"></button>\n        <button type="button" class="text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch"></button>\n        <button type="button" class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 next-btn"></button>\n      </div>\n    </div>\n    <div class="datepicker-main p-1"></div>\n    <div class="datepicker-footer">\n      <div class="datepicker-controls flex space-x-2 rtl:space-x-reverse mt-2">\n        <button type="button" class="%buttonClass% today-btn text-white bg-blue-700 !bg-primary-700 dark:bg-blue-600 dark:!bg-primary-600 hover:bg-blue-800 hover:!bg-primary-800 dark:hover:bg-blue-700 dark:hover:!bg-primary-700 focus:ring-4 focus:ring-blue-300 focus:!ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>\n        <button type="button" class="%buttonClass% clear-btn text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 focus:!ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>\n      </div>\n    </div>\n  </div>\n</div>'),We=U(`<div class="days">\n  <div class="days-of-week grid grid-cols-7 mb-1">${C("span",7,{class:"dow block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm"})}</div>\n  <div class="datepicker-grid w-64 grid grid-cols-7">${C("span",42,{class:"block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400"})}</div>\n</div>`),je=U(`<div class="calendar-weeks">\n  <div class="days-of-week flex"><span class="dow h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400"></span></div>\n  <div class="weeks">${C("span",6,{class:"week block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm"})}</div>\n</div>`);class ae{constructor(e,t){Object.assign(this,t,{picker:e,element:D('<div class="datepicker-view flex"></div>').firstChild,selected:[]}),this.init(this.picker.datepicker.config)}init(e){void 0!==e.pickLevel&&(this.isMinView=this.id===e.pickLevel),this.setOptions(e),this.updateFocus(),this.updateSelection()}performBeforeHook(e,t,r){let a=this.beforeShow(new Date(r));switch(typeof a){case"boolean":a={enabled:a};break;case"string":a={classes:a}}if(a){if(!1===a.enabled&&(e.classList.add("disabled"),M(this.disabled,t)),a.classes){const s=a.classes.split(/\s+/);e.classList.add(...s),s.includes("disabled")&&M(this.disabled,t)}a.content&&(n=a.content,T(s=e),n instanceof DocumentFragment?s.appendChild(n):"string"==typeof n?s.appendChild(D(n)):"function"==typeof n.forEach&&n.forEach(d=>{s.appendChild(d)}))}var s,n}}class _e extends ae{constructor(e){super(e,{id:0,name:"days",cellClass:"day"})}init(e,t=!0){if(t){const r=D(We).firstChild;this.dow=r.firstChild,this.grid=r.lastChild,this.element.appendChild(r)}super.init(e)}setOptions(e){let t;if(v(e,"minDate")&&(this.minDate=e.minDate),v(e,"maxDate")&&(this.maxDate=e.maxDate),e.datesDisabled&&(this.datesDisabled=e.datesDisabled),e.daysOfWeekDisabled&&(this.daysOfWeekDisabled=e.daysOfWeekDisabled,t=!0),e.daysOfWeekHighlighted&&(this.daysOfWeekHighlighted=e.daysOfWeekHighlighted),void 0!==e.todayHighlight&&(this.todayHighlight=e.todayHighlight),void 0!==e.weekStart&&(this.weekStart=e.weekStart,this.weekEnd=e.weekEnd,t=!0),e.locale){const r=this.locale=e.locale;this.dayNames=r.daysMin,this.switchLabelFormat=r.titleFormat,t=!0}if(void 0!==e.beforeShowDay&&(this.beforeShow="function"==typeof e.beforeShowDay?e.beforeShowDay:void 0),void 0!==e.calendarWeeks)if(e.calendarWeeks&&!this.calendarWeeks){const r=D(je).firstChild;this.calendarWeeks={element:r,dow:r.firstChild,weeks:r.lastChild},this.element.insertBefore(r,this.element.firstChild)}else this.calendarWeeks&&!e.calendarWeeks&&(this.element.removeChild(this.calendarWeeks.element),this.calendarWeeks=null);void 0!==e.showDaysOfWeek&&(e.showDaysOfWeek?(Y(this.dow),this.calendarWeeks&&Y(this.calendarWeeks.dow)):(A(this.dow),this.calendarWeeks&&A(this.calendarWeeks.dow))),t&&Array.from(this.dow.children).forEach((r,a)=>{const s=(this.weekStart+a)%7;r.textContent=this.dayNames[s],r.className=this.daysOfWeekDisabled.includes(s)?"dow disabled text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed":"dow text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400"})}updateFocus(){const e=new Date(this.picker.viewDate),t=e.getFullYear(),r=e.getMonth(),a=x(t,r,1),s=_(a,this.weekStart,this.weekStart);this.first=a,this.last=x(t,r+1,0),this.start=s,this.focused=this.picker.viewDate}updateSelection(){const{dates:e,rangepicker:t}=this.picker.datepicker;this.selected=e,t&&(this.range=t.dates)}render(){this.today=this.todayHighlight?S():void 0,this.disabled=[...this.datesDisabled];const e=N(this.focused,this.switchLabelFormat,this.locale);if(this.picker.setViewSwitchLabel(e),this.picker.setPrevBtnDisabled(this.first<=this.minDate),this.picker.setNextBtnDisabled(this.last>=this.maxDate),this.calendarWeeks){const t=_(this.first,1,1);Array.from(this.calendarWeeks.weeks.children).forEach((r,a)=>{r.textContent=function(s){const n=_(s,4,1),d=_(new Date(n).setMonth(0,4),4,1);return Math.round((n-d)/6048e5)+1}(E(t,7*a))})}Array.from(this.grid.children).forEach((t,r)=>{const a=t.classList,s=E(this.start,r),n=new Date(s),d=n.getDay();if(t.className=`datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ${this.cellClass}`,t.dataset.date=s,t.textContent=n.getDate(),s<this.first?a.add("prev","text-gray-500","dark:text-white"):s>this.last&&a.add("next","text-gray-500","dark:text-white"),this.today===s&&a.add("today","bg-gray-100","dark:bg-gray-600"),(s<this.minDate||s>this.maxDate||this.disabled.includes(s))&&a.add("disabled","cursor-not-allowed"),this.daysOfWeekDisabled.includes(d)&&(a.add("disabled","cursor-not-allowed"),M(this.disabled,s)),this.daysOfWeekHighlighted.includes(d)&&a.add("highlighted"),this.range){const[c,h]=this.range;s>c&&s<h&&(a.add("range","bg-gray-200","dark:bg-gray-600"),a.remove("rounded-lg","rounded-l-lg","rounded-r-lg")),s===c&&(a.add("range-start","bg-gray-100","dark:bg-gray-600","rounded-l-lg"),a.remove("rounded-lg","rounded-r-lg")),s===h&&(a.add("range-end","bg-gray-100","dark:bg-gray-600","rounded-r-lg"),a.remove("rounded-lg","rounded-l-lg"))}this.selected.includes(s)&&(a.add("selected","bg-blue-700","!bg-primary-700","text-white","dark:bg-blue-600","dark:!bg-primary-600","dark:text-white"),a.remove("text-gray-900","text-gray-500","hover:bg-gray-100","dark:text-white","dark:hover:bg-gray-600","dark:bg-gray-600","bg-gray-100","bg-gray-200")),s===this.focused&&a.add("focused"),this.beforeShow&&this.performBeforeHook(t,s,s)})}refresh(){const[e,t]=this.range||[];this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach(r=>{r.classList.remove("range","range-start","range-end","selected","bg-blue-700","!bg-primary-700","text-white","dark:bg-blue-600","dark:!bg-primary-600","dark:text-white","focused"),r.classList.add("text-gray-900","rounded-lg","dark:text-white")}),Array.from(this.grid.children).forEach(r=>{const a=Number(r.dataset.date),s=r.classList;s.remove("bg-gray-200","dark:bg-gray-600","rounded-l-lg","rounded-r-lg"),a>e&&a<t&&(s.add("range","bg-gray-200","dark:bg-gray-600"),s.remove("rounded-lg")),a===e&&(s.add("range-start","bg-gray-200","dark:bg-gray-600","rounded-l-lg"),s.remove("rounded-lg","rounded-r-lg")),a===t&&(s.add("range-end","bg-gray-200","dark:bg-gray-600","rounded-r-lg"),s.remove("rounded-lg","rounded-l-lg")),this.selected.includes(a)&&(s.add("selected","bg-blue-700","!bg-primary-700","text-white","dark:bg-blue-600","dark:!bg-primary-600","dark:text-white"),s.remove("text-gray-900","hover:bg-gray-100","dark:text-white","dark:hover:bg-gray-600","bg-gray-100","bg-gray-200","dark:bg-gray-600")),a===this.focused&&s.add("focused")})}refreshFocus(){const e=Math.round((this.focused-this.start)/864e5);this.grid.querySelectorAll(".focused").forEach(t=>{t.classList.remove("focused")}),this.grid.children[e].classList.add("focused")}}function pe(i,e){if(!i||!i[0]||!i[1])return;const[[t,r],[a,s]]=i;return t>e||a<e?void 0:[t===e?r:-1,a===e?s:12]}class Ke extends ae{constructor(e){super(e,{id:1,name:"months",cellClass:"month"})}init(e,t=!0){t&&(this.grid=this.element,this.element.classList.add("months","datepicker-grid","w-64","grid","grid-cols-4"),this.grid.appendChild(D(C("span",12,{"data-month":r=>r})))),super.init(e)}setOptions(e){if(e.locale&&(this.monthNames=e.locale.monthsShort),v(e,"minDate"))if(void 0===e.minDate)this.minYear=this.minMonth=this.minDate=void 0;else{const t=new Date(e.minDate);this.minYear=t.getFullYear(),this.minMonth=t.getMonth(),this.minDate=t.setDate(1)}if(v(e,"maxDate"))if(void 0===e.maxDate)this.maxYear=this.maxMonth=this.maxDate=void 0;else{const t=new Date(e.maxDate);this.maxYear=t.getFullYear(),this.maxMonth=t.getMonth(),this.maxDate=x(this.maxYear,this.maxMonth+1,0)}void 0!==e.beforeShowMonth&&(this.beforeShow="function"==typeof e.beforeShowMonth?e.beforeShowMonth:void 0)}updateFocus(){const e=new Date(this.picker.viewDate);this.year=e.getFullYear(),this.focused=e.getMonth()}updateSelection(){const{dates:e,rangepicker:t}=this.picker.datepicker;this.selected=e.reduce((r,a)=>{const s=new Date(a),n=s.getFullYear(),d=s.getMonth();return void 0===r[n]?r[n]=[d]:M(r[n],d),r},{}),t&&t.dates&&(this.range=t.dates.map(r=>{const a=new Date(r);return isNaN(a)?void 0:[a.getFullYear(),a.getMonth()]}))}render(){this.disabled=[],this.picker.setViewSwitchLabel(this.year),this.picker.setPrevBtnDisabled(this.year<=this.minYear),this.picker.setNextBtnDisabled(this.year>=this.maxYear);const e=this.selected[this.year]||[],t=this.year<this.minYear||this.year>this.maxYear,r=this.year===this.minYear,a=this.year===this.maxYear,s=pe(this.range,this.year);Array.from(this.grid.children).forEach((n,d)=>{const c=n.classList,h=x(this.year,d,1);if(n.className=`datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ${this.cellClass}`,this.isMinView&&(n.dataset.date=h),n.textContent=this.monthNames[d],(t||r&&d<this.minMonth||a&&d>this.maxMonth)&&c.add("disabled"),s){const[u,o]=s;d>u&&d<o&&c.add("range"),d===u&&c.add("range-start"),d===o&&c.add("range-end")}e.includes(d)&&(c.add("selected","bg-blue-700","!bg-primary-700","text-white","dark:bg-blue-600","dark:!bg-primary-600","dark:text-white"),c.remove("text-gray-900","hover:bg-gray-100","dark:text-white","dark:hover:bg-gray-600")),d===this.focused&&c.add("focused"),this.beforeShow&&this.performBeforeHook(n,d,h)})}refresh(){const e=this.selected[this.year]||[],[t,r]=pe(this.range,this.year)||[];this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach(a=>{a.classList.remove("range","range-start","range-end","selected","bg-blue-700","!bg-primary-700","dark:bg-blue-600","dark:!bg-primary-700","dark:text-white","text-white","focused"),a.classList.add("text-gray-900","hover:bg-gray-100","dark:text-white","dark:hover:bg-gray-600")}),Array.from(this.grid.children).forEach((a,s)=>{const n=a.classList;s>t&&s<r&&n.add("range"),s===t&&n.add("range-start"),s===r&&n.add("range-end"),e.includes(s)&&(n.add("selected","bg-blue-700","!bg-primary-700","text-white","dark:bg-blue-600","dark:!bg-primary-600","dark:text-white"),n.remove("text-gray-900","hover:bg-gray-100","dark:text-white","dark:hover:bg-gray-600")),s===this.focused&&n.add("focused")})}refreshFocus(){this.grid.querySelectorAll(".focused").forEach(e=>{e.classList.remove("focused")}),this.grid.children[this.focused].classList.add("focused")}}class me extends ae{constructor(e,t){super(e,t)}init(e,t=!0){var r;t&&(this.navStep=10*this.step,this.beforeShowOption=`beforeShow${r=this.cellClass,[...r].reduce((a,s,n)=>a+(n?s:s.toUpperCase()),"")}`,this.grid=this.element,this.element.classList.add(this.name,"datepicker-grid","w-64","grid","grid-cols-4"),this.grid.appendChild(D(C("span",12)))),super.init(e)}setOptions(e){if(v(e,"minDate")&&(void 0===e.minDate?this.minYear=this.minDate=void 0:(this.minYear=O(e.minDate,this.step),this.minDate=x(this.minYear,0,1))),v(e,"maxDate")&&(void 0===e.maxDate?this.maxYear=this.maxDate=void 0:(this.maxYear=O(e.maxDate,this.step),this.maxDate=x(this.maxYear,11,31))),void 0!==e[this.beforeShowOption]){const t=e[this.beforeShowOption];this.beforeShow="function"==typeof t?t:void 0}}updateFocus(){const e=new Date(this.picker.viewDate),t=O(e,this.navStep),r=t+9*this.step;this.first=t,this.last=r,this.start=t-this.step,this.focused=O(e,this.step)}updateSelection(){const{dates:e,rangepicker:t}=this.picker.datepicker;this.selected=e.reduce((r,a)=>M(r,O(a,this.step)),[]),t&&t.dates&&(this.range=t.dates.map(r=>{if(void 0!==r)return O(r,this.step)}))}render(){this.disabled=[],this.picker.setViewSwitchLabel(`${this.first}-${this.last}`),this.picker.setPrevBtnDisabled(this.first<=this.minYear),this.picker.setNextBtnDisabled(this.last>=this.maxYear),Array.from(this.grid.children).forEach((e,t)=>{const r=e.classList,a=this.start+t*this.step,s=x(a,0,1);if(e.className=`datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ${this.cellClass}`,this.isMinView&&(e.dataset.date=s),e.textContent=e.dataset.year=a,0===t?r.add("prev"):11===t&&r.add("next"),(a<this.minYear||a>this.maxYear)&&r.add("disabled"),this.range){const[n,d]=this.range;a>n&&a<d&&r.add("range"),a===n&&r.add("range-start"),a===d&&r.add("range-end")}this.selected.includes(a)&&(r.add("selected","bg-blue-700","!bg-primary-700","text-white","dark:bg-blue-600","dark:!bg-primary-600","dark:text-white"),r.remove("text-gray-900","hover:bg-gray-100","dark:text-white","dark:hover:bg-gray-600")),a===this.focused&&r.add("focused"),this.beforeShow&&this.performBeforeHook(e,a,s)})}refresh(){const[e,t]=this.range||[];this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach(r=>{r.classList.remove("range","range-start","range-end","selected","bg-blue-700","!bg-primary-700","text-white","dark:bg-blue-600","dark!bg-primary-600","dark:text-white","focused")}),Array.from(this.grid.children).forEach(r=>{const a=Number(r.textContent),s=r.classList;a>e&&a<t&&s.add("range"),a===e&&s.add("range-start"),a===t&&s.add("range-end"),this.selected.includes(a)&&(s.add("selected","bg-blue-700","!bg-primary-700","text-white","dark:bg-blue-600","dark:!bg-primary-600","dark:text-white"),s.remove("text-gray-900","hover:bg-gray-100","dark:text-white","dark:hover:bg-gray-600")),a===this.focused&&s.add("focused")})}refreshFocus(){const e=Math.round((this.focused-this.start)/this.step);this.grid.querySelectorAll(".focused").forEach(t=>{t.classList.remove("focused")}),this.grid.children[e].classList.add("focused")}}function V(i,e){const t={date:i.getDate(),viewDate:new Date(i.picker.viewDate),viewId:i.picker.currentView.id,datepicker:i};i.element.dispatchEvent(new CustomEvent(e,{detail:t}))}function $(i,e){const{minDate:t,maxDate:r}=i.config,{currentView:a,viewDate:s}=i.picker;let n;switch(a.id){case 0:n=j(s,e);break;case 1:n=F(s,e);break;default:n=F(s,e*a.navStep)}n=ne(n,t,r),i.picker.changeFocus(n).render()}function be(i){const e=i.picker.currentView.id;e!==i.config.maxView&&i.picker.changeView(e+1).render()}function ye(i){i.config.updateOnBlur?i.update({autohide:!0}):(i.refresh("input"),i.hide())}function we(i,e){if(void 0!==e.title&&(e.title?(i.controls.title.textContent=e.title,Y(i.controls.title)):(i.controls.title.textContent="",A(i.controls.title))),e.prevArrow){const t=i.controls.prevBtn;T(t),e.prevArrow.forEach(r=>{t.appendChild(r.cloneNode(!0))})}if(e.nextArrow){const t=i.controls.nextBtn;T(t),e.nextArrow.forEach(r=>{t.appendChild(r.cloneNode(!0))})}if(e.locale&&(i.controls.todayBtn.textContent=e.locale.today,i.controls.clearBtn.textContent=e.locale.clear),void 0!==e.todayBtn&&(e.todayBtn?Y(i.controls.todayBtn):A(i.controls.todayBtn)),v(e,"minDate")||v(e,"maxDate")){const{minDate:t,maxDate:r}=i.datepicker.config;i.controls.todayBtn.disabled=!z(S(),t,r)}void 0!==e.clearBtn&&(e.clearBtn?Y(i.controls.clearBtn):A(i.controls.clearBtn))}function ke(i){const{dates:e,config:t}=i;return ne(e.length>0?q(e):t.defaultViewDate,t.minDate,t.maxDate)}function ve(i,e){const t=new Date(i.viewDate),r=new Date(e),{id:a,year:s,first:n,last:d}=i.currentView,c=r.getFullYear();switch(i.viewDate=e,c!==t.getFullYear()&&V(i.datepicker,"changeYear"),r.getMonth()!==t.getMonth()&&V(i.datepicker,"changeMonth"),a){case 0:return e<n||e>d;case 1:return c!==s;default:return c<n||c>d}}function se(i){return window.getComputedStyle(i).direction}class Te{constructor(e){this.datepicker=e;const t=Ye.replace(/%buttonClass%/g,e.config.buttonClass),r=this.element=D(t).firstChild,[a,s,n]=r.firstChild.children,d=a.firstElementChild,[c,h,u]=a.lastElementChild.children,[o,l]=n.firstChild.children,p={title:d,prevBtn:c,viewSwitch:h,nextBtn:u,todayBtn:o,clearBtn:l};this.main=s,this.controls=p;const y=e.inline?"inline":"dropdown";r.classList.add(`datepicker-${y}`),"dropdown"===y&&r.classList.add("dropdown","absolute","top-0","left-0","z-50","pt-2"),we(this,e.config),this.viewDate=ke(e),Z(e,[[r,"click",function(f){f.inline||f.config.disableTouchKeyboard||f.inputField.focus()}.bind(null,e),{capture:!0}],[s,"click",function(f,b){const m=he(b,".datepicker-cell");if(!m||m.classList.contains("disabled"))return;const{id:w,isMinView:g}=f.picker.currentView;g?f.setDate(Number(m.dataset.date)):function He(i,e){const t=i.picker,r=new Date(t.viewDate),a=t.currentView.id,s=1===a?j(r,e-r.getMonth()):F(r,e-r.getFullYear());t.changeFocus(s).changeView(a-1).render()}(f,Number(1===w?m.dataset.month:m.dataset.year))}.bind(null,e)],[p.viewSwitch,"click",function(f){be(f)}.bind(null,e)],[p.prevBtn,"click",function(f){$(f,-1)}.bind(null,e)],[p.nextBtn,"click",function(f){$(f,1)}.bind(null,e)],[p.todayBtn,"click",function(f){const b=f.picker,m=S();if(1===f.config.todayBtnMode){if(f.config.autohide)return void f.setDate(m);f.setDate(m,{render:!1}),b.update()}b.viewDate!==m&&b.changeFocus(m),b.changeView(0).render()}.bind(null,e)],[p.clearBtn,"click",function(f){f.setDate({clear:!0})}.bind(null,e)]]),this.views=[new _e(this),new Ke(this),new me(this,{id:2,name:"years",cellClass:"year",step:1}),new me(this,{id:3,name:"decades",cellClass:"decade",step:10})],this.currentView=this.views[e.config.startView],this.currentView.render(),this.main.appendChild(this.currentView.element),e.config.container.appendChild(this.element)}setOptions(e){we(this,e),this.views.forEach(t=>{t.init(e,!1)}),this.currentView.render()}detach(){this.datepicker.config.container.removeChild(this.element)}show(){if(this.active)return;this.element.classList.add("active","block"),this.element.classList.remove("hidden"),this.active=!0;const e=this.datepicker;if(!e.inline){const t=se(e.inputField);t!==se(e.config.container)?this.element.dir=t:this.element.dir&&this.element.removeAttribute("dir"),this.place(),e.config.disableTouchKeyboard&&e.inputField.blur()}V(e,"show")}hide(){this.active&&(this.datepicker.exitEditMode(),this.element.classList.remove("active","block"),this.element.classList.add("active","block","hidden"),this.active=!1,V(this.datepicker,"hide"))}place(){const{classList:e,style:t}=this.element,{config:r,inputField:a}=this.datepicker,s=r.container,{width:n,height:d}=this.element.getBoundingClientRect(),{left:c,top:h,width:u}=s.getBoundingClientRect(),{left:o,top:l,width:p,height:y}=a.getBoundingClientRect();let f,b,m,{x:w,y:g}=r.orientation;s===document.body?(f=window.scrollY,b=o+window.scrollX,m=l+f):(b=o-c,m=l-h+(f=s.scrollTop)),"auto"===w&&(b<0?(w="left",b=10):w=b+n>u||"rtl"===se(a)?"right":"left"),"right"===w&&(b-=n-p),"auto"===g&&(g=m-d<f?"bottom":"top"),"top"===g?m-=d:m+=y,e.remove("datepicker-orient-top","datepicker-orient-bottom","datepicker-orient-right","datepicker-orient-left"),e.add(`datepicker-orient-${g}`,`datepicker-orient-${w}`),t.top=m&&`${m}px`,t.left=b&&`${b}px`}setViewSwitchLabel(e){this.controls.viewSwitch.textContent=e}setPrevBtnDisabled(e){this.controls.prevBtn.disabled=e}setNextBtnDisabled(e){this.controls.nextBtn.disabled=e}changeView(e){const t=this.currentView,r=this.views[e];return r.id!==t.id&&(this.currentView=r,this._renderMethod="render",V(this.datepicker,"changeView"),this.main.replaceChild(r.element,t.element)),this}changeFocus(e){return this._renderMethod=ve(this,e)?"render":"refreshFocus",this.views.forEach(t=>{t.updateFocus()}),this}update(){const e=ke(this.datepicker);return this._renderMethod=ve(this,e)?"render":"refresh",this.views.forEach(t=>{t.updateFocus(),t.updateSelection()}),this}render(e=!0){const t=e&&this._renderMethod||"render";delete this._renderMethod,this.currentView[t]()}}function P(i,e,t,r){const a=i.picker,s=a.currentView,n=s.step||1;let d,c,h=a.viewDate;switch(s.id){case 0:h=r?E(h,7*t):e.ctrlKey||e.metaKey?F(h,t):E(h,t),d=E,c=u=>s.disabled.includes(u);break;case 1:h=j(h,r?4*t:t),d=j,c=u=>{const o=new Date(u),{year:l,disabled:p}=s;return o.getFullYear()===l&&p.includes(o.getMonth())};break;default:h=F(h,t*(r?4:1)*n),d=F,c=u=>s.disabled.includes(O(u,n))}void 0!==(h=function u(o,l,p,y,f,b){if(z(o,f,b))return y(o)?u(l(o,p),l,p,y,f,b):o}(h,d,t<0?-n:n,c,s.minDate,s.maxDate))&&a.changeFocus(h).render()}function De(i,e){return i.map(t=>N(t,e.format,e.locale)).join(e.dateDelimiter)}function xe(i,e,t=!1){const{config:r,dates:a,rangepicker:s}=i;if(0===e.length)return t?[]:void 0;const n=s&&i===s.datepickers[1];let d=e.reduce((c,h)=>{let u=L(h,r.format,r.locale);if(void 0===u)return c;if(r.pickLevel>0){const o=new Date(u);u=1===r.pickLevel?n?o.setMonth(o.getMonth()+1,0):o.setDate(1):n?o.setFullYear(o.getFullYear()+1,0,0):o.setMonth(0,1)}return!z(u,r.minDate,r.maxDate)||c.includes(u)||r.datesDisabled.includes(u)||r.daysOfWeekDisabled.includes(new Date(u).getDay())||c.push(u),c},[]);return 0!==d.length?(r.multidate&&!t&&(d=d.reduce((c,h)=>(a.includes(h)||c.push(h),c),a.filter(c=>!d.includes(c)))),r.maxNumberOfDates&&d.length>r.maxNumberOfDates?d.slice(-1*r.maxNumberOfDates):d):void 0}function R(i,e=3,t=!0){const{config:r,picker:a,inputField:s}=i;if(2&e){const n=a.active?r.pickLevel:r.startView;a.update().changeView(n).render(t)}1&e&&s&&(s.value=De(i.dates,r))}function Me(i,e,t){let{clear:r,render:a,autohide:s}=t;void 0===a&&(a=!0),a?void 0===s&&(s=i.config.autohide):s=!1;const n=xe(i,e,r);n&&(n.toString()!==i.dates.toString()?(i.dates=n,R(i,a?3:1),V(i,"changeDate")):R(i,1),s&&i.hide())}class Se{constructor(e,t={},r){e.datepicker=this,this.element=e;const a=this.config=Object.assign({buttonClass:t.buttonClass&&String(t.buttonClass)||"button",container:document.body,defaultViewDate:S(),maxDate:void 0,minDate:void 0},re(ee,this));this._options=t,Object.assign(a,re(t,this));const s=this.inline="INPUT"!==e.tagName;let n,d;if(s)a.container=e,d=J(e.dataset.date,a.dateDelimiter),delete e.dataset.date;else{const u=t.container?document.querySelector(t.container):null;u&&(a.container=u),(n=this.inputField=e).classList.add("datepicker-input"),d=J(n.value,a.dateDelimiter)}if(r){const u=r.inputs.indexOf(n),o=r.datepickers;if(u<0||u>1||!Array.isArray(o))throw Error("Invalid rangepicker object.");o[u]=this,Object.defineProperty(this,"rangepicker",{get:()=>r})}this.dates=[];const c=xe(this,d);c&&c.length>0&&(this.dates=c),n&&(n.value=De(this.dates,a));const h=this.picker=new Te(this);if(s)this.show();else{const u=function(o,l){const p=o.element;if(p!==document.activeElement)return;const y=o.picker.element;he(l,f=>f===p||f===y)||ye(o)}.bind(null,this);Z(this,[[n,"keydown",function(o,l){if("Tab"===l.key)return void ye(o);const p=o.picker,{id:y,isMinView:f}=p.currentView;if(p.active)if(o.editMode)switch(l.key){case"Escape":p.hide();break;case"Enter":o.exitEditMode({update:!0,autohide:o.config.autohide});break;default:return}else switch(l.key){case"Escape":p.hide();break;case"ArrowLeft":if(l.ctrlKey||l.metaKey)$(o,-1);else{if(l.shiftKey)return void o.enterEditMode();P(o,l,-1,!1)}break;case"ArrowRight":if(l.ctrlKey||l.metaKey)$(o,1);else{if(l.shiftKey)return void o.enterEditMode();P(o,l,1,!1)}break;case"ArrowUp":if(l.ctrlKey||l.metaKey)be(o);else{if(l.shiftKey)return void o.enterEditMode();P(o,l,-1,!0)}break;case"ArrowDown":if(l.shiftKey&&!l.ctrlKey&&!l.metaKey)return void o.enterEditMode();P(o,l,1,!0);break;case"Enter":f?o.setDate(p.viewDate):p.changeView(y-1).render();break;case"Backspace":case"Delete":return void o.enterEditMode();default:return void(1!==l.key.length||l.ctrlKey||l.metaKey||o.enterEditMode())}else switch(l.key){case"ArrowDown":case"Escape":p.show();break;case"Enter":o.update();break;default:return}l.preventDefault(),l.stopPropagation()}.bind(null,this)],[n,"focus",function(o){o.config.showOnFocus&&!o._showing&&o.show()}.bind(null,this)],[n,"mousedown",function(o,l){const p=l.target;(o.picker.active||o.config.showOnClick)&&(p._active=p===document.activeElement,p._clicking=setTimeout(()=>{delete p._active,delete p._clicking},2e3))}.bind(null,this)],[n,"click",function(o,l){const p=l.target;p._clicking&&(clearTimeout(p._clicking),delete p._clicking,p._active&&o.enterEditMode(),delete p._active,o.config.showOnClick&&o.show())}.bind(null,this)],[n,"paste",function(o,l){l.clipboardData.types.includes("text/plain")&&o.enterEditMode()}.bind(null,this)],[document,"mousedown",u],[document,"touchstart",u],[window,"resize",h.place.bind(h)]])}}static formatDate(e,t,r){return N(e,t,r&&B[r]||B.en)}static parseDate(e,t,r){return L(e,t,r&&B[r]||B.en)}static get locales(){return B}get active(){return!(!this.picker||!this.picker.active)}get pickerElement(){return this.picker?this.picker.element:void 0}setOptions(e){const t=this.picker,r=re(e,this);Object.assign(this._options,e),Object.assign(this.config,r),t.setOptions(r),R(this,3)}show(){if(this.inputField){if(this.inputField.disabled)return;this.inputField!==document.activeElement&&(this._showing=!0,this.inputField.focus(),delete this._showing)}this.picker.show()}hide(){this.inline||(this.picker.hide(),this.picker.update().changeView(this.config.startView).render())}destroy(){return this.hide(),le(this),this.picker.detach(),this.inline||this.inputField.classList.remove("datepicker-input"),delete this.element.datepicker,this}getDate(e){const t=e?r=>N(r,e,this.config.locale):r=>new Date(r);return this.config.multidate?this.dates.map(t):this.dates.length>0?t(this.dates[0]):void 0}setDate(...e){const t=[...e],r={},a=q(e);"object"!=typeof a||Array.isArray(a)||a instanceof Date||!a||Object.assign(r,t.pop()),Me(this,Array.isArray(t[0])?t[0]:t,r)}update(e){if(this.inline)return;const t={clear:!0,autohide:!(!e||!e.autohide)};Me(this,J(this.inputField.value,this.config.dateDelimiter),t)}refresh(e,t=!1){let r;e&&"string"!=typeof e&&(t=e,e=void 0),R(this,r="picker"===e?2:"input"===e?1:3,!t)}enterEditMode(){this.inline||!this.picker.active||this.editMode||(this.editMode=!0,this.inputField.classList.add("in-edit","border-blue-700","!border-primary-700"))}exitEditMode(e){if(this.inline||!this.editMode)return;const t=Object.assign({update:!1},e);delete this.editMode,this.inputField.classList.remove("in-edit","border-blue-700","!border-primary-700"),t.update&&this.update(t)}}function Oe(i){const e=Object.assign({},i);return delete e.inputs,delete e.allowOneSidedRange,delete e.maxNumberOfDates,e}function Ce(i,e,t,r){Z(i,[[t,"changeDate",e]]),new Se(t,r,i)}function W(i,e){if(i._updating)return;i._updating=!0;const t=e.target;if(void 0===t.datepicker)return;const r=i.datepickers,a={render:!1},s=i.inputs.indexOf(t),n=0===s?1:0,d=r[s].dates[0],c=r[n].dates[0];void 0!==d&&void 0!==c?0===s&&d>c?(r[0].setDate(c,a),r[1].setDate(d,a)):1===s&&d<c&&(r[0].setDate(d,a),r[1].setDate(c,a)):i.allowOneSidedRange||void 0===d&&void 0===c||(a.clear=!0,r[n].setDate(r[s].dates,a)),r[0].picker.update().render(),r[1].picker.update().render(),delete i._updating}window.Datepicker=Se,window.DateRangePicker=class{constructor(i,e={}){const t=Array.isArray(e.inputs)?e.inputs:Array.from(i.querySelectorAll("input"));if(t.length<2)return;i.rangepicker=this,this.element=i,this.inputs=t.slice(0,2),this.allowOneSidedRange=!!e.allowOneSidedRange;const r=W.bind(null,this),a=Oe(e),s=[];Object.defineProperty(this,"datepickers",{get:()=>s}),Ce(this,r,this.inputs[0],a),Ce(this,r,this.inputs[1],a),Object.freeze(s),s[0].dates.length>0?W(this,{target:this.inputs[0]}):s[1].dates.length>0&&W(this,{target:this.inputs[1]})}get dates(){return 2===this.datepickers.length?[this.datepickers[0].dates[0],this.datepickers[1].dates[0]]:void 0}setOptions(i){this.allowOneSidedRange=!!i.allowOneSidedRange;const e=Oe(i);this.datepickers[0].setOptions(e),this.datepickers[1].setOptions(e)}destroy(){this.datepickers[0].destroy(),this.datepickers[1].destroy(),le(this),delete this.element.rangepicker}getDates(i){const e=i?t=>N(t,i,this.datepickers[0].config.locale):t=>new Date(t);return this.dates.map(t=>void 0===t?t:e(t))}setDates(i,e){const[t,r]=this.datepickers,a=this.dates;this._updating=!0,t.setDate(i),r.setDate(e),delete this._updating,r.dates[0]!==a[1]?W(this,{target:this.inputs[1]}):t.dates[0]!==a[0]&&W(this,{target:this.inputs[0]})}}}();