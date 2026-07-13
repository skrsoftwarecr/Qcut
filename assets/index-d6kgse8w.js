function d1(t,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const i in r)if(i!=="default"&&!(i in t)){const s=Object.getOwnPropertyDescriptor(r,i);s&&Object.defineProperty(t,i,s.get?s:{enumerable:!0,get:()=>r[i]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function h1(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var o_={exports:{}},Mu={},a_={exports:{}},re={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ca=Symbol.for("react.element"),f1=Symbol.for("react.portal"),p1=Symbol.for("react.fragment"),m1=Symbol.for("react.strict_mode"),g1=Symbol.for("react.profiler"),y1=Symbol.for("react.provider"),v1=Symbol.for("react.context"),_1=Symbol.for("react.forward_ref"),w1=Symbol.for("react.suspense"),E1=Symbol.for("react.memo"),T1=Symbol.for("react.lazy"),ig=Symbol.iterator;function I1(t){return t===null||typeof t!="object"?null:(t=ig&&t[ig]||t["@@iterator"],typeof t=="function"?t:null)}var l_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},u_=Object.assign,c_={};function ws(t,e,n){this.props=t,this.context=e,this.refs=c_,this.updater=n||l_}ws.prototype.isReactComponent={};ws.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};ws.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function d_(){}d_.prototype=ws.prototype;function lf(t,e,n){this.props=t,this.context=e,this.refs=c_,this.updater=n||l_}var uf=lf.prototype=new d_;uf.constructor=lf;u_(uf,ws.prototype);uf.isPureReactComponent=!0;var sg=Array.isArray,h_=Object.prototype.hasOwnProperty,cf={current:null},f_={key:!0,ref:!0,__self:!0,__source:!0};function p_(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)h_.call(e,r)&&!f_.hasOwnProperty(r)&&(i[r]=e[r]);var u=arguments.length-2;if(u===1)i.children=n;else if(1<u){for(var l=Array(u),c=0;c<u;c++)l[c]=arguments[c+2];i.children=l}if(t&&t.defaultProps)for(r in u=t.defaultProps,u)i[r]===void 0&&(i[r]=u[r]);return{$$typeof:ca,type:t,key:s,ref:o,props:i,_owner:cf.current}}function S1(t,e){return{$$typeof:ca,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function df(t){return typeof t=="object"&&t!==null&&t.$$typeof===ca}function x1(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var og=/\/+/g;function Gc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?x1(""+t.key):e.toString(36)}function _l(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case ca:case f1:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+Gc(o,0):r,sg(i)?(n="",t!=null&&(n=t.replace(og,"$&/")+"/"),_l(i,e,n,"",function(c){return c})):i!=null&&(df(i)&&(i=S1(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(og,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",sg(t))for(var u=0;u<t.length;u++){s=t[u];var l=r+Gc(s,u);o+=_l(s,e,n,l,i)}else if(l=I1(t),typeof l=="function")for(t=l.call(t),u=0;!(s=t.next()).done;)s=s.value,l=r+Gc(s,u++),o+=_l(s,e,n,l,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Qa(t,e,n){if(t==null)return t;var r=[],i=0;return _l(t,r,"","",function(s){return e.call(n,s,i++)}),r}function A1(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var gt={current:null},wl={transition:null},C1={ReactCurrentDispatcher:gt,ReactCurrentBatchConfig:wl,ReactCurrentOwner:cf};function m_(){throw Error("act(...) is not supported in production builds of React.")}re.Children={map:Qa,forEach:function(t,e,n){Qa(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Qa(t,function(){e++}),e},toArray:function(t){return Qa(t,function(e){return e})||[]},only:function(t){if(!df(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};re.Component=ws;re.Fragment=p1;re.Profiler=g1;re.PureComponent=lf;re.StrictMode=m1;re.Suspense=w1;re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=C1;re.act=m_;re.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=u_({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=cf.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var u=t.type.defaultProps;for(l in e)h_.call(e,l)&&!f_.hasOwnProperty(l)&&(r[l]=e[l]===void 0&&u!==void 0?u[l]:e[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){u=Array(l);for(var c=0;c<l;c++)u[c]=arguments[c+2];r.children=u}return{$$typeof:ca,type:t.type,key:i,ref:s,props:r,_owner:o}};re.createContext=function(t){return t={$$typeof:v1,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:y1,_context:t},t.Consumer=t};re.createElement=p_;re.createFactory=function(t){var e=p_.bind(null,t);return e.type=t,e};re.createRef=function(){return{current:null}};re.forwardRef=function(t){return{$$typeof:_1,render:t}};re.isValidElement=df;re.lazy=function(t){return{$$typeof:T1,_payload:{_status:-1,_result:t},_init:A1}};re.memo=function(t,e){return{$$typeof:E1,type:t,compare:e===void 0?null:e}};re.startTransition=function(t){var e=wl.transition;wl.transition={};try{t()}finally{wl.transition=e}};re.unstable_act=m_;re.useCallback=function(t,e){return gt.current.useCallback(t,e)};re.useContext=function(t){return gt.current.useContext(t)};re.useDebugValue=function(){};re.useDeferredValue=function(t){return gt.current.useDeferredValue(t)};re.useEffect=function(t,e){return gt.current.useEffect(t,e)};re.useId=function(){return gt.current.useId()};re.useImperativeHandle=function(t,e,n){return gt.current.useImperativeHandle(t,e,n)};re.useInsertionEffect=function(t,e){return gt.current.useInsertionEffect(t,e)};re.useLayoutEffect=function(t,e){return gt.current.useLayoutEffect(t,e)};re.useMemo=function(t,e){return gt.current.useMemo(t,e)};re.useReducer=function(t,e,n){return gt.current.useReducer(t,e,n)};re.useRef=function(t){return gt.current.useRef(t)};re.useState=function(t){return gt.current.useState(t)};re.useSyncExternalStore=function(t,e,n){return gt.current.useSyncExternalStore(t,e,n)};re.useTransition=function(){return gt.current.useTransition()};re.version="18.3.1";a_.exports=re;var M=a_.exports;const Ni=h1(M),P1=d1({__proto__:null,default:Ni},[M]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var k1=M,R1=Symbol.for("react.element"),b1=Symbol.for("react.fragment"),N1=Object.prototype.hasOwnProperty,D1=k1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,O1={key:!0,ref:!0,__self:!0,__source:!0};function g_(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)N1.call(e,r)&&!O1.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:R1,type:t,key:s,ref:o,props:i,_owner:D1.current}}Mu.Fragment=b1;Mu.jsx=g_;Mu.jsxs=g_;o_.exports=Mu;var g=o_.exports,Md={},y_={exports:{}},Dt={},v_={exports:{}},__={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(V,D){var B=V.length;V.push(D);e:for(;0<B;){var Y=B-1>>>1,J=V[Y];if(0<i(J,D))V[Y]=D,V[B]=J,B=Y;else break e}}function n(V){return V.length===0?null:V[0]}function r(V){if(V.length===0)return null;var D=V[0],B=V.pop();if(B!==D){V[0]=B;e:for(var Y=0,J=V.length,X=J>>>1;Y<X;){var ye=2*(Y+1)-1,Mt=V[ye],vt=ye+1,$e=V[vt];if(0>i(Mt,B))vt<J&&0>i($e,Mt)?(V[Y]=$e,V[vt]=B,Y=vt):(V[Y]=Mt,V[ye]=B,Y=ye);else if(vt<J&&0>i($e,B))V[Y]=$e,V[vt]=B,Y=vt;else break e}}return D}function i(V,D){var B=V.sortIndex-D.sortIndex;return B!==0?B:V.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,u=o.now();t.unstable_now=function(){return o.now()-u}}var l=[],c=[],d=1,f=null,m=3,v=!1,x=!1,P=!1,k=typeof setTimeout=="function"?setTimeout:null,E=typeof clearTimeout=="function"?clearTimeout:null,w=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function T(V){for(var D=n(c);D!==null;){if(D.callback===null)r(c);else if(D.startTime<=V)r(c),D.sortIndex=D.expirationTime,e(l,D);else break;D=n(c)}}function O(V){if(P=!1,T(V),!x)if(n(l)!==null)x=!0,wn(U);else{var D=n(c);D!==null&&q(O,D.startTime-V)}}function U(V,D){x=!1,P&&(P=!1,E(_),_=-1),v=!0;var B=m;try{for(T(D),f=n(l);f!==null&&(!(f.expirationTime>D)||V&&!R());){var Y=f.callback;if(typeof Y=="function"){f.callback=null,m=f.priorityLevel;var J=Y(f.expirationTime<=D);D=t.unstable_now(),typeof J=="function"?f.callback=J:f===n(l)&&r(l),T(D)}else r(l);f=n(l)}if(f!==null)var X=!0;else{var ye=n(c);ye!==null&&q(O,ye.startTime-D),X=!1}return X}finally{f=null,m=B,v=!1}}var z=!1,S=null,_=-1,I=5,A=-1;function R(){return!(t.unstable_now()-A<I)}function b(){if(S!==null){var V=t.unstable_now();A=V;var D=!0;try{D=S(!0,V)}finally{D?C():(z=!1,S=null)}}else z=!1}var C;if(typeof w=="function")C=function(){w(b)};else if(typeof MessageChannel<"u"){var Be=new MessageChannel,zt=Be.port2;Be.port1.onmessage=b,C=function(){zt.postMessage(null)}}else C=function(){k(b,0)};function wn(V){S=V,z||(z=!0,C())}function q(V,D){_=k(function(){V(t.unstable_now())},D)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(V){V.callback=null},t.unstable_continueExecution=function(){x||v||(x=!0,wn(U))},t.unstable_forceFrameRate=function(V){0>V||125<V?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<V?Math.floor(1e3/V):5},t.unstable_getCurrentPriorityLevel=function(){return m},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(V){switch(m){case 1:case 2:case 3:var D=3;break;default:D=m}var B=m;m=D;try{return V()}finally{m=B}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(V,D){switch(V){case 1:case 2:case 3:case 4:case 5:break;default:V=3}var B=m;m=V;try{return D()}finally{m=B}},t.unstable_scheduleCallback=function(V,D,B){var Y=t.unstable_now();switch(typeof B=="object"&&B!==null?(B=B.delay,B=typeof B=="number"&&0<B?Y+B:Y):B=Y,V){case 1:var J=-1;break;case 2:J=250;break;case 5:J=1073741823;break;case 4:J=1e4;break;default:J=5e3}return J=B+J,V={id:d++,callback:D,priorityLevel:V,startTime:B,expirationTime:J,sortIndex:-1},B>Y?(V.sortIndex=B,e(c,V),n(l)===null&&V===n(c)&&(P?(E(_),_=-1):P=!0,q(O,B-Y))):(V.sortIndex=J,e(l,V),x||v||(x=!0,wn(U))),V},t.unstable_shouldYield=R,t.unstable_wrapCallback=function(V){var D=m;return function(){var B=m;m=D;try{return V.apply(this,arguments)}finally{m=B}}}})(__);v_.exports=__;var M1=v_.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var L1=M,Nt=M1;function $(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var w_=new Set,Ro={};function di(t,e){is(t,e),is(t+"Capture",e)}function is(t,e){for(Ro[t]=e,t=0;t<e.length;t++)w_.add(e[t])}var On=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ld=Object.prototype.hasOwnProperty,V1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ag={},lg={};function j1(t){return Ld.call(lg,t)?!0:Ld.call(ag,t)?!1:V1.test(t)?lg[t]=!0:(ag[t]=!0,!1)}function F1(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function U1(t,e,n,r){if(e===null||typeof e>"u"||F1(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function yt(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Je={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Je[t]=new yt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Je[e]=new yt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Je[t]=new yt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Je[t]=new yt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Je[t]=new yt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Je[t]=new yt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Je[t]=new yt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Je[t]=new yt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Je[t]=new yt(t,5,!1,t.toLowerCase(),null,!1,!1)});var hf=/[\-:]([a-z])/g;function ff(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(hf,ff);Je[e]=new yt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(hf,ff);Je[e]=new yt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(hf,ff);Je[e]=new yt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Je[t]=new yt(t,1,!1,t.toLowerCase(),null,!1,!1)});Je.xlinkHref=new yt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Je[t]=new yt(t,1,!1,t.toLowerCase(),null,!0,!0)});function pf(t,e,n,r){var i=Je.hasOwnProperty(e)?Je[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(U1(e,n,i,r)&&(n=null),r||i===null?j1(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var zn=L1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ya=Symbol.for("react.element"),Di=Symbol.for("react.portal"),Oi=Symbol.for("react.fragment"),mf=Symbol.for("react.strict_mode"),Vd=Symbol.for("react.profiler"),E_=Symbol.for("react.provider"),T_=Symbol.for("react.context"),gf=Symbol.for("react.forward_ref"),jd=Symbol.for("react.suspense"),Fd=Symbol.for("react.suspense_list"),yf=Symbol.for("react.memo"),Yn=Symbol.for("react.lazy"),I_=Symbol.for("react.offscreen"),ug=Symbol.iterator;function Ks(t){return t===null||typeof t!="object"?null:(t=ug&&t[ug]||t["@@iterator"],typeof t=="function"?t:null)}var xe=Object.assign,Kc;function ro(t){if(Kc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Kc=e&&e[1]||""}return`
`+Kc+t}var Qc=!1;function Yc(t,e){if(!t||Qc)return"";Qc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){r=c}t.call(e.prototype)}else{try{throw Error()}catch(c){r=c}t()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,u=s.length-1;1<=o&&0<=u&&i[o]!==s[u];)u--;for(;1<=o&&0<=u;o--,u--)if(i[o]!==s[u]){if(o!==1||u!==1)do if(o--,u--,0>u||i[o]!==s[u]){var l=`
`+i[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=u);break}}}finally{Qc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ro(t):""}function B1(t){switch(t.tag){case 5:return ro(t.type);case 16:return ro("Lazy");case 13:return ro("Suspense");case 19:return ro("SuspenseList");case 0:case 2:case 15:return t=Yc(t.type,!1),t;case 11:return t=Yc(t.type.render,!1),t;case 1:return t=Yc(t.type,!0),t;default:return""}}function Ud(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Oi:return"Fragment";case Di:return"Portal";case Vd:return"Profiler";case mf:return"StrictMode";case jd:return"Suspense";case Fd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case T_:return(t.displayName||"Context")+".Consumer";case E_:return(t._context.displayName||"Context")+".Provider";case gf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case yf:return e=t.displayName||null,e!==null?e:Ud(t.type)||"Memo";case Yn:e=t._payload,t=t._init;try{return Ud(t(e))}catch{}}return null}function $1(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ud(e);case 8:return e===mf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Er(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function S_(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function z1(t){var e=S_(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Xa(t){t._valueTracker||(t._valueTracker=z1(t))}function x_(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=S_(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Bl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Bd(t,e){var n=e.checked;return xe({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function cg(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Er(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function A_(t,e){e=e.checked,e!=null&&pf(t,"checked",e,!1)}function $d(t,e){A_(t,e);var n=Er(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?zd(t,e.type,n):e.hasOwnProperty("defaultValue")&&zd(t,e.type,Er(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function dg(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function zd(t,e,n){(e!=="number"||Bl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var io=Array.isArray;function Gi(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Er(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function Wd(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error($(91));return xe({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function hg(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error($(92));if(io(n)){if(1<n.length)throw Error($(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Er(n)}}function C_(t,e){var n=Er(e.value),r=Er(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function fg(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function P_(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function qd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?P_(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ja,k_=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ja=Ja||document.createElement("div"),Ja.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ja.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function bo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var mo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},W1=["Webkit","ms","Moz","O"];Object.keys(mo).forEach(function(t){W1.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),mo[e]=mo[t]})});function R_(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||mo.hasOwnProperty(t)&&mo[t]?(""+e).trim():e+"px"}function b_(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=R_(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var q1=xe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Hd(t,e){if(e){if(q1[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error($(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error($(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error($(61))}if(e.style!=null&&typeof e.style!="object")throw Error($(62))}}function Gd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Kd=null;function vf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Qd=null,Ki=null,Qi=null;function pg(t){if(t=fa(t)){if(typeof Qd!="function")throw Error($(280));var e=t.stateNode;e&&(e=Uu(e),Qd(t.stateNode,t.type,e))}}function N_(t){Ki?Qi?Qi.push(t):Qi=[t]:Ki=t}function D_(){if(Ki){var t=Ki,e=Qi;if(Qi=Ki=null,pg(t),e)for(t=0;t<e.length;t++)pg(e[t])}}function O_(t,e){return t(e)}function M_(){}var Xc=!1;function L_(t,e,n){if(Xc)return t(e,n);Xc=!0;try{return O_(t,e,n)}finally{Xc=!1,(Ki!==null||Qi!==null)&&(M_(),D_())}}function No(t,e){var n=t.stateNode;if(n===null)return null;var r=Uu(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error($(231,e,typeof n));return n}var Yd=!1;if(On)try{var Qs={};Object.defineProperty(Qs,"passive",{get:function(){Yd=!0}}),window.addEventListener("test",Qs,Qs),window.removeEventListener("test",Qs,Qs)}catch{Yd=!1}function H1(t,e,n,r,i,s,o,u,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(d){this.onError(d)}}var go=!1,$l=null,zl=!1,Xd=null,G1={onError:function(t){go=!0,$l=t}};function K1(t,e,n,r,i,s,o,u,l){go=!1,$l=null,H1.apply(G1,arguments)}function Q1(t,e,n,r,i,s,o,u,l){if(K1.apply(this,arguments),go){if(go){var c=$l;go=!1,$l=null}else throw Error($(198));zl||(zl=!0,Xd=c)}}function hi(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function V_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function mg(t){if(hi(t)!==t)throw Error($(188))}function Y1(t){var e=t.alternate;if(!e){if(e=hi(t),e===null)throw Error($(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return mg(i),t;if(s===r)return mg(i),e;s=s.sibling}throw Error($(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,u=i.child;u;){if(u===n){o=!0,n=i,r=s;break}if(u===r){o=!0,r=i,n=s;break}u=u.sibling}if(!o){for(u=s.child;u;){if(u===n){o=!0,n=s,r=i;break}if(u===r){o=!0,r=s,n=i;break}u=u.sibling}if(!o)throw Error($(189))}}if(n.alternate!==r)throw Error($(190))}if(n.tag!==3)throw Error($(188));return n.stateNode.current===n?t:e}function j_(t){return t=Y1(t),t!==null?F_(t):null}function F_(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=F_(t);if(e!==null)return e;t=t.sibling}return null}var U_=Nt.unstable_scheduleCallback,gg=Nt.unstable_cancelCallback,X1=Nt.unstable_shouldYield,J1=Nt.unstable_requestPaint,Re=Nt.unstable_now,Z1=Nt.unstable_getCurrentPriorityLevel,_f=Nt.unstable_ImmediatePriority,B_=Nt.unstable_UserBlockingPriority,Wl=Nt.unstable_NormalPriority,eS=Nt.unstable_LowPriority,$_=Nt.unstable_IdlePriority,Lu=null,dn=null;function tS(t){if(dn&&typeof dn.onCommitFiberRoot=="function")try{dn.onCommitFiberRoot(Lu,t,void 0,(t.current.flags&128)===128)}catch{}}var Qt=Math.clz32?Math.clz32:iS,nS=Math.log,rS=Math.LN2;function iS(t){return t>>>=0,t===0?32:31-(nS(t)/rS|0)|0}var Za=64,el=4194304;function so(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function ql(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var u=o&~i;u!==0?r=so(u):(s&=o,s!==0&&(r=so(s)))}else o=n&~i,o!==0?r=so(o):s!==0&&(r=so(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Qt(e),i=1<<n,r|=t[n],e&=~i;return r}function sS(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function oS(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Qt(s),u=1<<o,l=i[o];l===-1?(!(u&n)||u&r)&&(i[o]=sS(u,e)):l<=e&&(t.expiredLanes|=u),s&=~u}}function Jd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function z_(){var t=Za;return Za<<=1,!(Za&4194240)&&(Za=64),t}function Jc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function da(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Qt(e),t[e]=n}function aS(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-Qt(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function wf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Qt(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var de=0;function W_(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var q_,Ef,H_,G_,K_,Zd=!1,tl=[],ur=null,cr=null,dr=null,Do=new Map,Oo=new Map,Jn=[],lS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function yg(t,e){switch(t){case"focusin":case"focusout":ur=null;break;case"dragenter":case"dragleave":cr=null;break;case"mouseover":case"mouseout":dr=null;break;case"pointerover":case"pointerout":Do.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Oo.delete(e.pointerId)}}function Ys(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=fa(e),e!==null&&Ef(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function uS(t,e,n,r,i){switch(e){case"focusin":return ur=Ys(ur,t,e,n,r,i),!0;case"dragenter":return cr=Ys(cr,t,e,n,r,i),!0;case"mouseover":return dr=Ys(dr,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return Do.set(s,Ys(Do.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,Oo.set(s,Ys(Oo.get(s)||null,t,e,n,r,i)),!0}return!1}function Q_(t){var e=Wr(t.target);if(e!==null){var n=hi(e);if(n!==null){if(e=n.tag,e===13){if(e=V_(n),e!==null){t.blockedOn=e,K_(t.priority,function(){H_(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function El(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=eh(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Kd=r,n.target.dispatchEvent(r),Kd=null}else return e=fa(n),e!==null&&Ef(e),t.blockedOn=n,!1;e.shift()}return!0}function vg(t,e,n){El(t)&&n.delete(e)}function cS(){Zd=!1,ur!==null&&El(ur)&&(ur=null),cr!==null&&El(cr)&&(cr=null),dr!==null&&El(dr)&&(dr=null),Do.forEach(vg),Oo.forEach(vg)}function Xs(t,e){t.blockedOn===e&&(t.blockedOn=null,Zd||(Zd=!0,Nt.unstable_scheduleCallback(Nt.unstable_NormalPriority,cS)))}function Mo(t){function e(i){return Xs(i,t)}if(0<tl.length){Xs(tl[0],t);for(var n=1;n<tl.length;n++){var r=tl[n];r.blockedOn===t&&(r.blockedOn=null)}}for(ur!==null&&Xs(ur,t),cr!==null&&Xs(cr,t),dr!==null&&Xs(dr,t),Do.forEach(e),Oo.forEach(e),n=0;n<Jn.length;n++)r=Jn[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Jn.length&&(n=Jn[0],n.blockedOn===null);)Q_(n),n.blockedOn===null&&Jn.shift()}var Yi=zn.ReactCurrentBatchConfig,Hl=!0;function dS(t,e,n,r){var i=de,s=Yi.transition;Yi.transition=null;try{de=1,Tf(t,e,n,r)}finally{de=i,Yi.transition=s}}function hS(t,e,n,r){var i=de,s=Yi.transition;Yi.transition=null;try{de=4,Tf(t,e,n,r)}finally{de=i,Yi.transition=s}}function Tf(t,e,n,r){if(Hl){var i=eh(t,e,n,r);if(i===null)ld(t,e,r,Gl,n),yg(t,r);else if(uS(i,t,e,n,r))r.stopPropagation();else if(yg(t,r),e&4&&-1<lS.indexOf(t)){for(;i!==null;){var s=fa(i);if(s!==null&&q_(s),s=eh(t,e,n,r),s===null&&ld(t,e,r,Gl,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else ld(t,e,r,null,n)}}var Gl=null;function eh(t,e,n,r){if(Gl=null,t=vf(r),t=Wr(t),t!==null)if(e=hi(t),e===null)t=null;else if(n=e.tag,n===13){if(t=V_(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Gl=t,null}function Y_(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Z1()){case _f:return 1;case B_:return 4;case Wl:case eS:return 16;case $_:return 536870912;default:return 16}default:return 16}}var sr=null,If=null,Tl=null;function X_(){if(Tl)return Tl;var t,e=If,n=e.length,r,i="value"in sr?sr.value:sr.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return Tl=i.slice(t,1<r?1-r:void 0)}function Il(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function nl(){return!0}function _g(){return!1}function Ot(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var u in t)t.hasOwnProperty(u)&&(n=t[u],this[u]=n?n(s):s[u]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?nl:_g,this.isPropagationStopped=_g,this}return xe(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=nl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=nl)},persist:function(){},isPersistent:nl}),e}var Es={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Sf=Ot(Es),ha=xe({},Es,{view:0,detail:0}),fS=Ot(ha),Zc,ed,Js,Vu=xe({},ha,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:xf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Js&&(Js&&t.type==="mousemove"?(Zc=t.screenX-Js.screenX,ed=t.screenY-Js.screenY):ed=Zc=0,Js=t),Zc)},movementY:function(t){return"movementY"in t?t.movementY:ed}}),wg=Ot(Vu),pS=xe({},Vu,{dataTransfer:0}),mS=Ot(pS),gS=xe({},ha,{relatedTarget:0}),td=Ot(gS),yS=xe({},Es,{animationName:0,elapsedTime:0,pseudoElement:0}),vS=Ot(yS),_S=xe({},Es,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),wS=Ot(_S),ES=xe({},Es,{data:0}),Eg=Ot(ES),TS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},IS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},SS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function xS(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=SS[t])?!!e[t]:!1}function xf(){return xS}var AS=xe({},ha,{key:function(t){if(t.key){var e=TS[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Il(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?IS[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:xf,charCode:function(t){return t.type==="keypress"?Il(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Il(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),CS=Ot(AS),PS=xe({},Vu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Tg=Ot(PS),kS=xe({},ha,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:xf}),RS=Ot(kS),bS=xe({},Es,{propertyName:0,elapsedTime:0,pseudoElement:0}),NS=Ot(bS),DS=xe({},Vu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),OS=Ot(DS),MS=[9,13,27,32],Af=On&&"CompositionEvent"in window,yo=null;On&&"documentMode"in document&&(yo=document.documentMode);var LS=On&&"TextEvent"in window&&!yo,J_=On&&(!Af||yo&&8<yo&&11>=yo),Ig=" ",Sg=!1;function Z_(t,e){switch(t){case"keyup":return MS.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function e0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Mi=!1;function VS(t,e){switch(t){case"compositionend":return e0(e);case"keypress":return e.which!==32?null:(Sg=!0,Ig);case"textInput":return t=e.data,t===Ig&&Sg?null:t;default:return null}}function jS(t,e){if(Mi)return t==="compositionend"||!Af&&Z_(t,e)?(t=X_(),Tl=If=sr=null,Mi=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return J_&&e.locale!=="ko"?null:e.data;default:return null}}var FS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xg(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!FS[t.type]:e==="textarea"}function t0(t,e,n,r){N_(r),e=Kl(e,"onChange"),0<e.length&&(n=new Sf("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var vo=null,Lo=null;function US(t){h0(t,0)}function ju(t){var e=ji(t);if(x_(e))return t}function BS(t,e){if(t==="change")return e}var n0=!1;if(On){var nd;if(On){var rd="oninput"in document;if(!rd){var Ag=document.createElement("div");Ag.setAttribute("oninput","return;"),rd=typeof Ag.oninput=="function"}nd=rd}else nd=!1;n0=nd&&(!document.documentMode||9<document.documentMode)}function Cg(){vo&&(vo.detachEvent("onpropertychange",r0),Lo=vo=null)}function r0(t){if(t.propertyName==="value"&&ju(Lo)){var e=[];t0(e,Lo,t,vf(t)),L_(US,e)}}function $S(t,e,n){t==="focusin"?(Cg(),vo=e,Lo=n,vo.attachEvent("onpropertychange",r0)):t==="focusout"&&Cg()}function zS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ju(Lo)}function WS(t,e){if(t==="click")return ju(e)}function qS(t,e){if(t==="input"||t==="change")return ju(e)}function HS(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Jt=typeof Object.is=="function"?Object.is:HS;function Vo(t,e){if(Jt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ld.call(e,i)||!Jt(t[i],e[i]))return!1}return!0}function Pg(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function kg(t,e){var n=Pg(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Pg(n)}}function i0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?i0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function s0(){for(var t=window,e=Bl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Bl(t.document)}return e}function Cf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function GS(t){var e=s0(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&i0(n.ownerDocument.documentElement,n)){if(r!==null&&Cf(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=kg(n,s);var o=kg(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var KS=On&&"documentMode"in document&&11>=document.documentMode,Li=null,th=null,_o=null,nh=!1;function Rg(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;nh||Li==null||Li!==Bl(r)||(r=Li,"selectionStart"in r&&Cf(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),_o&&Vo(_o,r)||(_o=r,r=Kl(th,"onSelect"),0<r.length&&(e=new Sf("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Li)))}function rl(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Vi={animationend:rl("Animation","AnimationEnd"),animationiteration:rl("Animation","AnimationIteration"),animationstart:rl("Animation","AnimationStart"),transitionend:rl("Transition","TransitionEnd")},id={},o0={};On&&(o0=document.createElement("div").style,"AnimationEvent"in window||(delete Vi.animationend.animation,delete Vi.animationiteration.animation,delete Vi.animationstart.animation),"TransitionEvent"in window||delete Vi.transitionend.transition);function Fu(t){if(id[t])return id[t];if(!Vi[t])return t;var e=Vi[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in o0)return id[t]=e[n];return t}var a0=Fu("animationend"),l0=Fu("animationiteration"),u0=Fu("animationstart"),c0=Fu("transitionend"),d0=new Map,bg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Cr(t,e){d0.set(t,e),di(e,[t])}for(var sd=0;sd<bg.length;sd++){var od=bg[sd],QS=od.toLowerCase(),YS=od[0].toUpperCase()+od.slice(1);Cr(QS,"on"+YS)}Cr(a0,"onAnimationEnd");Cr(l0,"onAnimationIteration");Cr(u0,"onAnimationStart");Cr("dblclick","onDoubleClick");Cr("focusin","onFocus");Cr("focusout","onBlur");Cr(c0,"onTransitionEnd");is("onMouseEnter",["mouseout","mouseover"]);is("onMouseLeave",["mouseout","mouseover"]);is("onPointerEnter",["pointerout","pointerover"]);is("onPointerLeave",["pointerout","pointerover"]);di("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));di("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));di("onBeforeInput",["compositionend","keypress","textInput","paste"]);di("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));di("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));di("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var oo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),XS=new Set("cancel close invalid load scroll toggle".split(" ").concat(oo));function Ng(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,Q1(r,e,void 0,t),t.currentTarget=null}function h0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var u=r[o],l=u.instance,c=u.currentTarget;if(u=u.listener,l!==s&&i.isPropagationStopped())break e;Ng(i,u,c),s=l}else for(o=0;o<r.length;o++){if(u=r[o],l=u.instance,c=u.currentTarget,u=u.listener,l!==s&&i.isPropagationStopped())break e;Ng(i,u,c),s=l}}}if(zl)throw t=Xd,zl=!1,Xd=null,t}function _e(t,e){var n=e[ah];n===void 0&&(n=e[ah]=new Set);var r=t+"__bubble";n.has(r)||(f0(e,t,2,!1),n.add(r))}function ad(t,e,n){var r=0;e&&(r|=4),f0(n,t,r,e)}var il="_reactListening"+Math.random().toString(36).slice(2);function jo(t){if(!t[il]){t[il]=!0,w_.forEach(function(n){n!=="selectionchange"&&(XS.has(n)||ad(n,!1,t),ad(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[il]||(e[il]=!0,ad("selectionchange",!1,e))}}function f0(t,e,n,r){switch(Y_(e)){case 1:var i=dS;break;case 4:i=hS;break;default:i=Tf}n=i.bind(null,e,n,t),i=void 0,!Yd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function ld(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var u=r.stateNode.containerInfo;if(u===i||u.nodeType===8&&u.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;o=o.return}for(;u!==null;){if(o=Wr(u),o===null)return;if(l=o.tag,l===5||l===6){r=s=o;continue e}u=u.parentNode}}r=r.return}L_(function(){var c=s,d=vf(n),f=[];e:{var m=d0.get(t);if(m!==void 0){var v=Sf,x=t;switch(t){case"keypress":if(Il(n)===0)break e;case"keydown":case"keyup":v=CS;break;case"focusin":x="focus",v=td;break;case"focusout":x="blur",v=td;break;case"beforeblur":case"afterblur":v=td;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=wg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=mS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=RS;break;case a0:case l0:case u0:v=vS;break;case c0:v=NS;break;case"scroll":v=fS;break;case"wheel":v=OS;break;case"copy":case"cut":case"paste":v=wS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=Tg}var P=(e&4)!==0,k=!P&&t==="scroll",E=P?m!==null?m+"Capture":null:m;P=[];for(var w=c,T;w!==null;){T=w;var O=T.stateNode;if(T.tag===5&&O!==null&&(T=O,E!==null&&(O=No(w,E),O!=null&&P.push(Fo(w,O,T)))),k)break;w=w.return}0<P.length&&(m=new v(m,x,null,n,d),f.push({event:m,listeners:P}))}}if(!(e&7)){e:{if(m=t==="mouseover"||t==="pointerover",v=t==="mouseout"||t==="pointerout",m&&n!==Kd&&(x=n.relatedTarget||n.fromElement)&&(Wr(x)||x[Mn]))break e;if((v||m)&&(m=d.window===d?d:(m=d.ownerDocument)?m.defaultView||m.parentWindow:window,v?(x=n.relatedTarget||n.toElement,v=c,x=x?Wr(x):null,x!==null&&(k=hi(x),x!==k||x.tag!==5&&x.tag!==6)&&(x=null)):(v=null,x=c),v!==x)){if(P=wg,O="onMouseLeave",E="onMouseEnter",w="mouse",(t==="pointerout"||t==="pointerover")&&(P=Tg,O="onPointerLeave",E="onPointerEnter",w="pointer"),k=v==null?m:ji(v),T=x==null?m:ji(x),m=new P(O,w+"leave",v,n,d),m.target=k,m.relatedTarget=T,O=null,Wr(d)===c&&(P=new P(E,w+"enter",x,n,d),P.target=T,P.relatedTarget=k,O=P),k=O,v&&x)t:{for(P=v,E=x,w=0,T=P;T;T=Ci(T))w++;for(T=0,O=E;O;O=Ci(O))T++;for(;0<w-T;)P=Ci(P),w--;for(;0<T-w;)E=Ci(E),T--;for(;w--;){if(P===E||E!==null&&P===E.alternate)break t;P=Ci(P),E=Ci(E)}P=null}else P=null;v!==null&&Dg(f,m,v,P,!1),x!==null&&k!==null&&Dg(f,k,x,P,!0)}}e:{if(m=c?ji(c):window,v=m.nodeName&&m.nodeName.toLowerCase(),v==="select"||v==="input"&&m.type==="file")var U=BS;else if(xg(m))if(n0)U=qS;else{U=zS;var z=$S}else(v=m.nodeName)&&v.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(U=WS);if(U&&(U=U(t,c))){t0(f,U,n,d);break e}z&&z(t,m,c),t==="focusout"&&(z=m._wrapperState)&&z.controlled&&m.type==="number"&&zd(m,"number",m.value)}switch(z=c?ji(c):window,t){case"focusin":(xg(z)||z.contentEditable==="true")&&(Li=z,th=c,_o=null);break;case"focusout":_o=th=Li=null;break;case"mousedown":nh=!0;break;case"contextmenu":case"mouseup":case"dragend":nh=!1,Rg(f,n,d);break;case"selectionchange":if(KS)break;case"keydown":case"keyup":Rg(f,n,d)}var S;if(Af)e:{switch(t){case"compositionstart":var _="onCompositionStart";break e;case"compositionend":_="onCompositionEnd";break e;case"compositionupdate":_="onCompositionUpdate";break e}_=void 0}else Mi?Z_(t,n)&&(_="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(_="onCompositionStart");_&&(J_&&n.locale!=="ko"&&(Mi||_!=="onCompositionStart"?_==="onCompositionEnd"&&Mi&&(S=X_()):(sr=d,If="value"in sr?sr.value:sr.textContent,Mi=!0)),z=Kl(c,_),0<z.length&&(_=new Eg(_,t,null,n,d),f.push({event:_,listeners:z}),S?_.data=S:(S=e0(n),S!==null&&(_.data=S)))),(S=LS?VS(t,n):jS(t,n))&&(c=Kl(c,"onBeforeInput"),0<c.length&&(d=new Eg("onBeforeInput","beforeinput",null,n,d),f.push({event:d,listeners:c}),d.data=S))}h0(f,e)})}function Fo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Kl(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=No(t,n),s!=null&&r.unshift(Fo(t,s,i)),s=No(t,e),s!=null&&r.push(Fo(t,s,i))),t=t.return}return r}function Ci(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Dg(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var u=n,l=u.alternate,c=u.stateNode;if(l!==null&&l===r)break;u.tag===5&&c!==null&&(u=c,i?(l=No(n,s),l!=null&&o.unshift(Fo(n,l,u))):i||(l=No(n,s),l!=null&&o.push(Fo(n,l,u)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var JS=/\r\n?/g,ZS=/\u0000|\uFFFD/g;function Og(t){return(typeof t=="string"?t:""+t).replace(JS,`
`).replace(ZS,"")}function sl(t,e,n){if(e=Og(e),Og(t)!==e&&n)throw Error($(425))}function Ql(){}var rh=null,ih=null;function sh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var oh=typeof setTimeout=="function"?setTimeout:void 0,ex=typeof clearTimeout=="function"?clearTimeout:void 0,Mg=typeof Promise=="function"?Promise:void 0,tx=typeof queueMicrotask=="function"?queueMicrotask:typeof Mg<"u"?function(t){return Mg.resolve(null).then(t).catch(nx)}:oh;function nx(t){setTimeout(function(){throw t})}function ud(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),Mo(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Mo(e)}function hr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Lg(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Ts=Math.random().toString(36).slice(2),on="__reactFiber$"+Ts,Uo="__reactProps$"+Ts,Mn="__reactContainer$"+Ts,ah="__reactEvents$"+Ts,rx="__reactListeners$"+Ts,ix="__reactHandles$"+Ts;function Wr(t){var e=t[on];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Mn]||n[on]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Lg(t);t!==null;){if(n=t[on])return n;t=Lg(t)}return e}t=n,n=t.parentNode}return null}function fa(t){return t=t[on]||t[Mn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ji(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error($(33))}function Uu(t){return t[Uo]||null}var lh=[],Fi=-1;function Pr(t){return{current:t}}function Ee(t){0>Fi||(t.current=lh[Fi],lh[Fi]=null,Fi--)}function me(t,e){Fi++,lh[Fi]=t.current,t.current=e}var Tr={},ut=Pr(Tr),Tt=Pr(!1),Zr=Tr;function ss(t,e){var n=t.type.contextTypes;if(!n)return Tr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function It(t){return t=t.childContextTypes,t!=null}function Yl(){Ee(Tt),Ee(ut)}function Vg(t,e,n){if(ut.current!==Tr)throw Error($(168));me(ut,e),me(Tt,n)}function p0(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error($(108,$1(t)||"Unknown",i));return xe({},n,r)}function Xl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Tr,Zr=ut.current,me(ut,t),me(Tt,Tt.current),!0}function jg(t,e,n){var r=t.stateNode;if(!r)throw Error($(169));n?(t=p0(t,e,Zr),r.__reactInternalMemoizedMergedChildContext=t,Ee(Tt),Ee(ut),me(ut,t)):Ee(Tt),me(Tt,n)}var xn=null,Bu=!1,cd=!1;function m0(t){xn===null?xn=[t]:xn.push(t)}function sx(t){Bu=!0,m0(t)}function kr(){if(!cd&&xn!==null){cd=!0;var t=0,e=de;try{var n=xn;for(de=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}xn=null,Bu=!1}catch(i){throw xn!==null&&(xn=xn.slice(t+1)),U_(_f,kr),i}finally{de=e,cd=!1}}return null}var Ui=[],Bi=0,Jl=null,Zl=0,Lt=[],Vt=0,ei=null,An=1,Cn="";function Fr(t,e){Ui[Bi++]=Zl,Ui[Bi++]=Jl,Jl=t,Zl=e}function g0(t,e,n){Lt[Vt++]=An,Lt[Vt++]=Cn,Lt[Vt++]=ei,ei=t;var r=An;t=Cn;var i=32-Qt(r)-1;r&=~(1<<i),n+=1;var s=32-Qt(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,An=1<<32-Qt(e)+i|n<<i|r,Cn=s+t}else An=1<<s|n<<i|r,Cn=t}function Pf(t){t.return!==null&&(Fr(t,1),g0(t,1,0))}function kf(t){for(;t===Jl;)Jl=Ui[--Bi],Ui[Bi]=null,Zl=Ui[--Bi],Ui[Bi]=null;for(;t===ei;)ei=Lt[--Vt],Lt[Vt]=null,Cn=Lt[--Vt],Lt[Vt]=null,An=Lt[--Vt],Lt[Vt]=null}var Rt=null,Pt=null,Te=!1,Kt=null;function y0(t,e){var n=jt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Fg(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Rt=t,Pt=hr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Rt=t,Pt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=ei!==null?{id:An,overflow:Cn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=jt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Rt=t,Pt=null,!0):!1;default:return!1}}function uh(t){return(t.mode&1)!==0&&(t.flags&128)===0}function ch(t){if(Te){var e=Pt;if(e){var n=e;if(!Fg(t,e)){if(uh(t))throw Error($(418));e=hr(n.nextSibling);var r=Rt;e&&Fg(t,e)?y0(r,n):(t.flags=t.flags&-4097|2,Te=!1,Rt=t)}}else{if(uh(t))throw Error($(418));t.flags=t.flags&-4097|2,Te=!1,Rt=t}}}function Ug(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Rt=t}function ol(t){if(t!==Rt)return!1;if(!Te)return Ug(t),Te=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!sh(t.type,t.memoizedProps)),e&&(e=Pt)){if(uh(t))throw v0(),Error($(418));for(;e;)y0(t,e),e=hr(e.nextSibling)}if(Ug(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error($(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Pt=hr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Pt=null}}else Pt=Rt?hr(t.stateNode.nextSibling):null;return!0}function v0(){for(var t=Pt;t;)t=hr(t.nextSibling)}function os(){Pt=Rt=null,Te=!1}function Rf(t){Kt===null?Kt=[t]:Kt.push(t)}var ox=zn.ReactCurrentBatchConfig;function Zs(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error($(309));var r=n.stateNode}if(!r)throw Error($(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var u=i.refs;o===null?delete u[s]:u[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error($(284));if(!n._owner)throw Error($(290,t))}return t}function al(t,e){throw t=Object.prototype.toString.call(e),Error($(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Bg(t){var e=t._init;return e(t._payload)}function _0(t){function e(E,w){if(t){var T=E.deletions;T===null?(E.deletions=[w],E.flags|=16):T.push(w)}}function n(E,w){if(!t)return null;for(;w!==null;)e(E,w),w=w.sibling;return null}function r(E,w){for(E=new Map;w!==null;)w.key!==null?E.set(w.key,w):E.set(w.index,w),w=w.sibling;return E}function i(E,w){return E=gr(E,w),E.index=0,E.sibling=null,E}function s(E,w,T){return E.index=T,t?(T=E.alternate,T!==null?(T=T.index,T<w?(E.flags|=2,w):T):(E.flags|=2,w)):(E.flags|=1048576,w)}function o(E){return t&&E.alternate===null&&(E.flags|=2),E}function u(E,w,T,O){return w===null||w.tag!==6?(w=yd(T,E.mode,O),w.return=E,w):(w=i(w,T),w.return=E,w)}function l(E,w,T,O){var U=T.type;return U===Oi?d(E,w,T.props.children,O,T.key):w!==null&&(w.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===Yn&&Bg(U)===w.type)?(O=i(w,T.props),O.ref=Zs(E,w,T),O.return=E,O):(O=Rl(T.type,T.key,T.props,null,E.mode,O),O.ref=Zs(E,w,T),O.return=E,O)}function c(E,w,T,O){return w===null||w.tag!==4||w.stateNode.containerInfo!==T.containerInfo||w.stateNode.implementation!==T.implementation?(w=vd(T,E.mode,O),w.return=E,w):(w=i(w,T.children||[]),w.return=E,w)}function d(E,w,T,O,U){return w===null||w.tag!==7?(w=Yr(T,E.mode,O,U),w.return=E,w):(w=i(w,T),w.return=E,w)}function f(E,w,T){if(typeof w=="string"&&w!==""||typeof w=="number")return w=yd(""+w,E.mode,T),w.return=E,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case Ya:return T=Rl(w.type,w.key,w.props,null,E.mode,T),T.ref=Zs(E,null,w),T.return=E,T;case Di:return w=vd(w,E.mode,T),w.return=E,w;case Yn:var O=w._init;return f(E,O(w._payload),T)}if(io(w)||Ks(w))return w=Yr(w,E.mode,T,null),w.return=E,w;al(E,w)}return null}function m(E,w,T,O){var U=w!==null?w.key:null;if(typeof T=="string"&&T!==""||typeof T=="number")return U!==null?null:u(E,w,""+T,O);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case Ya:return T.key===U?l(E,w,T,O):null;case Di:return T.key===U?c(E,w,T,O):null;case Yn:return U=T._init,m(E,w,U(T._payload),O)}if(io(T)||Ks(T))return U!==null?null:d(E,w,T,O,null);al(E,T)}return null}function v(E,w,T,O,U){if(typeof O=="string"&&O!==""||typeof O=="number")return E=E.get(T)||null,u(w,E,""+O,U);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case Ya:return E=E.get(O.key===null?T:O.key)||null,l(w,E,O,U);case Di:return E=E.get(O.key===null?T:O.key)||null,c(w,E,O,U);case Yn:var z=O._init;return v(E,w,T,z(O._payload),U)}if(io(O)||Ks(O))return E=E.get(T)||null,d(w,E,O,U,null);al(w,O)}return null}function x(E,w,T,O){for(var U=null,z=null,S=w,_=w=0,I=null;S!==null&&_<T.length;_++){S.index>_?(I=S,S=null):I=S.sibling;var A=m(E,S,T[_],O);if(A===null){S===null&&(S=I);break}t&&S&&A.alternate===null&&e(E,S),w=s(A,w,_),z===null?U=A:z.sibling=A,z=A,S=I}if(_===T.length)return n(E,S),Te&&Fr(E,_),U;if(S===null){for(;_<T.length;_++)S=f(E,T[_],O),S!==null&&(w=s(S,w,_),z===null?U=S:z.sibling=S,z=S);return Te&&Fr(E,_),U}for(S=r(E,S);_<T.length;_++)I=v(S,E,_,T[_],O),I!==null&&(t&&I.alternate!==null&&S.delete(I.key===null?_:I.key),w=s(I,w,_),z===null?U=I:z.sibling=I,z=I);return t&&S.forEach(function(R){return e(E,R)}),Te&&Fr(E,_),U}function P(E,w,T,O){var U=Ks(T);if(typeof U!="function")throw Error($(150));if(T=U.call(T),T==null)throw Error($(151));for(var z=U=null,S=w,_=w=0,I=null,A=T.next();S!==null&&!A.done;_++,A=T.next()){S.index>_?(I=S,S=null):I=S.sibling;var R=m(E,S,A.value,O);if(R===null){S===null&&(S=I);break}t&&S&&R.alternate===null&&e(E,S),w=s(R,w,_),z===null?U=R:z.sibling=R,z=R,S=I}if(A.done)return n(E,S),Te&&Fr(E,_),U;if(S===null){for(;!A.done;_++,A=T.next())A=f(E,A.value,O),A!==null&&(w=s(A,w,_),z===null?U=A:z.sibling=A,z=A);return Te&&Fr(E,_),U}for(S=r(E,S);!A.done;_++,A=T.next())A=v(S,E,_,A.value,O),A!==null&&(t&&A.alternate!==null&&S.delete(A.key===null?_:A.key),w=s(A,w,_),z===null?U=A:z.sibling=A,z=A);return t&&S.forEach(function(b){return e(E,b)}),Te&&Fr(E,_),U}function k(E,w,T,O){if(typeof T=="object"&&T!==null&&T.type===Oi&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case Ya:e:{for(var U=T.key,z=w;z!==null;){if(z.key===U){if(U=T.type,U===Oi){if(z.tag===7){n(E,z.sibling),w=i(z,T.props.children),w.return=E,E=w;break e}}else if(z.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===Yn&&Bg(U)===z.type){n(E,z.sibling),w=i(z,T.props),w.ref=Zs(E,z,T),w.return=E,E=w;break e}n(E,z);break}else e(E,z);z=z.sibling}T.type===Oi?(w=Yr(T.props.children,E.mode,O,T.key),w.return=E,E=w):(O=Rl(T.type,T.key,T.props,null,E.mode,O),O.ref=Zs(E,w,T),O.return=E,E=O)}return o(E);case Di:e:{for(z=T.key;w!==null;){if(w.key===z)if(w.tag===4&&w.stateNode.containerInfo===T.containerInfo&&w.stateNode.implementation===T.implementation){n(E,w.sibling),w=i(w,T.children||[]),w.return=E,E=w;break e}else{n(E,w);break}else e(E,w);w=w.sibling}w=vd(T,E.mode,O),w.return=E,E=w}return o(E);case Yn:return z=T._init,k(E,w,z(T._payload),O)}if(io(T))return x(E,w,T,O);if(Ks(T))return P(E,w,T,O);al(E,T)}return typeof T=="string"&&T!==""||typeof T=="number"?(T=""+T,w!==null&&w.tag===6?(n(E,w.sibling),w=i(w,T),w.return=E,E=w):(n(E,w),w=yd(T,E.mode,O),w.return=E,E=w),o(E)):n(E,w)}return k}var as=_0(!0),w0=_0(!1),eu=Pr(null),tu=null,$i=null,bf=null;function Nf(){bf=$i=tu=null}function Df(t){var e=eu.current;Ee(eu),t._currentValue=e}function dh(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Xi(t,e){tu=t,bf=$i=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Et=!0),t.firstContext=null)}function Bt(t){var e=t._currentValue;if(bf!==t)if(t={context:t,memoizedValue:e,next:null},$i===null){if(tu===null)throw Error($(308));$i=t,tu.dependencies={lanes:0,firstContext:t}}else $i=$i.next=t;return e}var qr=null;function Of(t){qr===null?qr=[t]:qr.push(t)}function E0(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,Of(e)):(n.next=i.next,i.next=n),e.interleaved=n,Ln(t,r)}function Ln(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Xn=!1;function Mf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function T0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Nn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function fr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,ae&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,Ln(t,n)}return i=r.interleaved,i===null?(e.next=e,Of(r)):(e.next=i.next,i.next=e),r.interleaved=e,Ln(t,n)}function Sl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,wf(t,n)}}function $g(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function nu(t,e,n,r){var i=t.updateQueue;Xn=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,u=i.shared.pending;if(u!==null){i.shared.pending=null;var l=u,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var d=t.alternate;d!==null&&(d=d.updateQueue,u=d.lastBaseUpdate,u!==o&&(u===null?d.firstBaseUpdate=c:u.next=c,d.lastBaseUpdate=l))}if(s!==null){var f=i.baseState;o=0,d=c=l=null,u=s;do{var m=u.lane,v=u.eventTime;if((r&m)===m){d!==null&&(d=d.next={eventTime:v,lane:0,tag:u.tag,payload:u.payload,callback:u.callback,next:null});e:{var x=t,P=u;switch(m=e,v=n,P.tag){case 1:if(x=P.payload,typeof x=="function"){f=x.call(v,f,m);break e}f=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=P.payload,m=typeof x=="function"?x.call(v,f,m):x,m==null)break e;f=xe({},f,m);break e;case 2:Xn=!0}}u.callback!==null&&u.lane!==0&&(t.flags|=64,m=i.effects,m===null?i.effects=[u]:m.push(u))}else v={eventTime:v,lane:m,tag:u.tag,payload:u.payload,callback:u.callback,next:null},d===null?(c=d=v,l=f):d=d.next=v,o|=m;if(u=u.next,u===null){if(u=i.shared.pending,u===null)break;m=u,u=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(!0);if(d===null&&(l=f),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=d,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);ni|=o,t.lanes=o,t.memoizedState=f}}function zg(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error($(191,i));i.call(r)}}}var pa={},hn=Pr(pa),Bo=Pr(pa),$o=Pr(pa);function Hr(t){if(t===pa)throw Error($(174));return t}function Lf(t,e){switch(me($o,e),me(Bo,t),me(hn,pa),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:qd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=qd(e,t)}Ee(hn),me(hn,e)}function ls(){Ee(hn),Ee(Bo),Ee($o)}function I0(t){Hr($o.current);var e=Hr(hn.current),n=qd(e,t.type);e!==n&&(me(Bo,t),me(hn,n))}function Vf(t){Bo.current===t&&(Ee(hn),Ee(Bo))}var Ie=Pr(0);function ru(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var dd=[];function jf(){for(var t=0;t<dd.length;t++)dd[t]._workInProgressVersionPrimary=null;dd.length=0}var xl=zn.ReactCurrentDispatcher,hd=zn.ReactCurrentBatchConfig,ti=0,Se=null,je=null,We=null,iu=!1,wo=!1,zo=0,ax=0;function rt(){throw Error($(321))}function Ff(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Jt(t[n],e[n]))return!1;return!0}function Uf(t,e,n,r,i,s){if(ti=s,Se=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,xl.current=t===null||t.memoizedState===null?dx:hx,t=n(r,i),wo){s=0;do{if(wo=!1,zo=0,25<=s)throw Error($(301));s+=1,We=je=null,e.updateQueue=null,xl.current=fx,t=n(r,i)}while(wo)}if(xl.current=su,e=je!==null&&je.next!==null,ti=0,We=je=Se=null,iu=!1,e)throw Error($(300));return t}function Bf(){var t=zo!==0;return zo=0,t}function sn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return We===null?Se.memoizedState=We=t:We=We.next=t,We}function $t(){if(je===null){var t=Se.alternate;t=t!==null?t.memoizedState:null}else t=je.next;var e=We===null?Se.memoizedState:We.next;if(e!==null)We=e,je=t;else{if(t===null)throw Error($(310));je=t,t={memoizedState:je.memoizedState,baseState:je.baseState,baseQueue:je.baseQueue,queue:je.queue,next:null},We===null?Se.memoizedState=We=t:We=We.next=t}return We}function Wo(t,e){return typeof e=="function"?e(t):e}function fd(t){var e=$t(),n=e.queue;if(n===null)throw Error($(311));n.lastRenderedReducer=t;var r=je,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var u=o=null,l=null,c=s;do{var d=c.lane;if((ti&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:t(r,c.action);else{var f={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(u=l=f,o=r):l=l.next=f,Se.lanes|=d,ni|=d}c=c.next}while(c!==null&&c!==s);l===null?o=r:l.next=u,Jt(r,e.memoizedState)||(Et=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=l,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,Se.lanes|=s,ni|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function pd(t){var e=$t(),n=e.queue;if(n===null)throw Error($(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);Jt(s,e.memoizedState)||(Et=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function S0(){}function x0(t,e){var n=Se,r=$t(),i=e(),s=!Jt(r.memoizedState,i);if(s&&(r.memoizedState=i,Et=!0),r=r.queue,$f(P0.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||We!==null&&We.memoizedState.tag&1){if(n.flags|=2048,qo(9,C0.bind(null,n,r,i,e),void 0,null),qe===null)throw Error($(349));ti&30||A0(n,e,i)}return i}function A0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Se.updateQueue,e===null?(e={lastEffect:null,stores:null},Se.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function C0(t,e,n,r){e.value=n,e.getSnapshot=r,k0(e)&&R0(t)}function P0(t,e,n){return n(function(){k0(e)&&R0(t)})}function k0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Jt(t,n)}catch{return!0}}function R0(t){var e=Ln(t,1);e!==null&&Yt(e,t,1,-1)}function Wg(t){var e=sn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Wo,lastRenderedState:t},e.queue=t,t=t.dispatch=cx.bind(null,Se,t),[e.memoizedState,t]}function qo(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Se.updateQueue,e===null?(e={lastEffect:null,stores:null},Se.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function b0(){return $t().memoizedState}function Al(t,e,n,r){var i=sn();Se.flags|=t,i.memoizedState=qo(1|e,n,void 0,r===void 0?null:r)}function $u(t,e,n,r){var i=$t();r=r===void 0?null:r;var s=void 0;if(je!==null){var o=je.memoizedState;if(s=o.destroy,r!==null&&Ff(r,o.deps)){i.memoizedState=qo(e,n,s,r);return}}Se.flags|=t,i.memoizedState=qo(1|e,n,s,r)}function qg(t,e){return Al(8390656,8,t,e)}function $f(t,e){return $u(2048,8,t,e)}function N0(t,e){return $u(4,2,t,e)}function D0(t,e){return $u(4,4,t,e)}function O0(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function M0(t,e,n){return n=n!=null?n.concat([t]):null,$u(4,4,O0.bind(null,e,t),n)}function zf(){}function L0(t,e){var n=$t();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Ff(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function V0(t,e){var n=$t();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Ff(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function j0(t,e,n){return ti&21?(Jt(n,e)||(n=z_(),Se.lanes|=n,ni|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Et=!0),t.memoizedState=n)}function lx(t,e){var n=de;de=n!==0&&4>n?n:4,t(!0);var r=hd.transition;hd.transition={};try{t(!1),e()}finally{de=n,hd.transition=r}}function F0(){return $t().memoizedState}function ux(t,e,n){var r=mr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},U0(t))B0(e,n);else if(n=E0(t,e,n,r),n!==null){var i=pt();Yt(n,t,r,i),$0(n,e,r)}}function cx(t,e,n){var r=mr(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(U0(t))B0(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,u=s(o,n);if(i.hasEagerState=!0,i.eagerState=u,Jt(u,o)){var l=e.interleaved;l===null?(i.next=i,Of(e)):(i.next=l.next,l.next=i),e.interleaved=i;return}}catch{}finally{}n=E0(t,e,i,r),n!==null&&(i=pt(),Yt(n,t,r,i),$0(n,e,r))}}function U0(t){var e=t.alternate;return t===Se||e!==null&&e===Se}function B0(t,e){wo=iu=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function $0(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,wf(t,n)}}var su={readContext:Bt,useCallback:rt,useContext:rt,useEffect:rt,useImperativeHandle:rt,useInsertionEffect:rt,useLayoutEffect:rt,useMemo:rt,useReducer:rt,useRef:rt,useState:rt,useDebugValue:rt,useDeferredValue:rt,useTransition:rt,useMutableSource:rt,useSyncExternalStore:rt,useId:rt,unstable_isNewReconciler:!1},dx={readContext:Bt,useCallback:function(t,e){return sn().memoizedState=[t,e===void 0?null:e],t},useContext:Bt,useEffect:qg,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Al(4194308,4,O0.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Al(4194308,4,t,e)},useInsertionEffect:function(t,e){return Al(4,2,t,e)},useMemo:function(t,e){var n=sn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=sn();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=ux.bind(null,Se,t),[r.memoizedState,t]},useRef:function(t){var e=sn();return t={current:t},e.memoizedState=t},useState:Wg,useDebugValue:zf,useDeferredValue:function(t){return sn().memoizedState=t},useTransition:function(){var t=Wg(!1),e=t[0];return t=lx.bind(null,t[1]),sn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Se,i=sn();if(Te){if(n===void 0)throw Error($(407));n=n()}else{if(n=e(),qe===null)throw Error($(349));ti&30||A0(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,qg(P0.bind(null,r,s,t),[t]),r.flags|=2048,qo(9,C0.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=sn(),e=qe.identifierPrefix;if(Te){var n=Cn,r=An;n=(r&~(1<<32-Qt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=zo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=ax++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},hx={readContext:Bt,useCallback:L0,useContext:Bt,useEffect:$f,useImperativeHandle:M0,useInsertionEffect:N0,useLayoutEffect:D0,useMemo:V0,useReducer:fd,useRef:b0,useState:function(){return fd(Wo)},useDebugValue:zf,useDeferredValue:function(t){var e=$t();return j0(e,je.memoizedState,t)},useTransition:function(){var t=fd(Wo)[0],e=$t().memoizedState;return[t,e]},useMutableSource:S0,useSyncExternalStore:x0,useId:F0,unstable_isNewReconciler:!1},fx={readContext:Bt,useCallback:L0,useContext:Bt,useEffect:$f,useImperativeHandle:M0,useInsertionEffect:N0,useLayoutEffect:D0,useMemo:V0,useReducer:pd,useRef:b0,useState:function(){return pd(Wo)},useDebugValue:zf,useDeferredValue:function(t){var e=$t();return je===null?e.memoizedState=t:j0(e,je.memoizedState,t)},useTransition:function(){var t=pd(Wo)[0],e=$t().memoizedState;return[t,e]},useMutableSource:S0,useSyncExternalStore:x0,useId:F0,unstable_isNewReconciler:!1};function Ht(t,e){if(t&&t.defaultProps){e=xe({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function hh(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:xe({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var zu={isMounted:function(t){return(t=t._reactInternals)?hi(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=pt(),i=mr(t),s=Nn(r,i);s.payload=e,n!=null&&(s.callback=n),e=fr(t,s,i),e!==null&&(Yt(e,t,i,r),Sl(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=pt(),i=mr(t),s=Nn(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=fr(t,s,i),e!==null&&(Yt(e,t,i,r),Sl(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=pt(),r=mr(t),i=Nn(n,r);i.tag=2,e!=null&&(i.callback=e),e=fr(t,i,r),e!==null&&(Yt(e,t,r,n),Sl(e,t,r))}};function Hg(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!Vo(n,r)||!Vo(i,s):!0}function z0(t,e,n){var r=!1,i=Tr,s=e.contextType;return typeof s=="object"&&s!==null?s=Bt(s):(i=It(e)?Zr:ut.current,r=e.contextTypes,s=(r=r!=null)?ss(t,i):Tr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=zu,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function Gg(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&zu.enqueueReplaceState(e,e.state,null)}function fh(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},Mf(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=Bt(s):(s=It(e)?Zr:ut.current,i.context=ss(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(hh(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&zu.enqueueReplaceState(i,i.state,null),nu(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function us(t,e){try{var n="",r=e;do n+=B1(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function md(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function ph(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var px=typeof WeakMap=="function"?WeakMap:Map;function W0(t,e,n){n=Nn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){au||(au=!0,Sh=r),ph(t,e)},n}function q0(t,e,n){n=Nn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){ph(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){ph(t,e),typeof r!="function"&&(pr===null?pr=new Set([this]):pr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Kg(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new px;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=Px.bind(null,t,e,n),e.then(t,t))}function Qg(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Yg(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Nn(-1,1),e.tag=2,fr(n,e,1))),n.lanes|=1),t)}var mx=zn.ReactCurrentOwner,Et=!1;function ft(t,e,n,r){e.child=t===null?w0(e,null,n,r):as(e,t.child,n,r)}function Xg(t,e,n,r,i){n=n.render;var s=e.ref;return Xi(e,i),r=Uf(t,e,n,r,s,i),n=Bf(),t!==null&&!Et?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Vn(t,e,i)):(Te&&n&&Pf(e),e.flags|=1,ft(t,e,r,i),e.child)}function Jg(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!Xf(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,H0(t,e,s,r,i)):(t=Rl(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Vo,n(o,r)&&t.ref===e.ref)return Vn(t,e,i)}return e.flags|=1,t=gr(s,r),t.ref=e.ref,t.return=e,e.child=t}function H0(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(Vo(s,r)&&t.ref===e.ref)if(Et=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(Et=!0);else return e.lanes=t.lanes,Vn(t,e,i)}return mh(t,e,n,r,i)}function G0(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},me(Wi,Ct),Ct|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,me(Wi,Ct),Ct|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,me(Wi,Ct),Ct|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,me(Wi,Ct),Ct|=r;return ft(t,e,i,n),e.child}function K0(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function mh(t,e,n,r,i){var s=It(n)?Zr:ut.current;return s=ss(e,s),Xi(e,i),n=Uf(t,e,n,r,s,i),r=Bf(),t!==null&&!Et?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Vn(t,e,i)):(Te&&r&&Pf(e),e.flags|=1,ft(t,e,n,i),e.child)}function Zg(t,e,n,r,i){if(It(n)){var s=!0;Xl(e)}else s=!1;if(Xi(e,i),e.stateNode===null)Cl(t,e),z0(e,n,r),fh(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,u=e.memoizedProps;o.props=u;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Bt(c):(c=It(n)?Zr:ut.current,c=ss(e,c));var d=n.getDerivedStateFromProps,f=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(u!==r||l!==c)&&Gg(e,o,r,c),Xn=!1;var m=e.memoizedState;o.state=m,nu(e,r,o,i),l=e.memoizedState,u!==r||m!==l||Tt.current||Xn?(typeof d=="function"&&(hh(e,n,d,r),l=e.memoizedState),(u=Xn||Hg(e,n,u,r,m,l,c))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=l),o.props=r,o.state=l,o.context=c,r=u):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,T0(t,e),u=e.memoizedProps,c=e.type===e.elementType?u:Ht(e.type,u),o.props=c,f=e.pendingProps,m=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Bt(l):(l=It(n)?Zr:ut.current,l=ss(e,l));var v=n.getDerivedStateFromProps;(d=typeof v=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(u!==f||m!==l)&&Gg(e,o,r,l),Xn=!1,m=e.memoizedState,o.state=m,nu(e,r,o,i);var x=e.memoizedState;u!==f||m!==x||Tt.current||Xn?(typeof v=="function"&&(hh(e,n,v,r),x=e.memoizedState),(c=Xn||Hg(e,n,c,r,m,x,l)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,x,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,x,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||u===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=x),o.props=r,o.state=x,o.context=l,r=c):(typeof o.componentDidUpdate!="function"||u===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),r=!1)}return gh(t,e,n,r,s,i)}function gh(t,e,n,r,i,s){K0(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&jg(e,n,!1),Vn(t,e,s);r=e.stateNode,mx.current=e;var u=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=as(e,t.child,null,s),e.child=as(e,null,u,s)):ft(t,e,u,s),e.memoizedState=r.state,i&&jg(e,n,!0),e.child}function Q0(t){var e=t.stateNode;e.pendingContext?Vg(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Vg(t,e.context,!1),Lf(t,e.containerInfo)}function ey(t,e,n,r,i){return os(),Rf(i),e.flags|=256,ft(t,e,n,r),e.child}var yh={dehydrated:null,treeContext:null,retryLane:0};function vh(t){return{baseLanes:t,cachePool:null,transitions:null}}function Y0(t,e,n){var r=e.pendingProps,i=Ie.current,s=!1,o=(e.flags&128)!==0,u;if((u=o)||(u=t!==null&&t.memoizedState===null?!1:(i&2)!==0),u?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),me(Ie,i&1),t===null)return ch(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Hu(o,r,0,null),t=Yr(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=vh(n),e.memoizedState=yh,t):Wf(e,o));if(i=t.memoizedState,i!==null&&(u=i.dehydrated,u!==null))return gx(t,e,o,r,u,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,u=i.sibling;var l={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=l,e.deletions=null):(r=gr(i,l),r.subtreeFlags=i.subtreeFlags&14680064),u!==null?s=gr(u,s):(s=Yr(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?vh(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=yh,r}return s=t.child,t=s.sibling,r=gr(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function Wf(t,e){return e=Hu({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function ll(t,e,n,r){return r!==null&&Rf(r),as(e,t.child,null,n),t=Wf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function gx(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=md(Error($(422))),ll(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Hu({mode:"visible",children:r.children},i,0,null),s=Yr(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&as(e,t.child,null,o),e.child.memoizedState=vh(o),e.memoizedState=yh,s);if(!(e.mode&1))return ll(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var u=r.dgst;return r=u,s=Error($(419)),r=md(s,r,void 0),ll(t,e,o,r)}if(u=(o&t.childLanes)!==0,Et||u){if(r=qe,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Ln(t,i),Yt(r,t,i,-1))}return Yf(),r=md(Error($(421))),ll(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=kx.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,Pt=hr(i.nextSibling),Rt=e,Te=!0,Kt=null,t!==null&&(Lt[Vt++]=An,Lt[Vt++]=Cn,Lt[Vt++]=ei,An=t.id,Cn=t.overflow,ei=e),e=Wf(e,r.children),e.flags|=4096,e)}function ty(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),dh(t.return,e,n)}function gd(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function X0(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(ft(t,e,r.children,n),r=Ie.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&ty(t,n,e);else if(t.tag===19)ty(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(me(Ie,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&ru(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),gd(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&ru(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}gd(e,!0,n,null,s);break;case"together":gd(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Cl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Vn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),ni|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error($(153));if(e.child!==null){for(t=e.child,n=gr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=gr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function yx(t,e,n){switch(e.tag){case 3:Q0(e),os();break;case 5:I0(e);break;case 1:It(e.type)&&Xl(e);break;case 4:Lf(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;me(eu,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(me(Ie,Ie.current&1),e.flags|=128,null):n&e.child.childLanes?Y0(t,e,n):(me(Ie,Ie.current&1),t=Vn(t,e,n),t!==null?t.sibling:null);me(Ie,Ie.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return X0(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),me(Ie,Ie.current),r)break;return null;case 22:case 23:return e.lanes=0,G0(t,e,n)}return Vn(t,e,n)}var J0,_h,Z0,ew;J0=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};_h=function(){};Z0=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,Hr(hn.current);var s=null;switch(n){case"input":i=Bd(t,i),r=Bd(t,r),s=[];break;case"select":i=xe({},i,{value:void 0}),r=xe({},r,{value:void 0}),s=[];break;case"textarea":i=Wd(t,i),r=Wd(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Ql)}Hd(n,r);var o;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var u=i[c];for(o in u)u.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ro.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in r){var l=r[c];if(u=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&l!==u&&(l!=null||u!=null))if(c==="style")if(u){for(o in u)!u.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&u[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,u=u?u.__html:void 0,l!=null&&u!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ro.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&_e("scroll",t),s||u===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};ew=function(t,e,n,r){n!==r&&(e.flags|=4)};function eo(t,e){if(!Te)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function it(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function vx(t,e,n){var r=e.pendingProps;switch(kf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return it(e),null;case 1:return It(e.type)&&Yl(),it(e),null;case 3:return r=e.stateNode,ls(),Ee(Tt),Ee(ut),jf(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(ol(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Kt!==null&&(Ch(Kt),Kt=null))),_h(t,e),it(e),null;case 5:Vf(e);var i=Hr($o.current);if(n=e.type,t!==null&&e.stateNode!=null)Z0(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error($(166));return it(e),null}if(t=Hr(hn.current),ol(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[on]=e,r[Uo]=s,t=(e.mode&1)!==0,n){case"dialog":_e("cancel",r),_e("close",r);break;case"iframe":case"object":case"embed":_e("load",r);break;case"video":case"audio":for(i=0;i<oo.length;i++)_e(oo[i],r);break;case"source":_e("error",r);break;case"img":case"image":case"link":_e("error",r),_e("load",r);break;case"details":_e("toggle",r);break;case"input":cg(r,s),_e("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},_e("invalid",r);break;case"textarea":hg(r,s),_e("invalid",r)}Hd(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var u=s[o];o==="children"?typeof u=="string"?r.textContent!==u&&(s.suppressHydrationWarning!==!0&&sl(r.textContent,u,t),i=["children",u]):typeof u=="number"&&r.textContent!==""+u&&(s.suppressHydrationWarning!==!0&&sl(r.textContent,u,t),i=["children",""+u]):Ro.hasOwnProperty(o)&&u!=null&&o==="onScroll"&&_e("scroll",r)}switch(n){case"input":Xa(r),dg(r,s,!0);break;case"textarea":Xa(r),fg(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Ql)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=P_(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[on]=e,t[Uo]=r,J0(t,e,!1,!1),e.stateNode=t;e:{switch(o=Gd(n,r),n){case"dialog":_e("cancel",t),_e("close",t),i=r;break;case"iframe":case"object":case"embed":_e("load",t),i=r;break;case"video":case"audio":for(i=0;i<oo.length;i++)_e(oo[i],t);i=r;break;case"source":_e("error",t),i=r;break;case"img":case"image":case"link":_e("error",t),_e("load",t),i=r;break;case"details":_e("toggle",t),i=r;break;case"input":cg(t,r),i=Bd(t,r),_e("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=xe({},r,{value:void 0}),_e("invalid",t);break;case"textarea":hg(t,r),i=Wd(t,r),_e("invalid",t);break;default:i=r}Hd(n,i),u=i;for(s in u)if(u.hasOwnProperty(s)){var l=u[s];s==="style"?b_(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&k_(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&bo(t,l):typeof l=="number"&&bo(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ro.hasOwnProperty(s)?l!=null&&s==="onScroll"&&_e("scroll",t):l!=null&&pf(t,s,l,o))}switch(n){case"input":Xa(t),dg(t,r,!1);break;case"textarea":Xa(t),fg(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Er(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?Gi(t,!!r.multiple,s,!1):r.defaultValue!=null&&Gi(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=Ql)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return it(e),null;case 6:if(t&&e.stateNode!=null)ew(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error($(166));if(n=Hr($o.current),Hr(hn.current),ol(e)){if(r=e.stateNode,n=e.memoizedProps,r[on]=e,(s=r.nodeValue!==n)&&(t=Rt,t!==null))switch(t.tag){case 3:sl(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&sl(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[on]=e,e.stateNode=r}return it(e),null;case 13:if(Ee(Ie),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Te&&Pt!==null&&e.mode&1&&!(e.flags&128))v0(),os(),e.flags|=98560,s=!1;else if(s=ol(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error($(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error($(317));s[on]=e}else os(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;it(e),s=!1}else Kt!==null&&(Ch(Kt),Kt=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||Ie.current&1?Ue===0&&(Ue=3):Yf())),e.updateQueue!==null&&(e.flags|=4),it(e),null);case 4:return ls(),_h(t,e),t===null&&jo(e.stateNode.containerInfo),it(e),null;case 10:return Df(e.type._context),it(e),null;case 17:return It(e.type)&&Yl(),it(e),null;case 19:if(Ee(Ie),s=e.memoizedState,s===null)return it(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)eo(s,!1);else{if(Ue!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=ru(t),o!==null){for(e.flags|=128,eo(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return me(Ie,Ie.current&1|2),e.child}t=t.sibling}s.tail!==null&&Re()>cs&&(e.flags|=128,r=!0,eo(s,!1),e.lanes=4194304)}else{if(!r)if(t=ru(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),eo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Te)return it(e),null}else 2*Re()-s.renderingStartTime>cs&&n!==1073741824&&(e.flags|=128,r=!0,eo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Re(),e.sibling=null,n=Ie.current,me(Ie,r?n&1|2:n&1),e):(it(e),null);case 22:case 23:return Qf(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Ct&1073741824&&(it(e),e.subtreeFlags&6&&(e.flags|=8192)):it(e),null;case 24:return null;case 25:return null}throw Error($(156,e.tag))}function _x(t,e){switch(kf(e),e.tag){case 1:return It(e.type)&&Yl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ls(),Ee(Tt),Ee(ut),jf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Vf(e),null;case 13:if(Ee(Ie),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error($(340));os()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Ee(Ie),null;case 4:return ls(),null;case 10:return Df(e.type._context),null;case 22:case 23:return Qf(),null;case 24:return null;default:return null}}var ul=!1,at=!1,wx=typeof WeakSet=="function"?WeakSet:Set,G=null;function zi(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Pe(t,e,r)}else n.current=null}function wh(t,e,n){try{n()}catch(r){Pe(t,e,r)}}var ny=!1;function Ex(t,e){if(rh=Hl,t=s0(),Cf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,u=-1,l=-1,c=0,d=0,f=t,m=null;t:for(;;){for(var v;f!==n||i!==0&&f.nodeType!==3||(u=o+i),f!==s||r!==0&&f.nodeType!==3||(l=o+r),f.nodeType===3&&(o+=f.nodeValue.length),(v=f.firstChild)!==null;)m=f,f=v;for(;;){if(f===t)break t;if(m===n&&++c===i&&(u=o),m===s&&++d===r&&(l=o),(v=f.nextSibling)!==null)break;f=m,m=f.parentNode}f=v}n=u===-1||l===-1?null:{start:u,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(ih={focusedElem:t,selectionRange:n},Hl=!1,G=e;G!==null;)if(e=G,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,G=t;else for(;G!==null;){e=G;try{var x=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var P=x.memoizedProps,k=x.memoizedState,E=e.stateNode,w=E.getSnapshotBeforeUpdate(e.elementType===e.type?P:Ht(e.type,P),k);E.__reactInternalSnapshotBeforeUpdate=w}break;case 3:var T=e.stateNode.containerInfo;T.nodeType===1?T.textContent="":T.nodeType===9&&T.documentElement&&T.removeChild(T.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error($(163))}}catch(O){Pe(e,e.return,O)}if(t=e.sibling,t!==null){t.return=e.return,G=t;break}G=e.return}return x=ny,ny=!1,x}function Eo(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&wh(e,n,s)}i=i.next}while(i!==r)}}function Wu(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Eh(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function tw(t){var e=t.alternate;e!==null&&(t.alternate=null,tw(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[on],delete e[Uo],delete e[ah],delete e[rx],delete e[ix])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function nw(t){return t.tag===5||t.tag===3||t.tag===4}function ry(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||nw(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Th(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Ql));else if(r!==4&&(t=t.child,t!==null))for(Th(t,e,n),t=t.sibling;t!==null;)Th(t,e,n),t=t.sibling}function Ih(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(Ih(t,e,n),t=t.sibling;t!==null;)Ih(t,e,n),t=t.sibling}var Ge=null,Gt=!1;function Gn(t,e,n){for(n=n.child;n!==null;)rw(t,e,n),n=n.sibling}function rw(t,e,n){if(dn&&typeof dn.onCommitFiberUnmount=="function")try{dn.onCommitFiberUnmount(Lu,n)}catch{}switch(n.tag){case 5:at||zi(n,e);case 6:var r=Ge,i=Gt;Ge=null,Gn(t,e,n),Ge=r,Gt=i,Ge!==null&&(Gt?(t=Ge,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ge.removeChild(n.stateNode));break;case 18:Ge!==null&&(Gt?(t=Ge,n=n.stateNode,t.nodeType===8?ud(t.parentNode,n):t.nodeType===1&&ud(t,n),Mo(t)):ud(Ge,n.stateNode));break;case 4:r=Ge,i=Gt,Ge=n.stateNode.containerInfo,Gt=!0,Gn(t,e,n),Ge=r,Gt=i;break;case 0:case 11:case 14:case 15:if(!at&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&wh(n,e,o),i=i.next}while(i!==r)}Gn(t,e,n);break;case 1:if(!at&&(zi(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(u){Pe(n,e,u)}Gn(t,e,n);break;case 21:Gn(t,e,n);break;case 22:n.mode&1?(at=(r=at)||n.memoizedState!==null,Gn(t,e,n),at=r):Gn(t,e,n);break;default:Gn(t,e,n)}}function iy(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new wx),e.forEach(function(r){var i=Rx.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function qt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,u=o;e:for(;u!==null;){switch(u.tag){case 5:Ge=u.stateNode,Gt=!1;break e;case 3:Ge=u.stateNode.containerInfo,Gt=!0;break e;case 4:Ge=u.stateNode.containerInfo,Gt=!0;break e}u=u.return}if(Ge===null)throw Error($(160));rw(s,o,i),Ge=null,Gt=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(c){Pe(i,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)iw(e,t),e=e.sibling}function iw(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(qt(e,t),rn(t),r&4){try{Eo(3,t,t.return),Wu(3,t)}catch(P){Pe(t,t.return,P)}try{Eo(5,t,t.return)}catch(P){Pe(t,t.return,P)}}break;case 1:qt(e,t),rn(t),r&512&&n!==null&&zi(n,n.return);break;case 5:if(qt(e,t),rn(t),r&512&&n!==null&&zi(n,n.return),t.flags&32){var i=t.stateNode;try{bo(i,"")}catch(P){Pe(t,t.return,P)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,u=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{u==="input"&&s.type==="radio"&&s.name!=null&&A_(i,s),Gd(u,o);var c=Gd(u,s);for(o=0;o<l.length;o+=2){var d=l[o],f=l[o+1];d==="style"?b_(i,f):d==="dangerouslySetInnerHTML"?k_(i,f):d==="children"?bo(i,f):pf(i,d,f,c)}switch(u){case"input":$d(i,s);break;case"textarea":C_(i,s);break;case"select":var m=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var v=s.value;v!=null?Gi(i,!!s.multiple,v,!1):m!==!!s.multiple&&(s.defaultValue!=null?Gi(i,!!s.multiple,s.defaultValue,!0):Gi(i,!!s.multiple,s.multiple?[]:"",!1))}i[Uo]=s}catch(P){Pe(t,t.return,P)}}break;case 6:if(qt(e,t),rn(t),r&4){if(t.stateNode===null)throw Error($(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(P){Pe(t,t.return,P)}}break;case 3:if(qt(e,t),rn(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Mo(e.containerInfo)}catch(P){Pe(t,t.return,P)}break;case 4:qt(e,t),rn(t);break;case 13:qt(e,t),rn(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Gf=Re())),r&4&&iy(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?(at=(c=at)||d,qt(e,t),at=c):qt(e,t),rn(t),r&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!d&&t.mode&1)for(G=t,d=t.child;d!==null;){for(f=G=d;G!==null;){switch(m=G,v=m.child,m.tag){case 0:case 11:case 14:case 15:Eo(4,m,m.return);break;case 1:zi(m,m.return);var x=m.stateNode;if(typeof x.componentWillUnmount=="function"){r=m,n=m.return;try{e=r,x.props=e.memoizedProps,x.state=e.memoizedState,x.componentWillUnmount()}catch(P){Pe(r,n,P)}}break;case 5:zi(m,m.return);break;case 22:if(m.memoizedState!==null){oy(f);continue}}v!==null?(v.return=m,G=v):oy(f)}d=d.sibling}e:for(d=null,f=t;;){if(f.tag===5){if(d===null){d=f;try{i=f.stateNode,c?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(u=f.stateNode,l=f.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,u.style.display=R_("display",o))}catch(P){Pe(t,t.return,P)}}}else if(f.tag===6){if(d===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(P){Pe(t,t.return,P)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:qt(e,t),rn(t),r&4&&iy(t);break;case 21:break;default:qt(e,t),rn(t)}}function rn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(nw(n)){var r=n;break e}n=n.return}throw Error($(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(bo(i,""),r.flags&=-33);var s=ry(t);Ih(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,u=ry(t);Th(t,u,o);break;default:throw Error($(161))}}catch(l){Pe(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Tx(t,e,n){G=t,sw(t)}function sw(t,e,n){for(var r=(t.mode&1)!==0;G!==null;){var i=G,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||ul;if(!o){var u=i.alternate,l=u!==null&&u.memoizedState!==null||at;u=ul;var c=at;if(ul=o,(at=l)&&!c)for(G=i;G!==null;)o=G,l=o.child,o.tag===22&&o.memoizedState!==null?ay(i):l!==null?(l.return=o,G=l):ay(i);for(;s!==null;)G=s,sw(s),s=s.sibling;G=i,ul=u,at=c}sy(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,G=s):sy(t)}}function sy(t){for(;G!==null;){var e=G;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:at||Wu(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!at)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:Ht(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&zg(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}zg(e,o,n)}break;case 5:var u=e.stateNode;if(n===null&&e.flags&4){n=u;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var f=d.dehydrated;f!==null&&Mo(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error($(163))}at||e.flags&512&&Eh(e)}catch(m){Pe(e,e.return,m)}}if(e===t){G=null;break}if(n=e.sibling,n!==null){n.return=e.return,G=n;break}G=e.return}}function oy(t){for(;G!==null;){var e=G;if(e===t){G=null;break}var n=e.sibling;if(n!==null){n.return=e.return,G=n;break}G=e.return}}function ay(t){for(;G!==null;){var e=G;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Wu(4,e)}catch(l){Pe(e,n,l)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(l){Pe(e,i,l)}}var s=e.return;try{Eh(e)}catch(l){Pe(e,s,l)}break;case 5:var o=e.return;try{Eh(e)}catch(l){Pe(e,o,l)}}}catch(l){Pe(e,e.return,l)}if(e===t){G=null;break}var u=e.sibling;if(u!==null){u.return=e.return,G=u;break}G=e.return}}var Ix=Math.ceil,ou=zn.ReactCurrentDispatcher,qf=zn.ReactCurrentOwner,Ft=zn.ReactCurrentBatchConfig,ae=0,qe=null,De=null,Ye=0,Ct=0,Wi=Pr(0),Ue=0,Ho=null,ni=0,qu=0,Hf=0,To=null,_t=null,Gf=0,cs=1/0,Sn=null,au=!1,Sh=null,pr=null,cl=!1,or=null,lu=0,Io=0,xh=null,Pl=-1,kl=0;function pt(){return ae&6?Re():Pl!==-1?Pl:Pl=Re()}function mr(t){return t.mode&1?ae&2&&Ye!==0?Ye&-Ye:ox.transition!==null?(kl===0&&(kl=z_()),kl):(t=de,t!==0||(t=window.event,t=t===void 0?16:Y_(t.type)),t):1}function Yt(t,e,n,r){if(50<Io)throw Io=0,xh=null,Error($(185));da(t,n,r),(!(ae&2)||t!==qe)&&(t===qe&&(!(ae&2)&&(qu|=n),Ue===4&&Zn(t,Ye)),St(t,r),n===1&&ae===0&&!(e.mode&1)&&(cs=Re()+500,Bu&&kr()))}function St(t,e){var n=t.callbackNode;oS(t,e);var r=ql(t,t===qe?Ye:0);if(r===0)n!==null&&gg(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&gg(n),e===1)t.tag===0?sx(ly.bind(null,t)):m0(ly.bind(null,t)),tx(function(){!(ae&6)&&kr()}),n=null;else{switch(W_(r)){case 1:n=_f;break;case 4:n=B_;break;case 16:n=Wl;break;case 536870912:n=$_;break;default:n=Wl}n=fw(n,ow.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function ow(t,e){if(Pl=-1,kl=0,ae&6)throw Error($(327));var n=t.callbackNode;if(Ji()&&t.callbackNode!==n)return null;var r=ql(t,t===qe?Ye:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=uu(t,r);else{e=r;var i=ae;ae|=2;var s=lw();(qe!==t||Ye!==e)&&(Sn=null,cs=Re()+500,Qr(t,e));do try{Ax();break}catch(u){aw(t,u)}while(!0);Nf(),ou.current=s,ae=i,De!==null?e=0:(qe=null,Ye=0,e=Ue)}if(e!==0){if(e===2&&(i=Jd(t),i!==0&&(r=i,e=Ah(t,i))),e===1)throw n=Ho,Qr(t,0),Zn(t,r),St(t,Re()),n;if(e===6)Zn(t,r);else{if(i=t.current.alternate,!(r&30)&&!Sx(i)&&(e=uu(t,r),e===2&&(s=Jd(t),s!==0&&(r=s,e=Ah(t,s))),e===1))throw n=Ho,Qr(t,0),Zn(t,r),St(t,Re()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error($(345));case 2:Ur(t,_t,Sn);break;case 3:if(Zn(t,r),(r&130023424)===r&&(e=Gf+500-Re(),10<e)){if(ql(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){pt(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=oh(Ur.bind(null,t,_t,Sn),e);break}Ur(t,_t,Sn);break;case 4:if(Zn(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-Qt(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Re()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Ix(r/1960))-r,10<r){t.timeoutHandle=oh(Ur.bind(null,t,_t,Sn),r);break}Ur(t,_t,Sn);break;case 5:Ur(t,_t,Sn);break;default:throw Error($(329))}}}return St(t,Re()),t.callbackNode===n?ow.bind(null,t):null}function Ah(t,e){var n=To;return t.current.memoizedState.isDehydrated&&(Qr(t,e).flags|=256),t=uu(t,e),t!==2&&(e=_t,_t=n,e!==null&&Ch(e)),t}function Ch(t){_t===null?_t=t:_t.push.apply(_t,t)}function Sx(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!Jt(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Zn(t,e){for(e&=~Hf,e&=~qu,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Qt(e),r=1<<n;t[n]=-1,e&=~r}}function ly(t){if(ae&6)throw Error($(327));Ji();var e=ql(t,0);if(!(e&1))return St(t,Re()),null;var n=uu(t,e);if(t.tag!==0&&n===2){var r=Jd(t);r!==0&&(e=r,n=Ah(t,r))}if(n===1)throw n=Ho,Qr(t,0),Zn(t,e),St(t,Re()),n;if(n===6)throw Error($(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Ur(t,_t,Sn),St(t,Re()),null}function Kf(t,e){var n=ae;ae|=1;try{return t(e)}finally{ae=n,ae===0&&(cs=Re()+500,Bu&&kr())}}function ri(t){or!==null&&or.tag===0&&!(ae&6)&&Ji();var e=ae;ae|=1;var n=Ft.transition,r=de;try{if(Ft.transition=null,de=1,t)return t()}finally{de=r,Ft.transition=n,ae=e,!(ae&6)&&kr()}}function Qf(){Ct=Wi.current,Ee(Wi)}function Qr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,ex(n)),De!==null)for(n=De.return;n!==null;){var r=n;switch(kf(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Yl();break;case 3:ls(),Ee(Tt),Ee(ut),jf();break;case 5:Vf(r);break;case 4:ls();break;case 13:Ee(Ie);break;case 19:Ee(Ie);break;case 10:Df(r.type._context);break;case 22:case 23:Qf()}n=n.return}if(qe=t,De=t=gr(t.current,null),Ye=Ct=e,Ue=0,Ho=null,Hf=qu=ni=0,_t=To=null,qr!==null){for(e=0;e<qr.length;e++)if(n=qr[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}qr=null}return t}function aw(t,e){do{var n=De;try{if(Nf(),xl.current=su,iu){for(var r=Se.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}iu=!1}if(ti=0,We=je=Se=null,wo=!1,zo=0,qf.current=null,n===null||n.return===null){Ue=1,Ho=e,De=null;break}e:{var s=t,o=n.return,u=n,l=e;if(e=Ye,u.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=u,f=d.tag;if(!(d.mode&1)&&(f===0||f===11||f===15)){var m=d.alternate;m?(d.updateQueue=m.updateQueue,d.memoizedState=m.memoizedState,d.lanes=m.lanes):(d.updateQueue=null,d.memoizedState=null)}var v=Qg(o);if(v!==null){v.flags&=-257,Yg(v,o,u,s,e),v.mode&1&&Kg(s,c,e),e=v,l=c;var x=e.updateQueue;if(x===null){var P=new Set;P.add(l),e.updateQueue=P}else x.add(l);break e}else{if(!(e&1)){Kg(s,c,e),Yf();break e}l=Error($(426))}}else if(Te&&u.mode&1){var k=Qg(o);if(k!==null){!(k.flags&65536)&&(k.flags|=256),Yg(k,o,u,s,e),Rf(us(l,u));break e}}s=l=us(l,u),Ue!==4&&(Ue=2),To===null?To=[s]:To.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var E=W0(s,l,e);$g(s,E);break e;case 1:u=l;var w=s.type,T=s.stateNode;if(!(s.flags&128)&&(typeof w.getDerivedStateFromError=="function"||T!==null&&typeof T.componentDidCatch=="function"&&(pr===null||!pr.has(T)))){s.flags|=65536,e&=-e,s.lanes|=e;var O=q0(s,u,e);$g(s,O);break e}}s=s.return}while(s!==null)}cw(n)}catch(U){e=U,De===n&&n!==null&&(De=n=n.return);continue}break}while(!0)}function lw(){var t=ou.current;return ou.current=su,t===null?su:t}function Yf(){(Ue===0||Ue===3||Ue===2)&&(Ue=4),qe===null||!(ni&268435455)&&!(qu&268435455)||Zn(qe,Ye)}function uu(t,e){var n=ae;ae|=2;var r=lw();(qe!==t||Ye!==e)&&(Sn=null,Qr(t,e));do try{xx();break}catch(i){aw(t,i)}while(!0);if(Nf(),ae=n,ou.current=r,De!==null)throw Error($(261));return qe=null,Ye=0,Ue}function xx(){for(;De!==null;)uw(De)}function Ax(){for(;De!==null&&!X1();)uw(De)}function uw(t){var e=hw(t.alternate,t,Ct);t.memoizedProps=t.pendingProps,e===null?cw(t):De=e,qf.current=null}function cw(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=_x(n,e),n!==null){n.flags&=32767,De=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ue=6,De=null;return}}else if(n=vx(n,e,Ct),n!==null){De=n;return}if(e=e.sibling,e!==null){De=e;return}De=e=t}while(e!==null);Ue===0&&(Ue=5)}function Ur(t,e,n){var r=de,i=Ft.transition;try{Ft.transition=null,de=1,Cx(t,e,n,r)}finally{Ft.transition=i,de=r}return null}function Cx(t,e,n,r){do Ji();while(or!==null);if(ae&6)throw Error($(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error($(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(aS(t,s),t===qe&&(De=qe=null,Ye=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||cl||(cl=!0,fw(Wl,function(){return Ji(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Ft.transition,Ft.transition=null;var o=de;de=1;var u=ae;ae|=4,qf.current=null,Ex(t,n),iw(n,t),GS(ih),Hl=!!rh,ih=rh=null,t.current=n,Tx(n),J1(),ae=u,de=o,Ft.transition=s}else t.current=n;if(cl&&(cl=!1,or=t,lu=i),s=t.pendingLanes,s===0&&(pr=null),tS(n.stateNode),St(t,Re()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(au)throw au=!1,t=Sh,Sh=null,t;return lu&1&&t.tag!==0&&Ji(),s=t.pendingLanes,s&1?t===xh?Io++:(Io=0,xh=t):Io=0,kr(),null}function Ji(){if(or!==null){var t=W_(lu),e=Ft.transition,n=de;try{if(Ft.transition=null,de=16>t?16:t,or===null)var r=!1;else{if(t=or,or=null,lu=0,ae&6)throw Error($(331));var i=ae;for(ae|=4,G=t.current;G!==null;){var s=G,o=s.child;if(G.flags&16){var u=s.deletions;if(u!==null){for(var l=0;l<u.length;l++){var c=u[l];for(G=c;G!==null;){var d=G;switch(d.tag){case 0:case 11:case 15:Eo(8,d,s)}var f=d.child;if(f!==null)f.return=d,G=f;else for(;G!==null;){d=G;var m=d.sibling,v=d.return;if(tw(d),d===c){G=null;break}if(m!==null){m.return=v,G=m;break}G=v}}}var x=s.alternate;if(x!==null){var P=x.child;if(P!==null){x.child=null;do{var k=P.sibling;P.sibling=null,P=k}while(P!==null)}}G=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,G=o;else e:for(;G!==null;){if(s=G,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Eo(9,s,s.return)}var E=s.sibling;if(E!==null){E.return=s.return,G=E;break e}G=s.return}}var w=t.current;for(G=w;G!==null;){o=G;var T=o.child;if(o.subtreeFlags&2064&&T!==null)T.return=o,G=T;else e:for(o=w;G!==null;){if(u=G,u.flags&2048)try{switch(u.tag){case 0:case 11:case 15:Wu(9,u)}}catch(U){Pe(u,u.return,U)}if(u===o){G=null;break e}var O=u.sibling;if(O!==null){O.return=u.return,G=O;break e}G=u.return}}if(ae=i,kr(),dn&&typeof dn.onPostCommitFiberRoot=="function")try{dn.onPostCommitFiberRoot(Lu,t)}catch{}r=!0}return r}finally{de=n,Ft.transition=e}}return!1}function uy(t,e,n){e=us(n,e),e=W0(t,e,1),t=fr(t,e,1),e=pt(),t!==null&&(da(t,1,e),St(t,e))}function Pe(t,e,n){if(t.tag===3)uy(t,t,n);else for(;e!==null;){if(e.tag===3){uy(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(pr===null||!pr.has(r))){t=us(n,t),t=q0(e,t,1),e=fr(e,t,1),t=pt(),e!==null&&(da(e,1,t),St(e,t));break}}e=e.return}}function Px(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=pt(),t.pingedLanes|=t.suspendedLanes&n,qe===t&&(Ye&n)===n&&(Ue===4||Ue===3&&(Ye&130023424)===Ye&&500>Re()-Gf?Qr(t,0):Hf|=n),St(t,e)}function dw(t,e){e===0&&(t.mode&1?(e=el,el<<=1,!(el&130023424)&&(el=4194304)):e=1);var n=pt();t=Ln(t,e),t!==null&&(da(t,e,n),St(t,n))}function kx(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),dw(t,n)}function Rx(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error($(314))}r!==null&&r.delete(e),dw(t,n)}var hw;hw=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Tt.current)Et=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Et=!1,yx(t,e,n);Et=!!(t.flags&131072)}else Et=!1,Te&&e.flags&1048576&&g0(e,Zl,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Cl(t,e),t=e.pendingProps;var i=ss(e,ut.current);Xi(e,n),i=Uf(null,e,r,t,i,n);var s=Bf();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,It(r)?(s=!0,Xl(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Mf(e),i.updater=zu,e.stateNode=i,i._reactInternals=e,fh(e,r,t,n),e=gh(null,e,r,!0,s,n)):(e.tag=0,Te&&s&&Pf(e),ft(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Cl(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=Nx(r),t=Ht(r,t),i){case 0:e=mh(null,e,r,t,n);break e;case 1:e=Zg(null,e,r,t,n);break e;case 11:e=Xg(null,e,r,t,n);break e;case 14:e=Jg(null,e,r,Ht(r.type,t),n);break e}throw Error($(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ht(r,i),mh(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ht(r,i),Zg(t,e,r,i,n);case 3:e:{if(Q0(e),t===null)throw Error($(387));r=e.pendingProps,s=e.memoizedState,i=s.element,T0(t,e),nu(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=us(Error($(423)),e),e=ey(t,e,r,n,i);break e}else if(r!==i){i=us(Error($(424)),e),e=ey(t,e,r,n,i);break e}else for(Pt=hr(e.stateNode.containerInfo.firstChild),Rt=e,Te=!0,Kt=null,n=w0(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(os(),r===i){e=Vn(t,e,n);break e}ft(t,e,r,n)}e=e.child}return e;case 5:return I0(e),t===null&&ch(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,sh(r,i)?o=null:s!==null&&sh(r,s)&&(e.flags|=32),K0(t,e),ft(t,e,o,n),e.child;case 6:return t===null&&ch(e),null;case 13:return Y0(t,e,n);case 4:return Lf(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=as(e,null,r,n):ft(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ht(r,i),Xg(t,e,r,i,n);case 7:return ft(t,e,e.pendingProps,n),e.child;case 8:return ft(t,e,e.pendingProps.children,n),e.child;case 12:return ft(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,me(eu,r._currentValue),r._currentValue=o,s!==null)if(Jt(s.value,o)){if(s.children===i.children&&!Tt.current){e=Vn(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var u=s.dependencies;if(u!==null){o=s.child;for(var l=u.firstContext;l!==null;){if(l.context===r){if(s.tag===1){l=Nn(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),dh(s.return,n,e),u.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error($(341));o.lanes|=n,u=o.alternate,u!==null&&(u.lanes|=n),dh(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}ft(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,Xi(e,n),i=Bt(i),r=r(i),e.flags|=1,ft(t,e,r,n),e.child;case 14:return r=e.type,i=Ht(r,e.pendingProps),i=Ht(r.type,i),Jg(t,e,r,i,n);case 15:return H0(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ht(r,i),Cl(t,e),e.tag=1,It(r)?(t=!0,Xl(e)):t=!1,Xi(e,n),z0(e,r,i),fh(e,r,i,n),gh(null,e,r,!0,t,n);case 19:return X0(t,e,n);case 22:return G0(t,e,n)}throw Error($(156,e.tag))};function fw(t,e){return U_(t,e)}function bx(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function jt(t,e,n,r){return new bx(t,e,n,r)}function Xf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Nx(t){if(typeof t=="function")return Xf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===gf)return 11;if(t===yf)return 14}return 2}function gr(t,e){var n=t.alternate;return n===null?(n=jt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Rl(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")Xf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Oi:return Yr(n.children,i,s,e);case mf:o=8,i|=8;break;case Vd:return t=jt(12,n,e,i|2),t.elementType=Vd,t.lanes=s,t;case jd:return t=jt(13,n,e,i),t.elementType=jd,t.lanes=s,t;case Fd:return t=jt(19,n,e,i),t.elementType=Fd,t.lanes=s,t;case I_:return Hu(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case E_:o=10;break e;case T_:o=9;break e;case gf:o=11;break e;case yf:o=14;break e;case Yn:o=16,r=null;break e}throw Error($(130,t==null?t:typeof t,""))}return e=jt(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function Yr(t,e,n,r){return t=jt(7,t,r,e),t.lanes=n,t}function Hu(t,e,n,r){return t=jt(22,t,r,e),t.elementType=I_,t.lanes=n,t.stateNode={isHidden:!1},t}function yd(t,e,n){return t=jt(6,t,null,e),t.lanes=n,t}function vd(t,e,n){return e=jt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Dx(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Jc(0),this.expirationTimes=Jc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Jc(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Jf(t,e,n,r,i,s,o,u,l){return t=new Dx(t,e,n,u,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=jt(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Mf(s),t}function Ox(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Di,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function pw(t){if(!t)return Tr;t=t._reactInternals;e:{if(hi(t)!==t||t.tag!==1)throw Error($(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(It(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error($(171))}if(t.tag===1){var n=t.type;if(It(n))return p0(t,n,e)}return e}function mw(t,e,n,r,i,s,o,u,l){return t=Jf(n,r,!0,t,i,s,o,u,l),t.context=pw(null),n=t.current,r=pt(),i=mr(n),s=Nn(r,i),s.callback=e??null,fr(n,s,i),t.current.lanes=i,da(t,i,r),St(t,r),t}function Gu(t,e,n,r){var i=e.current,s=pt(),o=mr(i);return n=pw(n),e.context===null?e.context=n:e.pendingContext=n,e=Nn(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=fr(i,e,o),t!==null&&(Yt(t,i,o,s),Sl(t,i,o)),o}function cu(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function cy(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Zf(t,e){cy(t,e),(t=t.alternate)&&cy(t,e)}function Mx(){return null}var gw=typeof reportError=="function"?reportError:function(t){console.error(t)};function ep(t){this._internalRoot=t}Ku.prototype.render=ep.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error($(409));Gu(t,e,null,null)};Ku.prototype.unmount=ep.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;ri(function(){Gu(null,t,null,null)}),e[Mn]=null}};function Ku(t){this._internalRoot=t}Ku.prototype.unstable_scheduleHydration=function(t){if(t){var e=G_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Jn.length&&e!==0&&e<Jn[n].priority;n++);Jn.splice(n,0,t),n===0&&Q_(t)}};function tp(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Qu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function dy(){}function Lx(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var c=cu(o);s.call(c)}}var o=mw(e,r,t,0,null,!1,!1,"",dy);return t._reactRootContainer=o,t[Mn]=o.current,jo(t.nodeType===8?t.parentNode:t),ri(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var u=r;r=function(){var c=cu(l);u.call(c)}}var l=Jf(t,0,!1,null,null,!1,!1,"",dy);return t._reactRootContainer=l,t[Mn]=l.current,jo(t.nodeType===8?t.parentNode:t),ri(function(){Gu(e,l,n,r)}),l}function Yu(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var u=i;i=function(){var l=cu(o);u.call(l)}}Gu(e,o,t,i)}else o=Lx(n,e,t,i,r);return cu(o)}q_=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=so(e.pendingLanes);n!==0&&(wf(e,n|1),St(e,Re()),!(ae&6)&&(cs=Re()+500,kr()))}break;case 13:ri(function(){var r=Ln(t,1);if(r!==null){var i=pt();Yt(r,t,1,i)}}),Zf(t,1)}};Ef=function(t){if(t.tag===13){var e=Ln(t,134217728);if(e!==null){var n=pt();Yt(e,t,134217728,n)}Zf(t,134217728)}};H_=function(t){if(t.tag===13){var e=mr(t),n=Ln(t,e);if(n!==null){var r=pt();Yt(n,t,e,r)}Zf(t,e)}};G_=function(){return de};K_=function(t,e){var n=de;try{return de=t,e()}finally{de=n}};Qd=function(t,e,n){switch(e){case"input":if($d(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=Uu(r);if(!i)throw Error($(90));x_(r),$d(r,i)}}}break;case"textarea":C_(t,n);break;case"select":e=n.value,e!=null&&Gi(t,!!n.multiple,e,!1)}};O_=Kf;M_=ri;var Vx={usingClientEntryPoint:!1,Events:[fa,ji,Uu,N_,D_,Kf]},to={findFiberByHostInstance:Wr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},jx={bundleType:to.bundleType,version:to.version,rendererPackageName:to.rendererPackageName,rendererConfig:to.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:zn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=j_(t),t===null?null:t.stateNode},findFiberByHostInstance:to.findFiberByHostInstance||Mx,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var dl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!dl.isDisabled&&dl.supportsFiber)try{Lu=dl.inject(jx),dn=dl}catch{}}Dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Vx;Dt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!tp(e))throw Error($(200));return Ox(t,e,null,n)};Dt.createRoot=function(t,e){if(!tp(t))throw Error($(299));var n=!1,r="",i=gw;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=Jf(t,1,!1,null,null,n,!1,r,i),t[Mn]=e.current,jo(t.nodeType===8?t.parentNode:t),new ep(e)};Dt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error($(188)):(t=Object.keys(t).join(","),Error($(268,t)));return t=j_(e),t=t===null?null:t.stateNode,t};Dt.flushSync=function(t){return ri(t)};Dt.hydrate=function(t,e,n){if(!Qu(e))throw Error($(200));return Yu(null,t,e,!0,n)};Dt.hydrateRoot=function(t,e,n){if(!tp(t))throw Error($(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=gw;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=mw(e,null,t,1,n??null,i,!1,s,o),t[Mn]=e.current,jo(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new Ku(e)};Dt.render=function(t,e,n){if(!Qu(e))throw Error($(200));return Yu(null,t,e,!1,n)};Dt.unmountComponentAtNode=function(t){if(!Qu(t))throw Error($(40));return t._reactRootContainer?(ri(function(){Yu(null,null,t,!1,function(){t._reactRootContainer=null,t[Mn]=null})}),!0):!1};Dt.unstable_batchedUpdates=Kf;Dt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Qu(n))throw Error($(200));if(t==null||t._reactInternals===void 0)throw Error($(38));return Yu(t,e,n,!1,r)};Dt.version="18.3.1-next-f1338f8080-20240426";function yw(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(yw)}catch(t){console.error(t)}}yw(),y_.exports=Dt;var Fx=y_.exports,hy=Fx;Md.createRoot=hy.createRoot,Md.hydrateRoot=hy.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Go(){return Go=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Go.apply(this,arguments)}var ar;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(ar||(ar={}));const fy="popstate";function Ux(t){t===void 0&&(t={});function e(r,i){let{pathname:s,search:o,hash:u}=r.location;return Ph("",{pathname:s,search:o,hash:u},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:vw(i)}return $x(e,n,null,t)}function Me(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function np(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function Bx(){return Math.random().toString(36).substr(2,8)}function py(t,e){return{usr:t.state,key:t.key,idx:e}}function Ph(t,e,n,r){return n===void 0&&(n=null),Go({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?Is(e):e,{state:n,key:e&&e.key||r||Bx()})}function vw(t){let{pathname:e="/",search:n="",hash:r=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function Is(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substr(r),t=t.substr(0,r)),t&&(e.pathname=t)}return e}function $x(t,e,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:s=!1}=r,o=i.history,u=ar.Pop,l=null,c=d();c==null&&(c=0,o.replaceState(Go({},o.state,{idx:c}),""));function d(){return(o.state||{idx:null}).idx}function f(){u=ar.Pop;let k=d(),E=k==null?null:k-c;c=k,l&&l({action:u,location:P.location,delta:E})}function m(k,E){u=ar.Push;let w=Ph(P.location,k,E);c=d()+1;let T=py(w,c),O=P.createHref(w);try{o.pushState(T,"",O)}catch(U){if(U instanceof DOMException&&U.name==="DataCloneError")throw U;i.location.assign(O)}s&&l&&l({action:u,location:P.location,delta:1})}function v(k,E){u=ar.Replace;let w=Ph(P.location,k,E);c=d();let T=py(w,c),O=P.createHref(w);o.replaceState(T,"",O),s&&l&&l({action:u,location:P.location,delta:0})}function x(k){let E=i.location.origin!=="null"?i.location.origin:i.location.href,w=typeof k=="string"?k:vw(k);return w=w.replace(/ $/,"%20"),Me(E,"No window.location.(origin|href) available to create URL for href: "+w),new URL(w,E)}let P={get action(){return u},get location(){return t(i,o)},listen(k){if(l)throw new Error("A history only accepts one active listener");return i.addEventListener(fy,f),l=k,()=>{i.removeEventListener(fy,f),l=null}},createHref(k){return e(i,k)},createURL:x,encodeLocation(k){let E=x(k);return{pathname:E.pathname,search:E.search,hash:E.hash}},push:m,replace:v,go(k){return o.go(k)}};return P}var my;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(my||(my={}));function zx(t,e,n){return n===void 0&&(n="/"),Wx(t,e,n)}function Wx(t,e,n,r){let i=typeof e=="string"?Is(e):e,s=Ew(i.pathname||"/",n);if(s==null)return null;let o=_w(t);qx(o);let u=null;for(let l=0;u==null&&l<o.length;++l){let c=rA(s);u=eA(o[l],c)}return u}function _w(t,e,n,r){e===void 0&&(e=[]),n===void 0&&(n=[]),r===void 0&&(r="");let i=(s,o,u)=>{let l={relativePath:u===void 0?s.path||"":u,caseSensitive:s.caseSensitive===!0,childrenIndex:o,route:s};l.relativePath.startsWith("/")&&(Me(l.relativePath.startsWith(r),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(r.length));let c=Xr([r,l.relativePath]),d=n.concat(l);s.children&&s.children.length>0&&(Me(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),_w(s.children,e,d,c)),!(s.path==null&&!s.index)&&e.push({path:c,score:Jx(c,s.index),routesMeta:d})};return t.forEach((s,o)=>{var u;if(s.path===""||!((u=s.path)!=null&&u.includes("?")))i(s,o);else for(let l of ww(s.path))i(s,o,l)}),e}function ww(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,i=n.endsWith("?"),s=n.replace(/\?$/,"");if(r.length===0)return i?[s,""]:[s];let o=ww(r.join("/")),u=[];return u.push(...o.map(l=>l===""?s:[s,l].join("/"))),i&&u.push(...o),u.map(l=>t.startsWith("/")&&l===""?"/":l)}function qx(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:Zx(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Hx=/^:[\w-]+$/,Gx=3,Kx=2,Qx=1,Yx=10,Xx=-2,gy=t=>t==="*";function Jx(t,e){let n=t.split("/"),r=n.length;return n.some(gy)&&(r+=Xx),e&&(r+=Kx),n.filter(i=>!gy(i)).reduce((i,s)=>i+(Hx.test(s)?Gx:s===""?Qx:Yx),r)}function Zx(t,e){return t.length===e.length&&t.slice(0,-1).every((r,i)=>r===e[i])?t[t.length-1]-e[e.length-1]:0}function eA(t,e,n){let{routesMeta:r}=t,i={},s="/",o=[];for(let u=0;u<r.length;++u){let l=r[u],c=u===r.length-1,d=s==="/"?e:e.slice(s.length)||"/",f=tA({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},d),m=l.route;if(!f)return null;Object.assign(i,f.params),o.push({params:i,pathname:Xr([s,f.pathname]),pathnameBase:lA(Xr([s,f.pathnameBase])),route:m}),f.pathnameBase!=="/"&&(s=Xr([s,f.pathnameBase]))}return o}function tA(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=nA(t.path,t.caseSensitive,t.end),i=e.match(n);if(!i)return null;let s=i[0],o=s.replace(/(.)\/+$/,"$1"),u=i.slice(1);return{params:r.reduce((c,d,f)=>{let{paramName:m,isOptional:v}=d;if(m==="*"){let P=u[f]||"";o=s.slice(0,s.length-P.length).replace(/(.)\/+$/,"$1")}const x=u[f];return v&&!x?c[m]=void 0:c[m]=(x||"").replace(/%2F/g,"/"),c},{}),pathname:s,pathnameBase:o,pattern:t}}function nA(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),np(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let r=[],i="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,u,l)=>(r.push({paramName:u,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(r.push({paramName:"*"}),i+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":t!==""&&t!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,e?void 0:"i"),r]}function rA(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return np(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function Ew(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}const iA=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,sA=t=>iA.test(t);function oA(t,e){e===void 0&&(e="/");let{pathname:n,search:r="",hash:i=""}=typeof t=="string"?Is(t):t,s;if(n)if(sA(n))s=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),np(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?s=yy(n.substring(1),"/"):s=yy(n,e)}else s=e;return{pathname:s,search:uA(r),hash:cA(i)}}function yy(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function _d(t,e,n,r){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function aA(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function Tw(t,e){let n=aA(t);return e?n.map((r,i)=>i===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Iw(t,e,n,r){r===void 0&&(r=!1);let i;typeof t=="string"?i=Is(t):(i=Go({},t),Me(!i.pathname||!i.pathname.includes("?"),_d("?","pathname","search",i)),Me(!i.pathname||!i.pathname.includes("#"),_d("#","pathname","hash",i)),Me(!i.search||!i.search.includes("#"),_d("#","search","hash",i)));let s=t===""||i.pathname==="",o=s?"/":i.pathname,u;if(o==null)u=n;else{let f=e.length-1;if(!r&&o.startsWith("..")){let m=o.split("/");for(;m[0]==="..";)m.shift(),f-=1;i.pathname=m.join("/")}u=f>=0?e[f]:"/"}let l=oA(i,u),c=o&&o!=="/"&&o.endsWith("/"),d=(s||o===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||d)&&(l.pathname+="/"),l}const Xr=t=>t.join("/").replace(/\/\/+/g,"/"),lA=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),uA=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,cA=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function dA(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const Sw=["post","put","patch","delete"];new Set(Sw);const hA=["get",...Sw];new Set(hA);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ko(){return Ko=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Ko.apply(this,arguments)}const rp=M.createContext(null),fA=M.createContext(null),ma=M.createContext(null),Xu=M.createContext(null),Rr=M.createContext({outlet:null,matches:[],isDataRoute:!1}),xw=M.createContext(null);function ga(){return M.useContext(Xu)!=null}function ip(){return ga()||Me(!1),M.useContext(Xu).location}function Aw(t){M.useContext(ma).static||M.useLayoutEffect(t)}function Ju(){let{isDataRoute:t}=M.useContext(Rr);return t?CA():pA()}function pA(){ga()||Me(!1);let t=M.useContext(rp),{basename:e,future:n,navigator:r}=M.useContext(ma),{matches:i}=M.useContext(Rr),{pathname:s}=ip(),o=JSON.stringify(Tw(i,n.v7_relativeSplatPath)),u=M.useRef(!1);return Aw(()=>{u.current=!0}),M.useCallback(function(c,d){if(d===void 0&&(d={}),!u.current)return;if(typeof c=="number"){r.go(c);return}let f=Iw(c,JSON.parse(o),s,d.relative==="path");t==null&&e!=="/"&&(f.pathname=f.pathname==="/"?e:Xr([e,f.pathname])),(d.replace?r.replace:r.push)(f,d.state,d)},[e,r,o,s,t])}function mA(){let{matches:t}=M.useContext(Rr),e=t[t.length-1];return e?e.params:{}}function gA(t,e){return yA(t,e)}function yA(t,e,n,r){ga()||Me(!1);let{navigator:i}=M.useContext(ma),{matches:s}=M.useContext(Rr),o=s[s.length-1],u=o?o.params:{};o&&o.pathname;let l=o?o.pathnameBase:"/";o&&o.route;let c=ip(),d;if(e){var f;let k=typeof e=="string"?Is(e):e;l==="/"||(f=k.pathname)!=null&&f.startsWith(l)||Me(!1),d=k}else d=c;let m=d.pathname||"/",v=m;if(l!=="/"){let k=l.replace(/^\//,"").split("/");v="/"+m.replace(/^\//,"").split("/").slice(k.length).join("/")}let x=zx(t,{pathname:v}),P=TA(x&&x.map(k=>Object.assign({},k,{params:Object.assign({},u,k.params),pathname:Xr([l,i.encodeLocation?i.encodeLocation(k.pathname).pathname:k.pathname]),pathnameBase:k.pathnameBase==="/"?l:Xr([l,i.encodeLocation?i.encodeLocation(k.pathnameBase).pathname:k.pathnameBase])})),s,n,r);return e&&P?M.createElement(Xu.Provider,{value:{location:Ko({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:ar.Pop}},P):P}function vA(){let t=AA(),e=dA(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return M.createElement(M.Fragment,null,M.createElement("h2",null,"Unexpected Application Error!"),M.createElement("h3",{style:{fontStyle:"italic"}},e),n?M.createElement("pre",{style:i},n):null,null)}const _A=M.createElement(vA,null);class wA extends M.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?M.createElement(Rr.Provider,{value:this.props.routeContext},M.createElement(xw.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function EA(t){let{routeContext:e,match:n,children:r}=t,i=M.useContext(rp);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),M.createElement(Rr.Provider,{value:e},r)}function TA(t,e,n,r){var i;if(e===void 0&&(e=[]),n===void 0&&(n=null),r===void 0&&(r=null),t==null){var s;if(!n)return null;if(n.errors)t=n.matches;else if((s=r)!=null&&s.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,u=(i=n)==null?void 0:i.errors;if(u!=null){let d=o.findIndex(f=>f.route.id&&(u==null?void 0:u[f.route.id])!==void 0);d>=0||Me(!1),o=o.slice(0,Math.min(o.length,d+1))}let l=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let d=0;d<o.length;d++){let f=o[d];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(c=d),f.route.id){let{loaderData:m,errors:v}=n,x=f.route.loader&&m[f.route.id]===void 0&&(!v||v[f.route.id]===void 0);if(f.route.lazy||x){l=!0,c>=0?o=o.slice(0,c+1):o=[o[0]];break}}}return o.reduceRight((d,f,m)=>{let v,x=!1,P=null,k=null;n&&(v=u&&f.route.id?u[f.route.id]:void 0,P=f.route.errorElement||_A,l&&(c<0&&m===0?(PA("route-fallback"),x=!0,k=null):c===m&&(x=!0,k=f.route.hydrateFallbackElement||null)));let E=e.concat(o.slice(0,m+1)),w=()=>{let T;return v?T=P:x?T=k:f.route.Component?T=M.createElement(f.route.Component,null):f.route.element?T=f.route.element:T=d,M.createElement(EA,{match:f,routeContext:{outlet:d,matches:E,isDataRoute:n!=null},children:T})};return n&&(f.route.ErrorBoundary||f.route.errorElement||m===0)?M.createElement(wA,{location:n.location,revalidation:n.revalidation,component:P,error:v,children:w(),routeContext:{outlet:null,matches:E,isDataRoute:!0}}):w()},null)}var Cw=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(Cw||{}),Pw=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(Pw||{});function IA(t){let e=M.useContext(rp);return e||Me(!1),e}function SA(t){let e=M.useContext(fA);return e||Me(!1),e}function xA(t){let e=M.useContext(Rr);return e||Me(!1),e}function kw(t){let e=xA(),n=e.matches[e.matches.length-1];return n.route.id||Me(!1),n.route.id}function AA(){var t;let e=M.useContext(xw),n=SA(),r=kw();return e!==void 0?e:(t=n.errors)==null?void 0:t[r]}function CA(){let{router:t}=IA(Cw.UseNavigateStable),e=kw(Pw.UseNavigateStable),n=M.useRef(!1);return Aw(()=>{n.current=!0}),M.useCallback(function(i,s){s===void 0&&(s={}),n.current&&(typeof i=="number"?t.navigate(i):t.navigate(i,Ko({fromRouteId:e},s)))},[t,e])}const vy={};function PA(t,e,n){vy[t]||(vy[t]=!0)}function kA(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function kh(t){let{to:e,replace:n,state:r,relative:i}=t;ga()||Me(!1);let{future:s,static:o}=M.useContext(ma),{matches:u}=M.useContext(Rr),{pathname:l}=ip(),c=Ju(),d=Iw(e,Tw(u,s.v7_relativeSplatPath),l,i==="path"),f=JSON.stringify(d);return M.useEffect(()=>c(JSON.parse(f),{replace:n,state:r,relative:i}),[c,f,i,n,r]),null}function Br(t){Me(!1)}function RA(t){let{basename:e="/",children:n=null,location:r,navigationType:i=ar.Pop,navigator:s,static:o=!1,future:u}=t;ga()&&Me(!1);let l=e.replace(/^\/*/,"/"),c=M.useMemo(()=>({basename:l,navigator:s,static:o,future:Ko({v7_relativeSplatPath:!1},u)}),[l,u,s,o]);typeof r=="string"&&(r=Is(r));let{pathname:d="/",search:f="",hash:m="",state:v=null,key:x="default"}=r,P=M.useMemo(()=>{let k=Ew(d,l);return k==null?null:{location:{pathname:k,search:f,hash:m,state:v,key:x},navigationType:i}},[l,d,f,m,v,x,i]);return P==null?null:M.createElement(ma.Provider,{value:c},M.createElement(Xu.Provider,{children:n,value:P}))}function bA(t){let{children:e,location:n}=t;return gA(Rh(e),n)}new Promise(()=>{});function Rh(t,e){e===void 0&&(e=[]);let n=[];return M.Children.forEach(t,(r,i)=>{if(!M.isValidElement(r))return;let s=[...e,i];if(r.type===M.Fragment){n.push.apply(n,Rh(r.props.children,s));return}r.type!==Br&&Me(!1),!r.props.index||!r.props.children||Me(!1);let o={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=Rh(r.props.children,s)),n.push(o)}),n}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const NA="6";try{window.__reactRouterVersion=NA}catch{}const DA="startTransition",_y=P1[DA];function OA(t){let{basename:e,children:n,future:r,window:i}=t,s=M.useRef();s.current==null&&(s.current=Ux({window:i,v5Compat:!0}));let o=s.current,[u,l]=M.useState({action:o.action,location:o.location}),{v7_startTransition:c}=r||{},d=M.useCallback(f=>{c&&_y?_y(()=>l(f)):l(f)},[l,c]);return M.useLayoutEffect(()=>o.listen(d),[o,d]),M.useEffect(()=>kA(r),[r]),M.createElement(RA,{basename:e,children:n,location:u.location,navigationType:u.action,navigator:o,future:r})}var wy;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(wy||(wy={}));var Ey;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(Ey||(Ey={}));let MA={data:""},LA=t=>{if(typeof window=="object"){let e=(t?t.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return e.nonce=window.__nonce__,e.parentNode||(t||document.head).appendChild(e),e.firstChild}return t||MA},VA=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,jA=/\/\*[^]*?\*\/|  +/g,Ty=/\n+/g,er=(t,e)=>{let n="",r="",i="";for(let s in t){let o=t[s];s[0]=="@"?s[1]=="i"?n=s+" "+o+";":r+=s[1]=="f"?er(o,s):s+"{"+er(o,s[1]=="k"?"":e)+"}":typeof o=="object"?r+=er(o,e?e.replace(/([^,])+/g,u=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,u):u?u+" "+l:l)):s):o!=null&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=er.p?er.p(s,o):s+":"+o+";")}return n+(e&&i?e+"{"+i+"}":i)+r},In={},Rw=t=>{if(typeof t=="object"){let e="";for(let n in t)e+=n+Rw(t[n]);return e}return t},FA=(t,e,n,r,i)=>{let s=Rw(t),o=In[s]||(In[s]=(l=>{let c=0,d=11;for(;c<l.length;)d=101*d+l.charCodeAt(c++)>>>0;return"go"+d})(s));if(!In[o]){let l=s!==t?t:(c=>{let d,f,m=[{}];for(;d=VA.exec(c.replace(jA,""));)d[4]?m.shift():d[3]?(f=d[3].replace(Ty," ").trim(),m.unshift(m[0][f]=m[0][f]||{})):m[0][d[1]]=d[2].replace(Ty," ").trim();return m[0]})(t);In[o]=er(i?{["@keyframes "+o]:l}:l,n?"":"."+o)}let u=n&&In.g?In.g:null;return n&&(In.g=In[o]),((l,c,d,f)=>{f?c.data=c.data.replace(f,l):c.data.indexOf(l)===-1&&(c.data=d?l+c.data:c.data+l)})(In[o],e,r,u),o},UA=(t,e,n)=>t.reduce((r,i,s)=>{let o=e[s];if(o&&o.call){let u=o(n),l=u&&u.props&&u.props.className||/^go/.test(u)&&u;o=l?"."+l:u&&typeof u=="object"?u.props?"":er(u,""):u===!1?"":u}return r+i+(o??"")},"");function Zu(t){let e=this||{},n=t.call?t(e.p):t;return FA(n.unshift?n.raw?UA(n,[].slice.call(arguments,1),e.p):n.reduce((r,i)=>Object.assign(r,i&&i.call?i(e.p):i),{}):n,LA(e.target),e.g,e.o,e.k)}let bw,bh,Nh;Zu.bind({g:1});let jn=Zu.bind({k:1});function BA(t,e,n,r){er.p=e,bw=t,bh=n,Nh=r}function br(t,e){let n=this||{};return function(){let r=arguments;function i(s,o){let u=Object.assign({},s),l=u.className||i.className;n.p=Object.assign({theme:bh&&bh()},u),n.o=/ *go\d+/.test(l),u.className=Zu.apply(n,r)+(l?" "+l:"");let c=t;return t[0]&&(c=u.as||t,delete u.as),Nh&&c[0]&&Nh(u),bw(c,u)}return i}}var $A=t=>typeof t=="function",du=(t,e)=>$A(t)?t(e):t,zA=(()=>{let t=0;return()=>(++t).toString()})(),Nw=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let e=matchMedia("(prefers-reduced-motion: reduce)");t=!e||e.matches}return t}})(),WA=20,sp="default",Dw=(t,e)=>{let{toastLimit:n}=t.settings;switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,n)};case 1:return{...t,toasts:t.toasts.map(o=>o.id===e.toast.id?{...o,...e.toast}:o)};case 2:let{toast:r}=e;return Dw(t,{type:t.toasts.find(o=>o.id===r.id)?1:0,toast:r});case 3:let{toastId:i}=e;return{...t,toasts:t.toasts.map(o=>o.id===i||i===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return e.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(o=>o.id!==e.toastId)};case 5:return{...t,pausedAt:e.time};case 6:let s=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+s}))}}},bl=[],Ow={toasts:[],pausedAt:void 0,settings:{toastLimit:WA}},cn={},Mw=(t,e=sp)=>{cn[e]=Dw(cn[e]||Ow,t),bl.forEach(([n,r])=>{n===e&&r(cn[e])})},Lw=t=>Object.keys(cn).forEach(e=>Mw(t,e)),qA=t=>Object.keys(cn).find(e=>cn[e].toasts.some(n=>n.id===t)),ec=(t=sp)=>e=>{Mw(e,t)},HA={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},GA=(t={},e=sp)=>{let[n,r]=M.useState(cn[e]||Ow),i=M.useRef(cn[e]);M.useEffect(()=>(i.current!==cn[e]&&r(cn[e]),bl.push([e,r]),()=>{let o=bl.findIndex(([u])=>u===e);o>-1&&bl.splice(o,1)}),[e]);let s=n.toasts.map(o=>{var u,l,c;return{...t,...t[o.type],...o,removeDelay:o.removeDelay||((u=t[o.type])==null?void 0:u.removeDelay)||(t==null?void 0:t.removeDelay),duration:o.duration||((l=t[o.type])==null?void 0:l.duration)||(t==null?void 0:t.duration)||HA[o.type],style:{...t.style,...(c=t[o.type])==null?void 0:c.style,...o.style}}});return{...n,toasts:s}},KA=(t,e="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...n,id:(n==null?void 0:n.id)||zA()}),ya=t=>(e,n)=>{let r=KA(e,t,n);return ec(r.toasterId||qA(r.id))({type:2,toast:r}),r.id},Fe=(t,e)=>ya("blank")(t,e);Fe.error=ya("error");Fe.success=ya("success");Fe.loading=ya("loading");Fe.custom=ya("custom");Fe.dismiss=(t,e)=>{let n={type:3,toastId:t};e?ec(e)(n):Lw(n)};Fe.dismissAll=t=>Fe.dismiss(void 0,t);Fe.remove=(t,e)=>{let n={type:4,toastId:t};e?ec(e)(n):Lw(n)};Fe.removeAll=t=>Fe.remove(void 0,t);Fe.promise=(t,e,n)=>{let r=Fe.loading(e.loading,{...n,...n==null?void 0:n.loading});return typeof t=="function"&&(t=t()),t.then(i=>{let s=e.success?du(e.success,i):void 0;return s?Fe.success(s,{id:r,...n,...n==null?void 0:n.success}):Fe.dismiss(r),i}).catch(i=>{let s=e.error?du(e.error,i):void 0;s?Fe.error(s,{id:r,...n,...n==null?void 0:n.error}):Fe.dismiss(r)}),t};var QA=1e3,YA=(t,e="default")=>{let{toasts:n,pausedAt:r}=GA(t,e),i=M.useRef(new Map).current,s=M.useCallback((f,m=QA)=>{if(i.has(f))return;let v=setTimeout(()=>{i.delete(f),o({type:4,toastId:f})},m);i.set(f,v)},[]);M.useEffect(()=>{if(r)return;let f=Date.now(),m=n.map(v=>{if(v.duration===1/0)return;let x=(v.duration||0)+v.pauseDuration-(f-v.createdAt);if(x<0){v.visible&&Fe.dismiss(v.id);return}return setTimeout(()=>Fe.dismiss(v.id,e),x)});return()=>{m.forEach(v=>v&&clearTimeout(v))}},[n,r,e]);let o=M.useCallback(ec(e),[e]),u=M.useCallback(()=>{o({type:5,time:Date.now()})},[o]),l=M.useCallback((f,m)=>{o({type:1,toast:{id:f,height:m}})},[o]),c=M.useCallback(()=>{r&&o({type:6,time:Date.now()})},[r,o]),d=M.useCallback((f,m)=>{let{reverseOrder:v=!1,gutter:x=8,defaultPosition:P}=m||{},k=n.filter(T=>(T.position||P)===(f.position||P)&&T.height),E=k.findIndex(T=>T.id===f.id),w=k.filter((T,O)=>O<E&&T.visible).length;return k.filter(T=>T.visible).slice(...v?[w+1]:[0,w]).reduce((T,O)=>T+(O.height||0)+x,0)},[n]);return M.useEffect(()=>{n.forEach(f=>{if(f.dismissed)s(f.id,f.removeDelay);else{let m=i.get(f.id);m&&(clearTimeout(m),i.delete(f.id))}})},[n,s]),{toasts:n,handlers:{updateHeight:l,startPause:u,endPause:c,calculateOffset:d}}},XA=jn`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,JA=jn`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ZA=jn`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,eC=br("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${XA} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${JA} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${ZA} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,tC=jn`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,nC=br("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${tC} 1s linear infinite;
`,rC=jn`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,iC=jn`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,sC=br("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${rC} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${iC} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,oC=br("div")`
  position: absolute;
`,aC=br("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,lC=jn`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,uC=br("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${lC} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,cC=({toast:t})=>{let{icon:e,type:n,iconTheme:r}=t;return e!==void 0?typeof e=="string"?M.createElement(uC,null,e):e:n==="blank"?null:M.createElement(aC,null,M.createElement(nC,{...r}),n!=="loading"&&M.createElement(oC,null,n==="error"?M.createElement(eC,{...r}):M.createElement(sC,{...r})))},dC=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,hC=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,fC="0%{opacity:0;} 100%{opacity:1;}",pC="0%{opacity:1;} 100%{opacity:0;}",mC=br("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,gC=br("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,yC=(t,e)=>{let n=t.includes("top")?1:-1,[r,i]=Nw()?[fC,pC]:[dC(n),hC(n)];return{animation:e?`${jn(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${jn(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},vC=M.memo(({toast:t,position:e,style:n,children:r})=>{let i=t.height?yC(t.position||e||"top-center",t.visible):{opacity:0},s=M.createElement(cC,{toast:t}),o=M.createElement(gC,{...t.ariaProps},du(t.message,t));return M.createElement(mC,{className:t.className,style:{...i,...n,...t.style}},typeof r=="function"?r({icon:s,message:o}):M.createElement(M.Fragment,null,s,o))});BA(M.createElement);var _C=({id:t,className:e,style:n,onHeightUpdate:r,children:i})=>{let s=M.useCallback(o=>{if(o){let u=()=>{let l=o.getBoundingClientRect().height;r(t,l)};u(),new MutationObserver(u).observe(o,{subtree:!0,childList:!0,characterData:!0})}},[t,r]);return M.createElement("div",{ref:s,className:e,style:n},i)},wC=(t,e)=>{let n=t.includes("top"),r=n?{top:0}:{bottom:0},i=t.includes("center")?{justifyContent:"center"}:t.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Nw()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${e*(n?1:-1)}px)`,...r,...i}},EC=Zu`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,hl=16,TC=({reverseOrder:t,position:e="top-center",toastOptions:n,gutter:r,children:i,toasterId:s,containerStyle:o,containerClassName:u})=>{let{toasts:l,handlers:c}=YA(n,s);return M.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:hl,left:hl,right:hl,bottom:hl,pointerEvents:"none",...o},className:u,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(d=>{let f=d.position||e,m=c.calculateOffset(d,{reverseOrder:t,gutter:r,defaultPosition:e}),v=wC(f,m);return M.createElement(_C,{id:d.id,key:d.id,onHeightUpdate:c.updateHeight,className:d.visible?EC:"",style:v},d.type==="custom"?du(d.message,d):i?i(d):M.createElement(vC,{toast:d,position:f}))}))},Ne=Fe,Iy={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vw=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},IC=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],u=t[n++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},jw={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,u=o?t[i+1]:0,l=i+2<t.length,c=l?t[i+2]:0,d=s>>2,f=(s&3)<<4|u>>4;let m=(u&15)<<2|c>>6,v=c&63;l||(v=64,o||(m=64)),r.push(n[d],n[f],n[m],n[v])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Vw(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):IC(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],u=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const f=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||u==null||c==null||f==null)throw new SC;const m=s<<2|u>>4;if(r.push(m),c!==64){const v=u<<4&240|c>>2;if(r.push(v),f!==64){const x=c<<6&192|f;r.push(x)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class SC extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const xC=function(t){const e=Vw(t);return jw.encodeByteArray(e,!0)},hu=function(t){return xC(t).replace(/\./g,"")},Fw=function(t){try{return jw.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AC(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CC=()=>AC().__FIREBASE_DEFAULTS__,PC=()=>{if(typeof process>"u"||typeof Iy>"u")return;const t=Iy.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},kC=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Fw(t[1]);return e&&JSON.parse(e)},tc=()=>{try{return CC()||PC()||kC()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Uw=t=>{var e,n;return(n=(e=tc())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},RC=t=>{const e=Uw(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Bw=()=>{var t;return(t=tc())===null||t===void 0?void 0:t.config},$w=t=>{var e;return(e=tc())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bC{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NC(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[hu(JSON.stringify(n)),hu(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function DC(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ct())}function OC(){var t;const e=(t=tc())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function MC(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function zw(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function LC(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function VC(){const t=ct();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function jC(){return!OC()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ww(){try{return typeof indexedDB=="object"}catch{return!1}}function qw(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}function FC(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UC="FirebaseError";class nn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=UC,Object.setPrototypeOf(this,nn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,fi.prototype.create)}}class fi{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?BC(s,r):"Error",u=`${this.serviceName}: ${o} (${i}).`;return new nn(i,u,r)}}function BC(t,e){return t.replace($C,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const $C=/\{\$([^}]+)}/g;function zC(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Qo(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(Sy(s)&&Sy(o)){if(!Qo(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Sy(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function va(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ao(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function lo(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function WC(t,e){const n=new qC(t,e);return n.subscribe.bind(n)}class qC{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");HC(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=wd),i.error===void 0&&(i.error=wd),i.complete===void 0&&(i.complete=wd);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function HC(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function wd(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GC=1e3,KC=2,QC=4*60*60*1e3,YC=.5;function xy(t,e=GC,n=KC){const r=e*Math.pow(n,t),i=Math.round(YC*r*(Math.random()-.5)*2);return Math.min(QC,r+i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ve(t){return t&&t._delegate?t._delegate:t}class Zt{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $r="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XC{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new bC;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ZC(e))try{this.getOrInitializeService({instanceIdentifier:$r})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=$r){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$r){return this.instances.has(e)}getOptions(e=$r){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(s);r===u&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:JC(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=$r){return this.component?this.component.multipleInstances?e:$r:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function JC(t){return t===$r?void 0:t}function ZC(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eP{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new XC(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var se;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(se||(se={}));const tP={debug:se.DEBUG,verbose:se.VERBOSE,info:se.INFO,warn:se.WARN,error:se.ERROR,silent:se.SILENT},nP=se.INFO,rP={[se.DEBUG]:"log",[se.VERBOSE]:"log",[se.INFO]:"info",[se.WARN]:"warn",[se.ERROR]:"error"},iP=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=rP[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class nc{constructor(e){this.name=e,this._logLevel=nP,this._logHandler=iP,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in se))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?tP[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,se.DEBUG,...e),this._logHandler(this,se.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,se.VERBOSE,...e),this._logHandler(this,se.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,se.INFO,...e),this._logHandler(this,se.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,se.WARN,...e),this._logHandler(this,se.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,se.ERROR,...e),this._logHandler(this,se.ERROR,...e)}}const sP=(t,e)=>e.some(n=>t instanceof n);let Ay,Cy;function oP(){return Ay||(Ay=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function aP(){return Cy||(Cy=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Hw=new WeakMap,Dh=new WeakMap,Gw=new WeakMap,Ed=new WeakMap,op=new WeakMap;function lP(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(yr(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Hw.set(n,t)}).catch(()=>{}),op.set(e,t),e}function uP(t){if(Dh.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Dh.set(t,e)}let Oh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Dh.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Gw.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return yr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function cP(t){Oh=t(Oh)}function dP(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Td(this),e,...n);return Gw.set(r,e.sort?e.sort():[e]),yr(r)}:aP().includes(t)?function(...e){return t.apply(Td(this),e),yr(Hw.get(this))}:function(...e){return yr(t.apply(Td(this),e))}}function hP(t){return typeof t=="function"?dP(t):(t instanceof IDBTransaction&&uP(t),sP(t,oP())?new Proxy(t,Oh):t)}function yr(t){if(t instanceof IDBRequest)return lP(t);if(Ed.has(t))return Ed.get(t);const e=hP(t);return e!==t&&(Ed.set(t,e),op.set(e,t)),e}const Td=t=>op.get(t);function Kw(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),u=yr(o);return r&&o.addEventListener("upgradeneeded",l=>{r(yr(o.result),l.oldVersion,l.newVersion,yr(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),u.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),u}const fP=["get","getKey","getAll","getAllKeys","count"],pP=["put","add","delete","clear"],Id=new Map;function Py(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Id.get(e))return Id.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=pP.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||fP.includes(n)))return;const s=async function(o,...u){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return r&&(c=c.index(u.shift())),(await Promise.all([c[n](...u),i&&l.done]))[0]};return Id.set(e,s),s}cP(t=>({...t,get:(e,n,r)=>Py(e,n)||t.get(e,n,r),has:(e,n)=>!!Py(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mP{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(gP(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function gP(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Mh="@firebase/app",ky="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fn=new nc("@firebase/app"),yP="@firebase/app-compat",vP="@firebase/analytics-compat",_P="@firebase/analytics",wP="@firebase/app-check-compat",EP="@firebase/app-check",TP="@firebase/auth",IP="@firebase/auth-compat",SP="@firebase/database",xP="@firebase/data-connect",AP="@firebase/database-compat",CP="@firebase/functions",PP="@firebase/functions-compat",kP="@firebase/installations",RP="@firebase/installations-compat",bP="@firebase/messaging",NP="@firebase/messaging-compat",DP="@firebase/performance",OP="@firebase/performance-compat",MP="@firebase/remote-config",LP="@firebase/remote-config-compat",VP="@firebase/storage",jP="@firebase/storage-compat",FP="@firebase/firestore",UP="@firebase/vertexai-preview",BP="@firebase/firestore-compat",$P="firebase",zP="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lh="[DEFAULT]",WP={[Mh]:"fire-core",[yP]:"fire-core-compat",[_P]:"fire-analytics",[vP]:"fire-analytics-compat",[EP]:"fire-app-check",[wP]:"fire-app-check-compat",[TP]:"fire-auth",[IP]:"fire-auth-compat",[SP]:"fire-rtdb",[xP]:"fire-data-connect",[AP]:"fire-rtdb-compat",[CP]:"fire-fn",[PP]:"fire-fn-compat",[kP]:"fire-iid",[RP]:"fire-iid-compat",[bP]:"fire-fcm",[NP]:"fire-fcm-compat",[DP]:"fire-perf",[OP]:"fire-perf-compat",[MP]:"fire-rc",[LP]:"fire-rc-compat",[VP]:"fire-gcs",[jP]:"fire-gcs-compat",[FP]:"fire-fst",[BP]:"fire-fst-compat",[UP]:"fire-vertex","fire-js":"fire-js",[$P]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fu=new Map,qP=new Map,Vh=new Map;function Ry(t,e){try{t.container.addComponent(e)}catch(n){Fn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function yn(t){const e=t.name;if(Vh.has(e))return Fn.debug(`There were multiple attempts to register component ${e}.`),!1;Vh.set(e,t);for(const n of fu.values())Ry(n,t);for(const n of qP.values())Ry(n,t);return!0}function pi(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Pn(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HP={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},vr=new fi("app","Firebase",HP);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GP{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Zt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw vr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ss=zP;function Qw(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Lh,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw vr.create("bad-app-name",{appName:String(i)});if(n||(n=Bw()),!n)throw vr.create("no-options");const s=fu.get(i);if(s){if(Qo(n,s.options)&&Qo(r,s.config))return s;throw vr.create("duplicate-app",{appName:i})}const o=new eP(i);for(const l of Vh.values())o.addComponent(l);const u=new GP(n,r,o);return fu.set(i,u),u}function ap(t=Lh){const e=fu.get(t);if(!e&&t===Lh&&Bw())return Qw();if(!e)throw vr.create("no-app",{appName:t});return e}function Ut(t,e,n){var r;let i=(r=WP[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const u=[`Unable to register library "${i}" with version "${e}":`];s&&u.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&u.push("and"),o&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Fn.warn(u.join(" "));return}yn(new Zt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KP="firebase-heartbeat-database",QP=1,Yo="firebase-heartbeat-store";let Sd=null;function Yw(){return Sd||(Sd=Kw(KP,QP,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Yo)}catch(n){console.warn(n)}}}}).catch(t=>{throw vr.create("idb-open",{originalErrorMessage:t.message})})),Sd}async function YP(t){try{const n=(await Yw()).transaction(Yo),r=await n.objectStore(Yo).get(Xw(t));return await n.done,r}catch(e){if(e instanceof nn)Fn.warn(e.message);else{const n=vr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Fn.warn(n.message)}}}async function by(t,e){try{const r=(await Yw()).transaction(Yo,"readwrite");await r.objectStore(Yo).put(e,Xw(t)),await r.done}catch(n){if(n instanceof nn)Fn.warn(n.message);else{const r=vr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Fn.warn(r.message)}}}function Xw(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XP=1024,JP=30*24*60*60*1e3;class ZP{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new tk(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Ny();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const u=new Date(o.date).valueOf();return Date.now()-u<=JP}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Fn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ny(),{heartbeatsToSend:r,unsentEntries:i}=ek(this._heartbeatsCache.heartbeats),s=hu(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Fn.warn(n),""}}}function Ny(){return new Date().toISOString().substring(0,10)}function ek(t,e=XP){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Dy(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Dy(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class tk{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ww()?qw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await YP(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return by(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return by(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Dy(t){return hu(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nk(t){yn(new Zt("platform-logger",e=>new mP(e),"PRIVATE")),yn(new Zt("heartbeat",e=>new ZP(e),"PRIVATE")),Ut(Mh,ky,t),Ut(Mh,ky,"esm2017"),Ut("fire-js","")}nk("");function lp(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function Jw(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const rk=Jw,Zw=new fi("auth","Firebase",Jw());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pu=new nc("@firebase/auth");function ik(t,...e){pu.logLevel<=se.WARN&&pu.warn(`Auth (${Ss}): ${t}`,...e)}function Nl(t,...e){pu.logLevel<=se.ERROR&&pu.error(`Auth (${Ss}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function en(t,...e){throw up(t,...e)}function fn(t,...e){return up(t,...e)}function eE(t,e,n){const r=Object.assign(Object.assign({},rk()),{[e]:n});return new fi("auth","Firebase",r).create(e,{appName:t.name})}function _r(t){return eE(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function up(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Zw.create(t,...e)}function Z(t,e,...n){if(!t)throw up(e,...n)}function kn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Nl(e),new Error(e)}function Un(t,e){t||kn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jh(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function sk(){return Oy()==="http:"||Oy()==="https:"}function Oy(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ok(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(sk()||zw()||"connection"in navigator)?navigator.onLine:!0}function ak(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(e,n){this.shortDelay=e,this.longDelay=n,Un(n>e,"Short delay should be less than long delay!"),this.isMobile=DC()||LC()}get(){return ok()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cp(t,e){Un(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;kn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;kn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;kn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lk={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uk=new _a(3e4,6e4);function mi(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Nr(t,e,n,r,i={}){return nE(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const u=va(Object.assign({key:t.config.apiKey},o)).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const c=Object.assign({method:e,headers:l},s);return MC()||(c.referrerPolicy="no-referrer"),tE.fetch()(rE(t,t.config.apiHost,n,u),c)})}async function nE(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},lk),e);try{const i=new dk(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw fl(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const u=s.ok?o.errorMessage:o.error.message,[l,c]=u.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw fl(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw fl(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw fl(t,"user-disabled",o);const d=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw eE(t,d,c);en(t,d)}}catch(i){if(i instanceof nn)throw i;en(t,"network-request-failed",{message:String(i)})}}async function rc(t,e,n,r,i={}){const s=await Nr(t,e,n,r,i);return"mfaPendingCredential"in s&&en(t,"multi-factor-auth-required",{_serverResponse:s}),s}function rE(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?cp(t.config,i):`${t.config.apiScheme}://${i}`}function ck(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class dk{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(fn(this.auth,"network-request-failed")),uk.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function fl(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=fn(t,e,r);return i.customData._tokenResponse=n,i}function My(t){return t!==void 0&&t.enterprise!==void 0}class hk{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return ck(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function fk(t,e){return Nr(t,"GET","/v2/recaptchaConfig",mi(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pk(t,e){return Nr(t,"POST","/v1/accounts:delete",e)}async function iE(t,e){return Nr(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function So(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function mk(t,e=!1){const n=Ve(t),r=await n.getIdToken(e),i=dp(r);Z(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:So(xd(i.auth_time)),issuedAtTime:So(xd(i.iat)),expirationTime:So(xd(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function xd(t){return Number(t)*1e3}function dp(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Nl("JWT malformed, contained fewer than 3 sections"),null;try{const i=Fw(n);return i?JSON.parse(i):(Nl("Failed to decode base64 JWT payload"),null)}catch(i){return Nl("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Ly(t){const e=dp(t);return Z(e,"internal-error"),Z(typeof e.exp<"u","internal-error"),Z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xo(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof nn&&gk(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function gk({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yk{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fh{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=So(this.lastLoginAt),this.creationTime=So(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mu(t){var e;const n=t.auth,r=await t.getIdToken(),i=await Xo(t,iE(n,{idToken:r}));Z(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?sE(s.providerUserInfo):[],u=_k(t.providerData,o),l=t.isAnonymous,c=!(t.email&&s.passwordHash)&&!(u!=null&&u.length),d=l?c:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:u,metadata:new Fh(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(t,f)}async function vk(t){const e=Ve(t);await mu(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function _k(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function sE(t){return t.map(e=>{var{providerId:n}=e,r=lp(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wk(t,e){const n=await nE(t,{},async()=>{const r=va({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=rE(t,i,"/v1/token",`key=${s}`),u=await t._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",tE.fetch()(o,{method:"POST",headers:u,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Ek(t,e){return Nr(t,"POST","/v2/accounts:revokeToken",mi(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Z(e.idToken,"internal-error"),Z(typeof e.idToken<"u","internal-error"),Z(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ly(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){Z(e.length!==0,"internal-error");const n=Ly(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(Z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await wk(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new Zi;return r&&(Z(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(Z(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(Z(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Zi,this.toJSON())}_performRefresh(){return kn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kn(t,e){Z(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Rn{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=lp(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new yk(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Fh(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await Xo(this,this.stsTokenManager.getToken(this.auth,e));return Z(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return mk(this,e)}reload(){return vk(this)}_assign(e){this!==e&&(Z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Rn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){Z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await mu(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Pn(this.auth.app))return Promise.reject(_r(this.auth));const e=await this.getIdToken();return await Xo(this,pk(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,u,l,c,d;const f=(r=n.displayName)!==null&&r!==void 0?r:void 0,m=(i=n.email)!==null&&i!==void 0?i:void 0,v=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,x=(o=n.photoURL)!==null&&o!==void 0?o:void 0,P=(u=n.tenantId)!==null&&u!==void 0?u:void 0,k=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,E=(c=n.createdAt)!==null&&c!==void 0?c:void 0,w=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:T,emailVerified:O,isAnonymous:U,providerData:z,stsTokenManager:S}=n;Z(T&&S,e,"internal-error");const _=Zi.fromJSON(this.name,S);Z(typeof T=="string",e,"internal-error"),Kn(f,e.name),Kn(m,e.name),Z(typeof O=="boolean",e,"internal-error"),Z(typeof U=="boolean",e,"internal-error"),Kn(v,e.name),Kn(x,e.name),Kn(P,e.name),Kn(k,e.name),Kn(E,e.name),Kn(w,e.name);const I=new Rn({uid:T,auth:e,email:m,emailVerified:O,displayName:f,isAnonymous:U,photoURL:x,phoneNumber:v,tenantId:P,stsTokenManager:_,createdAt:E,lastLoginAt:w});return z&&Array.isArray(z)&&(I.providerData=z.map(A=>Object.assign({},A))),k&&(I._redirectEventId=k),I}static async _fromIdTokenResponse(e,n,r=!1){const i=new Zi;i.updateFromServerResponse(n);const s=new Rn({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await mu(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];Z(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?sE(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),u=new Zi;u.updateFromIdToken(r);const l=new Rn({uid:i.localId,auth:e,stsTokenManager:u,isAnonymous:o}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Fh(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,c),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vy=new Map;function bn(t){Un(t instanceof Function,"Expected a class definition");let e=Vy.get(t);return e?(Un(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Vy.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oE{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}oE.type="NONE";const jy=oE;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dl(t,e,n){return`firebase:${t}:${e}:${n}`}class es{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Dl(this.userKey,i.apiKey,s),this.fullPersistenceKey=Dl("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Rn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new es(bn(jy),e,r);const i=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let s=i[0]||bn(jy);const o=Dl(r,e.config.apiKey,e.name);let u=null;for(const c of n)try{const d=await c._get(o);if(d){const f=Rn._fromJSON(e,d);c!==s&&(u=f),s=c;break}}catch{}const l=i.filter(c=>c._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new es(s,e,r):(s=l[0],u&&await s._set(o,u.toJSON()),await Promise.all(n.map(async c=>{if(c!==s)try{await c._remove(o)}catch{}})),new es(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fy(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(cE(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(aE(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(hE(e))return"Blackberry";if(fE(e))return"Webos";if(lE(e))return"Safari";if((e.includes("chrome/")||uE(e))&&!e.includes("edge/"))return"Chrome";if(dE(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function aE(t=ct()){return/firefox\//i.test(t)}function lE(t=ct()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function uE(t=ct()){return/crios\//i.test(t)}function cE(t=ct()){return/iemobile/i.test(t)}function dE(t=ct()){return/android/i.test(t)}function hE(t=ct()){return/blackberry/i.test(t)}function fE(t=ct()){return/webos/i.test(t)}function hp(t=ct()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Tk(t=ct()){var e;return hp(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Ik(){return VC()&&document.documentMode===10}function pE(t=ct()){return hp(t)||dE(t)||fE(t)||hE(t)||/windows phone/i.test(t)||cE(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mE(t,e=[]){let n;switch(t){case"Browser":n=Fy(ct());break;case"Worker":n=`${Fy(ct())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ss}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sk{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,u)=>{try{const l=e(s);o(l)}catch(l){u(l)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xk(t,e={}){return Nr(t,"GET","/v2/passwordPolicy",mi(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ak=6;class Ck{constructor(e){var n,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:Ak,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,i,s,o,u;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(n=l.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(u=l.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),l}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pk{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Uy(this),this.idTokenSubscription=new Uy(this),this.beforeStateQueue=new Sk(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Zw,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=bn(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await es.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await iE(this,{idToken:e}),r=await Rn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Pn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(u,u))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,u=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===u)&&(l!=null&&l.user)&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return Z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await mu(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ak()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Pn(this.app))return Promise.reject(_r(this));const n=e?Ve(e):null;return n&&Z(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Pn(this.app)?Promise.reject(_r(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Pn(this.app)?Promise.reject(_r(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(bn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await xk(this),n=new Ck(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new fi("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await Ek(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&bn(e)||this._popupRedirectResolver;Z(n,this,"argument-error"),this.redirectPersistenceManager=await es.create(this,[bn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(Z(u,this,"internal-error"),u.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,r,i);return()=>{o=!0,l()}}else{const l=e.addObserver(n);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=mE(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&ik(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function xs(t){return Ve(t)}class Uy{constructor(e){this.auth=e,this.observer=null,this.addObserver=WC(n=>this.observer=n)}get next(){return Z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ic={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function kk(t){ic=t}function gE(t){return ic.loadJS(t)}function Rk(){return ic.recaptchaEnterpriseScript}function bk(){return ic.gapiScript}function Nk(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const Dk="recaptcha-enterprise",Ok="NO_RECAPTCHA";class Mk{constructor(e){this.type=Dk,this.auth=xs(e)}async verify(e="verify",n=!1){async function r(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,u)=>{fk(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const c=new hk(l);return s.tenantId==null?s._agentRecaptchaConfig=c:s._tenantRecaptchaConfigs[s.tenantId]=c,o(c.siteKey)}}).catch(l=>{u(l)})})}function i(s,o,u){const l=window.grecaptcha;My(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(c=>{o(c)}).catch(()=>{o(Ok)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(u=>{if(!n&&My(window.grecaptcha))i(u,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=Rk();l.length!==0&&(l+=u),gE(l).then(()=>{i(u,s,o)}).catch(c=>{o(c)})}}).catch(u=>{o(u)})})}}async function By(t,e,n,r=!1){const i=new Mk(t);let s;try{s=await i.verify(n)}catch{s=await i.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function $y(t,e,n,r){var i;if(!((i=t._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await By(t,e,n,n==="getOobCode");return r(t,s)}else return r(t,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await By(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(s)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lk(t,e){const n=pi(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(Qo(s,e??{}))return i;en(i,"already-initialized")}return n.initialize({options:e})}function Vk(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(bn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function jk(t,e,n){const r=xs(t);Z(r._canInitEmulator,r,"emulator-config-failed"),Z(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=yE(e),{host:o,port:u}=Fk(e),l=u===null?"":`:${u}`;r.config.emulator={url:`${s}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:u,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),Uk()}function yE(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Fk(t){const e=yE(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:zy(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:zy(o)}}}function zy(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Uk(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fp{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return kn("not implemented")}_getIdTokenResponse(e){return kn("not implemented")}_linkToIdToken(e,n){return kn("not implemented")}_getReauthenticationResolver(e){return kn("not implemented")}}async function Bk(t,e){return Nr(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $k(t,e){return rc(t,"POST","/v1/accounts:signInWithPassword",mi(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zk(t,e){return rc(t,"POST","/v1/accounts:signInWithEmailLink",mi(t,e))}async function Wk(t,e){return rc(t,"POST","/v1/accounts:signInWithEmailLink",mi(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jo extends fp{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new Jo(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Jo(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return $y(e,n,"signInWithPassword",$k);case"emailLink":return zk(e,{email:this._email,oobCode:this._password});default:en(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return $y(e,r,"signUpPassword",Bk);case"emailLink":return Wk(e,{idToken:n,email:this._email,oobCode:this._password});default:en(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ts(t,e){return rc(t,"POST","/v1/accounts:signInWithIdp",mi(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qk="http://localhost";class ii extends fp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new ii(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):en("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=lp(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new ii(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return ts(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,ts(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,ts(e,n)}buildRequest(){const e={requestUri:qk,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=va(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hk(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Gk(t){const e=ao(lo(t)).link,n=e?ao(lo(e)).deep_link_id:null,r=ao(lo(t)).deep_link_id;return(r?ao(lo(r)).link:null)||r||n||e||t}class pp{constructor(e){var n,r,i,s,o,u;const l=ao(lo(e)),c=(n=l.apiKey)!==null&&n!==void 0?n:null,d=(r=l.oobCode)!==null&&r!==void 0?r:null,f=Hk((i=l.mode)!==null&&i!==void 0?i:null);Z(c&&d&&f,"argument-error"),this.apiKey=c,this.operation=f,this.code=d,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(u=l.tenantId)!==null&&u!==void 0?u:null}static parseLink(e){const n=Gk(e);try{return new pp(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(){this.providerId=As.PROVIDER_ID}static credential(e,n){return Jo._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=pp.parseLink(n);return Z(r,"argument-error"),Jo._fromEmailAndCode(e,r.code,r.tenantId)}}As.PROVIDER_ID="password";As.EMAIL_PASSWORD_SIGN_IN_METHOD="password";As.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vE{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa extends vE{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr extends wa{constructor(){super("facebook.com")}static credential(e){return ii._fromParams({providerId:tr.PROVIDER_ID,signInMethod:tr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return tr.credentialFromTaggedObject(e)}static credentialFromError(e){return tr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return tr.credential(e.oauthAccessToken)}catch{return null}}}tr.FACEBOOK_SIGN_IN_METHOD="facebook.com";tr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr extends wa{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return ii._fromParams({providerId:nr.PROVIDER_ID,signInMethod:nr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return nr.credentialFromTaggedObject(e)}static credentialFromError(e){return nr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return nr.credential(n,r)}catch{return null}}}nr.GOOGLE_SIGN_IN_METHOD="google.com";nr.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr extends wa{constructor(){super("github.com")}static credential(e){return ii._fromParams({providerId:rr.PROVIDER_ID,signInMethod:rr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return rr.credentialFromTaggedObject(e)}static credentialFromError(e){return rr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return rr.credential(e.oauthAccessToken)}catch{return null}}}rr.GITHUB_SIGN_IN_METHOD="github.com";rr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir extends wa{constructor(){super("twitter.com")}static credential(e,n){return ii._fromParams({providerId:ir.PROVIDER_ID,signInMethod:ir.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ir.credentialFromTaggedObject(e)}static credentialFromError(e){return ir.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return ir.credential(n,r)}catch{return null}}}ir.TWITTER_SIGN_IN_METHOD="twitter.com";ir.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Rn._fromIdTokenResponse(e,r,i),o=Wy(r);return new ds({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=Wy(r);return new ds({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function Wy(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu extends nn{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,gu.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new gu(e,n,r,i)}}function _E(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?gu._fromErrorAndOperation(t,s,e,r):s})}async function Kk(t,e,n=!1){const r=await Xo(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ds._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qk(t,e,n=!1){const{auth:r}=t;if(Pn(r.app))return Promise.reject(_r(r));const i="reauthenticate";try{const s=await Xo(t,_E(r,i,e,t),n);Z(s.idToken,r,"internal-error");const o=dp(s.idToken);Z(o,r,"internal-error");const{sub:u}=o;return Z(t.uid===u,r,"user-mismatch"),ds._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&en(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wE(t,e,n=!1){if(Pn(t.app))return Promise.reject(_r(t));const r="signIn",i=await _E(t,r,e),s=await ds._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function Yk(t,e){return wE(xs(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xk(t){const e=xs(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Jk(t,e,n){return Pn(t.app)?Promise.reject(_r(t)):Yk(Ve(t),As.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Xk(t),r})}function Zk(t,e,n,r){return Ve(t).onIdTokenChanged(e,n,r)}function eR(t,e,n){return Ve(t).beforeAuthStateChanged(e,n)}function tR(t,e,n,r){return Ve(t).onAuthStateChanged(e,n,r)}function nR(t){return Ve(t).signOut()}const yu="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EE{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(yu,"1"),this.storage.removeItem(yu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rR=1e3,iR=10;class TE extends EE{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=pE(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,u,l)=>{this.notifyListeners(o,l)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);Ik()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,iR):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},rR)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}TE.type="LOCAL";const sR=TE;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IE extends EE{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}IE.type="SESSION";const SE=IE;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oR(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new sc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const u=Array.from(o).map(async c=>c(n.origin,s)),l=await oR(u);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}sc.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mp(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aR{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((u,l)=>{const c=mp("",20);i.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(f){const m=f;if(m.data.eventId===c)switch(m.data.status){case"ack":clearTimeout(d),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),u(m.data.response);break;default:clearTimeout(d),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pn(){return window}function lR(t){pn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xE(){return typeof pn().WorkerGlobalScope<"u"&&typeof pn().importScripts=="function"}async function uR(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function cR(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function dR(){return xE()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AE="firebaseLocalStorageDb",hR=1,vu="firebaseLocalStorage",CE="fbase_key";class Ea{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function oc(t,e){return t.transaction([vu],e?"readwrite":"readonly").objectStore(vu)}function fR(){const t=indexedDB.deleteDatabase(AE);return new Ea(t).toPromise()}function Uh(){const t=indexedDB.open(AE,hR);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(vu,{keyPath:CE})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(vu)?e(r):(r.close(),await fR(),e(await Uh()))})})}async function qy(t,e,n){const r=oc(t,!0).put({[CE]:e,value:n});return new Ea(r).toPromise()}async function pR(t,e){const n=oc(t,!1).get(e),r=await new Ea(n).toPromise();return r===void 0?null:r.value}function Hy(t,e){const n=oc(t,!0).delete(e);return new Ea(n).toPromise()}const mR=800,gR=3;class PE{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Uh(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>gR)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return xE()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=sc._getInstance(dR()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await uR(),!this.activeServiceWorker)return;this.sender=new aR(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||cR()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Uh();return await qy(e,yu,"1"),await Hy(e,yu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>qy(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>pR(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Hy(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=oc(i,!1).getAll();return new Ea(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),mR)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}PE.type="LOCAL";const yR=PE;new _a(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vR(t,e){return e?bn(e):(Z(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gp extends fp{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ts(e,this._buildIdpRequest())}_linkToIdToken(e,n){return ts(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return ts(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function _R(t){return wE(t.auth,new gp(t),t.bypassAuthState)}function wR(t){const{auth:e,user:n}=t;return Z(n,e,"internal-error"),Qk(n,new gp(t),t.bypassAuthState)}async function ER(t){const{auth:e,user:n}=t;return Z(n,e,"internal-error"),Kk(n,new gp(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:u}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return _R;case"linkViaPopup":case"linkViaRedirect":return ER;case"reauthViaPopup":case"reauthViaRedirect":return wR;default:en(this.auth,"internal-error")}}resolve(e){Un(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Un(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TR=new _a(2e3,1e4);class qi extends kE{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,qi.currentPopupAction&&qi.currentPopupAction.cancel(),qi.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Z(e,this.auth,"internal-error"),e}async onExecution(){Un(this.filter.length===1,"Popup operations only handle one event");const e=mp();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(fn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(fn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,qi.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(fn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,TR.get())};e()}}qi.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IR="pendingRedirect",Ol=new Map;class SR extends kE{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Ol.get(this.auth._key());if(!e){try{const r=await xR(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Ol.set(this.auth._key(),e)}return this.bypassAuthState||Ol.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function xR(t,e){const n=PR(e),r=CR(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function AR(t,e){Ol.set(t._key(),e)}function CR(t){return bn(t._redirectPersistence)}function PR(t){return Dl(IR,t.config.apiKey,t.name)}async function kR(t,e,n=!1){if(Pn(t.app))return Promise.reject(_r(t));const r=xs(t),i=vR(r,e),o=await new SR(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RR=10*60*1e3;class bR{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!NR(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!RE(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(fn(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=RR&&this.cachedEventUids.clear(),this.cachedEventUids.has(Gy(e))}saveEventToCache(e){this.cachedEventUids.add(Gy(e)),this.lastProcessedEventTime=Date.now()}}function Gy(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function RE({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function NR(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return RE(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function DR(t,e={}){return Nr(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OR=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,MR=/^https?/;async function LR(t){if(t.config.emulator)return;const{authorizedDomains:e}=await DR(t);for(const n of e)try{if(VR(n))return}catch{}en(t,"unauthorized-domain")}function VR(t){const e=jh(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!MR.test(n))return!1;if(OR.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jR=new _a(3e4,6e4);function Ky(){const t=pn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function FR(t){return new Promise((e,n)=>{var r,i,s;function o(){Ky(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ky(),n(fn(t,"network-request-failed"))},timeout:jR.get()})}if(!((i=(r=pn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=pn().gapi)===null||s===void 0)&&s.load)o();else{const u=Nk("iframefcb");return pn()[u]=()=>{gapi.load?o():n(fn(t,"network-request-failed"))},gE(`${bk()}?onload=${u}`).catch(l=>n(l))}}).catch(e=>{throw Ml=null,e})}let Ml=null;function UR(t){return Ml=Ml||FR(t),Ml}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BR=new _a(5e3,15e3),$R="__/auth/iframe",zR="emulator/auth/iframe",WR={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},qR=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function HR(t){const e=t.config;Z(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?cp(e,zR):`https://${t.config.authDomain}/${$R}`,r={apiKey:e.apiKey,appName:t.name,v:Ss},i=qR.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${va(r).slice(1)}`}async function GR(t){const e=await UR(t),n=pn().gapi;return Z(n,t,"internal-error"),e.open({where:document.body,url:HR(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:WR,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=fn(t,"network-request-failed"),u=pn().setTimeout(()=>{s(o)},BR.get());function l(){pn().clearTimeout(u),i(r)}r.ping(l).then(l,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KR={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},QR=500,YR=600,XR="_blank",JR="http://localhost";class Qy{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function ZR(t,e,n,r=QR,i=YR){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const l=Object.assign(Object.assign({},KR),{width:r.toString(),height:i.toString(),top:s,left:o}),c=ct().toLowerCase();n&&(u=uE(c)?XR:n),aE(c)&&(e=e||JR,l.scrollbars="yes");const d=Object.entries(l).reduce((m,[v,x])=>`${m}${v}=${x},`,"");if(Tk(c)&&u!=="_self")return e2(e||"",u),new Qy(null);const f=window.open(e||"",u,d);Z(f,t,"popup-blocked");try{f.focus()}catch{}return new Qy(f)}function e2(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const t2="__/auth/handler",n2="emulator/auth/handler",r2=encodeURIComponent("fac");async function Yy(t,e,n,r,i,s){Z(t.config.authDomain,t,"auth-domain-config-required"),Z(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Ss,eventId:i};if(e instanceof vE){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",zC(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,f]of Object.entries({}))o[d]=f}if(e instanceof wa){const d=e.getScopes().filter(f=>f!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const u=o;for(const d of Object.keys(u))u[d]===void 0&&delete u[d];const l=await t._getAppCheckToken(),c=l?`#${r2}=${encodeURIComponent(l)}`:"";return`${i2(t)}?${va(u).slice(1)}${c}`}function i2({config:t}){return t.emulator?cp(t,n2):`https://${t.authDomain}/${t2}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ad="webStorageSupport";class s2{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=SE,this._completeRedirectFn=kR,this._overrideRedirectResult=AR}async _openPopup(e,n,r,i){var s;Un((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Yy(e,n,r,jh(),i);return ZR(e,o,mp())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await Yy(e,n,r,jh(),i);return lR(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(Un(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await GR(e),r=new bR(e);return n.register("authEvent",i=>(Z(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Ad,{type:Ad},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Ad];o!==void 0&&n(!!o),en(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=LR(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return pE()||lE()||hp()}}const o2=s2;var Xy="@firebase/auth",Jy="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a2{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l2(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function u2(t){yn(new Zt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:u}=r.options;Z(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:u,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:mE(t)},c=new Pk(r,i,s,l);return Vk(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),yn(new Zt("auth-internal",e=>{const n=xs(e.getProvider("auth").getImmediate());return(r=>new a2(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ut(Xy,Jy,l2(t)),Ut(Xy,Jy,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c2=5*60,d2=$w("authIdTokenMaxAge")||c2;let Zy=null;const h2=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>d2)return;const i=n==null?void 0:n.token;Zy!==i&&(Zy=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function f2(t=ap()){const e=pi(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Lk(t,{popupRedirectResolver:o2,persistence:[yR,sR,SE]}),r=$w("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=h2(s.toString());eR(n,o,()=>o(n.currentUser)),Zk(n,u=>o(u))}}const i=Uw("auth");return i&&jk(n,`http://${i}`),n}function p2(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}kk({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=fn("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",p2().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});u2("Browser");var m2="firebase",g2="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ut(m2,g2,"app");var ev=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Jr,bE;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(S,_){function I(){}I.prototype=_.prototype,S.D=_.prototype,S.prototype=new I,S.prototype.constructor=S,S.C=function(A,R,b){for(var C=Array(arguments.length-2),Be=2;Be<arguments.length;Be++)C[Be-2]=arguments[Be];return _.prototype[R].apply(A,C)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(S,_,I){I||(I=0);var A=Array(16);if(typeof _=="string")for(var R=0;16>R;++R)A[R]=_.charCodeAt(I++)|_.charCodeAt(I++)<<8|_.charCodeAt(I++)<<16|_.charCodeAt(I++)<<24;else for(R=0;16>R;++R)A[R]=_[I++]|_[I++]<<8|_[I++]<<16|_[I++]<<24;_=S.g[0],I=S.g[1],R=S.g[2];var b=S.g[3],C=_+(b^I&(R^b))+A[0]+3614090360&4294967295;_=I+(C<<7&4294967295|C>>>25),C=b+(R^_&(I^R))+A[1]+3905402710&4294967295,b=_+(C<<12&4294967295|C>>>20),C=R+(I^b&(_^I))+A[2]+606105819&4294967295,R=b+(C<<17&4294967295|C>>>15),C=I+(_^R&(b^_))+A[3]+3250441966&4294967295,I=R+(C<<22&4294967295|C>>>10),C=_+(b^I&(R^b))+A[4]+4118548399&4294967295,_=I+(C<<7&4294967295|C>>>25),C=b+(R^_&(I^R))+A[5]+1200080426&4294967295,b=_+(C<<12&4294967295|C>>>20),C=R+(I^b&(_^I))+A[6]+2821735955&4294967295,R=b+(C<<17&4294967295|C>>>15),C=I+(_^R&(b^_))+A[7]+4249261313&4294967295,I=R+(C<<22&4294967295|C>>>10),C=_+(b^I&(R^b))+A[8]+1770035416&4294967295,_=I+(C<<7&4294967295|C>>>25),C=b+(R^_&(I^R))+A[9]+2336552879&4294967295,b=_+(C<<12&4294967295|C>>>20),C=R+(I^b&(_^I))+A[10]+4294925233&4294967295,R=b+(C<<17&4294967295|C>>>15),C=I+(_^R&(b^_))+A[11]+2304563134&4294967295,I=R+(C<<22&4294967295|C>>>10),C=_+(b^I&(R^b))+A[12]+1804603682&4294967295,_=I+(C<<7&4294967295|C>>>25),C=b+(R^_&(I^R))+A[13]+4254626195&4294967295,b=_+(C<<12&4294967295|C>>>20),C=R+(I^b&(_^I))+A[14]+2792965006&4294967295,R=b+(C<<17&4294967295|C>>>15),C=I+(_^R&(b^_))+A[15]+1236535329&4294967295,I=R+(C<<22&4294967295|C>>>10),C=_+(R^b&(I^R))+A[1]+4129170786&4294967295,_=I+(C<<5&4294967295|C>>>27),C=b+(I^R&(_^I))+A[6]+3225465664&4294967295,b=_+(C<<9&4294967295|C>>>23),C=R+(_^I&(b^_))+A[11]+643717713&4294967295,R=b+(C<<14&4294967295|C>>>18),C=I+(b^_&(R^b))+A[0]+3921069994&4294967295,I=R+(C<<20&4294967295|C>>>12),C=_+(R^b&(I^R))+A[5]+3593408605&4294967295,_=I+(C<<5&4294967295|C>>>27),C=b+(I^R&(_^I))+A[10]+38016083&4294967295,b=_+(C<<9&4294967295|C>>>23),C=R+(_^I&(b^_))+A[15]+3634488961&4294967295,R=b+(C<<14&4294967295|C>>>18),C=I+(b^_&(R^b))+A[4]+3889429448&4294967295,I=R+(C<<20&4294967295|C>>>12),C=_+(R^b&(I^R))+A[9]+568446438&4294967295,_=I+(C<<5&4294967295|C>>>27),C=b+(I^R&(_^I))+A[14]+3275163606&4294967295,b=_+(C<<9&4294967295|C>>>23),C=R+(_^I&(b^_))+A[3]+4107603335&4294967295,R=b+(C<<14&4294967295|C>>>18),C=I+(b^_&(R^b))+A[8]+1163531501&4294967295,I=R+(C<<20&4294967295|C>>>12),C=_+(R^b&(I^R))+A[13]+2850285829&4294967295,_=I+(C<<5&4294967295|C>>>27),C=b+(I^R&(_^I))+A[2]+4243563512&4294967295,b=_+(C<<9&4294967295|C>>>23),C=R+(_^I&(b^_))+A[7]+1735328473&4294967295,R=b+(C<<14&4294967295|C>>>18),C=I+(b^_&(R^b))+A[12]+2368359562&4294967295,I=R+(C<<20&4294967295|C>>>12),C=_+(I^R^b)+A[5]+4294588738&4294967295,_=I+(C<<4&4294967295|C>>>28),C=b+(_^I^R)+A[8]+2272392833&4294967295,b=_+(C<<11&4294967295|C>>>21),C=R+(b^_^I)+A[11]+1839030562&4294967295,R=b+(C<<16&4294967295|C>>>16),C=I+(R^b^_)+A[14]+4259657740&4294967295,I=R+(C<<23&4294967295|C>>>9),C=_+(I^R^b)+A[1]+2763975236&4294967295,_=I+(C<<4&4294967295|C>>>28),C=b+(_^I^R)+A[4]+1272893353&4294967295,b=_+(C<<11&4294967295|C>>>21),C=R+(b^_^I)+A[7]+4139469664&4294967295,R=b+(C<<16&4294967295|C>>>16),C=I+(R^b^_)+A[10]+3200236656&4294967295,I=R+(C<<23&4294967295|C>>>9),C=_+(I^R^b)+A[13]+681279174&4294967295,_=I+(C<<4&4294967295|C>>>28),C=b+(_^I^R)+A[0]+3936430074&4294967295,b=_+(C<<11&4294967295|C>>>21),C=R+(b^_^I)+A[3]+3572445317&4294967295,R=b+(C<<16&4294967295|C>>>16),C=I+(R^b^_)+A[6]+76029189&4294967295,I=R+(C<<23&4294967295|C>>>9),C=_+(I^R^b)+A[9]+3654602809&4294967295,_=I+(C<<4&4294967295|C>>>28),C=b+(_^I^R)+A[12]+3873151461&4294967295,b=_+(C<<11&4294967295|C>>>21),C=R+(b^_^I)+A[15]+530742520&4294967295,R=b+(C<<16&4294967295|C>>>16),C=I+(R^b^_)+A[2]+3299628645&4294967295,I=R+(C<<23&4294967295|C>>>9),C=_+(R^(I|~b))+A[0]+4096336452&4294967295,_=I+(C<<6&4294967295|C>>>26),C=b+(I^(_|~R))+A[7]+1126891415&4294967295,b=_+(C<<10&4294967295|C>>>22),C=R+(_^(b|~I))+A[14]+2878612391&4294967295,R=b+(C<<15&4294967295|C>>>17),C=I+(b^(R|~_))+A[5]+4237533241&4294967295,I=R+(C<<21&4294967295|C>>>11),C=_+(R^(I|~b))+A[12]+1700485571&4294967295,_=I+(C<<6&4294967295|C>>>26),C=b+(I^(_|~R))+A[3]+2399980690&4294967295,b=_+(C<<10&4294967295|C>>>22),C=R+(_^(b|~I))+A[10]+4293915773&4294967295,R=b+(C<<15&4294967295|C>>>17),C=I+(b^(R|~_))+A[1]+2240044497&4294967295,I=R+(C<<21&4294967295|C>>>11),C=_+(R^(I|~b))+A[8]+1873313359&4294967295,_=I+(C<<6&4294967295|C>>>26),C=b+(I^(_|~R))+A[15]+4264355552&4294967295,b=_+(C<<10&4294967295|C>>>22),C=R+(_^(b|~I))+A[6]+2734768916&4294967295,R=b+(C<<15&4294967295|C>>>17),C=I+(b^(R|~_))+A[13]+1309151649&4294967295,I=R+(C<<21&4294967295|C>>>11),C=_+(R^(I|~b))+A[4]+4149444226&4294967295,_=I+(C<<6&4294967295|C>>>26),C=b+(I^(_|~R))+A[11]+3174756917&4294967295,b=_+(C<<10&4294967295|C>>>22),C=R+(_^(b|~I))+A[2]+718787259&4294967295,R=b+(C<<15&4294967295|C>>>17),C=I+(b^(R|~_))+A[9]+3951481745&4294967295,S.g[0]=S.g[0]+_&4294967295,S.g[1]=S.g[1]+(R+(C<<21&4294967295|C>>>11))&4294967295,S.g[2]=S.g[2]+R&4294967295,S.g[3]=S.g[3]+b&4294967295}r.prototype.u=function(S,_){_===void 0&&(_=S.length);for(var I=_-this.blockSize,A=this.B,R=this.h,b=0;b<_;){if(R==0)for(;b<=I;)i(this,S,b),b+=this.blockSize;if(typeof S=="string"){for(;b<_;)if(A[R++]=S.charCodeAt(b++),R==this.blockSize){i(this,A),R=0;break}}else for(;b<_;)if(A[R++]=S[b++],R==this.blockSize){i(this,A),R=0;break}}this.h=R,this.o+=_},r.prototype.v=function(){var S=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);S[0]=128;for(var _=1;_<S.length-8;++_)S[_]=0;var I=8*this.o;for(_=S.length-8;_<S.length;++_)S[_]=I&255,I/=256;for(this.u(S),S=Array(16),_=I=0;4>_;++_)for(var A=0;32>A;A+=8)S[I++]=this.g[_]>>>A&255;return S};function s(S,_){var I=u;return Object.prototype.hasOwnProperty.call(I,S)?I[S]:I[S]=_(S)}function o(S,_){this.h=_;for(var I=[],A=!0,R=S.length-1;0<=R;R--){var b=S[R]|0;A&&b==_||(I[R]=b,A=!1)}this.g=I}var u={};function l(S){return-128<=S&&128>S?s(S,function(_){return new o([_|0],0>_?-1:0)}):new o([S|0],0>S?-1:0)}function c(S){if(isNaN(S)||!isFinite(S))return f;if(0>S)return k(c(-S));for(var _=[],I=1,A=0;S>=I;A++)_[A]=S/I|0,I*=4294967296;return new o(_,0)}function d(S,_){if(S.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(S.charAt(0)=="-")return k(d(S.substring(1),_));if(0<=S.indexOf("-"))throw Error('number format error: interior "-" character');for(var I=c(Math.pow(_,8)),A=f,R=0;R<S.length;R+=8){var b=Math.min(8,S.length-R),C=parseInt(S.substring(R,R+b),_);8>b?(b=c(Math.pow(_,b)),A=A.j(b).add(c(C))):(A=A.j(I),A=A.add(c(C)))}return A}var f=l(0),m=l(1),v=l(16777216);t=o.prototype,t.m=function(){if(P(this))return-k(this).m();for(var S=0,_=1,I=0;I<this.g.length;I++){var A=this.i(I);S+=(0<=A?A:4294967296+A)*_,_*=4294967296}return S},t.toString=function(S){if(S=S||10,2>S||36<S)throw Error("radix out of range: "+S);if(x(this))return"0";if(P(this))return"-"+k(this).toString(S);for(var _=c(Math.pow(S,6)),I=this,A="";;){var R=O(I,_).g;I=E(I,R.j(_));var b=((0<I.g.length?I.g[0]:I.h)>>>0).toString(S);if(I=R,x(I))return b+A;for(;6>b.length;)b="0"+b;A=b+A}},t.i=function(S){return 0>S?0:S<this.g.length?this.g[S]:this.h};function x(S){if(S.h!=0)return!1;for(var _=0;_<S.g.length;_++)if(S.g[_]!=0)return!1;return!0}function P(S){return S.h==-1}t.l=function(S){return S=E(this,S),P(S)?-1:x(S)?0:1};function k(S){for(var _=S.g.length,I=[],A=0;A<_;A++)I[A]=~S.g[A];return new o(I,~S.h).add(m)}t.abs=function(){return P(this)?k(this):this},t.add=function(S){for(var _=Math.max(this.g.length,S.g.length),I=[],A=0,R=0;R<=_;R++){var b=A+(this.i(R)&65535)+(S.i(R)&65535),C=(b>>>16)+(this.i(R)>>>16)+(S.i(R)>>>16);A=C>>>16,b&=65535,C&=65535,I[R]=C<<16|b}return new o(I,I[I.length-1]&-2147483648?-1:0)};function E(S,_){return S.add(k(_))}t.j=function(S){if(x(this)||x(S))return f;if(P(this))return P(S)?k(this).j(k(S)):k(k(this).j(S));if(P(S))return k(this.j(k(S)));if(0>this.l(v)&&0>S.l(v))return c(this.m()*S.m());for(var _=this.g.length+S.g.length,I=[],A=0;A<2*_;A++)I[A]=0;for(A=0;A<this.g.length;A++)for(var R=0;R<S.g.length;R++){var b=this.i(A)>>>16,C=this.i(A)&65535,Be=S.i(R)>>>16,zt=S.i(R)&65535;I[2*A+2*R]+=C*zt,w(I,2*A+2*R),I[2*A+2*R+1]+=b*zt,w(I,2*A+2*R+1),I[2*A+2*R+1]+=C*Be,w(I,2*A+2*R+1),I[2*A+2*R+2]+=b*Be,w(I,2*A+2*R+2)}for(A=0;A<_;A++)I[A]=I[2*A+1]<<16|I[2*A];for(A=_;A<2*_;A++)I[A]=0;return new o(I,0)};function w(S,_){for(;(S[_]&65535)!=S[_];)S[_+1]+=S[_]>>>16,S[_]&=65535,_++}function T(S,_){this.g=S,this.h=_}function O(S,_){if(x(_))throw Error("division by zero");if(x(S))return new T(f,f);if(P(S))return _=O(k(S),_),new T(k(_.g),k(_.h));if(P(_))return _=O(S,k(_)),new T(k(_.g),_.h);if(30<S.g.length){if(P(S)||P(_))throw Error("slowDivide_ only works with positive integers.");for(var I=m,A=_;0>=A.l(S);)I=U(I),A=U(A);var R=z(I,1),b=z(A,1);for(A=z(A,2),I=z(I,2);!x(A);){var C=b.add(A);0>=C.l(S)&&(R=R.add(I),b=C),A=z(A,1),I=z(I,1)}return _=E(S,R.j(_)),new T(R,_)}for(R=f;0<=S.l(_);){for(I=Math.max(1,Math.floor(S.m()/_.m())),A=Math.ceil(Math.log(I)/Math.LN2),A=48>=A?1:Math.pow(2,A-48),b=c(I),C=b.j(_);P(C)||0<C.l(S);)I-=A,b=c(I),C=b.j(_);x(b)&&(b=m),R=R.add(b),S=E(S,C)}return new T(R,S)}t.A=function(S){return O(this,S).h},t.and=function(S){for(var _=Math.max(this.g.length,S.g.length),I=[],A=0;A<_;A++)I[A]=this.i(A)&S.i(A);return new o(I,this.h&S.h)},t.or=function(S){for(var _=Math.max(this.g.length,S.g.length),I=[],A=0;A<_;A++)I[A]=this.i(A)|S.i(A);return new o(I,this.h|S.h)},t.xor=function(S){for(var _=Math.max(this.g.length,S.g.length),I=[],A=0;A<_;A++)I[A]=this.i(A)^S.i(A);return new o(I,this.h^S.h)};function U(S){for(var _=S.g.length+1,I=[],A=0;A<_;A++)I[A]=S.i(A)<<1|S.i(A-1)>>>31;return new o(I,S.h)}function z(S,_){var I=_>>5;_%=32;for(var A=S.g.length-I,R=[],b=0;b<A;b++)R[b]=0<_?S.i(b+I)>>>_|S.i(b+I+1)<<32-_:S.i(b+I);return new o(R,S.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,bE=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=d,Jr=o}).apply(typeof ev<"u"?ev:typeof self<"u"?self:typeof window<"u"?window:{});var pl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var NE,uo,DE,Ll,Bh,OE,ME,LE;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,p){return a==Array.prototype||a==Object.prototype||(a[h]=p.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof pl=="object"&&pl];for(var h=0;h<a.length;++h){var p=a[h];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=n(this);function i(a,h){if(h)e:{var p=r;a=a.split(".");for(var y=0;y<a.length-1;y++){var N=a[y];if(!(N in p))break e;p=p[N]}a=a[a.length-1],y=p[a],h=h(y),h!=y&&h!=null&&e(p,a,{configurable:!0,writable:!0,value:h})}}function s(a,h){a instanceof String&&(a+="");var p=0,y=!1,N={next:function(){if(!y&&p<a.length){var L=p++;return{value:h(L,a[L]),done:!1}}return y=!0,{done:!0,value:void 0}}};return N[Symbol.iterator]=function(){return N},N}i("Array.prototype.values",function(a){return a||function(){return s(this,function(h,p){return p})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},u=this||self;function l(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function d(a,h,p){return a.call.apply(a.bind,arguments)}function f(a,h,p){if(!a)throw Error();if(2<arguments.length){var y=Array.prototype.slice.call(arguments,2);return function(){var N=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(N,y),a.apply(h,N)}}return function(){return a.apply(h,arguments)}}function m(a,h,p){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:f,m.apply(null,arguments)}function v(a,h){var p=Array.prototype.slice.call(arguments,1);return function(){var y=p.slice();return y.push.apply(y,arguments),a.apply(this,y)}}function x(a,h){function p(){}p.prototype=h.prototype,a.aa=h.prototype,a.prototype=new p,a.prototype.constructor=a,a.Qb=function(y,N,L){for(var W=Array(arguments.length-2),pe=2;pe<arguments.length;pe++)W[pe-2]=arguments[pe];return h.prototype[N].apply(y,W)}}function P(a){const h=a.length;if(0<h){const p=Array(h);for(let y=0;y<h;y++)p[y]=a[y];return p}return[]}function k(a,h){for(let p=1;p<arguments.length;p++){const y=arguments[p];if(l(y)){const N=a.length||0,L=y.length||0;a.length=N+L;for(let W=0;W<L;W++)a[N+W]=y[W]}else a.push(y)}}class E{constructor(h,p){this.i=h,this.j=p,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function w(a){return/^[\s\xa0]*$/.test(a)}function T(){var a=u.navigator;return a&&(a=a.userAgent)?a:""}function O(a){return O[" "](a),a}O[" "]=function(){};var U=T().indexOf("Gecko")!=-1&&!(T().toLowerCase().indexOf("webkit")!=-1&&T().indexOf("Edge")==-1)&&!(T().indexOf("Trident")!=-1||T().indexOf("MSIE")!=-1)&&T().indexOf("Edge")==-1;function z(a,h,p){for(const y in a)h.call(p,a[y],y,a)}function S(a,h){for(const p in a)h.call(void 0,a[p],p,a)}function _(a){const h={};for(const p in a)h[p]=a[p];return h}const I="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function A(a,h){let p,y;for(let N=1;N<arguments.length;N++){y=arguments[N];for(p in y)a[p]=y[p];for(let L=0;L<I.length;L++)p=I[L],Object.prototype.hasOwnProperty.call(y,p)&&(a[p]=y[p])}}function R(a){var h=1;a=a.split(":");const p=[];for(;0<h&&a.length;)p.push(a.shift()),h--;return a.length&&p.push(a.join(":")),p}function b(a){u.setTimeout(()=>{throw a},0)}function C(){var a=D;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class Be{constructor(){this.h=this.g=null}add(h,p){const y=zt.get();y.set(h,p),this.h?this.h.next=y:this.g=y,this.h=y}}var zt=new E(()=>new wn,a=>a.reset());class wn{constructor(){this.next=this.g=this.h=null}set(h,p){this.h=h,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let q,V=!1,D=new Be,B=()=>{const a=u.Promise.resolve(void 0);q=()=>{a.then(Y)}};var Y=()=>{for(var a;a=C();){try{a.h.call(a.g)}catch(p){b(p)}var h=zt;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}V=!1};function J(){this.s=this.s,this.C=this.C}J.prototype.s=!1,J.prototype.ma=function(){this.s||(this.s=!0,this.N())},J.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function X(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}X.prototype.h=function(){this.defaultPrevented=!0};var ye=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const p=()=>{};u.addEventListener("test",p,h),u.removeEventListener("test",p,h)}catch{}return a}();function Mt(a,h){if(X.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var p=this.type=a.type,y=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(U){e:{try{O(h.nodeName);var N=!0;break e}catch{}N=!1}N||(h=null)}}else p=="mouseover"?h=a.fromElement:p=="mouseout"&&(h=a.toElement);this.relatedTarget=h,y?(this.clientX=y.clientX!==void 0?y.clientX:y.pageX,this.clientY=y.clientY!==void 0?y.clientY:y.pageY,this.screenX=y.screenX||0,this.screenY=y.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:vt[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Mt.aa.h.call(this)}}x(Mt,X);var vt={2:"touch",3:"pen",4:"mouse"};Mt.prototype.h=function(){Mt.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var $e="closure_listenable_"+(1e6*Math.random()|0),wi=0;function Ei(a,h,p,y,N){this.listener=a,this.proxy=null,this.src=h,this.type=p,this.capture=!!y,this.ha=N,this.key=++wi,this.da=this.fa=!1}function Or(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Ns(a){this.src=a,this.g={},this.h=0}Ns.prototype.add=function(a,h,p,y,N){var L=a.toString();a=this.g[L],a||(a=this.g[L]=[],this.h++);var W=Ti(a,h,y,N);return-1<W?(h=a[W],p||(h.fa=!1)):(h=new Ei(h,this.src,L,!!y,N),h.fa=p,a.push(h)),h};function Ds(a,h){var p=h.type;if(p in a.g){var y=a.g[p],N=Array.prototype.indexOf.call(y,h,void 0),L;(L=0<=N)&&Array.prototype.splice.call(y,N,1),L&&(Or(h),a.g[p].length==0&&(delete a.g[p],a.h--))}}function Ti(a,h,p,y){for(var N=0;N<a.length;++N){var L=a[N];if(!L.da&&L.listener==h&&L.capture==!!p&&L.ha==y)return N}return-1}var Os="closure_lm_"+(1e6*Math.random()|0),Ra={};function Cc(a,h,p,y,N){if(Array.isArray(h)){for(var L=0;L<h.length;L++)Cc(a,h[L],p,y,N);return null}return p=lm(p),a&&a[$e]?a.K(h,p,c(y)?!!y.capture:!1,N):ba(a,h,p,!1,y,N)}function ba(a,h,p,y,N,L){if(!h)throw Error("Invalid event type");var W=c(N)?!!N.capture:!!N,pe=kc(a);if(pe||(a[Os]=pe=new Ns(a)),p=pe.add(h,p,y,W,L),p.proxy)return p;if(y=Na(),p.proxy=y,y.src=a,y.listener=p,a.addEventListener)ye||(N=W),N===void 0&&(N=!1),a.addEventListener(h.toString(),y,N);else if(a.attachEvent)a.attachEvent(am(h.toString()),y);else if(a.addListener&&a.removeListener)a.addListener(y);else throw Error("addEventListener and attachEvent are unavailable.");return p}function Na(){function a(p){return h.call(a.src,a.listener,p)}const h=jI;return a}function om(a,h,p,y,N){if(Array.isArray(h))for(var L=0;L<h.length;L++)om(a,h[L],p,y,N);else y=c(y)?!!y.capture:!!y,p=lm(p),a&&a[$e]?(a=a.i,h=String(h).toString(),h in a.g&&(L=a.g[h],p=Ti(L,p,y,N),-1<p&&(Or(L[p]),Array.prototype.splice.call(L,p,1),L.length==0&&(delete a.g[h],a.h--)))):a&&(a=kc(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Ti(h,p,y,N)),(p=-1<a?h[a]:null)&&Pc(p))}function Pc(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[$e])Ds(h.i,a);else{var p=a.type,y=a.proxy;h.removeEventListener?h.removeEventListener(p,y,a.capture):h.detachEvent?h.detachEvent(am(p),y):h.addListener&&h.removeListener&&h.removeListener(y),(p=kc(h))?(Ds(p,a),p.h==0&&(p.src=null,h[Os]=null)):Or(a)}}}function am(a){return a in Ra?Ra[a]:Ra[a]="on"+a}function jI(a,h){if(a.da)a=!0;else{h=new Mt(h,this);var p=a.listener,y=a.ha||a.src;a.fa&&Pc(a),a=p.call(y,h)}return a}function kc(a){return a=a[Os],a instanceof Ns?a:null}var Rc="__closure_events_fn_"+(1e9*Math.random()>>>0);function lm(a){return typeof a=="function"?a:(a[Rc]||(a[Rc]=function(h){return a.handleEvent(h)}),a[Rc])}function et(){J.call(this),this.i=new Ns(this),this.M=this,this.F=null}x(et,J),et.prototype[$e]=!0,et.prototype.removeEventListener=function(a,h,p,y){om(this,a,h,p,y)};function dt(a,h){var p,y=a.F;if(y)for(p=[];y;y=y.F)p.push(y);if(a=a.M,y=h.type||h,typeof h=="string")h=new X(h,a);else if(h instanceof X)h.target=h.target||a;else{var N=h;h=new X(y,a),A(h,N)}if(N=!0,p)for(var L=p.length-1;0<=L;L--){var W=h.g=p[L];N=Da(W,y,!0,h)&&N}if(W=h.g=a,N=Da(W,y,!0,h)&&N,N=Da(W,y,!1,h)&&N,p)for(L=0;L<p.length;L++)W=h.g=p[L],N=Da(W,y,!1,h)&&N}et.prototype.N=function(){if(et.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var p=a.g[h],y=0;y<p.length;y++)Or(p[y]);delete a.g[h],a.h--}}this.F=null},et.prototype.K=function(a,h,p,y){return this.i.add(String(a),h,!1,p,y)},et.prototype.L=function(a,h,p,y){return this.i.add(String(a),h,!0,p,y)};function Da(a,h,p,y){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var N=!0,L=0;L<h.length;++L){var W=h[L];if(W&&!W.da&&W.capture==p){var pe=W.listener,He=W.ha||W.src;W.fa&&Ds(a.i,W),N=pe.call(He,y)!==!1&&N}}return N&&!y.defaultPrevented}function um(a,h,p){if(typeof a=="function")p&&(a=m(a,p));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:u.setTimeout(a,h||0)}function cm(a){a.g=um(()=>{a.g=null,a.i&&(a.i=!1,cm(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class FI extends J{constructor(h,p){super(),this.m=h,this.l=p,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:cm(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ms(a){J.call(this),this.h=a,this.g={}}x(Ms,J);var dm=[];function hm(a){z(a.g,function(h,p){this.g.hasOwnProperty(p)&&Pc(h)},a),a.g={}}Ms.prototype.N=function(){Ms.aa.N.call(this),hm(this)},Ms.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var bc=u.JSON.stringify,UI=u.JSON.parse,BI=class{stringify(a){return u.JSON.stringify(a,void 0)}parse(a){return u.JSON.parse(a,void 0)}};function Nc(){}Nc.prototype.h=null;function fm(a){return a.h||(a.h=a.i())}function pm(){}var Ls={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Dc(){X.call(this,"d")}x(Dc,X);function Oc(){X.call(this,"c")}x(Oc,X);var Mr={},mm=null;function Oa(){return mm=mm||new et}Mr.La="serverreachability";function gm(a){X.call(this,Mr.La,a)}x(gm,X);function Vs(a){const h=Oa();dt(h,new gm(h))}Mr.STAT_EVENT="statevent";function ym(a,h){X.call(this,Mr.STAT_EVENT,a),this.stat=h}x(ym,X);function ht(a){const h=Oa();dt(h,new ym(h,a))}Mr.Ma="timingevent";function vm(a,h){X.call(this,Mr.Ma,a),this.size=h}x(vm,X);function js(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){a()},h)}function Fs(){this.g=!0}Fs.prototype.xa=function(){this.g=!1};function $I(a,h,p,y,N,L){a.info(function(){if(a.g)if(L)for(var W="",pe=L.split("&"),He=0;He<pe.length;He++){var le=pe[He].split("=");if(1<le.length){var tt=le[0];le=le[1];var nt=tt.split("_");W=2<=nt.length&&nt[1]=="type"?W+(tt+"="+le+"&"):W+(tt+"=redacted&")}}else W=null;else W=L;return"XMLHTTP REQ ("+y+") [attempt "+N+"]: "+h+`
`+p+`
`+W})}function zI(a,h,p,y,N,L,W){a.info(function(){return"XMLHTTP RESP ("+y+") [ attempt "+N+"]: "+h+`
`+p+`
`+L+" "+W})}function Ii(a,h,p,y){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+qI(a,p)+(y?" "+y:"")})}function WI(a,h){a.info(function(){return"TIMEOUT: "+h})}Fs.prototype.info=function(){};function qI(a,h){if(!a.g)return h;if(!h)return null;try{var p=JSON.parse(h);if(p){for(a=0;a<p.length;a++)if(Array.isArray(p[a])){var y=p[a];if(!(2>y.length)){var N=y[1];if(Array.isArray(N)&&!(1>N.length)){var L=N[0];if(L!="noop"&&L!="stop"&&L!="close")for(var W=1;W<N.length;W++)N[W]=""}}}}return bc(p)}catch{return h}}var Ma={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},_m={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Mc;function La(){}x(La,Nc),La.prototype.g=function(){return new XMLHttpRequest},La.prototype.i=function(){return{}},Mc=new La;function Wn(a,h,p,y){this.j=a,this.i=h,this.l=p,this.R=y||1,this.U=new Ms(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new wm}function wm(){this.i=null,this.g="",this.h=!1}var Em={},Lc={};function Vc(a,h,p){a.L=1,a.v=Ua(En(h)),a.m=p,a.P=!0,Tm(a,null)}function Tm(a,h){a.F=Date.now(),Va(a),a.A=En(a.v);var p=a.A,y=a.R;Array.isArray(y)||(y=[String(y)]),Lm(p.i,"t",y),a.C=0,p=a.j.J,a.h=new wm,a.g=eg(a.j,p?h:null,!a.m),0<a.O&&(a.M=new FI(m(a.Y,a,a.g),a.O)),h=a.U,p=a.g,y=a.ca;var N="readystatechange";Array.isArray(N)||(N&&(dm[0]=N.toString()),N=dm);for(var L=0;L<N.length;L++){var W=Cc(p,N[L],y||h.handleEvent,!1,h.h||h);if(!W)break;h.g[W.key]=W}h=a.H?_(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),Vs(),$I(a.i,a.u,a.A,a.l,a.R,a.m)}Wn.prototype.ca=function(a){a=a.target;const h=this.M;h&&Tn(a)==3?h.j():this.Y(a)},Wn.prototype.Y=function(a){try{if(a==this.g)e:{const nt=Tn(this.g);var h=this.g.Ba();const Ai=this.g.Z();if(!(3>nt)&&(nt!=3||this.g&&(this.h.h||this.g.oa()||zm(this.g)))){this.J||nt!=4||h==7||(h==8||0>=Ai?Vs(3):Vs(2)),jc(this);var p=this.g.Z();this.X=p;t:if(Im(this)){var y=zm(this.g);a="";var N=y.length,L=Tn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Lr(this),Us(this);var W="";break t}this.h.i=new u.TextDecoder}for(h=0;h<N;h++)this.h.h=!0,a+=this.h.i.decode(y[h],{stream:!(L&&h==N-1)});y.length=0,this.h.g+=a,this.C=0,W=this.h.g}else W=this.g.oa();if(this.o=p==200,zI(this.i,this.u,this.A,this.l,this.R,nt,p),this.o){if(this.T&&!this.K){t:{if(this.g){var pe,He=this.g;if((pe=He.g?He.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!w(pe)){var le=pe;break t}}le=null}if(p=le)Ii(this.i,this.l,p,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Fc(this,p);else{this.o=!1,this.s=3,ht(12),Lr(this),Us(this);break e}}if(this.P){p=!0;let Wt;for(;!this.J&&this.C<W.length;)if(Wt=HI(this,W),Wt==Lc){nt==4&&(this.s=4,ht(14),p=!1),Ii(this.i,this.l,null,"[Incomplete Response]");break}else if(Wt==Em){this.s=4,ht(15),Ii(this.i,this.l,W,"[Invalid Chunk]"),p=!1;break}else Ii(this.i,this.l,Wt,null),Fc(this,Wt);if(Im(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),nt!=4||W.length!=0||this.h.h||(this.s=1,ht(16),p=!1),this.o=this.o&&p,!p)Ii(this.i,this.l,W,"[Invalid Chunked Response]"),Lr(this),Us(this);else if(0<W.length&&!this.W){this.W=!0;var tt=this.j;tt.g==this&&tt.ba&&!tt.M&&(tt.j.info("Great, no buffering proxy detected. Bytes received: "+W.length),qc(tt),tt.M=!0,ht(11))}}else Ii(this.i,this.l,W,null),Fc(this,W);nt==4&&Lr(this),this.o&&!this.J&&(nt==4?Ym(this.j,this):(this.o=!1,Va(this)))}else u1(this.g),p==400&&0<W.indexOf("Unknown SID")?(this.s=3,ht(12)):(this.s=0,ht(13)),Lr(this),Us(this)}}}catch{}finally{}};function Im(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function HI(a,h){var p=a.C,y=h.indexOf(`
`,p);return y==-1?Lc:(p=Number(h.substring(p,y)),isNaN(p)?Em:(y+=1,y+p>h.length?Lc:(h=h.slice(y,y+p),a.C=y+p,h)))}Wn.prototype.cancel=function(){this.J=!0,Lr(this)};function Va(a){a.S=Date.now()+a.I,Sm(a,a.I)}function Sm(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=js(m(a.ba,a),h)}function jc(a){a.B&&(u.clearTimeout(a.B),a.B=null)}Wn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(WI(this.i,this.A),this.L!=2&&(Vs(),ht(17)),Lr(this),this.s=2,Us(this)):Sm(this,this.S-a)};function Us(a){a.j.G==0||a.J||Ym(a.j,a)}function Lr(a){jc(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,hm(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function Fc(a,h){try{var p=a.j;if(p.G!=0&&(p.g==a||Uc(p.h,a))){if(!a.K&&Uc(p.h,a)&&p.G==3){try{var y=p.Da.g.parse(h)}catch{y=null}if(Array.isArray(y)&&y.length==3){var N=y;if(N[0]==0){e:if(!p.u){if(p.g)if(p.g.F+3e3<a.F)Ha(p),Wa(p);else break e;Wc(p),ht(18)}}else p.za=N[1],0<p.za-p.T&&37500>N[2]&&p.F&&p.v==0&&!p.C&&(p.C=js(m(p.Za,p),6e3));if(1>=Cm(p.h)&&p.ca){try{p.ca()}catch{}p.ca=void 0}}else jr(p,11)}else if((a.K||p.g==a)&&Ha(p),!w(h))for(N=p.Da.g.parse(h),h=0;h<N.length;h++){let le=N[h];if(p.T=le[0],le=le[1],p.G==2)if(le[0]=="c"){p.K=le[1],p.ia=le[2];const tt=le[3];tt!=null&&(p.la=tt,p.j.info("VER="+p.la));const nt=le[4];nt!=null&&(p.Aa=nt,p.j.info("SVER="+p.Aa));const Ai=le[5];Ai!=null&&typeof Ai=="number"&&0<Ai&&(y=1.5*Ai,p.L=y,p.j.info("backChannelRequestTimeoutMs_="+y)),y=p;const Wt=a.g;if(Wt){const Ka=Wt.g?Wt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ka){var L=y.h;L.g||Ka.indexOf("spdy")==-1&&Ka.indexOf("quic")==-1&&Ka.indexOf("h2")==-1||(L.j=L.l,L.g=new Set,L.h&&(Bc(L,L.h),L.h=null))}if(y.D){const Hc=Wt.g?Wt.g.getResponseHeader("X-HTTP-Session-Id"):null;Hc&&(y.ya=Hc,ve(y.I,y.D,Hc))}}p.G=3,p.l&&p.l.ua(),p.ba&&(p.R=Date.now()-a.F,p.j.info("Handshake RTT: "+p.R+"ms")),y=p;var W=a;if(y.qa=Zm(y,y.J?y.ia:null,y.W),W.K){Pm(y.h,W);var pe=W,He=y.L;He&&(pe.I=He),pe.B&&(jc(pe),Va(pe)),y.g=W}else Km(y);0<p.i.length&&qa(p)}else le[0]!="stop"&&le[0]!="close"||jr(p,7);else p.G==3&&(le[0]=="stop"||le[0]=="close"?le[0]=="stop"?jr(p,7):zc(p):le[0]!="noop"&&p.l&&p.l.ta(le),p.v=0)}}Vs(4)}catch{}}var GI=class{constructor(a,h){this.g=a,this.map=h}};function xm(a){this.l=a||10,u.PerformanceNavigationTiming?(a=u.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Am(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Cm(a){return a.h?1:a.g?a.g.size:0}function Uc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Bc(a,h){a.g?a.g.add(h):a.h=h}function Pm(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}xm.prototype.cancel=function(){if(this.i=km(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function km(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const p of a.g.values())h=h.concat(p.D);return h}return P(a.i)}function KI(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var h=[],p=a.length,y=0;y<p;y++)h.push(a[y]);return h}h=[],p=0;for(y in a)h[p++]=a[y];return h}function QI(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var h=[];a=a.length;for(var p=0;p<a;p++)h.push(p);return h}h=[],p=0;for(const y in a)h[p++]=y;return h}}}function Rm(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var p=QI(a),y=KI(a),N=y.length,L=0;L<N;L++)h.call(void 0,y[L],p&&p[L],a)}var bm=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function YI(a,h){if(a){a=a.split("&");for(var p=0;p<a.length;p++){var y=a[p].indexOf("="),N=null;if(0<=y){var L=a[p].substring(0,y);N=a[p].substring(y+1)}else L=a[p];h(L,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function Vr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Vr){this.h=a.h,ja(this,a.j),this.o=a.o,this.g=a.g,Fa(this,a.s),this.l=a.l;var h=a.i,p=new zs;p.i=h.i,h.g&&(p.g=new Map(h.g),p.h=h.h),Nm(this,p),this.m=a.m}else a&&(h=String(a).match(bm))?(this.h=!1,ja(this,h[1]||"",!0),this.o=Bs(h[2]||""),this.g=Bs(h[3]||"",!0),Fa(this,h[4]),this.l=Bs(h[5]||"",!0),Nm(this,h[6]||"",!0),this.m=Bs(h[7]||"")):(this.h=!1,this.i=new zs(null,this.h))}Vr.prototype.toString=function(){var a=[],h=this.j;h&&a.push($s(h,Dm,!0),":");var p=this.g;return(p||h=="file")&&(a.push("//"),(h=this.o)&&a.push($s(h,Dm,!0),"@"),a.push(encodeURIComponent(String(p)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.s,p!=null&&a.push(":",String(p))),(p=this.l)&&(this.g&&p.charAt(0)!="/"&&a.push("/"),a.push($s(p,p.charAt(0)=="/"?ZI:JI,!0))),(p=this.i.toString())&&a.push("?",p),(p=this.m)&&a.push("#",$s(p,t1)),a.join("")};function En(a){return new Vr(a)}function ja(a,h,p){a.j=p?Bs(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Fa(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function Nm(a,h,p){h instanceof zs?(a.i=h,n1(a.i,a.h)):(p||(h=$s(h,e1)),a.i=new zs(h,a.h))}function ve(a,h,p){a.i.set(h,p)}function Ua(a){return ve(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Bs(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function $s(a,h,p){return typeof a=="string"?(a=encodeURI(a).replace(h,XI),p&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function XI(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Dm=/[#\/\?@]/g,JI=/[#\?:]/g,ZI=/[#\?]/g,e1=/[#\?@]/g,t1=/#/g;function zs(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function qn(a){a.g||(a.g=new Map,a.h=0,a.i&&YI(a.i,function(h,p){a.add(decodeURIComponent(h.replace(/\+/g," ")),p)}))}t=zs.prototype,t.add=function(a,h){qn(this),this.i=null,a=Si(this,a);var p=this.g.get(a);return p||this.g.set(a,p=[]),p.push(h),this.h+=1,this};function Om(a,h){qn(a),h=Si(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function Mm(a,h){return qn(a),h=Si(a,h),a.g.has(h)}t.forEach=function(a,h){qn(this),this.g.forEach(function(p,y){p.forEach(function(N){a.call(h,N,y,this)},this)},this)},t.na=function(){qn(this);const a=Array.from(this.g.values()),h=Array.from(this.g.keys()),p=[];for(let y=0;y<h.length;y++){const N=a[y];for(let L=0;L<N.length;L++)p.push(h[y])}return p},t.V=function(a){qn(this);let h=[];if(typeof a=="string")Mm(this,a)&&(h=h.concat(this.g.get(Si(this,a))));else{a=Array.from(this.g.values());for(let p=0;p<a.length;p++)h=h.concat(a[p])}return h},t.set=function(a,h){return qn(this),this.i=null,a=Si(this,a),Mm(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},t.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function Lm(a,h,p){Om(a,h),0<p.length&&(a.i=null,a.g.set(Si(a,h),P(p)),a.h+=p.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(var p=0;p<h.length;p++){var y=h[p];const L=encodeURIComponent(String(y)),W=this.V(y);for(y=0;y<W.length;y++){var N=L;W[y]!==""&&(N+="="+encodeURIComponent(String(W[y]))),a.push(N)}}return this.i=a.join("&")};function Si(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function n1(a,h){h&&!a.j&&(qn(a),a.i=null,a.g.forEach(function(p,y){var N=y.toLowerCase();y!=N&&(Om(this,y),Lm(this,N,p))},a)),a.j=h}function r1(a,h){const p=new Fs;if(u.Image){const y=new Image;y.onload=v(Hn,p,"TestLoadImage: loaded",!0,h,y),y.onerror=v(Hn,p,"TestLoadImage: error",!1,h,y),y.onabort=v(Hn,p,"TestLoadImage: abort",!1,h,y),y.ontimeout=v(Hn,p,"TestLoadImage: timeout",!1,h,y),u.setTimeout(function(){y.ontimeout&&y.ontimeout()},1e4),y.src=a}else h(!1)}function i1(a,h){const p=new Fs,y=new AbortController,N=setTimeout(()=>{y.abort(),Hn(p,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:y.signal}).then(L=>{clearTimeout(N),L.ok?Hn(p,"TestPingServer: ok",!0,h):Hn(p,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(N),Hn(p,"TestPingServer: error",!1,h)})}function Hn(a,h,p,y,N){try{N&&(N.onload=null,N.onerror=null,N.onabort=null,N.ontimeout=null),y(p)}catch{}}function s1(){this.g=new BI}function o1(a,h,p){const y=p||"";try{Rm(a,function(N,L){let W=N;c(N)&&(W=bc(N)),h.push(y+L+"="+encodeURIComponent(W))})}catch(N){throw h.push(y+"type="+encodeURIComponent("_badmap")),N}}function Ba(a){this.l=a.Ub||null,this.j=a.eb||!1}x(Ba,Nc),Ba.prototype.g=function(){return new $a(this.l,this.j)},Ba.prototype.i=function(a){return function(){return a}}({});function $a(a,h){et.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}x($a,et),t=$a.prototype,t.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,qs(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||u).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ws(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,qs(this)),this.g&&(this.readyState=3,qs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Vm(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Vm(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Ws(this):qs(this),this.readyState==3&&Vm(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,Ws(this))},t.Qa=function(a){this.g&&(this.response=a,Ws(this))},t.ga=function(){this.g&&Ws(this)};function Ws(a){a.readyState=4,a.l=null,a.j=null,a.v=null,qs(a)}t.setRequestHeader=function(a,h){this.u.append(a,h)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var p=h.next();!p.done;)p=p.value,a.push(p[0]+": "+p[1]),p=h.next();return a.join(`\r
`)};function qs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty($a.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function jm(a){let h="";return z(a,function(p,y){h+=y,h+=":",h+=p,h+=`\r
`}),h}function $c(a,h,p){e:{for(y in p){var y=!1;break e}y=!0}y||(p=jm(p),typeof a=="string"?p!=null&&encodeURIComponent(String(p)):ve(a,h,p))}function Ce(a){et.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}x(Ce,et);var a1=/^https?$/i,l1=["POST","PUT"];t=Ce.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,h,p,y){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Mc.g(),this.v=this.o?fm(this.o):fm(Mc),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(L){Fm(this,L);return}if(a=p||"",p=new Map(this.headers),y)if(Object.getPrototypeOf(y)===Object.prototype)for(var N in y)p.set(N,y[N]);else if(typeof y.keys=="function"&&typeof y.get=="function")for(const L of y.keys())p.set(L,y.get(L));else throw Error("Unknown input type for opt_headers: "+String(y));y=Array.from(p.keys()).find(L=>L.toLowerCase()=="content-type"),N=u.FormData&&a instanceof u.FormData,!(0<=Array.prototype.indexOf.call(l1,h,void 0))||y||N||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[L,W]of p)this.g.setRequestHeader(L,W);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{$m(this),this.u=!0,this.g.send(a),this.u=!1}catch(L){Fm(this,L)}};function Fm(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,Um(a),za(a)}function Um(a){a.A||(a.A=!0,dt(a,"complete"),dt(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,dt(this,"complete"),dt(this,"abort"),za(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),za(this,!0)),Ce.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Bm(this):this.bb())},t.bb=function(){Bm(this)};function Bm(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Tn(a)!=4||a.Z()!=2)){if(a.u&&Tn(a)==4)um(a.Ea,0,a);else if(dt(a,"readystatechange"),Tn(a)==4){a.h=!1;try{const W=a.Z();e:switch(W){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var p;if(!(p=h)){var y;if(y=W===0){var N=String(a.D).match(bm)[1]||null;!N&&u.self&&u.self.location&&(N=u.self.location.protocol.slice(0,-1)),y=!a1.test(N?N.toLowerCase():"")}p=y}if(p)dt(a,"complete"),dt(a,"success");else{a.m=6;try{var L=2<Tn(a)?a.g.statusText:""}catch{L=""}a.l=L+" ["+a.Z()+"]",Um(a)}}finally{za(a)}}}}function za(a,h){if(a.g){$m(a);const p=a.g,y=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||dt(a,"ready");try{p.onreadystatechange=y}catch{}}}function $m(a){a.I&&(u.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function Tn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<Tn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),UI(h)}};function zm(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function u1(a){const h={};a=(a.g&&2<=Tn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let y=0;y<a.length;y++){if(w(a[y]))continue;var p=R(a[y]);const N=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const L=h[N]||[];h[N]=L,L.push(p)}S(h,function(y){return y.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Hs(a,h,p){return p&&p.internalChannelParams&&p.internalChannelParams[a]||h}function Wm(a){this.Aa=0,this.i=[],this.j=new Fs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Hs("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Hs("baseRetryDelayMs",5e3,a),this.cb=Hs("retryDelaySeedMs",1e4,a),this.Wa=Hs("forwardChannelMaxRetries",2,a),this.wa=Hs("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new xm(a&&a.concurrentRequestLimit),this.Da=new s1,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Wm.prototype,t.la=8,t.G=1,t.connect=function(a,h,p,y){ht(0),this.W=a,this.H=h||{},p&&y!==void 0&&(this.H.OSID=p,this.H.OAID=y),this.F=this.X,this.I=Zm(this,null,this.W),qa(this)};function zc(a){if(qm(a),a.G==3){var h=a.U++,p=En(a.I);if(ve(p,"SID",a.K),ve(p,"RID",h),ve(p,"TYPE","terminate"),Gs(a,p),h=new Wn(a,a.j,h),h.L=2,h.v=Ua(En(p)),p=!1,u.navigator&&u.navigator.sendBeacon)try{p=u.navigator.sendBeacon(h.v.toString(),"")}catch{}!p&&u.Image&&(new Image().src=h.v,p=!0),p||(h.g=eg(h.j,null),h.g.ea(h.v)),h.F=Date.now(),Va(h)}Jm(a)}function Wa(a){a.g&&(qc(a),a.g.cancel(),a.g=null)}function qm(a){Wa(a),a.u&&(u.clearTimeout(a.u),a.u=null),Ha(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&u.clearTimeout(a.s),a.s=null)}function qa(a){if(!Am(a.h)&&!a.s){a.s=!0;var h=a.Ga;q||B(),V||(q(),V=!0),D.add(h,a),a.B=0}}function c1(a,h){return Cm(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=js(m(a.Ga,a,h),Xm(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const N=new Wn(this,this.j,a);let L=this.o;if(this.S&&(L?(L=_(L),A(L,this.S)):L=this.S),this.m!==null||this.O||(N.H=L,L=null),this.P)e:{for(var h=0,p=0;p<this.i.length;p++){t:{var y=this.i[p];if("__data__"in y.map&&(y=y.map.__data__,typeof y=="string")){y=y.length;break t}y=void 0}if(y===void 0)break;if(h+=y,4096<h){h=p;break e}if(h===4096||p===this.i.length-1){h=p+1;break e}}h=1e3}else h=1e3;h=Gm(this,N,h),p=En(this.I),ve(p,"RID",a),ve(p,"CVER",22),this.D&&ve(p,"X-HTTP-Session-Id",this.D),Gs(this,p),L&&(this.O?h="headers="+encodeURIComponent(String(jm(L)))+"&"+h:this.m&&$c(p,this.m,L)),Bc(this.h,N),this.Ua&&ve(p,"TYPE","init"),this.P?(ve(p,"$req",h),ve(p,"SID","null"),N.T=!0,Vc(N,p,null)):Vc(N,p,h),this.G=2}}else this.G==3&&(a?Hm(this,a):this.i.length==0||Am(this.h)||Hm(this))};function Hm(a,h){var p;h?p=h.l:p=a.U++;const y=En(a.I);ve(y,"SID",a.K),ve(y,"RID",p),ve(y,"AID",a.T),Gs(a,y),a.m&&a.o&&$c(y,a.m,a.o),p=new Wn(a,a.j,p,a.B+1),a.m===null&&(p.H=a.o),h&&(a.i=h.D.concat(a.i)),h=Gm(a,p,1e3),p.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Bc(a.h,p),Vc(p,y,h)}function Gs(a,h){a.H&&z(a.H,function(p,y){ve(h,y,p)}),a.l&&Rm({},function(p,y){ve(h,y,p)})}function Gm(a,h,p){p=Math.min(a.i.length,p);var y=a.l?m(a.l.Na,a.l,a):null;e:{var N=a.i;let L=-1;for(;;){const W=["count="+p];L==-1?0<p?(L=N[0].g,W.push("ofs="+L)):L=0:W.push("ofs="+L);let pe=!0;for(let He=0;He<p;He++){let le=N[He].g;const tt=N[He].map;if(le-=L,0>le)L=Math.max(0,N[He].g-100),pe=!1;else try{o1(tt,W,"req"+le+"_")}catch{y&&y(tt)}}if(pe){y=W.join("&");break e}}}return a=a.i.splice(0,p),h.D=a,y}function Km(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;q||B(),V||(q(),V=!0),D.add(h,a),a.v=0}}function Wc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=js(m(a.Fa,a),Xm(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,Qm(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=js(m(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ht(10),Wa(this),Qm(this))};function qc(a){a.A!=null&&(u.clearTimeout(a.A),a.A=null)}function Qm(a){a.g=new Wn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=En(a.qa);ve(h,"RID","rpc"),ve(h,"SID",a.K),ve(h,"AID",a.T),ve(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&ve(h,"TO",a.ja),ve(h,"TYPE","xmlhttp"),Gs(a,h),a.m&&a.o&&$c(h,a.m,a.o),a.L&&(a.g.I=a.L);var p=a.g;a=a.ia,p.L=1,p.v=Ua(En(h)),p.m=null,p.P=!0,Tm(p,a)}t.Za=function(){this.C!=null&&(this.C=null,Wa(this),Wc(this),ht(19))};function Ha(a){a.C!=null&&(u.clearTimeout(a.C),a.C=null)}function Ym(a,h){var p=null;if(a.g==h){Ha(a),qc(a),a.g=null;var y=2}else if(Uc(a.h,h))p=h.D,Pm(a.h,h),y=1;else return;if(a.G!=0){if(h.o)if(y==1){p=h.m?h.m.length:0,h=Date.now()-h.F;var N=a.B;y=Oa(),dt(y,new vm(y,p)),qa(a)}else Km(a);else if(N=h.s,N==3||N==0&&0<h.X||!(y==1&&c1(a,h)||y==2&&Wc(a)))switch(p&&0<p.length&&(h=a.h,h.i=h.i.concat(p)),N){case 1:jr(a,5);break;case 4:jr(a,10);break;case 3:jr(a,6);break;default:jr(a,2)}}}function Xm(a,h){let p=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(p*=2),p*h}function jr(a,h){if(a.j.info("Error code "+h),h==2){var p=m(a.fb,a),y=a.Xa;const N=!y;y=new Vr(y||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||ja(y,"https"),Ua(y),N?r1(y.toString(),p):i1(y.toString(),p)}else ht(2);a.G=0,a.l&&a.l.sa(h),Jm(a),qm(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),ht(2)):(this.j.info("Failed to ping google.com"),ht(1))};function Jm(a){if(a.G=0,a.ka=[],a.l){const h=km(a.h);(h.length!=0||a.i.length!=0)&&(k(a.ka,h),k(a.ka,a.i),a.h.i.length=0,P(a.i),a.i.length=0),a.l.ra()}}function Zm(a,h,p){var y=p instanceof Vr?En(p):new Vr(p);if(y.g!="")h&&(y.g=h+"."+y.g),Fa(y,y.s);else{var N=u.location;y=N.protocol,h=h?h+"."+N.hostname:N.hostname,N=+N.port;var L=new Vr(null);y&&ja(L,y),h&&(L.g=h),N&&Fa(L,N),p&&(L.l=p),y=L}return p=a.D,h=a.ya,p&&h&&ve(y,p,h),ve(y,"VER",a.la),Gs(a,y),y}function eg(a,h,p){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new Ce(new Ba({eb:p})):new Ce(a.pa),h.Ha(a.J),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function tg(){}t=tg.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Ga(){}Ga.prototype.g=function(a,h){return new At(a,h)};function At(a,h){et.call(this),this.g=new Wm(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!w(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!w(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new xi(this)}x(At,et),At.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},At.prototype.close=function(){zc(this.g)},At.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var p={};p.__data__=a,a=p}else this.u&&(p={},p.__data__=bc(a),a=p);h.i.push(new GI(h.Ya++,a)),h.G==3&&qa(h)},At.prototype.N=function(){this.g.l=null,delete this.j,zc(this.g),delete this.g,At.aa.N.call(this)};function ng(a){Dc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const p in h){a=p;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}x(ng,Dc);function rg(){Oc.call(this),this.status=1}x(rg,Oc);function xi(a){this.g=a}x(xi,tg),xi.prototype.ua=function(){dt(this.g,"a")},xi.prototype.ta=function(a){dt(this.g,new ng(a))},xi.prototype.sa=function(a){dt(this.g,new rg)},xi.prototype.ra=function(){dt(this.g,"b")},Ga.prototype.createWebChannel=Ga.prototype.g,At.prototype.send=At.prototype.o,At.prototype.open=At.prototype.m,At.prototype.close=At.prototype.close,LE=function(){return new Ga},ME=function(){return Oa()},OE=Mr,Bh={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ma.NO_ERROR=0,Ma.TIMEOUT=8,Ma.HTTP_ERROR=6,Ll=Ma,_m.COMPLETE="complete",DE=_m,pm.EventType=Ls,Ls.OPEN="a",Ls.CLOSE="b",Ls.ERROR="c",Ls.MESSAGE="d",et.prototype.listen=et.prototype.K,uo=pm,Ce.prototype.listenOnce=Ce.prototype.L,Ce.prototype.getLastError=Ce.prototype.Ka,Ce.prototype.getLastErrorCode=Ce.prototype.Ba,Ce.prototype.getStatus=Ce.prototype.Z,Ce.prototype.getResponseJson=Ce.prototype.Oa,Ce.prototype.getResponseText=Ce.prototype.oa,Ce.prototype.send=Ce.prototype.ea,Ce.prototype.setWithCredentials=Ce.prototype.Ha,NE=Ce}).apply(typeof pl<"u"?pl:typeof self<"u"?self:typeof window<"u"?window:{});const tv="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ot=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};ot.UNAUTHENTICATED=new ot(null),ot.GOOGLE_CREDENTIALS=new ot("google-credentials-uid"),ot.FIRST_PARTY=new ot("first-party-uid"),ot.MOCK_USER=new ot("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cs="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const si=new nc("@firebase/firestore");function no(){return si.logLevel}function K(t,...e){if(si.logLevel<=se.DEBUG){const n=e.map(yp);si.debug(`Firestore (${Cs}): ${t}`,...n)}}function Bn(t,...e){if(si.logLevel<=se.ERROR){const n=e.map(yp);si.error(`Firestore (${Cs}): ${t}`,...n)}}function hs(t,...e){if(si.logLevel<=se.WARN){const n=e.map(yp);si.warn(`Firestore (${Cs}): ${t}`,...n)}}function yp(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(t="Unexpected state"){const e=`FIRESTORE (${Cs}) INTERNAL ASSERTION FAILED: `+t;throw Bn(e),new Error(e)}function he(t,e){t||ee()}function ne(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class H extends nn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VE{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class y2{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ot.UNAUTHENTICATED))}shutdown(){}}class v2{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class _2{constructor(e){this.t=e,this.currentUser=ot.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){he(this.o===void 0);let r=this.i;const i=l=>this.i!==r?(r=this.i,n(l)):Promise.resolve();let s=new Dn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Dn,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},u=l=>{K("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>u(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?u(l):(K("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Dn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(K("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(he(typeof r.accessToken=="string"),new VE(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return he(e===null||typeof e=="string"),new ot(e)}}class w2{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=ot.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class E2{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new w2(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(ot.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class T2{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class I2{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){he(this.o===void 0);const r=s=>{s.error!=null&&K("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,K("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{K("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):K("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(he(typeof n.token=="string"),this.R=n.token,new T2(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S2(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jE{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=S2(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%e.length))}return r}}function ue(t,e){return t<e?-1:t>e?1:0}function fs(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new H(j.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new H(j.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new H(j.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new H(j.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ge.fromMillis(Date.now())}static fromDate(e){return ge.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new ge(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ue(this.nanoseconds,e.nanoseconds):ue(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e){this.timestamp=e}static fromTimestamp(e){return new te(e)}static min(){return new te(new ge(0,0))}static max(){return new te(new ge(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(e,n,r){n===void 0?n=0:n>e.length&&ee(),r===void 0?r=e.length-n:r>e.length-n&&ee(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Zo.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Zo?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=e.get(i),o=n.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class we extends Zo{construct(e,n,r){return new we(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new H(j.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new we(n)}static emptyPath(){return new we([])}}const x2=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Qe extends Zo{construct(e,n,r){return new Qe(e,n,r)}static isValidIdentifier(e){return x2.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Qe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Qe(["__name__"])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new H(j.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;i<e.length;){const u=e[i];if(u==="\\"){if(i+1===e.length)throw new H(j.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new H(j.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else u==="`"?(o=!o,i++):u!=="."||o?(r+=u,i++):(s(),i++)}if(s(),o)throw new H(j.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Qe(n)}static emptyPath(){return new Qe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(e){this.path=e}static fromPath(e){return new Q(we.fromString(e))}static fromName(e){return new Q(we.fromString(e).popFirst(5))}static empty(){return new Q(we.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&we.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return we.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Q(new we(e.slice()))}}function A2(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=te.fromTimestamp(r===1e9?new ge(n+1,0):new ge(n,r));return new Ir(i,Q.empty(),e)}function C2(t){return new Ir(t.readTime,t.key,-1)}class Ir{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Ir(te.min(),Q.empty(),-1)}static max(){return new Ir(te.max(),Q.empty(),-1)}}function P2(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=Q.comparator(t.documentKey,e.documentKey),n!==0?n:ue(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k2="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class R2{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ta(t){if(t.code!==j.FAILED_PRECONDITION||t.message!==k2)throw t;K("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&ee(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new F((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof F?n:F.resolve(n)}catch(n){return F.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):F.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):F.reject(n)}static resolve(e){return new F((n,r)=>{n(e)})}static reject(e){return new F((n,r)=>{r(e)})}static waitFor(e){return new F((n,r)=>{let i=0,s=0,o=!1;e.forEach(u=>{++i,u.next(()=>{++s,o&&s===i&&n()},l=>r(l))}),o=!0,s===i&&n()})}static or(e){let n=F.resolve(!1);for(const r of e)n=n.next(i=>i?F.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new F((r,i)=>{const s=e.length,o=new Array(s);let u=0;for(let l=0;l<s;l++){const c=l;n(e[c]).next(d=>{o[c]=d,++u,u===s&&r(o)},d=>i(d))}})}static doWhile(e,n){return new F((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}function b2(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Ia(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}vp.oe=-1;function ac(t){return t==null}function _u(t){return t===0&&1/t==-1/0}function N2(t){return typeof t=="number"&&Number.isInteger(t)&&!_u(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nv(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function gi(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function FE(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e,n){this.comparator=e,this.root=n||Ke.EMPTY}insert(e,n){return new Ae(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Ke.BLACK,null,null))}remove(e){return new Ae(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ke.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ml(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ml(this.root,e,this.comparator,!1)}getReverseIterator(){return new ml(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ml(this.root,e,this.comparator,!0)}}class ml{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ke{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??Ke.RED,this.left=i??Ke.EMPTY,this.right=s??Ke.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new Ke(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Ke.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return Ke.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ke.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ke.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw ee();const e=this.left.check();if(e!==this.right.check())throw ee();return e+(this.isRed()?0:1)}}Ke.EMPTY=null,Ke.RED=!0,Ke.BLACK=!1;Ke.EMPTY=new class{constructor(){this.size=0}get key(){throw ee()}get value(){throw ee()}get color(){throw ee()}get left(){throw ee()}get right(){throw ee()}copy(e,n,r,i,s){return this}insert(e,n,r){return new Ke(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e){this.comparator=e,this.data=new Ae(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new rv(this.data.getIterator())}getIteratorFrom(e){return new rv(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof Xe)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Xe(this.comparator);return n.data=e,n}}class rv{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(e){this.fields=e,e.sort(Qe.comparator)}static empty(){return new kt([])}unionWith(e){let n=new Xe(Qe.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new kt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return fs(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UE extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new UE("Invalid base64 string: "+s):s}}(e);return new Ze(n)}static fromUint8Array(e){const n=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Ze(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ue(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ze.EMPTY_BYTE_STRING=new Ze("");const D2=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Sr(t){if(he(!!t),typeof t=="string"){let e=0;const n=D2.exec(t);if(he(!!n),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ke(t.seconds),nanos:ke(t.nanos)}}function ke(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function oi(t){return typeof t=="string"?Ze.fromBase64String(t):Ze.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _p(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function wp(t){const e=t.mapValue.fields.__previous_value__;return _p(e)?wp(e):e}function ea(t){const e=Sr(t.mapValue.fields.__local_write_time__.timestampValue);return new ge(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O2{constructor(e,n,r,i,s,o,u,l,c){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=u,this.longPollingOptions=l,this.useFetchStreams=c}}class ta{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new ta("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof ta&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gl={mapValue:{}};function ai(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?_p(t)?4:L2(t)?9007199254740991:M2(t)?10:11:ee()}function vn(t,e){if(t===e)return!0;const n=ai(t);if(n!==ai(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return ea(t).isEqual(ea(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Sr(i.timestampValue),u=Sr(s.timestampValue);return o.seconds===u.seconds&&o.nanos===u.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return oi(i.bytesValue).isEqual(oi(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return ke(i.geoPointValue.latitude)===ke(s.geoPointValue.latitude)&&ke(i.geoPointValue.longitude)===ke(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return ke(i.integerValue)===ke(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=ke(i.doubleValue),u=ke(s.doubleValue);return o===u?_u(o)===_u(u):isNaN(o)&&isNaN(u)}return!1}(t,e);case 9:return fs(t.arrayValue.values||[],e.arrayValue.values||[],vn);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},u=s.mapValue.fields||{};if(nv(o)!==nv(u))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(u[l]===void 0||!vn(o[l],u[l])))return!1;return!0}(t,e);default:return ee()}}function na(t,e){return(t.values||[]).find(n=>vn(n,e))!==void 0}function ps(t,e){if(t===e)return 0;const n=ai(t),r=ai(e);if(n!==r)return ue(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ue(t.booleanValue,e.booleanValue);case 2:return function(s,o){const u=ke(s.integerValue||s.doubleValue),l=ke(o.integerValue||o.doubleValue);return u<l?-1:u>l?1:u===l?0:isNaN(u)?isNaN(l)?0:-1:1}(t,e);case 3:return iv(t.timestampValue,e.timestampValue);case 4:return iv(ea(t),ea(e));case 5:return ue(t.stringValue,e.stringValue);case 6:return function(s,o){const u=oi(s),l=oi(o);return u.compareTo(l)}(t.bytesValue,e.bytesValue);case 7:return function(s,o){const u=s.split("/"),l=o.split("/");for(let c=0;c<u.length&&c<l.length;c++){const d=ue(u[c],l[c]);if(d!==0)return d}return ue(u.length,l.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,o){const u=ue(ke(s.latitude),ke(o.latitude));return u!==0?u:ue(ke(s.longitude),ke(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return sv(t.arrayValue,e.arrayValue);case 10:return function(s,o){var u,l,c,d;const f=s.fields||{},m=o.fields||{},v=(u=f.value)===null||u===void 0?void 0:u.arrayValue,x=(l=m.value)===null||l===void 0?void 0:l.arrayValue,P=ue(((c=v==null?void 0:v.values)===null||c===void 0?void 0:c.length)||0,((d=x==null?void 0:x.values)===null||d===void 0?void 0:d.length)||0);return P!==0?P:sv(v,x)}(t.mapValue,e.mapValue);case 11:return function(s,o){if(s===gl.mapValue&&o===gl.mapValue)return 0;if(s===gl.mapValue)return 1;if(o===gl.mapValue)return-1;const u=s.fields||{},l=Object.keys(u),c=o.fields||{},d=Object.keys(c);l.sort(),d.sort();for(let f=0;f<l.length&&f<d.length;++f){const m=ue(l[f],d[f]);if(m!==0)return m;const v=ps(u[l[f]],c[d[f]]);if(v!==0)return v}return ue(l.length,d.length)}(t.mapValue,e.mapValue);default:throw ee()}}function iv(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ue(t,e);const n=Sr(t),r=Sr(e),i=ue(n.seconds,r.seconds);return i!==0?i:ue(n.nanos,r.nanos)}function sv(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=ps(n[i],r[i]);if(s)return s}return ue(n.length,r.length)}function ms(t){return $h(t)}function $h(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Sr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return oi(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return Q.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=$h(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${$h(n.fields[o])}`;return i+"}"}(t.mapValue):ee()}function ov(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function zh(t){return!!t&&"integerValue"in t}function Ep(t){return!!t&&"arrayValue"in t}function av(t){return!!t&&"nullValue"in t}function lv(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Vl(t){return!!t&&"mapValue"in t}function M2(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function xo(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return gi(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=xo(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=xo(t.arrayValue.values[n]);return e}return Object.assign({},t)}function L2(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e){this.value=e}static empty(){return new wt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Vl(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=xo(n)}setAll(e){let n=Qe.emptyPath(),r={},i=[];e.forEach((o,u)=>{if(!n.isImmediateParentOf(u)){const l=this.getFieldsMap(n);this.applyChanges(l,r,i),r={},i=[],n=u.popLast()}o?r[u.lastSegment()]=xo(o):i.push(u.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());Vl(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return vn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];Vl(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){gi(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new wt(xo(this.value))}}function BE(t){const e=[];return gi(t.fields,(n,r)=>{const i=new Qe([n]);if(Vl(r)){const s=BE(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new kt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e,n,r,i,s,o,u){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=u}static newInvalidDocument(e){return new lt(e,0,te.min(),te.min(),te.min(),wt.empty(),0)}static newFoundDocument(e,n,r,i){return new lt(e,1,n,te.min(),r,i,0)}static newNoDocument(e,n){return new lt(e,2,n,te.min(),te.min(),wt.empty(),0)}static newUnknownDocument(e,n){return new lt(e,3,n,te.min(),te.min(),wt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(te.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=wt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=wt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=te.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof lt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new lt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(e,n){this.position=e,this.inclusive=n}}function uv(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(s.field.isKeyField()?r=Q.comparator(Q.fromName(o.referenceValue),n.key):r=ps(o,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function cv(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!vn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(e,n="asc"){this.field=e,this.dir=n}}function V2(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $E=class{};class Oe extends $E{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new F2(e,n,r):n==="array-contains"?new $2(e,r):n==="in"?new z2(e,r):n==="not-in"?new W2(e,r):n==="array-contains-any"?new q2(e,r):new Oe(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new U2(e,r):new B2(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(ps(n,this.value)):n!==null&&ai(this.value)===ai(n)&&this.matchesComparison(ps(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ee()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class tn extends $E{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new tn(e,n)}matches(e){return zE(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function zE(t){return t.op==="and"}function WE(t){return j2(t)&&zE(t)}function j2(t){for(const e of t.filters)if(e instanceof tn)return!1;return!0}function Wh(t){if(t instanceof Oe)return t.field.canonicalString()+t.op.toString()+ms(t.value);if(WE(t))return t.filters.map(e=>Wh(e)).join(",");{const e=t.filters.map(n=>Wh(n)).join(",");return`${t.op}(${e})`}}function qE(t,e){return t instanceof Oe?function(r,i){return i instanceof Oe&&r.op===i.op&&r.field.isEqual(i.field)&&vn(r.value,i.value)}(t,e):t instanceof tn?function(r,i){return i instanceof tn&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,u)=>s&&qE(o,i.filters[u]),!0):!1}(t,e):void ee()}function HE(t){return t instanceof Oe?function(n){return`${n.field.canonicalString()} ${n.op} ${ms(n.value)}`}(t):t instanceof tn?function(n){return n.op.toString()+" {"+n.getFilters().map(HE).join(" ,")+"}"}(t):"Filter"}class F2 extends Oe{constructor(e,n,r){super(e,n,r),this.key=Q.fromName(r.referenceValue)}matches(e){const n=Q.comparator(e.key,this.key);return this.matchesComparison(n)}}class U2 extends Oe{constructor(e,n){super(e,"in",n),this.keys=GE("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class B2 extends Oe{constructor(e,n){super(e,"not-in",n),this.keys=GE("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function GE(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>Q.fromName(r.referenceValue))}class $2 extends Oe{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Ep(n)&&na(n.arrayValue,this.value)}}class z2 extends Oe{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&na(this.value.arrayValue,n)}}class W2 extends Oe{constructor(e,n){super(e,"not-in",n)}matches(e){if(na(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!na(this.value.arrayValue,n)}}class q2 extends Oe{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Ep(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>na(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H2{constructor(e,n=null,r=[],i=[],s=null,o=null,u=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=u,this.ue=null}}function dv(t,e=null,n=[],r=[],i=null,s=null,o=null){return new H2(t,e,n,r,i,s,o)}function Tp(t){const e=ne(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Wh(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),ac(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>ms(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>ms(r)).join(",")),e.ue=n}return e.ue}function Ip(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!V2(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!qE(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!cv(t.startAt,e.startAt)&&cv(t.endAt,e.endAt)}function qh(t){return Q.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e,n=null,r=[],i=[],s=null,o="F",u=null,l=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=u,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function G2(t,e,n,r,i,s,o,u){return new Ps(t,e,n,r,i,s,o,u)}function Sp(t){return new Ps(t)}function hv(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function KE(t){return t.collectionGroup!==null}function Ao(t){const e=ne(t);if(e.ce===null){e.ce=[];const n=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let u=new Xe(Qe.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(c=>{c.isInequality()&&(u=u.add(c.field))})}),u})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.ce.push(new ra(s,r))}),n.has(Qe.keyField().canonicalString())||e.ce.push(new ra(Qe.keyField(),r))}return e.ce}function mn(t){const e=ne(t);return e.le||(e.le=K2(e,Ao(t))),e.le}function K2(t,e){if(t.limitType==="F")return dv(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new ra(i.field,s)});const n=t.endAt?new wu(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new wu(t.startAt.position,t.startAt.inclusive):null;return dv(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Hh(t,e){const n=t.filters.concat([e]);return new Ps(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Gh(t,e,n){return new Ps(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function lc(t,e){return Ip(mn(t),mn(e))&&t.limitType===e.limitType}function QE(t){return`${Tp(mn(t))}|lt:${t.limitType}`}function ki(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>HE(i)).join(", ")}]`),ac(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>ms(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>ms(i)).join(",")),`Target(${r})`}(mn(t))}; limitType=${t.limitType})`}function uc(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):Q.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of Ao(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(o,u,l){const c=uv(o,u,l);return o.inclusive?c<=0:c<0}(r.startAt,Ao(r),i)||r.endAt&&!function(o,u,l){const c=uv(o,u,l);return o.inclusive?c>=0:c>0}(r.endAt,Ao(r),i))}(t,e)}function Q2(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function YE(t){return(e,n)=>{let r=!1;for(const i of Ao(t)){const s=Y2(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function Y2(t,e,n){const r=t.field.isKeyField()?Q.comparator(e.key,n.key):function(s,o,u){const l=o.data.field(s),c=u.data.field(s);return l!==null&&c!==null?ps(l,c):ee()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return ee()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){gi(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return FE(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X2=new Ae(Q.comparator);function $n(){return X2}const XE=new Ae(Q.comparator);function co(...t){let e=XE;for(const n of t)e=e.insert(n.key,n);return e}function JE(t){let e=XE;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Gr(){return Co()}function ZE(){return Co()}function Co(){return new ks(t=>t.toString(),(t,e)=>t.isEqual(e))}const J2=new Ae(Q.comparator),Z2=new Xe(Q.comparator);function ie(...t){let e=Z2;for(const n of t)e=e.add(n);return e}const eb=new Xe(ue);function tb(){return eb}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xp(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:_u(e)?"-0":e}}function eT(t){return{integerValue:""+t}}function nb(t,e){return N2(e)?eT(e):xp(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{constructor(){this._=void 0}}function rb(t,e,n){return t instanceof Eu?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&_p(s)&&(s=wp(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(n,e):t instanceof ia?nT(t,e):t instanceof sa?rT(t,e):function(i,s){const o=tT(i,s),u=fv(o)+fv(i.Pe);return zh(o)&&zh(i.Pe)?eT(u):xp(i.serializer,u)}(t,e)}function ib(t,e,n){return t instanceof ia?nT(t,e):t instanceof sa?rT(t,e):n}function tT(t,e){return t instanceof Tu?function(r){return zh(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Eu extends cc{}class ia extends cc{constructor(e){super(),this.elements=e}}function nT(t,e){const n=iT(e);for(const r of t.elements)n.some(i=>vn(i,r))||n.push(r);return{arrayValue:{values:n}}}class sa extends cc{constructor(e){super(),this.elements=e}}function rT(t,e){let n=iT(e);for(const r of t.elements)n=n.filter(i=>!vn(i,r));return{arrayValue:{values:n}}}class Tu extends cc{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function fv(t){return ke(t.integerValue||t.doubleValue)}function iT(t){return Ep(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function sb(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof ia&&i instanceof ia||r instanceof sa&&i instanceof sa?fs(r.elements,i.elements,vn):r instanceof Tu&&i instanceof Tu?vn(r.Pe,i.Pe):r instanceof Eu&&i instanceof Eu}(t.transform,e.transform)}class ob{constructor(e,n){this.version=e,this.transformResults=n}}class Xt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Xt}static exists(e){return new Xt(void 0,e)}static updateTime(e){return new Xt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function jl(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class dc{}function sT(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new aT(t.key,Xt.none()):new Sa(t.key,t.data,Xt.none());{const n=t.data,r=wt.empty();let i=new Xe(Qe.comparator);for(let s of e.fields)if(!i.has(s)){let o=n.field(s);o===null&&s.length>1&&(s=s.popLast(),o=n.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Dr(t.key,r,new kt(i.toArray()),Xt.none())}}function ab(t,e,n){t instanceof Sa?function(i,s,o){const u=i.value.clone(),l=mv(i.fieldTransforms,s,o.transformResults);u.setAll(l),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):t instanceof Dr?function(i,s,o){if(!jl(i.precondition,s))return void s.convertToUnknownDocument(o.version);const u=mv(i.fieldTransforms,s,o.transformResults),l=s.data;l.setAll(oT(i)),l.setAll(u),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Po(t,e,n,r){return t instanceof Sa?function(s,o,u,l){if(!jl(s.precondition,o))return u;const c=s.value.clone(),d=gv(s.fieldTransforms,l,o);return c.setAll(d),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(t,e,n,r):t instanceof Dr?function(s,o,u,l){if(!jl(s.precondition,o))return u;const c=gv(s.fieldTransforms,l,o),d=o.data;return d.setAll(oT(s)),d.setAll(c),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),u===null?null:u.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(f=>f.field))}(t,e,n,r):function(s,o,u){return jl(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):u}(t,e,n)}function lb(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=tT(r.transform,i||null);s!=null&&(n===null&&(n=wt.empty()),n.set(r.field,s))}return n||null}function pv(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&fs(r,i,(s,o)=>sb(s,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Sa extends dc{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Dr extends dc{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function oT(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function mv(t,e,n){const r=new Map;he(t.length===n.length);for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,u=e.data.field(s.field);r.set(s.field,ib(o,u,n[i]))}return r}function gv(t,e,n){const r=new Map;for(const i of t){const s=i.transform,o=n.data.field(i.field);r.set(i.field,rb(s,o,e))}return r}class aT extends dc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ub extends dc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cb{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&ab(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Po(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Po(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=ZE();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let u=this.applyToLocalView(o,s.mutatedFields);u=n.has(i.key)?null:u;const l=sT(o,u);l!==null&&r.set(i.key,l),o.isValidDocument()||o.convertToNoDocument(te.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),ie())}isEqual(e){return this.batchId===e.batchId&&fs(this.mutations,e.mutations,(n,r)=>pv(n,r))&&fs(this.baseMutations,e.baseMutations,(n,r)=>pv(n,r))}}class Ap{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){he(e.mutations.length===r.length);let i=function(){return J2}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new Ap(e,n,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class db{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hb{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var be,oe;function fb(t){switch(t){default:return ee();case j.CANCELLED:case j.UNKNOWN:case j.DEADLINE_EXCEEDED:case j.RESOURCE_EXHAUSTED:case j.INTERNAL:case j.UNAVAILABLE:case j.UNAUTHENTICATED:return!1;case j.INVALID_ARGUMENT:case j.NOT_FOUND:case j.ALREADY_EXISTS:case j.PERMISSION_DENIED:case j.FAILED_PRECONDITION:case j.ABORTED:case j.OUT_OF_RANGE:case j.UNIMPLEMENTED:case j.DATA_LOSS:return!0}}function lT(t){if(t===void 0)return Bn("GRPC error has no .code"),j.UNKNOWN;switch(t){case be.OK:return j.OK;case be.CANCELLED:return j.CANCELLED;case be.UNKNOWN:return j.UNKNOWN;case be.DEADLINE_EXCEEDED:return j.DEADLINE_EXCEEDED;case be.RESOURCE_EXHAUSTED:return j.RESOURCE_EXHAUSTED;case be.INTERNAL:return j.INTERNAL;case be.UNAVAILABLE:return j.UNAVAILABLE;case be.UNAUTHENTICATED:return j.UNAUTHENTICATED;case be.INVALID_ARGUMENT:return j.INVALID_ARGUMENT;case be.NOT_FOUND:return j.NOT_FOUND;case be.ALREADY_EXISTS:return j.ALREADY_EXISTS;case be.PERMISSION_DENIED:return j.PERMISSION_DENIED;case be.FAILED_PRECONDITION:return j.FAILED_PRECONDITION;case be.ABORTED:return j.ABORTED;case be.OUT_OF_RANGE:return j.OUT_OF_RANGE;case be.UNIMPLEMENTED:return j.UNIMPLEMENTED;case be.DATA_LOSS:return j.DATA_LOSS;default:return ee()}}(oe=be||(be={}))[oe.OK=0]="OK",oe[oe.CANCELLED=1]="CANCELLED",oe[oe.UNKNOWN=2]="UNKNOWN",oe[oe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",oe[oe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",oe[oe.NOT_FOUND=5]="NOT_FOUND",oe[oe.ALREADY_EXISTS=6]="ALREADY_EXISTS",oe[oe.PERMISSION_DENIED=7]="PERMISSION_DENIED",oe[oe.UNAUTHENTICATED=16]="UNAUTHENTICATED",oe[oe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",oe[oe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",oe[oe.ABORTED=10]="ABORTED",oe[oe.OUT_OF_RANGE=11]="OUT_OF_RANGE",oe[oe.UNIMPLEMENTED=12]="UNIMPLEMENTED",oe[oe.INTERNAL=13]="INTERNAL",oe[oe.UNAVAILABLE=14]="UNAVAILABLE",oe[oe.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pb(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mb=new Jr([4294967295,4294967295],0);function yv(t){const e=pb().encode(t),n=new bE;return n.update(e),new Uint8Array(n.digest())}function vv(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Jr([n,r],0),new Jr([i,s],0)]}class Cp{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new ho(`Invalid padding: ${n}`);if(r<0)throw new ho(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ho(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new ho(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=Jr.fromNumber(this.Ie)}Ee(e,n,r){let i=e.add(n.multiply(Jr.fromNumber(r)));return i.compare(mb)===1&&(i=new Jr([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=yv(e),[r,i]=vv(n);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Cp(s,i,n);return r.forEach(u=>o.insert(u)),o}insert(e){if(this.Ie===0)return;const n=yv(e),[r,i]=vv(n);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class ho extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,xa.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new hc(te.min(),i,new Ae(ue),$n(),ie())}}class xa{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new xa(r,n,ie(),ie(),ie())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fl{constructor(e,n,r,i){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=i}}class uT{constructor(e,n){this.targetId=e,this.me=n}}class cT{constructor(e,n,r=Ze.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class _v{constructor(){this.fe=0,this.ge=Ev(),this.pe=Ze.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=ie(),n=ie(),r=ie();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:ee()}}),new xa(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=Ev()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,he(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class gb{constructor(e){this.Le=e,this.Be=new Map,this.ke=$n(),this.qe=wv(),this.Qe=new Ae(ue)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:ee()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,i)=>{this.ze(i)&&n(i)})}He(e){const n=e.targetId,r=e.me.count,i=this.Je(n);if(i){const s=i.target;if(qh(s))if(r===0){const o=new Q(s.path);this.Ue(n,o,lt.newNoDocument(o,te.min()))}else he(r===1);else{const o=this.Ye(n);if(o!==r){const u=this.Ze(e),l=u?this.Xe(u,e,o):1;if(l!==0){this.je(n);const c=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,c)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let o,u;try{o=oi(r).toUint8Array()}catch(l){if(l instanceof UE)return hs("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{u=new Cp(o,i,s)}catch(l){return hs(l instanceof ho?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return u.Ie===0?null:u}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let i=0;return r.forEach(s=>{const o=this.Le.tt(),u=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(u)||(this.Ue(n,s,null),i++)}),i}rt(e){const n=new Map;this.Be.forEach((s,o)=>{const u=this.Je(o);if(u){if(s.current&&qh(u.target)){const l=new Q(u.target.path);this.ke.get(l)!==null||this.it(o,l)||this.Ue(o,l,lt.newNoDocument(l,e))}s.be&&(n.set(o,s.ve()),s.Ce())}});let r=ie();this.qe.forEach((s,o)=>{let u=!0;o.forEachWhile(l=>{const c=this.Je(l);return!c||c.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(r=r.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));const i=new hc(e,n,this.Qe,this.ke,r);return this.ke=$n(),this.qe=wv(),this.Qe=new Ae(ue),i}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,n)?i.Fe(n,1):i.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new _v,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new Xe(ue),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||K("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new _v),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function wv(){return new Ae(Q.comparator)}function Ev(){return new Ae(Q.comparator)}const yb={asc:"ASCENDING",desc:"DESCENDING"},vb={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},_b={and:"AND",or:"OR"};class wb{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Kh(t,e){return t.useProto3Json||ac(e)?e:{value:e}}function Iu(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function dT(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Eb(t,e){return Iu(t,e.toTimestamp())}function gn(t){return he(!!t),te.fromTimestamp(function(n){const r=Sr(n);return new ge(r.seconds,r.nanos)}(t))}function Pp(t,e){return Qh(t,e).canonicalString()}function Qh(t,e){const n=function(i){return new we(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function hT(t){const e=we.fromString(t);return he(yT(e)),e}function Yh(t,e){return Pp(t.databaseId,e.path)}function Cd(t,e){const n=hT(e);if(n.get(1)!==t.databaseId.projectId)throw new H(j.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new H(j.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Q(pT(n))}function fT(t,e){return Pp(t.databaseId,e)}function Tb(t){const e=hT(t);return e.length===4?we.emptyPath():pT(e)}function Xh(t){return new we(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function pT(t){return he(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Tv(t,e,n){return{name:Yh(t,e),fields:n.value.mapValue.fields}}function Ib(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:ee()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(c,d){return c.useProto3Json?(he(d===void 0||typeof d=="string"),Ze.fromBase64String(d||"")):(he(d===void 0||d instanceof Buffer||d instanceof Uint8Array),Ze.fromUint8Array(d||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,u=o&&function(c){const d=c.code===void 0?j.UNKNOWN:lT(c.code);return new H(d,c.message||"")}(o);n=new cT(r,i,s,u||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Cd(t,r.document.name),s=gn(r.document.updateTime),o=r.document.createTime?gn(r.document.createTime):te.min(),u=new wt({mapValue:{fields:r.document.fields}}),l=lt.newFoundDocument(i,s,o,u),c=r.targetIds||[],d=r.removedTargetIds||[];n=new Fl(c,d,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Cd(t,r.document),s=r.readTime?gn(r.readTime):te.min(),o=lt.newNoDocument(i,s),u=r.removedTargetIds||[];n=new Fl([],u,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Cd(t,r.document),s=r.removedTargetIds||[];n=new Fl([],s,i,null)}else{if(!("filter"in e))return ee();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new hb(i,s),u=r.targetId;n=new uT(u,o)}}return n}function Sb(t,e){let n;if(e instanceof Sa)n={update:Tv(t,e.key,e.value)};else if(e instanceof aT)n={delete:Yh(t,e.key)};else if(e instanceof Dr)n={update:Tv(t,e.key,e.data),updateMask:Db(e.fieldMask)};else{if(!(e instanceof ub))return ee();n={verify:Yh(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const u=o.transform;if(u instanceof Eu)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof ia)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof sa)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Tu)return{fieldPath:o.field.canonicalString(),increment:u.Pe};throw ee()}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:Eb(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:ee()}(t,e.precondition)),n}function xb(t,e){return t&&t.length>0?(he(e!==void 0),t.map(n=>function(i,s){let o=i.updateTime?gn(i.updateTime):gn(s);return o.isEqual(te.min())&&(o=gn(s)),new ob(o,i.transformResults||[])}(n,e))):[]}function Ab(t,e){return{documents:[fT(t,e.path)]}}function Cb(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=fT(t,i);const s=function(c){if(c.length!==0)return gT(tn.create(c,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const o=function(c){if(c.length!==0)return c.map(d=>function(m){return{field:Ri(m.field),direction:Rb(m.dir)}}(d))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const u=Kh(t,e.limit);return u!==null&&(n.structuredQuery.limit=u),e.startAt&&(n.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{_t:n,parent:i}}function Pb(t){let e=Tb(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){he(r===1);const d=n.from[0];d.allDescendants?i=d.collectionId:e=e.child(d.collectionId)}let s=[];n.where&&(s=function(f){const m=mT(f);return m instanceof tn&&WE(m)?m.getFilters():[m]}(n.where));let o=[];n.orderBy&&(o=function(f){return f.map(m=>function(x){return new ra(bi(x.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(x.direction))}(m))}(n.orderBy));let u=null;n.limit&&(u=function(f){let m;return m=typeof f=="object"?f.value:f,ac(m)?null:m}(n.limit));let l=null;n.startAt&&(l=function(f){const m=!!f.before,v=f.values||[];return new wu(v,m)}(n.startAt));let c=null;return n.endAt&&(c=function(f){const m=!f.before,v=f.values||[];return new wu(v,m)}(n.endAt)),G2(e,i,o,s,u,"F",l,c)}function kb(t,e){const n=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ee()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function mT(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=bi(n.unaryFilter.field);return Oe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=bi(n.unaryFilter.field);return Oe.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=bi(n.unaryFilter.field);return Oe.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=bi(n.unaryFilter.field);return Oe.create(o,"!=",{nullValue:"NULL_VALUE"});default:return ee()}}(t):t.fieldFilter!==void 0?function(n){return Oe.create(bi(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return ee()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return tn.create(n.compositeFilter.filters.map(r=>mT(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return ee()}}(n.compositeFilter.op))}(t):ee()}function Rb(t){return yb[t]}function bb(t){return vb[t]}function Nb(t){return _b[t]}function Ri(t){return{fieldPath:t.canonicalString()}}function bi(t){return Qe.fromServerFormat(t.fieldPath)}function gT(t){return t instanceof Oe?function(n){if(n.op==="=="){if(lv(n.value))return{unaryFilter:{field:Ri(n.field),op:"IS_NAN"}};if(av(n.value))return{unaryFilter:{field:Ri(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(lv(n.value))return{unaryFilter:{field:Ri(n.field),op:"IS_NOT_NAN"}};if(av(n.value))return{unaryFilter:{field:Ri(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ri(n.field),op:bb(n.op),value:n.value}}}(t):t instanceof tn?function(n){const r=n.getFilters().map(i=>gT(i));return r.length===1?r[0]:{compositeFilter:{op:Nb(n.op),filters:r}}}(t):ee()}function Db(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function yT(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(e,n,r,i,s=te.min(),o=te.min(),u=Ze.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=u,this.expectedCount=l}withSequenceNumber(e){return new lr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new lr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new lr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new lr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ob{constructor(e){this.ct=e}}function Mb(t){const e=Pb({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Gh(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lb{constructor(){this.un=new Vb}addToCollectionParentIndex(e,n){return this.un.add(n),F.resolve()}getCollectionParents(e,n){return F.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return F.resolve()}deleteFieldIndex(e,n){return F.resolve()}deleteAllFieldIndexes(e){return F.resolve()}createTargetIndexes(e,n){return F.resolve()}getDocumentsMatchingTarget(e,n){return F.resolve(null)}getIndexType(e,n){return F.resolve(0)}getFieldIndexes(e,n){return F.resolve([])}getNextCollectionGroupToUpdate(e){return F.resolve(null)}getMinOffset(e,n){return F.resolve(Ir.min())}getMinOffsetFromCollectionGroup(e,n){return F.resolve(Ir.min())}updateCollectionGroup(e,n,r){return F.resolve()}updateIndexEntries(e,n){return F.resolve()}}class Vb{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new Xe(we.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Xe(we.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new gs(0)}static kn(){return new gs(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jb{constructor(){this.changes=new ks(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,lt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?F.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fb{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ub{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&Po(r.mutation,i,kt.empty(),ge.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,ie()).next(()=>r))}getLocalViewOfDocuments(e,n,r=ie()){const i=Gr();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let o=co();return s.forEach((u,l)=>{o=o.insert(u,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Gr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,ie()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,u)=>{n.set(o,u)})})}computeViews(e,n,r,i){let s=$n();const o=Co(),u=function(){return Co()}();return n.forEach((l,c)=>{const d=r.get(c.key);i.has(c.key)&&(d===void 0||d.mutation instanceof Dr)?s=s.insert(c.key,c):d!==void 0?(o.set(c.key,d.mutation.getFieldMask()),Po(d.mutation,c,d.mutation.getFieldMask(),ge.now())):o.set(c.key,kt.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((c,d)=>o.set(c,d)),n.forEach((c,d)=>{var f;return u.set(c,new Fb(d,(f=o.get(c))!==null&&f!==void 0?f:null))}),u))}recalculateAndSaveOverlays(e,n){const r=Co();let i=new Ae((o,u)=>o-u),s=ie();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const u of o)u.keys().forEach(l=>{const c=n.get(l);if(c===null)return;let d=r.get(l)||kt.empty();d=u.applyToLocalView(c,d),r.set(l,d);const f=(i.get(u.batchId)||ie()).add(l);i=i.insert(u.batchId,f)})}).next(()=>{const o=[],u=i.getReverseIterator();for(;u.hasNext();){const l=u.getNext(),c=l.key,d=l.value,f=ZE();d.forEach(m=>{if(!s.has(m)){const v=sT(n.get(m),r.get(m));v!==null&&f.set(m,v),s=s.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,f))}return F.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return function(o){return Q.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):KE(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):F.resolve(Gr());let u=-1,l=s;return o.next(c=>F.forEach(c,(d,f)=>(u<f.largestBatchId&&(u=f.largestBatchId),s.get(d)?F.resolve():this.remoteDocumentCache.getEntry(e,d).next(m=>{l=l.insert(d,m)}))).next(()=>this.populateOverlays(e,c,s)).next(()=>this.computeViews(e,l,c,ie())).next(d=>({batchId:u,changes:JE(d)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new Q(n)).next(r=>{let i=co();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let o=co();return this.indexManager.getCollectionParents(e,s).next(u=>F.forEach(u,l=>{const c=function(f,m){return new Ps(m,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)}(n,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,c,r,i).next(d=>{d.forEach((f,m)=>{o=o.insert(f,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(o=>{s.forEach((l,c)=>{const d=c.getKey();o.get(d)===null&&(o=o.insert(d,lt.newInvalidDocument(d)))});let u=co();return o.forEach((l,c)=>{const d=s.get(l);d!==void 0&&Po(d.mutation,c,kt.empty(),ge.now()),uc(n,c)&&(u=u.insert(l,c))}),u})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bb{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return F.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(i){return{id:i.id,version:i.version,createTime:gn(i.createTime)}}(n)),F.resolve()}getNamedQuery(e,n){return F.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(i){return{name:i.name,query:Mb(i.bundledQuery),readTime:gn(i.readTime)}}(n)),F.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $b{constructor(){this.overlays=new Ae(Q.comparator),this.Ir=new Map}getOverlay(e,n){return F.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Gr();return F.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.ht(e,n,s)}),F.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(r)),F.resolve()}getOverlaysForCollection(e,n,r){const i=Gr(),s=n.length+1,o=new Q(n.child("")),u=this.overlays.getIteratorFrom(o);for(;u.hasNext();){const l=u.getNext().value,c=l.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return F.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new Ae((c,d)=>c-d);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>r){let d=s.get(c.largestBatchId);d===null&&(d=Gr(),s=s.insert(c.largestBatchId,d)),d.set(c.getKey(),c)}}const u=Gr(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((c,d)=>u.set(c,d)),!(u.size()>=i)););return F.resolve(u)}ht(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new db(n,r));let s=this.Ir.get(n);s===void 0&&(s=ie(),this.Ir.set(n,s)),this.Ir.set(n,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zb{constructor(){this.sessionToken=Ze.EMPTY_BYTE_STRING}getSessionToken(e){return F.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,F.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(){this.Tr=new Xe(ze.Er),this.dr=new Xe(ze.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new ze(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new ze(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new Q(new we([])),r=new ze(n,e),i=new ze(n,e+1),s=[];return this.dr.forEachInRange([r,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new Q(new we([])),r=new ze(n,e),i=new ze(n,e+1);let s=ie();return this.dr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const n=new ze(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class ze{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return Q.comparator(e.key,n.key)||ue(e.wr,n.wr)}static Ar(e,n){return ue(e.wr,n.wr)||Q.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wb{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new Xe(ze.Er)}checkEmpty(e){return F.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new cb(s,n,r,i);this.mutationQueue.push(o);for(const u of i)this.br=this.br.add(new ze(u.key,s)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return F.resolve(o)}lookupMutationBatch(e,n){return F.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.vr(r),s=i<0?0:i;return F.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return F.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return F.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new ze(n,0),i=new ze(n,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],o=>{const u=this.Dr(o.wr);s.push(u)}),F.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Xe(ue);return n.forEach(i=>{const s=new ze(i,0),o=new ze(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],u=>{r=r.add(u.wr)})}),F.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;Q.isDocumentKey(s)||(s=s.child(""));const o=new ze(new Q(s),0);let u=new Xe(ue);return this.br.forEachWhile(l=>{const c=l.key.path;return!!r.isPrefixOf(c)&&(c.length===i&&(u=u.add(l.wr)),!0)},o),F.resolve(this.Cr(u))}Cr(e){const n=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){he(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return F.forEach(n.mutations,i=>{const s=new ze(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new ze(n,0),i=this.br.firstAfterOrEqual(r);return F.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,F.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qb{constructor(e){this.Mr=e,this.docs=function(){return new Ae(Q.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return F.resolve(r?r.document.mutableCopy():lt.newInvalidDocument(n))}getEntries(e,n){let r=$n();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():lt.newInvalidDocument(i))}),F.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=$n();const o=n.path,u=new Q(o.child("")),l=this.docs.getIteratorFrom(u);for(;l.hasNext();){const{key:c,value:{document:d}}=l.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||P2(C2(d),r)<=0||(i.has(d.key)||uc(n,d))&&(s=s.insert(d.key,d.mutableCopy()))}return F.resolve(s)}getAllFromCollectionGroup(e,n,r,i){ee()}Or(e,n){return F.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new Hb(this)}getSize(e){return F.resolve(this.size)}}class Hb extends jb{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),F.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gb{constructor(e){this.persistence=e,this.Nr=new ks(n=>Tp(n),Ip),this.lastRemoteSnapshotVersion=te.min(),this.highestTargetId=0,this.Lr=0,this.Br=new kp,this.targetCount=0,this.kr=gs.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,i)=>n(i)),F.resolve()}getLastRemoteSnapshotVersion(e){return F.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return F.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),F.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),F.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new gs(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,F.resolve()}updateTargetData(e,n){return this.Kn(n),F.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,F.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.Nr.forEach((o,u)=>{u.sequenceNumber<=n&&r.get(u.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,u.targetId)),i++)}),F.waitFor(s).next(()=>i)}getTargetCount(e){return F.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return F.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),F.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),F.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),F.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return F.resolve(r)}containsKey(e,n){return F.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kb{constructor(e,n){this.qr={},this.overlays={},this.Qr=new vp(0),this.Kr=!1,this.Kr=!0,this.$r=new zb,this.referenceDelegate=e(this),this.Ur=new Gb(this),this.indexManager=new Lb,this.remoteDocumentCache=function(i){return new qb(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new Ob(n),this.Gr=new Bb(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new $b,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new Wb(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){K("MemoryPersistence","Starting transaction:",e);const i=new Qb(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,n){return F.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class Qb extends R2{constructor(e){super(),this.currentSequenceNumber=e}}class Rp{constructor(e){this.persistence=e,this.Jr=new kp,this.Yr=null}static Zr(e){return new Rp(e)}get Xr(){if(this.Yr)return this.Yr;throw ee()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),F.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),F.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),F.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return F.forEach(this.Xr,r=>{const i=Q.fromPath(r);return this.ei(e,i).next(s=>{s||n.removeEntry(i,te.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return F.or([()=>F.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=i}static Wi(e,n){let r=ie(),i=ie();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new bp(e,n.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yb{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xb{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return jC()?8:b2(ct())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.Yi(e,n).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,n,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new Yb;return this.Xi(e,n,o).next(u=>{if(s.result=u,this.zi)return this.es(e,n,o,u.size)})}).next(()=>s.result)}es(e,n,r,i){return r.documentReadCount<this.ji?(no()<=se.DEBUG&&K("QueryEngine","SDK will not create cache indexes for query:",ki(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),F.resolve()):(no()<=se.DEBUG&&K("QueryEngine","Query:",ki(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(no()<=se.DEBUG&&K("QueryEngine","The SDK decides to create cache indexes for query:",ki(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,mn(n))):F.resolve())}Yi(e,n){if(hv(n))return F.resolve(null);let r=mn(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=Gh(n,null,"F"),r=mn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=ie(...s);return this.Ji.getDocuments(e,o).next(u=>this.indexManager.getMinOffset(e,r).next(l=>{const c=this.ts(n,u);return this.ns(n,c,o,l.readTime)?this.Yi(e,Gh(n,null,"F")):this.rs(e,c,n,l)}))})))}Zi(e,n,r,i){return hv(n)||i.isEqual(te.min())?F.resolve(null):this.Ji.getDocuments(e,r).next(s=>{const o=this.ts(n,s);return this.ns(n,o,r,i)?F.resolve(null):(no()<=se.DEBUG&&K("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),ki(n)),this.rs(e,o,n,A2(i,-1)).next(u=>u))})}ts(e,n){let r=new Xe(YE(e));return n.forEach((i,s)=>{uc(e,s)&&(r=r.add(s))}),r}ns(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,n,r){return no()<=se.DEBUG&&K("QueryEngine","Using full collection scan to execute query:",ki(n)),this.Ji.getDocumentsMatchingQuery(e,n,Ir.min(),r)}rs(e,n,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jb{constructor(e,n,r,i){this.persistence=e,this.ss=n,this.serializer=i,this.os=new Ae(ue),this._s=new ks(s=>Tp(s),Ip),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ub(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function Zb(t,e,n,r){return new Jb(t,e,n,r)}async function vT(t,e){const n=ne(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],u=[];let l=ie();for(const c of i){o.push(c.batchId);for(const d of c.mutations)l=l.add(d.key)}for(const c of s){u.push(c.batchId);for(const d of c.mutations)l=l.add(d.key)}return n.localDocuments.getDocuments(r,l).next(c=>({hs:c,removedBatchIds:o,addedBatchIds:u}))})})}function eN(t,e){const n=ne(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.cs.newChangeBuffer({trackRemovals:!0});return function(u,l,c,d){const f=c.batch,m=f.keys();let v=F.resolve();return m.forEach(x=>{v=v.next(()=>d.getEntry(l,x)).next(P=>{const k=c.docVersions.get(x);he(k!==null),P.version.compareTo(k)<0&&(f.applyToRemoteDocument(P,c),P.isValidDocument()&&(P.setReadTime(c.commitVersion),d.addEntry(P)))})}),v.next(()=>u.mutationQueue.removeMutationBatch(l,f))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(u){let l=ie();for(let c=0;c<u.mutationResults.length;++c)u.mutationResults[c].transformResults.length>0&&(l=l.add(u.batch.mutations[c].key));return l}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function _T(t){const e=ne(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function tN(t,e){const n=ne(t),r=e.snapshotVersion;let i=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});i=n.os;const u=[];e.targetChanges.forEach((d,f)=>{const m=i.get(f);if(!m)return;u.push(n.Ur.removeMatchingKeys(s,d.removedDocuments,f).next(()=>n.Ur.addMatchingKeys(s,d.addedDocuments,f)));let v=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(f)!==null?v=v.withResumeToken(Ze.EMPTY_BYTE_STRING,te.min()).withLastLimboFreeSnapshotVersion(te.min()):d.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(d.resumeToken,r)),i=i.insert(f,v),function(P,k,E){return P.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=3e8?!0:E.addedDocuments.size+E.modifiedDocuments.size+E.removedDocuments.size>0}(m,v,d)&&u.push(n.Ur.updateTargetData(s,v))});let l=$n(),c=ie();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&u.push(n.persistence.referenceDelegate.updateLimboDocument(s,d))}),u.push(nN(s,o,e.documentUpdates).next(d=>{l=d.Ps,c=d.Is})),!r.isEqual(te.min())){const d=n.Ur.getLastRemoteSnapshotVersion(s).next(f=>n.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r));u.push(d)}return F.waitFor(u).next(()=>o.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,l,c)).next(()=>l)}).then(s=>(n.os=i,s))}function nN(t,e,n){let r=ie(),i=ie();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let o=$n();return n.forEach((u,l)=>{const c=s.get(u);l.isFoundDocument()!==c.isFoundDocument()&&(i=i.add(u)),l.isNoDocument()&&l.version.isEqual(te.min())?(e.removeEntry(u,l.readTime),o=o.insert(u,l)):!c.isValidDocument()||l.version.compareTo(c.version)>0||l.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(l),o=o.insert(u,l)):K("LocalStore","Ignoring outdated watch update for ",u,". Current version:",c.version," Watch version:",l.version)}),{Ps:o,Is:i}})}function rN(t,e){const n=ne(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function iN(t,e){const n=ne(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.Ur.getTargetData(r,e).next(s=>s?(i=s,F.resolve(i)):n.Ur.allocateTargetId(r).next(o=>(i=new lr(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function Jh(t,e,n){const r=ne(t),i=r.os.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Ia(o))throw o;K("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function Iv(t,e,n){const r=ne(t);let i=te.min(),s=ie();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,c,d){const f=ne(l),m=f._s.get(d);return m!==void 0?F.resolve(f.os.get(m)):f.Ur.getTargetData(c,d)}(r,o,mn(e)).next(u=>{if(u)return i=u.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,u.targetId).next(l=>{s=l})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?i:te.min(),n?s:ie())).next(u=>(sN(r,Q2(e),u),{documents:u,Ts:s})))}function sN(t,e,n){let r=t.us.get(e)||te.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.us.set(e,r)}class Sv{constructor(){this.activeTargetIds=tb()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class oN{constructor(){this.so=new Sv,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Sv,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aN{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xv{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){K("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){K("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yl=null;function Pd(){return yl===null?yl=function(){return 268435456+Math.round(2147483648*Math.random())}():yl++,"0x"+yl.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lN={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uN{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const st="WebChannelConnection";class cN extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(n,r,i,s,o){const u=Pd(),l=this.xo(n,r.toUriEncodedString());K("RestConnection",`Sending RPC '${n}' ${u}:`,l,i);const c={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(c,s,o),this.No(n,l,c,i).then(d=>(K("RestConnection",`Received RPC '${n}' ${u}: `,d),d),d=>{throw hs("RestConnection",`RPC '${n}' ${u} failed with error: `,d,"url: ",l,"request:",i),d})}Lo(n,r,i,s,o,u){return this.Mo(n,r,i,s,o)}Oo(n,r,i){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Cs}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>n[o]=s),i&&i.headers.forEach((s,o)=>n[o]=s)}xo(n,r){const i=lN[n];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,i){const s=Pd();return new Promise((o,u)=>{const l=new NE;l.setWithCredentials(!0),l.listenOnce(DE.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case Ll.NO_ERROR:const d=l.getResponseJson();K(st,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(d)),o(d);break;case Ll.TIMEOUT:K(st,`RPC '${e}' ${s} timed out`),u(new H(j.DEADLINE_EXCEEDED,"Request time out"));break;case Ll.HTTP_ERROR:const f=l.getStatus();if(K(st,`RPC '${e}' ${s} failed with status:`,f,"response text:",l.getResponseText()),f>0){let m=l.getResponseJson();Array.isArray(m)&&(m=m[0]);const v=m==null?void 0:m.error;if(v&&v.status&&v.message){const x=function(k){const E=k.toLowerCase().replace(/_/g,"-");return Object.values(j).indexOf(E)>=0?E:j.UNKNOWN}(v.status);u(new H(x,v.message))}else u(new H(j.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new H(j.UNAVAILABLE,"Connection failed."));break;default:ee()}}finally{K(st,`RPC '${e}' ${s} completed.`)}});const c=JSON.stringify(i);K(st,`RPC '${e}' ${s} sending request:`,i),l.send(n,"POST",c,r,15)})}Bo(e,n,r){const i=Pd(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=LE(),u=ME(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(l.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Oo(l.initMessageHeaders,n,r),l.encodeInitMessageHeaders=!0;const d=s.join("");K(st,`Creating RPC '${e}' stream ${i}: ${d}`,l);const f=o.createWebChannel(d,l);let m=!1,v=!1;const x=new uN({Io:k=>{v?K(st,`Not sending because RPC '${e}' stream ${i} is closed:`,k):(m||(K(st,`Opening RPC '${e}' stream ${i} transport.`),f.open(),m=!0),K(st,`RPC '${e}' stream ${i} sending:`,k),f.send(k))},To:()=>f.close()}),P=(k,E,w)=>{k.listen(E,T=>{try{w(T)}catch(O){setTimeout(()=>{throw O},0)}})};return P(f,uo.EventType.OPEN,()=>{v||(K(st,`RPC '${e}' stream ${i} transport opened.`),x.yo())}),P(f,uo.EventType.CLOSE,()=>{v||(v=!0,K(st,`RPC '${e}' stream ${i} transport closed`),x.So())}),P(f,uo.EventType.ERROR,k=>{v||(v=!0,hs(st,`RPC '${e}' stream ${i} transport errored:`,k),x.So(new H(j.UNAVAILABLE,"The operation could not be completed")))}),P(f,uo.EventType.MESSAGE,k=>{var E;if(!v){const w=k.data[0];he(!!w);const T=w,O=T.error||((E=T[0])===null||E===void 0?void 0:E.error);if(O){K(st,`RPC '${e}' stream ${i} received error:`,O);const U=O.status;let z=function(I){const A=be[I];if(A!==void 0)return lT(A)}(U),S=O.message;z===void 0&&(z=j.INTERNAL,S="Unknown error status: "+U+" with message "+O.message),v=!0,x.So(new H(z,S)),f.close()}else K(st,`RPC '${e}' stream ${i} received:`,w),x.bo(w)}}),P(u,OE.STAT_EVENT,k=>{k.stat===Bh.PROXY?K(st,`RPC '${e}' stream ${i} detected buffering proxy`):k.stat===Bh.NOPROXY&&K(st,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{x.wo()},0),x}}function kd(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fc(t){return new wb(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wT{constructor(e,n,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,n-r);i>0&&K("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ET{constructor(e,n,r,i,s,o,u,l){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=u,this.listener=l,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new wT(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===j.RESOURCE_EXHAUSTED?(Bn(n.toString()),Bn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===j.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===n&&this.P_(r,i)},r=>{e(()=>{const i=new H(j.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return K("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(K("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class dN extends ET{constructor(e,n,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=Ib(this.serializer,e),r=function(s){if(!("targetChange"in s))return te.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?te.min():o.readTime?gn(o.readTime):te.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=Xh(this.serializer),n.addTarget=function(s,o){let u;const l=o.target;if(u=qh(l)?{documents:Ab(s,l)}:{query:Cb(s,l)._t},u.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){u.resumeToken=dT(s,o.resumeToken);const c=Kh(s,o.expectedCount);c!==null&&(u.expectedCount=c)}else if(o.snapshotVersion.compareTo(te.min())>0){u.readTime=Iu(s,o.snapshotVersion.toTimestamp());const c=Kh(s,o.expectedCount);c!==null&&(u.expectedCount=c)}return u}(this.serializer,e);const r=kb(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=Xh(this.serializer),n.removeTarget=e,this.a_(n)}}class hN extends ET{constructor(e,n,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return he(!!e.streamToken),this.lastStreamToken=e.streamToken,he(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){he(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=xb(e.writeResults,e.commitTime),r=gn(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=Xh(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>Sb(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fN extends class{}{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new H(j.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,Qh(n,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===j.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new H(j.UNKNOWN,s.toString())})}Lo(e,n,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,u])=>this.connection.Lo(e,Qh(n,r),i,o,u,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===j.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new H(j.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class pN{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Bn(n),this.D_=!1):K("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mN{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{r.enqueueAndForget(async()=>{yi(this)&&(K("RemoteStore","Restarting streams for network reachability change."),await async function(l){const c=ne(l);c.L_.add(4),await Aa(c),c.q_.set("Unknown"),c.L_.delete(4),await pc(c)}(this))})}),this.q_=new pN(r,i)}}async function pc(t){if(yi(t))for(const e of t.B_)await e(!0)}async function Aa(t){for(const e of t.B_)await e(!1)}function TT(t,e){const n=ne(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),Mp(n)?Op(n):Rs(n).r_()&&Dp(n,e))}function Np(t,e){const n=ne(t),r=Rs(n);n.N_.delete(e),r.r_()&&IT(n,e),n.N_.size===0&&(r.r_()?r.o_():yi(n)&&n.q_.set("Unknown"))}function Dp(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(te.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Rs(t).A_(e)}function IT(t,e){t.Q_.xe(e),Rs(t).R_(e)}function Op(t){t.Q_=new gb({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),Rs(t).start(),t.q_.v_()}function Mp(t){return yi(t)&&!Rs(t).n_()&&t.N_.size>0}function yi(t){return ne(t).L_.size===0}function ST(t){t.Q_=void 0}async function gN(t){t.q_.set("Online")}async function yN(t){t.N_.forEach((e,n)=>{Dp(t,e)})}async function vN(t,e){ST(t),Mp(t)?(t.q_.M_(e),Op(t)):t.q_.set("Unknown")}async function _N(t,e,n){if(t.q_.set("Online"),e instanceof cT&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const u of s.targetIds)i.N_.has(u)&&(await i.remoteSyncer.rejectListen(u,o),i.N_.delete(u),i.Q_.removeTarget(u))}(t,e)}catch(r){K("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Su(t,r)}else if(e instanceof Fl?t.Q_.Ke(e):e instanceof uT?t.Q_.He(e):t.Q_.We(e),!n.isEqual(te.min()))try{const r=await _T(t.localStore);n.compareTo(r)>=0&&await function(s,o){const u=s.Q_.rt(o);return u.targetChanges.forEach((l,c)=>{if(l.resumeToken.approximateByteSize()>0){const d=s.N_.get(c);d&&s.N_.set(c,d.withResumeToken(l.resumeToken,o))}}),u.targetMismatches.forEach((l,c)=>{const d=s.N_.get(l);if(!d)return;s.N_.set(l,d.withResumeToken(Ze.EMPTY_BYTE_STRING,d.snapshotVersion)),IT(s,l);const f=new lr(d.target,l,c,d.sequenceNumber);Dp(s,f)}),s.remoteSyncer.applyRemoteEvent(u)}(t,n)}catch(r){K("RemoteStore","Failed to raise snapshot:",r),await Su(t,r)}}async function Su(t,e,n){if(!Ia(e))throw e;t.L_.add(1),await Aa(t),t.q_.set("Offline"),n||(n=()=>_T(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{K("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await pc(t)})}function xT(t,e){return e().catch(n=>Su(t,n,e))}async function mc(t){const e=ne(t),n=xr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;wN(e);)try{const i=await rN(e.localStore,r);if(i===null){e.O_.length===0&&n.o_();break}r=i.batchId,EN(e,i)}catch(i){await Su(e,i)}AT(e)&&CT(e)}function wN(t){return yi(t)&&t.O_.length<10}function EN(t,e){t.O_.push(e);const n=xr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function AT(t){return yi(t)&&!xr(t).n_()&&t.O_.length>0}function CT(t){xr(t).start()}async function TN(t){xr(t).p_()}async function IN(t){const e=xr(t);for(const n of t.O_)e.m_(n.mutations)}async function SN(t,e,n){const r=t.O_.shift(),i=Ap.from(r,e,n);await xT(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await mc(t)}async function xN(t,e){e&&xr(t).V_&&await async function(r,i){if(function(o){return fb(o)&&o!==j.ABORTED}(i.code)){const s=r.O_.shift();xr(r).s_(),await xT(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await mc(r)}}(t,e),AT(t)&&CT(t)}async function Av(t,e){const n=ne(t);n.asyncQueue.verifyOperationInProgress(),K("RemoteStore","RemoteStore received new credentials");const r=yi(n);n.L_.add(3),await Aa(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await pc(n)}async function AN(t,e){const n=ne(t);e?(n.L_.delete(2),await pc(n)):e||(n.L_.add(2),await Aa(n),n.q_.set("Unknown"))}function Rs(t){return t.K_||(t.K_=function(n,r,i){const s=ne(n);return s.w_(),new dN(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:gN.bind(null,t),Ro:yN.bind(null,t),mo:vN.bind(null,t),d_:_N.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),Mp(t)?Op(t):t.q_.set("Unknown")):(await t.K_.stop(),ST(t))})),t.K_}function xr(t){return t.U_||(t.U_=function(n,r,i){const s=ne(n);return s.w_(),new hN(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:TN.bind(null,t),mo:xN.bind(null,t),f_:IN.bind(null,t),g_:SN.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await mc(t)):(await t.U_.stop(),t.O_.length>0&&(K("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Dn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,u=new Lp(e,n,o,i,s);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new H(j.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Vp(t,e){if(Bn("AsyncQueue",`${e}: ${t}`),Ia(t))return new H(j.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e){this.comparator=e?(n,r)=>e(n,r)||Q.comparator(n.key,r.key):(n,r)=>Q.comparator(n.key,r.key),this.keyedMap=co(),this.sortedSet=new Ae(this.comparator)}static emptySet(e){return new ns(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof ns)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new ns;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cv{constructor(){this.W_=new Ae(Q.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):ee():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class ys{constructor(e,n,r,i,s,o,u,l,c){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=u,this.excludesMetadataChanges=l,this.hasCachedResults=c}static fromInitialDocuments(e,n,r,i,s){const o=[];return n.forEach(u=>{o.push({type:0,doc:u})}),new ys(e,n,ns.emptySet(n),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&lc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CN{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class PN{constructor(){this.queries=Pv(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const i=ne(n),s=i.queries;i.queries=Pv(),s.forEach((o,u)=>{for(const l of u.j_)l.onError(r)})})(this,new H(j.ABORTED,"Firestore shutting down"))}}function Pv(){return new ks(t=>QE(t),lc)}async function PT(t,e){const n=ne(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new CN,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await n.onListen(i,!0);break;case 1:s.z_=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(o){const u=Vp(o,`Initialization of query '${ki(e.query)}' failed`);return void e.onError(u)}n.queries.set(i,s),s.j_.push(e),e.Z_(n.onlineState),s.z_&&e.X_(s.z_)&&jp(n)}async function kT(t,e){const n=ne(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function kN(t,e){const n=ne(t);let r=!1;for(const i of e){const s=i.query,o=n.queries.get(s);if(o){for(const u of o.j_)u.X_(i)&&(r=!0);o.z_=i}}r&&jp(n)}function RN(t,e,n){const r=ne(t),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(n);r.queries.delete(e)}function jp(t){t.Y_.forEach(e=>{e.next()})}var Zh,kv;(kv=Zh||(Zh={})).ea="default",kv.Cache="cache";class RT{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new ys(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=ys.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Zh.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bT{constructor(e){this.key=e}}class NT{constructor(e){this.key=e}}class bN{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=ie(),this.mutatedKeys=ie(),this.Aa=YE(e),this.Ra=new ns(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new Cv,i=n?n.Ra:this.Ra;let s=n?n.mutatedKeys:this.mutatedKeys,o=i,u=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,c=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((d,f)=>{const m=i.get(d),v=uc(this.query,f)?f:null,x=!!m&&this.mutatedKeys.has(m.key),P=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let k=!1;m&&v?m.data.isEqual(v.data)?x!==P&&(r.track({type:3,doc:v}),k=!0):this.ga(m,v)||(r.track({type:2,doc:v}),k=!0,(l&&this.Aa(v,l)>0||c&&this.Aa(v,c)<0)&&(u=!0)):!m&&v?(r.track({type:0,doc:v}),k=!0):m&&!v&&(r.track({type:1,doc:m}),k=!0,(l||c)&&(u=!0)),k&&(v?(o=o.add(v),s=P?s.add(d):s.delete(d)):(o=o.delete(d),s=s.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),s=s.delete(d.key),r.track({type:1,doc:d})}return{Ra:o,fa:r,ns:u,mutatedKeys:s}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((d,f)=>function(v,x){const P=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ee()}};return P(v)-P(x)}(d.type,f.type)||this.Aa(d.doc,f.doc)),this.pa(r),i=i!=null&&i;const u=n&&!i?this.ya():[],l=this.da.size===0&&this.current&&!i?1:0,c=l!==this.Ea;return this.Ea=l,o.length!==0||c?{snapshot:new ys(this.query,e.Ra,s,o,e.mutatedKeys,l===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:u}:{wa:u}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Cv,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=ie(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new NT(r))}),this.da.forEach(r=>{e.has(r)||n.push(new bT(r))}),n}ba(e){this.Ta=e.Ts,this.da=ie();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return ys.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class NN{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class DN{constructor(e){this.key=e,this.va=!1}}class ON{constructor(e,n,r,i,s,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new ks(u=>QE(u),lc),this.Ma=new Map,this.xa=new Set,this.Oa=new Ae(Q.comparator),this.Na=new Map,this.La=new kp,this.Ba={},this.ka=new Map,this.qa=gs.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function MN(t,e,n=!0){const r=jT(t);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await DT(r,e,n,!0),i}async function LN(t,e){const n=jT(t);await DT(n,e,!0,!1)}async function DT(t,e,n,r){const i=await iN(t.localStore,mn(e)),s=i.targetId,o=t.sharedClientState.addLocalQueryTarget(s,n);let u;return r&&(u=await VN(t,e,s,o==="current",i.resumeToken)),t.isPrimaryClient&&n&&TT(t.remoteStore,i),u}async function VN(t,e,n,r,i){t.Ka=(f,m,v)=>async function(P,k,E,w){let T=k.view.ma(E);T.ns&&(T=await Iv(P.localStore,k.query,!1).then(({documents:S})=>k.view.ma(S,T)));const O=w&&w.targetChanges.get(k.targetId),U=w&&w.targetMismatches.get(k.targetId)!=null,z=k.view.applyChanges(T,P.isPrimaryClient,O,U);return bv(P,k.targetId,z.wa),z.snapshot}(t,f,m,v);const s=await Iv(t.localStore,e,!0),o=new bN(e,s.Ts),u=o.ma(s.documents),l=xa.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),c=o.applyChanges(u,t.isPrimaryClient,l);bv(t,n,c.wa);const d=new NN(e,n,o);return t.Fa.set(e,d),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),c.snapshot}async function jN(t,e,n){const r=ne(t),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter(o=>!lc(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Jh(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&Np(r.remoteStore,i.targetId),ef(r,i.targetId)}).catch(Ta)):(ef(r,i.targetId),await Jh(r.localStore,i.targetId,!0))}async function FN(t,e){const n=ne(t),r=n.Fa.get(e),i=n.Ma.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Np(n.remoteStore,r.targetId))}async function UN(t,e,n){const r=GN(t);try{const i=await function(o,u){const l=ne(o),c=ge.now(),d=u.reduce((v,x)=>v.add(x.key),ie());let f,m;return l.persistence.runTransaction("Locally write mutations","readwrite",v=>{let x=$n(),P=ie();return l.cs.getEntries(v,d).next(k=>{x=k,x.forEach((E,w)=>{w.isValidDocument()||(P=P.add(E))})}).next(()=>l.localDocuments.getOverlayedDocuments(v,x)).next(k=>{f=k;const E=[];for(const w of u){const T=lb(w,f.get(w.key).overlayedDocument);T!=null&&E.push(new Dr(w.key,T,BE(T.value.mapValue),Xt.exists(!0)))}return l.mutationQueue.addMutationBatch(v,c,E,u)}).next(k=>{m=k;const E=k.applyToLocalDocumentSet(f,P);return l.documentOverlayCache.saveOverlays(v,k.batchId,E)})}).then(()=>({batchId:m.batchId,changes:JE(f)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,u,l){let c=o.Ba[o.currentUser.toKey()];c||(c=new Ae(ue)),c=c.insert(u,l),o.Ba[o.currentUser.toKey()]=c}(r,i.batchId,n),await Ca(r,i.changes),await mc(r.remoteStore)}catch(i){const s=Vp(i,"Failed to persist write");n.reject(s)}}async function OT(t,e){const n=ne(t);try{const r=await tN(n.localStore,e);e.targetChanges.forEach((i,s)=>{const o=n.Na.get(s);o&&(he(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?he(o.va):i.removedDocuments.size>0&&(he(o.va),o.va=!1))}),await Ca(n,r,e)}catch(r){await Ta(r)}}function Rv(t,e,n){const r=ne(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Fa.forEach((s,o)=>{const u=o.view.Z_(e);u.snapshot&&i.push(u.snapshot)}),function(o,u){const l=ne(o);l.onlineState=u;let c=!1;l.queries.forEach((d,f)=>{for(const m of f.j_)m.Z_(u)&&(c=!0)}),c&&jp(l)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function BN(t,e,n){const r=ne(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Na.get(e),s=i&&i.key;if(s){let o=new Ae(Q.comparator);o=o.insert(s,lt.newNoDocument(s,te.min()));const u=ie().add(s),l=new hc(te.min(),new Map,new Ae(ue),o,u);await OT(r,l),r.Oa=r.Oa.remove(s),r.Na.delete(e),Fp(r)}else await Jh(r.localStore,e,!1).then(()=>ef(r,e,n)).catch(Ta)}async function $N(t,e){const n=ne(t),r=e.batch.batchId;try{const i=await eN(n.localStore,e);LT(n,r,null),MT(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Ca(n,i)}catch(i){await Ta(i)}}async function zN(t,e,n){const r=ne(t);try{const i=await function(o,u){const l=ne(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let d;return l.mutationQueue.lookupMutationBatch(c,u).next(f=>(he(f!==null),d=f.keys(),l.mutationQueue.removeMutationBatch(c,f))).next(()=>l.mutationQueue.performConsistencyCheck(c)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(c,d,u)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,d)).next(()=>l.localDocuments.getDocuments(c,d))})}(r.localStore,e);LT(r,e,n),MT(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Ca(r,i)}catch(i){await Ta(i)}}function MT(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function LT(t,e,n){const r=ne(t);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function ef(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||VT(t,r)})}function VT(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(Np(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),Fp(t))}function bv(t,e,n){for(const r of n)r instanceof bT?(t.La.addReference(r.key,e),WN(t,r)):r instanceof NT?(K("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||VT(t,r.key)):ee()}function WN(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(K("SyncEngine","New document in limbo: "+n),t.xa.add(r),Fp(t))}function Fp(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new Q(we.fromString(e)),r=t.qa.next();t.Na.set(r,new DN(n)),t.Oa=t.Oa.insert(n,r),TT(t.remoteStore,new lr(mn(Sp(n.path)),r,"TargetPurposeLimboResolution",vp.oe))}}async function Ca(t,e,n){const r=ne(t),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((u,l)=>{o.push(r.Ka(l,e,n).then(c=>{var d;if((c||n)&&r.isPrimaryClient){const f=c?!c.fromCache:(d=n==null?void 0:n.targetChanges.get(l.targetId))===null||d===void 0?void 0:d.current;r.sharedClientState.updateQueryState(l.targetId,f?"current":"not-current")}if(c){i.push(c);const f=bp.Wi(l.targetId,c);s.push(f)}}))}),await Promise.all(o),r.Ca.d_(i),await async function(l,c){const d=ne(l);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",f=>F.forEach(c,m=>F.forEach(m.$i,v=>d.persistence.referenceDelegate.addReference(f,m.targetId,v)).next(()=>F.forEach(m.Ui,v=>d.persistence.referenceDelegate.removeReference(f,m.targetId,v)))))}catch(f){if(!Ia(f))throw f;K("LocalStore","Failed to update sequence numbers: "+f)}for(const f of c){const m=f.targetId;if(!f.fromCache){const v=d.os.get(m),x=v.snapshotVersion,P=v.withLastLimboFreeSnapshotVersion(x);d.os=d.os.insert(m,P)}}}(r.localStore,s))}async function qN(t,e){const n=ne(t);if(!n.currentUser.isEqual(e)){K("SyncEngine","User change. New user:",e.toKey());const r=await vT(n.localStore,e);n.currentUser=e,function(s,o){s.ka.forEach(u=>{u.forEach(l=>{l.reject(new H(j.CANCELLED,o))})}),s.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ca(n,r.hs)}}function HN(t,e){const n=ne(t),r=n.Na.get(e);if(r&&r.va)return ie().add(r.key);{let i=ie();const s=n.Ma.get(e);if(!s)return i;for(const o of s){const u=n.Fa.get(o);i=i.unionWith(u.view.Va)}return i}}function jT(t){const e=ne(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=OT.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=HN.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=BN.bind(null,e),e.Ca.d_=kN.bind(null,e.eventManager),e.Ca.$a=RN.bind(null,e.eventManager),e}function GN(t){const e=ne(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=$N.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=zN.bind(null,e),e}class xu{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=fc(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return Zb(this.persistence,new Xb,e.initialUser,this.serializer)}Ga(e){return new Kb(Rp.Zr,this.serializer)}Wa(e){return new oN}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}xu.provider={build:()=>new xu};class tf{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Rv(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=qN.bind(null,this.syncEngine),await AN(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new PN}()}createDatastore(e){const n=fc(e.databaseInfo.databaseId),r=function(s){return new cN(s)}(e.databaseInfo);return function(s,o,u,l){return new fN(s,o,u,l)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,o,u){return new mN(r,i,s,o,u)}(this.localStore,this.datastore,e.asyncQueue,n=>Rv(this.syncEngine,n,0),function(){return xv.D()?new xv:new aN}())}createSyncEngine(e,n){return function(i,s,o,u,l,c,d){const f=new ON(i,s,o,u,l,c);return d&&(f.Qa=!0),f}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=ne(i);K("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await Aa(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}tf.provider={build:()=>new tf};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FT{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Bn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KN{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=ot.UNAUTHENTICATED,this.clientId=jE.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{K("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(K("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Dn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Vp(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Rd(t,e){t.asyncQueue.verifyOperationInProgress(),K("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await vT(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Nv(t,e){t.asyncQueue.verifyOperationInProgress();const n=await QN(t);K("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>Av(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>Av(e.remoteStore,i)),t._onlineComponents=e}async function QN(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){K("FirestoreClient","Using user provided OfflineComponentProvider");try{await Rd(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===j.FAILED_PRECONDITION||i.code===j.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;hs("Error using user provided cache. Falling back to memory cache: "+n),await Rd(t,new xu)}}else K("FirestoreClient","Using default OfflineComponentProvider"),await Rd(t,new xu);return t._offlineComponents}async function UT(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(K("FirestoreClient","Using user provided OnlineComponentProvider"),await Nv(t,t._uninitializedComponentsProvider._online)):(K("FirestoreClient","Using default OnlineComponentProvider"),await Nv(t,new tf))),t._onlineComponents}function YN(t){return UT(t).then(e=>e.syncEngine)}async function BT(t){const e=await UT(t),n=e.eventManager;return n.onListen=MN.bind(null,e.syncEngine),n.onUnlisten=jN.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=LN.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=FN.bind(null,e.syncEngine),n}function XN(t,e,n={}){const r=new Dn;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,u,l,c){const d=new FT({next:m=>{d.Za(),o.enqueueAndForget(()=>kT(s,f));const v=m.docs.has(u);!v&&m.fromCache?c.reject(new H(j.UNAVAILABLE,"Failed to get document because the client is offline.")):v&&m.fromCache&&l&&l.source==="server"?c.reject(new H(j.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(m)},error:m=>c.reject(m)}),f=new RT(Sp(u.path),d,{includeMetadataChanges:!0,_a:!0});return PT(s,f)}(await BT(t),t.asyncQueue,e,n,r)),r.promise}function JN(t,e,n={}){const r=new Dn;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,u,l,c){const d=new FT({next:m=>{d.Za(),o.enqueueAndForget(()=>kT(s,f)),m.fromCache&&l.source==="server"?c.reject(new H(j.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(m)},error:m=>c.reject(m)}),f=new RT(u,d,{includeMetadataChanges:!0,_a:!0});return PT(s,f)}(await BT(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $T(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dv=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zT(t,e,n){if(!n)throw new H(j.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function ZN(t,e,n,r){if(e===!0&&r===!0)throw new H(j.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Ov(t){if(!Q.isDocumentKey(t))throw new H(j.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Mv(t){if(Q.isDocumentKey(t))throw new H(j.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function gc(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ee()}function _n(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new H(j.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=gc(t);throw new H(j.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lv{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new H(j.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new H(j.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ZN("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=$T((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new H(j.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new H(j.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new H(j.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class yc{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Lv({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new H(j.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new H(j.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Lv(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new y2;switch(r.type){case"firstParty":return new E2(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new H(j.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Dv.get(n);r&&(K("ComponentProvider","Removing Datastore"),Dv.delete(n),r.terminate())}(this),Promise.resolve()}}function eD(t,e,n,r={}){var i;const s=(t=_n(t,yc))._getSettings(),o=`${e}:${n}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&hs("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let u,l;if(typeof r.mockUserToken=="string")u=r.mockUserToken,l=ot.MOCK_USER;else{u=NC(r.mockUserToken,(i=t._app)===null||i===void 0?void 0:i.options.projectId);const c=r.mockUserToken.sub||r.mockUserToken.user_id;if(!c)throw new H(j.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new ot(c)}t._authCredentials=new v2(new VE(u,l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new vi(this.firestore,e,this._query)}}class mt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new wr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new mt(this.firestore,e,this._key)}}class wr extends vi{constructor(e,n,r){super(e,n,Sp(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new mt(this.firestore,null,new Q(e))}withConverter(e){return new wr(this.firestore,e,this._path)}}function Up(t,e,...n){if(t=Ve(t),zT("collection","path",e),t instanceof yc){const r=we.fromString(e,...n);return Mv(r),new wr(t,null,r)}{if(!(t instanceof mt||t instanceof wr))throw new H(j.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(we.fromString(e,...n));return Mv(r),new wr(t.firestore,null,r)}}function Pa(t,e,...n){if(t=Ve(t),arguments.length===1&&(e=jE.newId()),zT("doc","path",e),t instanceof yc){const r=we.fromString(e,...n);return Ov(r),new mt(t,null,new Q(r))}{if(!(t instanceof mt||t instanceof wr))throw new H(j.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(we.fromString(e,...n));return Ov(r),new mt(t.firestore,t instanceof wr?t.converter:null,new Q(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vv{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new wT(this,"async_queue_retry"),this.Vu=()=>{const r=kd();r&&K("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=kd();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=kd();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new Dn;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Ia(e))throw e;K("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(o){let u=o.message||"";return o.stack&&(u=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),u}(r);throw Bn("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const i=Lp.createAndSchedule(this,e,n,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&ee()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}class bs extends yc{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new Vv,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Vv(e),this._firestoreClient=void 0,await e}}}function tD(t,e){const n=typeof t=="object"?t:ap(),r=typeof t=="string"?t:"(default)",i=pi(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=RC("firestore");s&&eD(i,...s)}return i}function Bp(t){if(t._terminated)throw new H(j.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||nD(t),t._firestoreClient}function nD(t){var e,n,r;const i=t._freezeSettings(),s=function(u,l,c,d){return new O2(u,l,c,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,$T(d.experimentalLongPollingOptions),d.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._componentsProvider||!((n=i.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),t._firestoreClient=new KN(t._authCredentials,t._appCheckCredentials,t._queue,s,t._componentsProvider&&function(u){const l=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(l),_online:l}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(e){this._byteString=e}static fromBase64String(e){try{return new vs(Ze.fromBase64String(e))}catch(n){throw new H(j.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new vs(Ze.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new H(j.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Qe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $p{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new H(j.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new H(j.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ue(this._lat,e._lat)||ue(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wp{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rD=/^__.*__$/;class iD{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Dr(e,this.data,this.fieldMask,n,this.fieldTransforms):new Sa(e,this.data,n,this.fieldTransforms)}}class WT{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Dr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function qT(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ee()}}class qp{constructor(e,n,r,i,s,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new qp(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Au(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(qT(this.Cu)&&rD.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class sD{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||fc(e)}Qu(e,n,r,i=!1){return new qp({Cu:e,methodName:n,qu:r,path:Qe.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function _c(t){const e=t._freezeSettings(),n=fc(t._databaseId);return new sD(t._databaseId,!!e.ignoreUndefinedProperties,n)}function HT(t,e,n,r,i,s={}){const o=t.Qu(s.merge||s.mergeFields?2:0,e,n,i);Hp("Data must be an object, but it was:",o,r);const u=GT(r,o);let l,c;if(s.merge)l=new kt(o.fieldMask),c=o.fieldTransforms;else if(s.mergeFields){const d=[];for(const f of s.mergeFields){const m=nf(e,f,n);if(!o.contains(m))throw new H(j.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);QT(d,m)||d.push(m)}l=new kt(d),c=o.fieldTransforms.filter(f=>l.covers(f.field))}else l=null,c=o.fieldTransforms;return new iD(new wt(u),l,c)}class wc extends $p{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof wc}}function oD(t,e,n,r){const i=t.Qu(1,e,n);Hp("Data must be an object, but it was:",i,r);const s=[],o=wt.empty();gi(r,(l,c)=>{const d=Gp(e,l,n);c=Ve(c);const f=i.Nu(d);if(c instanceof wc)s.push(d);else{const m=ka(c,f);m!=null&&(s.push(d),o.set(d,m))}});const u=new kt(s);return new WT(o,u,i.fieldTransforms)}function aD(t,e,n,r,i,s){const o=t.Qu(1,e,n),u=[nf(e,r,n)],l=[i];if(s.length%2!=0)throw new H(j.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<s.length;m+=2)u.push(nf(e,s[m])),l.push(s[m+1]);const c=[],d=wt.empty();for(let m=u.length-1;m>=0;--m)if(!QT(c,u[m])){const v=u[m];let x=l[m];x=Ve(x);const P=o.Nu(v);if(x instanceof wc)c.push(v);else{const k=ka(x,P);k!=null&&(c.push(v),d.set(v,k))}}const f=new kt(c);return new WT(d,f,o.fieldTransforms)}function lD(t,e,n,r=!1){return ka(n,t.Qu(r?4:3,e))}function ka(t,e){if(KT(t=Ve(t)))return Hp("Unsupported field value:",e,t),GT(t,e);if(t instanceof $p)return function(r,i){if(!qT(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const u of r){let l=ka(u,i.Lu(o));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),o++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=Ve(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return nb(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=ge.fromDate(r);return{timestampValue:Iu(i.serializer,s)}}if(r instanceof ge){const s=new ge(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Iu(i.serializer,s)}}if(r instanceof zp)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof vs)return{bytesValue:dT(i.serializer,r._byteString)};if(r instanceof mt){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Pp(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Wp)return function(o,u){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(l=>{if(typeof l!="number")throw u.Bu("VectorValues must only contain numeric values.");return xp(u.serializer,l)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${gc(r)}`)}(t,e)}function GT(t,e){const n={};return FE(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):gi(t,(r,i)=>{const s=ka(i,e.Mu(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function KT(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof ge||t instanceof zp||t instanceof vs||t instanceof mt||t instanceof $p||t instanceof Wp)}function Hp(t,e,n){if(!KT(n)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(n)){const r=gc(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function nf(t,e,n){if((e=Ve(e))instanceof vc)return e._internalPath;if(typeof e=="string")return Gp(t,e);throw Au("Field path arguments must be of type string or ",t,!1,void 0,n)}const uD=new RegExp("[~\\*/\\[\\]]");function Gp(t,e,n){if(e.search(uD)>=0)throw Au(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new vc(...e.split("."))._internalPath}catch{throw Au(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Au(t,e,n,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let u=`Function ${e}() called with invalid data`;n&&(u+=" (via `toFirestore()`)"),u+=". ";let l="";return(s||o)&&(l+=" (found",s&&(l+=` in field ${r}`),o&&(l+=` in document ${i}`),l+=")"),new H(j.INVALID_ARGUMENT,u+t+l)}function QT(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YT{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new mt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new cD(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Ec("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class cD extends YT{data(){return super.data()}}function Ec(t,e){return typeof e=="string"?Gp(t,e):e instanceof vc?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dD(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new H(j.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Kp{}class XT extends Kp{}function JT(t,e,...n){let r=[];e instanceof Kp&&r.push(e),r=r.concat(n),function(s){const o=s.filter(l=>l instanceof Qp).length,u=s.filter(l=>l instanceof Tc).length;if(o>1||o>0&&u>0)throw new H(j.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)t=i._apply(t);return t}class Tc extends XT{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new Tc(e,n,r)}_apply(e){const n=this._parse(e);return ZT(e._query,n),new vi(e.firestore,e.converter,Hh(e._query,n))}_parse(e){const n=_c(e.firestore);return function(s,o,u,l,c,d,f){let m;if(c.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new H(j.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){Fv(f,d);const v=[];for(const x of f)v.push(jv(l,s,x));m={arrayValue:{values:v}}}else m=jv(l,s,f)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||Fv(f,d),m=lD(u,o,f,d==="in"||d==="not-in");return Oe.create(c,d,m)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function Cu(t,e,n){const r=e,i=Ec("where",t);return Tc._create(i,r,n)}class Qp extends Kp{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Qp(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:tn.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(i,s){let o=i;const u=s.getFlattenedFilters();for(const l of u)ZT(o,l),o=Hh(o,l)}(e._query,n),new vi(e.firestore,e.converter,Hh(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Yp extends XT{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new Yp(e,n)}_apply(e){const n=function(i,s,o){if(i.startAt!==null)throw new H(j.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new H(j.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ra(s,o)}(e._query,this._field,this._direction);return new vi(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new Ps(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,n))}}function hD(t,e="asc"){const n=e,r=Ec("orderBy",t);return Yp._create(r,n)}function jv(t,e,n){if(typeof(n=Ve(n))=="string"){if(n==="")throw new H(j.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!KE(e)&&n.indexOf("/")!==-1)throw new H(j.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(we.fromString(n));if(!Q.isDocumentKey(r))throw new H(j.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return ov(t,new Q(r))}if(n instanceof mt)return ov(t,n._key);throw new H(j.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${gc(n)}.`)}function Fv(t,e){if(!Array.isArray(t)||t.length===0)throw new H(j.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function ZT(t,e){const n=function(i,s){for(const o of i)for(const u of o.getFlattenedFilters())if(s.indexOf(u.op)>=0)return u.op;return null}(t.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new H(j.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new H(j.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class fD{convertValue(e,n="none"){switch(ai(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ke(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(oi(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw ee()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return gi(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var n,r,i;const s=(i=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>ke(o.doubleValue));return new Wp(s)}convertGeoPoint(e){return new zp(ke(e.latitude),ke(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=wp(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(ea(e));default:return null}}convertTimestamp(e){const n=Sr(e);return new ge(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=we.fromString(e);he(yT(r));const i=new ta(r.get(1),r.get(3)),s=new Q(r.popFirst(5));return i.isEqual(n)||Bn(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eI(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class tI extends YT{constructor(e,n,r,i,s,o){super(e,n,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Ul(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Ec("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Ul extends tI{data(e={}){return super.data(e)}}class pD{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new fo(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Ul(this._firestore,this._userDataWriter,r.key,r,new fo(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new H(j.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(u=>{const l=new Ul(i._firestore,i._userDataWriter,u.doc.key,u.doc,new fo(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);return u.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(u=>s||u.type!==3).map(u=>{const l=new Ul(i._firestore,i._userDataWriter,u.doc.key,u.doc,new fo(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);let c=-1,d=-1;return u.type!==0&&(c=o.indexOf(u.doc.key),o=o.delete(u.doc.key)),u.type!==1&&(o=o.add(u.doc),d=o.indexOf(u.doc.key)),{type:mD(u.type),doc:l,oldIndex:c,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function mD(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ee()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nI(t){t=_n(t,mt);const e=_n(t.firestore,bs);return XN(Bp(e),t._key).then(n=>_D(e,t,n))}class rI extends fD{constructor(e){super(),this.firestore=e}convertBytes(e){return new vs(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new mt(this.firestore,null,n)}}function iI(t){t=_n(t,vi);const e=_n(t.firestore,bs),n=Bp(e),r=new rI(e);return dD(t._query),JN(n,t._query).then(i=>new pD(e,r,t,i))}function gD(t,e,n){t=_n(t,mt);const r=_n(t.firestore,bs),i=eI(t.converter,e,n);return Xp(r,[HT(_c(r),"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,Xt.none())])}function yD(t,e,n,...r){t=_n(t,mt);const i=_n(t.firestore,bs),s=_c(i);let o;return o=typeof(e=Ve(e))=="string"||e instanceof vc?aD(s,"updateDoc",t._key,e,n,r):oD(s,"updateDoc",t._key,e),Xp(i,[o.toMutation(t._key,Xt.exists(!0))])}function vD(t,e){const n=_n(t.firestore,bs),r=Pa(t),i=eI(t.converter,e);return Xp(n,[HT(_c(t.firestore),"addDoc",r._key,i,t.converter!==null,{}).toMutation(r._key,Xt.exists(!1))]).then(()=>r)}function Xp(t,e){return function(r,i){const s=new Dn;return r.asyncQueue.enqueueAndForget(async()=>UN(await YN(r),i,s)),s.promise}(Bp(t),e)}function _D(t,e,n){const r=n.docs.get(e._key),i=new rI(t);return new tI(t,i,e._key,r,new fo(n.hasPendingWrites,n.fromCache),e.converter)}(function(e,n=!0){(function(i){Cs=i})(Ss),yn(new Zt("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),u=new bs(new _2(r.getProvider("auth-internal")),new I2(r.getProvider("app-check-internal")),function(c,d){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new H(j.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ta(c.options.projectId,d)}(o,i),o);return s=Object.assign({useFetchStreams:n},s),u._setSettings(s),u},"PUBLIC").setMultipleInstances(!0)),Ut(tv,"4.7.3",e),Ut(tv,"4.7.3","esm2017")})();const sI="@firebase/installations",Jp="0.6.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oI=1e4,aI=`w:${Jp}`,lI="FIS_v2",wD="https://firebaseinstallations.googleapis.com/v1",ED=60*60*1e3,TD="installations",ID="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SD={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},li=new fi(TD,ID,SD);function uI(t){return t instanceof nn&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cI({projectId:t}){return`${wD}/projects/${t}/installations`}function dI(t){return{token:t.token,requestStatus:2,expiresIn:AD(t.expiresIn),creationTime:Date.now()}}async function hI(t,e){const r=(await e.json()).error;return li.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function fI({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function xD(t,{refreshToken:e}){const n=fI(t);return n.append("Authorization",CD(e)),n}async function pI(t){const e=await t();return e.status>=500&&e.status<600?t():e}function AD(t){return Number(t.replace("s","000"))}function CD(t){return`${lI} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PD({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=cI(t),i=fI(t),s=e.getImmediate({optional:!0});if(s){const c=await s.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={fid:n,authVersion:lI,appId:t.appId,sdkVersion:aI},u={method:"POST",headers:i,body:JSON.stringify(o)},l=await pI(()=>fetch(r,u));if(l.ok){const c=await l.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:dI(c.authToken)}}else throw await hI("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mI(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kD(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RD=/^[cdef][\w-]{21}$/,rf="";function bD(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=ND(t);return RD.test(n)?n:rf}catch{return rf}}function ND(t){return kD(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ic(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gI=new Map;function yI(t,e){const n=Ic(t);vI(n,e),DD(n,e)}function vI(t,e){const n=gI.get(t);if(n)for(const r of n)r(e)}function DD(t,e){const n=OD();n&&n.postMessage({key:t,fid:e}),MD()}let Kr=null;function OD(){return!Kr&&"BroadcastChannel"in self&&(Kr=new BroadcastChannel("[Firebase] FID Change"),Kr.onmessage=t=>{vI(t.data.key,t.data.fid)}),Kr}function MD(){gI.size===0&&Kr&&(Kr.close(),Kr=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LD="firebase-installations-database",VD=1,ui="firebase-installations-store";let bd=null;function Zp(){return bd||(bd=Kw(LD,VD,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(ui)}}})),bd}async function Pu(t,e){const n=Ic(t),i=(await Zp()).transaction(ui,"readwrite"),s=i.objectStore(ui),o=await s.get(n);return await s.put(e,n),await i.done,(!o||o.fid!==e.fid)&&yI(t,e.fid),e}async function _I(t){const e=Ic(t),r=(await Zp()).transaction(ui,"readwrite");await r.objectStore(ui).delete(e),await r.done}async function Sc(t,e){const n=Ic(t),i=(await Zp()).transaction(ui,"readwrite"),s=i.objectStore(ui),o=await s.get(n),u=e(o);return u===void 0?await s.delete(n):await s.put(u,n),await i.done,u&&(!o||o.fid!==u.fid)&&yI(t,u.fid),u}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function em(t){let e;const n=await Sc(t.appConfig,r=>{const i=jD(r),s=FD(t,i);return e=s.registrationPromise,s.installationEntry});return n.fid===rf?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function jD(t){const e=t||{fid:bD(),registrationStatus:0};return wI(e)}function FD(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(li.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=UD(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:BD(t)}:{installationEntry:e}}async function UD(t,e){try{const n=await PD(t,e);return Pu(t.appConfig,n)}catch(n){throw uI(n)&&n.customData.serverCode===409?await _I(t.appConfig):await Pu(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function BD(t){let e=await Uv(t.appConfig);for(;e.registrationStatus===1;)await mI(100),e=await Uv(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await em(t);return r||n}return e}function Uv(t){return Sc(t,e=>{if(!e)throw li.create("installation-not-found");return wI(e)})}function wI(t){return $D(t)?{fid:t.fid,registrationStatus:0}:t}function $D(t){return t.registrationStatus===1&&t.registrationTime+oI<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zD({appConfig:t,heartbeatServiceProvider:e},n){const r=WD(t,n),i=xD(t,n),s=e.getImmediate({optional:!0});if(s){const c=await s.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={installation:{sdkVersion:aI,appId:t.appId}},u={method:"POST",headers:i,body:JSON.stringify(o)},l=await pI(()=>fetch(r,u));if(l.ok){const c=await l.json();return dI(c)}else throw await hI("Generate Auth Token",l)}function WD(t,{fid:e}){return`${cI(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tm(t,e=!1){let n;const r=await Sc(t.appConfig,s=>{if(!EI(s))throw li.create("not-registered");const o=s.authToken;if(!e&&GD(o))return s;if(o.requestStatus===1)return n=qD(t,e),s;{if(!navigator.onLine)throw li.create("app-offline");const u=QD(s);return n=HD(t,u),u}});return n?await n:r.authToken}async function qD(t,e){let n=await Bv(t.appConfig);for(;n.authToken.requestStatus===1;)await mI(100),n=await Bv(t.appConfig);const r=n.authToken;return r.requestStatus===0?tm(t,e):r}function Bv(t){return Sc(t,e=>{if(!EI(e))throw li.create("not-registered");const n=e.authToken;return YD(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function HD(t,e){try{const n=await zD(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await Pu(t.appConfig,r),n}catch(n){if(uI(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await _I(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Pu(t.appConfig,r)}throw n}}function EI(t){return t!==void 0&&t.registrationStatus===2}function GD(t){return t.requestStatus===2&&!KD(t)}function KD(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+ED}function QD(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function YD(t){return t.requestStatus===1&&t.requestTime+oI<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XD(t){const e=t,{installationEntry:n,registrationPromise:r}=await em(e);return r?r.catch(console.error):tm(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function JD(t,e=!1){const n=t;return await ZD(n),(await tm(n,e)).token}async function ZD(t){const{registrationPromise:e}=await em(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eO(t){if(!t||!t.options)throw Nd("App Configuration");if(!t.name)throw Nd("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Nd(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Nd(t){return li.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TI="installations",tO="installations-internal",nO=t=>{const e=t.getProvider("app").getImmediate(),n=eO(e),r=pi(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},rO=t=>{const e=t.getProvider("app").getImmediate(),n=pi(e,TI).getImmediate();return{getId:()=>XD(n),getToken:i=>JD(n,i)}};function iO(){yn(new Zt(TI,nO,"PUBLIC")),yn(new Zt(tO,rO,"PRIVATE"))}iO();Ut(sI,Jp);Ut(sI,Jp,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ku="analytics",sO="firebase_id",oO="origin",aO=60*1e3,lO="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",nm="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt=new nc("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uO={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},bt=new fi("analytics","Analytics",uO);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cO(t){if(!t.startsWith(nm)){const e=bt.create("invalid-gtag-resource",{gtagURL:t});return xt.warn(e.message),""}return t}function II(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function dO(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function hO(t,e){const n=dO("firebase-js-sdk-policy",{createScriptURL:cO}),r=document.createElement("script"),i=`${nm}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function fO(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function pO(t,e,n,r,i,s){const o=r[i];try{if(o)await e[o];else{const l=(await II(n)).find(c=>c.measurementId===i);l&&await e[l.appId]}}catch(u){xt.error(u)}t("config",i,s)}async function mO(t,e,n,r,i){try{let s=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);const u=await II(n);for(const l of o){const c=u.find(f=>f.measurementId===l),d=c&&e[c.appId];if(d)s.push(d);else{s=[];break}}}s.length===0&&(s=Object.values(e)),await Promise.all(s),t("event",r,i||{})}catch(s){xt.error(s)}}function gO(t,e,n,r){async function i(s,...o){try{if(s==="event"){const[u,l]=o;await mO(t,e,n,u,l)}else if(s==="config"){const[u,l]=o;await pO(t,e,n,r,u,l)}else if(s==="consent"){const[u,l]=o;t("consent",u,l)}else if(s==="get"){const[u,l,c]=o;t("get",u,l,c)}else if(s==="set"){const[u]=o;t("set",u)}else t(s,...o)}catch(u){xt.error(u)}}return i}function yO(t,e,n,r,i){let s=function(...o){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=gO(s,t,e,n),{gtagCore:s,wrappedGtag:window[i]}}function vO(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(nm)&&n.src.includes(t))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _O=30,wO=1e3;class EO{constructor(e={},n=wO){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const SI=new EO;function TO(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function IO(t){var e;const{appId:n,apiKey:r}=t,i={method:"GET",headers:TO(r)},s=lO.replace("{app-id}",n),o=await fetch(s,i);if(o.status!==200&&o.status!==304){let u="";try{const l=await o.json();!((e=l.error)===null||e===void 0)&&e.message&&(u=l.error.message)}catch{}throw bt.create("config-fetch-failed",{httpStatus:o.status,responseMessage:u})}return o.json()}async function SO(t,e=SI,n){const{appId:r,apiKey:i,measurementId:s}=t.options;if(!r)throw bt.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw bt.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},u=new CO;return setTimeout(async()=>{u.abort()},aO),xI({appId:r,apiKey:i,measurementId:s},o,u,e)}async function xI(t,{throttleEndTimeMillis:e,backoffCount:n},r,i=SI){var s;const{appId:o,measurementId:u}=t;try{await xO(r,e)}catch(l){if(u)return xt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:o,measurementId:u};throw l}try{const l=await IO(t);return i.deleteThrottleMetadata(o),l}catch(l){const c=l;if(!AO(c)){if(i.deleteThrottleMetadata(o),u)return xt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:o,measurementId:u};throw l}const d=Number((s=c==null?void 0:c.customData)===null||s===void 0?void 0:s.httpStatus)===503?xy(n,i.intervalMillis,_O):xy(n,i.intervalMillis),f={throttleEndTimeMillis:Date.now()+d,backoffCount:n+1};return i.setThrottleMetadata(o,f),xt.debug(`Calling attemptFetch again in ${d} millis`),xI(t,f,r,i)}}function xO(t,e){return new Promise((n,r)=>{const i=Math.max(e-Date.now(),0),s=setTimeout(n,i);t.addEventListener(()=>{clearTimeout(s),r(bt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function AO(t){if(!(t instanceof nn)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class CO{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function PO(t,e,n,r,i){if(i&&i.global){t("event",n,r);return}else{const s=await e,o=Object.assign(Object.assign({},r),{send_to:s});t("event",n,o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kO(){if(Ww())try{await qw()}catch(t){return xt.warn(bt.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return xt.warn(bt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function RO(t,e,n,r,i,s,o){var u;const l=SO(t);l.then(v=>{n[v.measurementId]=v.appId,t.options.measurementId&&v.measurementId!==t.options.measurementId&&xt.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${v.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(v=>xt.error(v)),e.push(l);const c=kO().then(v=>{if(v)return r.getId()}),[d,f]=await Promise.all([l,c]);vO(s)||hO(s,d.measurementId),i("js",new Date);const m=(u=o==null?void 0:o.config)!==null&&u!==void 0?u:{};return m[oO]="firebase",m.update=!0,f!=null&&(m[sO]=f),i("config",d.measurementId,m),d.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bO{constructor(e){this.app=e}_delete(){return delete ko[this.app.options.appId],Promise.resolve()}}let ko={},$v=[];const zv={};let Dd="dataLayer",NO="gtag",Wv,AI,qv=!1;function DO(){const t=[];if(zw()&&t.push("This is a browser extension environment."),FC()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,i)=>`(${i+1}) ${r}`).join(" "),n=bt.create("invalid-analytics-context",{errorInfo:e});xt.warn(n.message)}}function OO(t,e,n){DO();const r=t.options.appId;if(!r)throw bt.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)xt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw bt.create("no-api-key");if(ko[r]!=null)throw bt.create("already-exists",{id:r});if(!qv){fO(Dd);const{wrappedGtag:s,gtagCore:o}=yO(ko,$v,zv,Dd,NO);AI=s,Wv=o,qv=!0}return ko[r]=RO(t,$v,zv,e,Wv,Dd,n),new bO(t)}function MO(t=ap()){t=Ve(t);const e=pi(t,ku);return e.isInitialized()?e.getImmediate():LO(t)}function LO(t,e={}){const n=pi(t,ku);if(n.isInitialized()){const i=n.getImmediate();if(Qo(e,n.getOptions()))return i;throw bt.create("already-initialized")}return n.initialize({options:e})}function VO(t,e,n,r){t=Ve(t),PO(AI,ko[t.app.options.appId],e,n,r).catch(i=>xt.error(i))}const Hv="@firebase/analytics",Gv="0.10.8";function jO(){yn(new Zt(ku,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate();return OO(r,i,n)},"PUBLIC")),yn(new Zt("analytics-internal",t,"PRIVATE")),Ut(Hv,Gv),Ut(Hv,Gv,"esm2017");function t(e){try{const n=e.getProvider(ku).getImmediate();return{logEvent:(r,i,s)=>VO(n,r,i,s)}}catch(n){throw bt.create("interop-component-reg-failed",{reason:n})}}}jO();const FO={apiKey:"AIzaSyD1X2EGDvB7Eu4ZEPig2PjusG7k-kfHY_Q",authDomain:"qcut-e9573.firebaseapp.com",projectId:"qcut-e9573",storageBucket:"qcut-e9573.firebasestorage.app",messagingSenderId:"11270932349",appId:"1:11270932349:web:2790f6267371492acaee14",measurementId:"G-90FVT3FSCK"},rm=Qw(FO),im=f2(rm),_i=tD(rm);MO(rm);const UO=async(t,e)=>{try{return{success:!0,user:(await Jk(im,t,e)).user}}catch(n){console.error("Error al iniciar sesión:",n);let r="Error al iniciar sesión";switch(n.code){case"auth/user-not-found":case"auth/wrong-password":r="Email o contraseña incorrectos";break;case"auth/too-many-requests":r="Demasiados intentos. Intenta más tarde";break;case"auth/invalid-email":r="Email inválido";break;default:r=n.message}return{success:!1,error:r}}},BO=async()=>{try{return await nR(im),{success:!0}}catch(t){return console.error("Error al cerrar sesión:",t),{success:!1,error:t.message}}},$O=t=>tR(im,t),sf=async t=>{try{const e=Pa(_i,"barbers",t,"config","barberdata"),n=await nI(e);return n.exists()?{success:!0,data:n.data()}:{success:!1,error:"No se encontraron datos de la barbería"}}catch(e){return console.error("Error al obtener datos de barbería:",e),{success:!1,error:e.message}}},zO=async(t,e)=>{try{const n=Pa(_i,"barbers",t,"config","barberdata");return await gD(n,e,{merge:!0}),{success:!0}}catch(n){return console.error("Error al actualizar datos de barbería:",n),{success:!1,error:n.message}}},WO=async(t,e,n)=>{try{const r=Up(_i,"barbers",t,"appointments"),i=[Cu("date",">=",ge.fromDate(e)),hD("date","asc")];n&&i.splice(1,0,Cu("date","<=",ge.fromDate(n)));const s=JT(r,...i),o=await iI(s),u=[];return o.forEach(l=>{u.push({id:l.id,...l.data(),date:l.data().date.toDate()})}),{success:!0,data:u}}catch(r){return console.error("Error al obtener citas:",r),{success:!1,error:r.message}}},qO=async(t,e)=>{try{const n=Up(_i,"barbers",t,"appointments");return{success:!0,id:(await vD(n,{...e,date:ge.fromDate(e.date),createdAt:ge.now()})).id}}catch(n){return console.error("Error al crear cita:",n),{success:!1,error:n.message}}},HO=async(t,e,n)=>{try{const r=Pa(_i,"barbers",t,"appointments",e);return await yD(r,{status:n,updatedAt:ge.now()}),{success:!0}}catch(r){return console.error("Error al actualizar cita:",r),{success:!1,error:r.message}}},GO=async(t,e)=>{try{const n=new Date(e);n.setHours(0,0,0,0);const r=new Date(e);r.setHours(23,59,59,999);const i=Up(_i,"barbers",t,"appointments"),s=JT(i,Cu("date",">=",ge.fromDate(n)),Cu("date","<=",ge.fromDate(r))),o=await iI(s),u=[];return o.forEach(l=>{u.push({id:l.id,...l.data(),date:l.data().date.toDate()})}),{success:!0,data:u}}catch(n){return console.error("Error al obtener citas por fecha:",n),{success:!1,error:n.message}}},KO=async t=>{try{const e=Pa(_i,"barbers",t,"config","barberdata"),n=await nI(e);if(n.exists()){const r=n.data();return{success:!0,data:{openingTime:r.openingTime||"09:00",closingTime:r.closingTime||"18:00",appointmentDuration:r.appointmentDuration||30,workingDays:r.workingDays||[1,2,3,4,5,6],blockedTimes:r.blockedTimes||[]}}}return{success:!1,error:"No se encontró configuración"}}catch(e){return console.error("Error al obtener configuración:",e),{success:!1,error:e.message}}},CI=M.createContext(),xc=()=>{const t=M.useContext(CI);if(!t)throw new Error("useAuth debe usarse dentro de AuthProvider");return t},QO=({children:t})=>{const[e,n]=M.useState(null),[r,i]=M.useState(null),[s,o]=M.useState(!0),u=async()=>{if(e!=null&&e.uid){const c=await sf(e.uid);return c.success&&i(c.data),c}};M.useEffect(()=>{const c=$O(async d=>{if(d){n(d);const f=await sf(d.uid);f.success&&i(f.data)}else n(null),i(null);o(!1)});return()=>c()},[]);const l={user:e,barberData:r,refreshBarberData:u,loading:s,isAuthenticated:!!e,uid:e==null?void 0:e.uid};return g.jsx(CI.Provider,{value:l,children:t})};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var YO={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XO=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),fe=(t,e)=>{const n=M.forwardRef(({color:r="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:u="",children:l,...c},d)=>M.createElement("svg",{ref:d,...YO,width:i,height:i,stroke:r,strokeWidth:o?Number(s)*24/Number(i):s,className:["lucide",`lucide-${XO(t)}`,u].join(" "),...c},[...e.map(([f,m])=>M.createElement(f,m)),...Array.isArray(l)?l:[l]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kv=fe("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JO=fe("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ru=fe("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const of=fe("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _s=fe("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZO=fe("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eM=fe("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sm=fe("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tM=fe("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nM=fe("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rM=fe("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iM=fe("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PI=fe("Loader",[["line",{x1:"12",x2:"12",y1:"2",y2:"6",key:"gza1u7"}],["line",{x1:"12",x2:"12",y1:"18",y2:"22",key:"1qhbu9"}],["line",{x1:"4.93",x2:"7.76",y1:"4.93",y2:"7.76",key:"xae44r"}],["line",{x1:"16.24",x2:"19.07",y1:"16.24",y2:"19.07",key:"bxnmvf"}],["line",{x1:"2",x2:"6",y1:"12",y2:"12",key:"89khin"}],["line",{x1:"18",x2:"22",y1:"12",y2:"12",key:"pb8tfm"}],["line",{x1:"4.93",x2:"7.76",y1:"19.07",y2:"16.24",key:"1uxjnu"}],["line",{x1:"16.24",x2:"19.07",y1:"7.76",y2:"4.93",key:"6duxfx"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sM=fe("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oM=fe("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oa=fe("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aM=fe("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lM=fe("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bu=fe("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uM=fe("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cM=fe("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dM=fe("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hM=fe("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qv=fe("ToggleLeft",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"6",ry:"6",key:"f2vt7d"}],["circle",{cx:"8",cy:"12",r:"2",key:"1nvbw3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yv=fe("ToggleRight",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"6",ry:"6",key:"f2vt7d"}],["circle",{cx:"16",cy:"12",r:"2",key:"4ma0v8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fM=fe("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aa=fe("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pM=fe("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mM=fe("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),la=({size:t="medium",text:e=""})=>{const n={small:"w-4 h-4",medium:"w-8 h-8",large:"w-12 h-12"};return g.jsxs("div",{className:"flex flex-col items-center justify-center gap-3",children:[g.jsx(PI,{className:`${n[t]} animate-spin text-primary`}),e&&g.jsx("p",{className:"text-text-secondary text-sm",children:e})]})},Xv=({children:t})=>{const{isAuthenticated:e,loading:n}=xc();return n?g.jsx("div",{className:"min-h-screen flex items-center justify-center",children:g.jsx(la,{size:"large"})}):e?t:g.jsx(kh,{to:"/login",replace:!0})},gM=()=>{const t=Ju(),[e,n]=M.useState({email:"",password:""}),[r,i]=M.useState(!1),[s,o]=M.useState({}),u=()=>{const d={};return e.email?/\S+@\S+\.\S+/.test(e.email)||(d.email="Email inválido"):d.email="El email es requerido",e.password?e.password.length<6&&(d.password="La contraseña debe tener al menos 6 caracteres"):d.password="La contraseña es requerida",o(d),Object.keys(d).length===0},l=async d=>{if(d.preventDefault(),!u())return;i(!0);const f=await UO(e.email,e.password);f.success?(Ne.success("Inicio de sesión exitoso"),t("/dashboard")):Ne.error(f.error),i(!1)},c=d=>{const{name:f,value:m}=d.target;n(v=>({...v,[f]:m})),s[f]&&o(v=>({...v,[f]:""}))};return g.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-gray-50 px-4",children:g.jsxs("div",{className:"w-full max-w-md",children:[g.jsxs("div",{className:"text-center mb-8",children:[g.jsx("h1",{className:"text-4xl font-bold text-primary mb-2",children:"Qcut"}),g.jsx("p",{className:"text-text-secondary",children:"Gestión profesional de citas"})]}),g.jsxs("div",{className:"card",children:[g.jsx("h2",{className:"text-2xl font-semibold text-primary mb-6",children:"Iniciar Sesión"}),g.jsxs("form",{onSubmit:l,className:"space-y-5",children:[g.jsxs("div",{children:[g.jsx("label",{htmlFor:"email",className:"label",children:"Email"}),g.jsxs("div",{className:"relative",children:[g.jsx(oa,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5"}),g.jsx("input",{type:"email",id:"email",name:"email",value:e.email,onChange:c,className:`input pl-11 ${s.email?"input-error":""}`,placeholder:"tu@email.com",disabled:r})]}),s.email&&g.jsx("p",{className:"mt-1 text-sm text-danger",children:s.email})]}),g.jsxs("div",{children:[g.jsx("label",{htmlFor:"password",className:"label",children:"Contraseña"}),g.jsxs("div",{className:"relative",children:[g.jsx(sM,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5"}),g.jsx("input",{type:"password",id:"password",name:"password",value:e.password,onChange:c,className:`input pl-11 ${s.password?"input-error":""}`,placeholder:"••••••••",disabled:r})]}),s.password&&g.jsx("p",{className:"mt-1 text-sm text-danger",children:s.password})]}),g.jsx("button",{type:"submit",disabled:r,className:"btn-primary w-full flex items-center justify-center gap-2",children:r?g.jsxs(g.Fragment,{children:[g.jsx(PI,{className:"w-5 h-5 animate-spin"}),"Iniciando sesión..."]}):"Iniciar Sesión"})]})]}),g.jsx("p",{className:"text-center text-text-secondary text-sm mt-6",children:"Sistema de gestión de citas para barberías"})]})})},kI=()=>{var i;const t=Ju(),{user:e,barberData:n}=xc(),r=async()=>{(await BO()).success?(Ne.success("Sesión cerrada"),t("/login")):Ne.error("Error al cerrar sesión")};return g.jsx("header",{className:"bg-white border-b border-border sticky top-0 z-50 shadow-elegant",children:g.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:g.jsxs("div",{className:"flex items-center justify-between h-16",children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("h1",{className:"text-2xl font-bold text-primary",children:"Qcut"}),(n==null?void 0:n.name)&&g.jsx("span",{className:"hidden sm:block text-text-secondary text-sm border-l border-border pl-3",children:n.name})]}),g.jsxs("div",{className:"flex items-center gap-4",children:[g.jsx("button",{onClick:()=>t("/settings"),className:"p-2 hover:bg-background rounded-elegant transition-colors","aria-label":"Configuración",children:g.jsx(hM,{className:"w-5 h-5 text-text-secondary"})}),g.jsxs("div",{className:"flex items-center gap-2 px-3 py-1.5 bg-background rounded-elegant",children:[g.jsx(aa,{className:"w-4 h-4 text-text-secondary"}),g.jsx("span",{className:"text-sm font-medium text-primary hidden sm:block",children:(i=e==null?void 0:e.email)==null?void 0:i.split("@")[0]})]}),g.jsxs("button",{onClick:r,className:"btn-secondary py-2 px-4 text-sm flex items-center gap-2",children:[g.jsx(oM,{className:"w-4 h-4"}),g.jsx("span",{className:"hidden sm:inline",children:"Cerrar Sesión"})]})]})]})})})};function Le(t){const e=Object.prototype.toString.call(t);return t instanceof Date||typeof t=="object"&&e==="[object Date]"?new t.constructor(+t):typeof t=="number"||e==="[object Number]"||typeof t=="string"||e==="[object String]"?new Date(t):new Date(NaN)}function Ar(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}function Nu(t,e){const n=Le(t);return isNaN(e)?Ar(t,NaN):(e&&n.setDate(n.getDate()+e),n)}const RI=6048e5,yM=864e5;let vM={};function Ac(){return vM}function ua(t,e){var u,l,c,d;const n=Ac(),r=(e==null?void 0:e.weekStartsOn)??((l=(u=e==null?void 0:e.locale)==null?void 0:u.options)==null?void 0:l.weekStartsOn)??n.weekStartsOn??((d=(c=n.locale)==null?void 0:c.options)==null?void 0:d.weekStartsOn)??0,i=Le(t),s=i.getDay(),o=(s<r?7:0)+s-r;return i.setDate(i.getDate()-o),i.setHours(0,0,0,0),i}function Du(t){return ua(t,{weekStartsOn:1})}function bI(t){const e=Le(t),n=e.getFullYear(),r=Ar(t,0);r.setFullYear(n+1,0,4),r.setHours(0,0,0,0);const i=Du(r),s=Ar(t,0);s.setFullYear(n,0,4),s.setHours(0,0,0,0);const o=Du(s);return e.getTime()>=i.getTime()?n+1:e.getTime()>=o.getTime()?n:n-1}function an(t){const e=Le(t);return e.setHours(0,0,0,0),e}function Jv(t){const e=Le(t),n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return n.setUTCFullYear(e.getFullYear()),+t-+n}function _M(t,e){const n=an(t),r=an(e),i=+n-Jv(n),s=+r-Jv(r);return Math.round((i-s)/yM)}function wM(t){const e=bI(t),n=Ar(t,0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),Du(n)}function EM(t,e){const n=an(t),r=an(e);return+n==+r}function TM(t){return t instanceof Date||typeof t=="object"&&Object.prototype.toString.call(t)==="[object Date]"}function IM(t){if(!TM(t)&&typeof t!="number")return!1;const e=Le(t);return!isNaN(Number(e))}function vl(t){const e=Le(t);return e.setHours(23,59,59,999),e}function Zv(t){const e=Le(t),n=e.getMonth();return e.setFullYear(e.getFullYear(),n+1,0),e.setHours(23,59,59,999),e}function SM(t,e){const n=Le(t.start),r=Le(t.end);let i=+n>+r;const s=i?+n:+r,o=i?r:n;o.setHours(0,0,0,0);let u=1;const l=[];for(;+o<=s;)l.push(Le(o)),o.setDate(o.getDate()+u),o.setHours(0,0,0,0);return i?l.reverse():l}function e_(t){const e=Le(t);return e.setDate(1),e.setHours(0,0,0,0),e}function xM(t){const e=Le(t),n=Ar(t,0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}const AM={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},CM=(t,e,n)=>{let r;const i=AM[t];return typeof i=="string"?r=i:e===1?r=i.one:r=i.other.replace("{{count}}",e.toString()),n!=null&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r};function rs(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const PM={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},kM={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},RM={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},bM={date:rs({formats:PM,defaultWidth:"full"}),time:rs({formats:kM,defaultWidth:"full"}),dateTime:rs({formats:RM,defaultWidth:"full"})},NM={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},DM=(t,e,n,r)=>NM[t];function ln(t){return(e,n)=>{const r=n!=null&&n.context?String(n.context):"standalone";let i;if(r==="formatting"&&t.formattingValues){const o=t.defaultFormattingWidth||t.defaultWidth,u=n!=null&&n.width?String(n.width):o;i=t.formattingValues[u]||t.formattingValues[o]}else{const o=t.defaultWidth,u=n!=null&&n.width?String(n.width):t.defaultWidth;i=t.values[u]||t.values[o]}const s=t.argumentCallback?t.argumentCallback(e):e;return i[s]}}const OM={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},MM={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},LM={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},VM={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},jM={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},FM={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},UM=(t,e)=>{const n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},BM={ordinalNumber:UM,era:ln({values:OM,defaultWidth:"wide"}),quarter:ln({values:MM,defaultWidth:"wide",argumentCallback:t=>t-1}),month:ln({values:LM,defaultWidth:"wide"}),day:ln({values:VM,defaultWidth:"wide"}),dayPeriod:ln({values:jM,defaultWidth:"wide",formattingValues:FM,defaultFormattingWidth:"wide"})};function un(t){return(e,n={})=>{const r=n.width,i=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],s=e.match(i);if(!s)return null;const o=s[0],u=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],l=Array.isArray(u)?zM(u,f=>f.test(o)):$M(u,f=>f.test(o));let c;c=t.valueCallback?t.valueCallback(l):l,c=n.valueCallback?n.valueCallback(c):c;const d=e.slice(o.length);return{value:c,rest:d}}}function $M(t,e){for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&e(t[n]))return n}function zM(t,e){for(let n=0;n<t.length;n++)if(e(t[n]))return n}function NI(t){return(e,n={})=>{const r=e.match(t.matchPattern);if(!r)return null;const i=r[0],s=e.match(t.parsePattern);if(!s)return null;let o=t.valueCallback?t.valueCallback(s[0]):s[0];o=n.valueCallback?n.valueCallback(o):o;const u=e.slice(i.length);return{value:o,rest:u}}}const WM=/^(\d+)(th|st|nd|rd)?/i,qM=/\d+/i,HM={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},GM={any:[/^b/i,/^(a|c)/i]},KM={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},QM={any:[/1/i,/2/i,/3/i,/4/i]},YM={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},XM={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},JM={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},ZM={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},eL={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},tL={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},nL={ordinalNumber:NI({matchPattern:WM,parsePattern:qM,valueCallback:t=>parseInt(t,10)}),era:un({matchPatterns:HM,defaultMatchWidth:"wide",parsePatterns:GM,defaultParseWidth:"any"}),quarter:un({matchPatterns:KM,defaultMatchWidth:"wide",parsePatterns:QM,defaultParseWidth:"any",valueCallback:t=>t+1}),month:un({matchPatterns:YM,defaultMatchWidth:"wide",parsePatterns:XM,defaultParseWidth:"any"}),day:un({matchPatterns:JM,defaultMatchWidth:"wide",parsePatterns:ZM,defaultParseWidth:"any"}),dayPeriod:un({matchPatterns:eL,defaultMatchWidth:"any",parsePatterns:tL,defaultParseWidth:"any"})},rL={code:"en-US",formatDistance:CM,formatLong:bM,formatRelative:DM,localize:BM,match:nL,options:{weekStartsOn:0,firstWeekContainsDate:1}};function iL(t){const e=Le(t);return _M(e,xM(e))+1}function sL(t){const e=Le(t),n=+Du(e)-+wM(e);return Math.round(n/RI)+1}function DI(t,e){var d,f,m,v;const n=Le(t),r=n.getFullYear(),i=Ac(),s=(e==null?void 0:e.firstWeekContainsDate)??((f=(d=e==null?void 0:e.locale)==null?void 0:d.options)==null?void 0:f.firstWeekContainsDate)??i.firstWeekContainsDate??((v=(m=i.locale)==null?void 0:m.options)==null?void 0:v.firstWeekContainsDate)??1,o=Ar(t,0);o.setFullYear(r+1,0,s),o.setHours(0,0,0,0);const u=ua(o,e),l=Ar(t,0);l.setFullYear(r,0,s),l.setHours(0,0,0,0);const c=ua(l,e);return n.getTime()>=u.getTime()?r+1:n.getTime()>=c.getTime()?r:r-1}function oL(t,e){var u,l,c,d;const n=Ac(),r=(e==null?void 0:e.firstWeekContainsDate)??((l=(u=e==null?void 0:e.locale)==null?void 0:u.options)==null?void 0:l.firstWeekContainsDate)??n.firstWeekContainsDate??((d=(c=n.locale)==null?void 0:c.options)==null?void 0:d.firstWeekContainsDate)??1,i=DI(t,e),s=Ar(t,0);return s.setFullYear(i,0,r),s.setHours(0,0,0,0),ua(s,e)}function aL(t,e){const n=Le(t),r=+ua(n,e)-+oL(n,e);return Math.round(r/RI)+1}function ce(t,e){const n=t<0?"-":"",r=Math.abs(t).toString().padStart(e,"0");return n+r}const Qn={y(t,e){const n=t.getFullYear(),r=n>0?n:1-n;return ce(e==="yy"?r%100:r,e.length)},M(t,e){const n=t.getMonth();return e==="M"?String(n+1):ce(n+1,2)},d(t,e){return ce(t.getDate(),e.length)},a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];case"aaaa":default:return n==="am"?"a.m.":"p.m."}},h(t,e){return ce(t.getHours()%12||12,e.length)},H(t,e){return ce(t.getHours(),e.length)},m(t,e){return ce(t.getMinutes(),e.length)},s(t,e){return ce(t.getSeconds(),e.length)},S(t,e){const n=e.length,r=t.getMilliseconds(),i=Math.trunc(r*Math.pow(10,n-3));return ce(i,e.length)}},Pi={midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},t_={G:function(t,e,n){const r=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if(e==="yo"){const r=t.getFullYear(),i=r>0?r:1-r;return n.ordinalNumber(i,{unit:"year"})}return Qn.y(t,e)},Y:function(t,e,n,r){const i=DI(t,r),s=i>0?i:1-i;if(e==="YY"){const o=s%100;return ce(o,2)}return e==="Yo"?n.ordinalNumber(s,{unit:"year"}):ce(s,e.length)},R:function(t,e){const n=bI(t);return ce(n,e.length)},u:function(t,e){const n=t.getFullYear();return ce(n,e.length)},Q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return ce(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return ce(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){const r=t.getMonth();switch(e){case"M":case"MM":return Qn.M(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){const r=t.getMonth();switch(e){case"L":return String(r+1);case"LL":return ce(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,r){const i=aL(t,r);return e==="wo"?n.ordinalNumber(i,{unit:"week"}):ce(i,e.length)},I:function(t,e,n){const r=sL(t);return e==="Io"?n.ordinalNumber(r,{unit:"week"}):ce(r,e.length)},d:function(t,e,n){return e==="do"?n.ordinalNumber(t.getDate(),{unit:"date"}):Qn.d(t,e)},D:function(t,e,n){const r=iL(t);return e==="Do"?n.ordinalNumber(r,{unit:"dayOfYear"}):ce(r,e.length)},E:function(t,e,n){const r=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){const i=t.getDay(),s=(i-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(s);case"ee":return ce(s,2);case"eo":return n.ordinalNumber(s,{unit:"day"});case"eee":return n.day(i,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(i,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(i,{width:"short",context:"formatting"});case"eeee":default:return n.day(i,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){const i=t.getDay(),s=(i-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(s);case"cc":return ce(s,e.length);case"co":return n.ordinalNumber(s,{unit:"day"});case"ccc":return n.day(i,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(i,{width:"narrow",context:"standalone"});case"cccccc":return n.day(i,{width:"short",context:"standalone"});case"cccc":default:return n.day(i,{width:"wide",context:"standalone"})}},i:function(t,e,n){const r=t.getDay(),i=r===0?7:r;switch(e){case"i":return String(i);case"ii":return ce(i,e.length);case"io":return n.ordinalNumber(i,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){const i=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(i,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(i,{width:"wide",context:"formatting"})}},b:function(t,e,n){const r=t.getHours();let i;switch(r===12?i=Pi.noon:r===0?i=Pi.midnight:i=r/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(i,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(i,{width:"wide",context:"formatting"})}},B:function(t,e,n){const r=t.getHours();let i;switch(r>=17?i=Pi.evening:r>=12?i=Pi.afternoon:r>=4?i=Pi.morning:i=Pi.night,e){case"B":case"BB":case"BBB":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(i,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(i,{width:"wide",context:"formatting"})}},h:function(t,e,n){if(e==="ho"){let r=t.getHours()%12;return r===0&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return Qn.h(t,e)},H:function(t,e,n){return e==="Ho"?n.ordinalNumber(t.getHours(),{unit:"hour"}):Qn.H(t,e)},K:function(t,e,n){const r=t.getHours()%12;return e==="Ko"?n.ordinalNumber(r,{unit:"hour"}):ce(r,e.length)},k:function(t,e,n){let r=t.getHours();return r===0&&(r=24),e==="ko"?n.ordinalNumber(r,{unit:"hour"}):ce(r,e.length)},m:function(t,e,n){return e==="mo"?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):Qn.m(t,e)},s:function(t,e,n){return e==="so"?n.ordinalNumber(t.getSeconds(),{unit:"second"}):Qn.s(t,e)},S:function(t,e){return Qn.S(t,e)},X:function(t,e,n){const r=t.getTimezoneOffset();if(r===0)return"Z";switch(e){case"X":return r_(r);case"XXXX":case"XX":return zr(r);case"XXXXX":case"XXX":default:return zr(r,":")}},x:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"x":return r_(r);case"xxxx":case"xx":return zr(r);case"xxxxx":case"xxx":default:return zr(r,":")}},O:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+n_(r,":");case"OOOO":default:return"GMT"+zr(r,":")}},z:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+n_(r,":");case"zzzz":default:return"GMT"+zr(r,":")}},t:function(t,e,n){const r=Math.trunc(t.getTime()/1e3);return ce(r,e.length)},T:function(t,e,n){const r=t.getTime();return ce(r,e.length)}};function n_(t,e=""){const n=t>0?"-":"+",r=Math.abs(t),i=Math.trunc(r/60),s=r%60;return s===0?n+String(i):n+String(i)+e+ce(s,2)}function r_(t,e){return t%60===0?(t>0?"-":"+")+ce(Math.abs(t)/60,2):zr(t,e)}function zr(t,e=""){const n=t>0?"-":"+",r=Math.abs(t),i=ce(Math.trunc(r/60),2),s=ce(r%60,2);return n+i+e+s}const i_=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}},OI=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}},lL=(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],r=n[1],i=n[2];if(!i)return i_(t,e);let s;switch(r){case"P":s=e.dateTime({width:"short"});break;case"PP":s=e.dateTime({width:"medium"});break;case"PPP":s=e.dateTime({width:"long"});break;case"PPPP":default:s=e.dateTime({width:"full"});break}return s.replace("{{date}}",i_(r,e)).replace("{{time}}",OI(i,e))},uL={p:OI,P:lL},cL=/^D+$/,dL=/^Y+$/,hL=["D","DD","YY","YYYY"];function fL(t){return cL.test(t)}function pL(t){return dL.test(t)}function mL(t,e,n){const r=gL(t,e,n);if(console.warn(r),hL.includes(t))throw new RangeError(r)}function gL(t,e,n){const r=t[0]==="Y"?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}const yL=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,vL=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,_L=/^'([^]*?)'?$/,wL=/''/g,EL=/[a-zA-Z]/;function Hi(t,e,n){var d,f,m,v,x,P,k,E;const r=Ac(),i=(n==null?void 0:n.locale)??r.locale??rL,s=(n==null?void 0:n.firstWeekContainsDate)??((f=(d=n==null?void 0:n.locale)==null?void 0:d.options)==null?void 0:f.firstWeekContainsDate)??r.firstWeekContainsDate??((v=(m=r.locale)==null?void 0:m.options)==null?void 0:v.firstWeekContainsDate)??1,o=(n==null?void 0:n.weekStartsOn)??((P=(x=n==null?void 0:n.locale)==null?void 0:x.options)==null?void 0:P.weekStartsOn)??r.weekStartsOn??((E=(k=r.locale)==null?void 0:k.options)==null?void 0:E.weekStartsOn)??0,u=Le(t);if(!IM(u))throw new RangeError("Invalid time value");let l=e.match(vL).map(w=>{const T=w[0];if(T==="p"||T==="P"){const O=uL[T];return O(w,i.formatLong)}return w}).join("").match(yL).map(w=>{if(w==="''")return{isToken:!1,value:"'"};const T=w[0];if(T==="'")return{isToken:!1,value:TL(w)};if(t_[T])return{isToken:!0,value:w};if(T.match(EL))throw new RangeError("Format string contains an unescaped latin alphabet character `"+T+"`");return{isToken:!1,value:w}});i.localize.preprocessor&&(l=i.localize.preprocessor(u,l));const c={firstWeekContainsDate:s,weekStartsOn:o,locale:i};return l.map(w=>{if(!w.isToken)return w.value;const T=w.value;(!(n!=null&&n.useAdditionalWeekYearTokens)&&pL(T)||!(n!=null&&n.useAdditionalDayOfYearTokens)&&fL(T))&&mL(T,e,String(t));const O=t_[T[0]];return O(u,T,i.localize,c)}).join("")}function TL(t){const e=t.match(_L);return e?e[1].replace(wL,"'"):t}function IL(t,e){const n=Le(t),r=Le(e);return+n<+r}const SL={lessThanXSeconds:{one:"menos de un segundo",other:"menos de {{count}} segundos"},xSeconds:{one:"1 segundo",other:"{{count}} segundos"},halfAMinute:"medio minuto",lessThanXMinutes:{one:"menos de un minuto",other:"menos de {{count}} minutos"},xMinutes:{one:"1 minuto",other:"{{count}} minutos"},aboutXHours:{one:"alrededor de 1 hora",other:"alrededor de {{count}} horas"},xHours:{one:"1 hora",other:"{{count}} horas"},xDays:{one:"1 día",other:"{{count}} días"},aboutXWeeks:{one:"alrededor de 1 semana",other:"alrededor de {{count}} semanas"},xWeeks:{one:"1 semana",other:"{{count}} semanas"},aboutXMonths:{one:"alrededor de 1 mes",other:"alrededor de {{count}} meses"},xMonths:{one:"1 mes",other:"{{count}} meses"},aboutXYears:{one:"alrededor de 1 año",other:"alrededor de {{count}} años"},xYears:{one:"1 año",other:"{{count}} años"},overXYears:{one:"más de 1 año",other:"más de {{count}} años"},almostXYears:{one:"casi 1 año",other:"casi {{count}} años"}},xL=(t,e,n)=>{let r;const i=SL[t];return typeof i=="string"?r=i:e===1?r=i.one:r=i.other.replace("{{count}}",e.toString()),n!=null&&n.addSuffix?n.comparison&&n.comparison>0?"en "+r:"hace "+r:r},AL={full:"EEEE, d 'de' MMMM 'de' y",long:"d 'de' MMMM 'de' y",medium:"d MMM y",short:"dd/MM/y"},CL={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},PL={full:"{{date}} 'a las' {{time}}",long:"{{date}} 'a las' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},kL={date:rs({formats:AL,defaultWidth:"full"}),time:rs({formats:CL,defaultWidth:"full"}),dateTime:rs({formats:PL,defaultWidth:"full"})},RL={lastWeek:"'el' eeee 'pasado a la' p",yesterday:"'ayer a la' p",today:"'hoy a la' p",tomorrow:"'mañana a la' p",nextWeek:"eeee 'a la' p",other:"P"},bL={lastWeek:"'el' eeee 'pasado a las' p",yesterday:"'ayer a las' p",today:"'hoy a las' p",tomorrow:"'mañana a las' p",nextWeek:"eeee 'a las' p",other:"P"},NL=(t,e,n,r)=>e.getHours()!==1?bL[t]:RL[t],DL={narrow:["AC","DC"],abbreviated:["AC","DC"],wide:["antes de cristo","después de cristo"]},OL={narrow:["1","2","3","4"],abbreviated:["T1","T2","T3","T4"],wide:["1º trimestre","2º trimestre","3º trimestre","4º trimestre"]},ML={narrow:["e","f","m","a","m","j","j","a","s","o","n","d"],abbreviated:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],wide:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]},LL={narrow:["d","l","m","m","j","v","s"],short:["do","lu","ma","mi","ju","vi","sá"],abbreviated:["dom","lun","mar","mié","jue","vie","sáb"],wide:["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]},VL={narrow:{am:"a",pm:"p",midnight:"mn",noon:"md",morning:"mañana",afternoon:"tarde",evening:"tarde",night:"noche"},abbreviated:{am:"AM",pm:"PM",midnight:"medianoche",noon:"mediodia",morning:"mañana",afternoon:"tarde",evening:"tarde",night:"noche"},wide:{am:"a.m.",pm:"p.m.",midnight:"medianoche",noon:"mediodia",morning:"mañana",afternoon:"tarde",evening:"tarde",night:"noche"}},jL={narrow:{am:"a",pm:"p",midnight:"mn",noon:"md",morning:"de la mañana",afternoon:"de la tarde",evening:"de la tarde",night:"de la noche"},abbreviated:{am:"AM",pm:"PM",midnight:"medianoche",noon:"mediodia",morning:"de la mañana",afternoon:"de la tarde",evening:"de la tarde",night:"de la noche"},wide:{am:"a.m.",pm:"p.m.",midnight:"medianoche",noon:"mediodia",morning:"de la mañana",afternoon:"de la tarde",evening:"de la tarde",night:"de la noche"}},FL=(t,e)=>Number(t)+"º",UL={ordinalNumber:FL,era:ln({values:DL,defaultWidth:"wide"}),quarter:ln({values:OL,defaultWidth:"wide",argumentCallback:t=>Number(t)-1}),month:ln({values:ML,defaultWidth:"wide"}),day:ln({values:LL,defaultWidth:"wide"}),dayPeriod:ln({values:VL,defaultWidth:"wide",formattingValues:jL,defaultFormattingWidth:"wide"})},BL=/^(\d+)(º)?/i,$L=/\d+/i,zL={narrow:/^(ac|dc|a|d)/i,abbreviated:/^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,wide:/^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i},WL={any:[/^ac/i,/^dc/i],wide:[/^(antes de cristo|antes de la era com[uú]n)/i,/^(despu[eé]s de cristo|era com[uú]n)/i]},qL={narrow:/^[1234]/i,abbreviated:/^T[1234]/i,wide:/^[1234](º)? trimestre/i},HL={any:[/1/i,/2/i,/3/i,/4/i]},GL={narrow:/^[efmajsond]/i,abbreviated:/^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,wide:/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i},KL={narrow:[/^e/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^en/i,/^feb/i,/^mar/i,/^abr/i,/^may/i,/^jun/i,/^jul/i,/^ago/i,/^sep/i,/^oct/i,/^nov/i,/^dic/i]},QL={narrow:/^[dlmjvs]/i,short:/^(do|lu|ma|mi|ju|vi|s[áa])/i,abbreviated:/^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,wide:/^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i},YL={narrow:[/^d/i,/^l/i,/^m/i,/^m/i,/^j/i,/^v/i,/^s/i],any:[/^do/i,/^lu/i,/^ma/i,/^mi/i,/^ju/i,/^vi/i,/^sa/i]},XL={narrow:/^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,any:/^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i},JL={any:{am:/^a/i,pm:/^p/i,midnight:/^mn/i,noon:/^md/i,morning:/mañana/i,afternoon:/tarde/i,evening:/tarde/i,night:/noche/i}},ZL={ordinalNumber:NI({matchPattern:BL,parsePattern:$L,valueCallback:function(t){return parseInt(t,10)}}),era:un({matchPatterns:zL,defaultMatchWidth:"wide",parsePatterns:WL,defaultParseWidth:"any"}),quarter:un({matchPatterns:qL,defaultMatchWidth:"wide",parsePatterns:HL,defaultParseWidth:"any",valueCallback:t=>t+1}),month:un({matchPatterns:GL,defaultMatchWidth:"wide",parsePatterns:KL,defaultParseWidth:"any"}),day:un({matchPatterns:QL,defaultMatchWidth:"wide",parsePatterns:YL,defaultParseWidth:"any"}),dayPeriod:un({matchPatterns:XL,defaultMatchWidth:"any",parsePatterns:JL,defaultParseWidth:"any"})},af={code:"es",formatDistance:xL,formatLong:kL,formatRelative:NL,localize:UL,match:ZL,options:{weekStartsOn:1,firstWeekContainsDate:1}},eV=()=>{const{uid:t}=xc(),[e,n]=M.useState([]),[r,i]=M.useState(!0),[s,o]=M.useState("today"),[u,l]=M.useState(""),[c,d]=M.useState(null),f=M.useMemo(()=>{const E=new Date;let w,T;switch(s){case"today":w=an(E),T=vl(E);break;case"week":w=an(E),T=vl(Nu(E,7));break;case"biweekly":w=an(E),T=vl(Nu(E,15));break;case"upcoming":w=an(E),T=null;break;default:w=an(E),T=vl(E)}return{start:w,end:T}},[s]),m=async()=>{i(!0);const E=await WO(t,f.start,f.end);E.success?n(E.data):Ne.error("Error al cargar citas"),i(!1)};M.useEffect(()=>{t&&m()},[t,f]);const v=M.useMemo(()=>{if(!u)return e;const E=u.toLowerCase();return e.filter(w=>{var T,O,U,z;return((T=w.clientName)==null?void 0:T.toLowerCase().includes(E))||((O=w.clientPhone)==null?void 0:O.includes(E))||((U=w.clientEmail)==null?void 0:U.toLowerCase().includes(E))||((z=w.barberName)==null?void 0:z.toLowerCase().includes(E))})},[e,u]),x=M.useMemo(()=>({pending:v.filter(E=>E.status==="pending"),confirmed:v.filter(E=>E.status==="confirmed"),completed:v.filter(E=>E.status==="completed"),cancelled:v.filter(E=>E.status==="cancelled")}),[v]),P=async(E,w)=>{d(E),(await HO(t,E,w)).success?(Ne.success("Cita actualizada"),m()):Ne.error("Error al actualizar cita"),d(null)},k=M.useMemo(()=>({total:v.length,pending:x.pending.length,confirmed:x.confirmed.length,completed:x.completed.length}),[v,x]);return g.jsxs("div",{className:"min-h-screen bg-background",children:[g.jsx(kI,{}),g.jsxs("main",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[g.jsxs("div",{className:"mb-8",children:[g.jsx("h2",{className:"text-3xl font-bold text-primary mb-2",children:"Dashboard"}),g.jsx("p",{className:"text-text-secondary",children:"Gestiona tus citas y reservas"})]}),g.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8",children:[g.jsx("div",{className:"card",children:g.jsxs("div",{className:"flex items-center justify-between",children:[g.jsxs("div",{children:[g.jsx("p",{className:"text-text-secondary text-sm mb-1",children:"Total Citas"}),g.jsx("p",{className:"text-3xl font-bold text-primary",children:k.total})]}),g.jsx(Ru,{className:"w-10 h-10 text-primary opacity-20"})]})}),g.jsx("div",{className:"card",children:g.jsxs("div",{className:"flex items-center justify-between",children:[g.jsxs("div",{children:[g.jsx("p",{className:"text-text-secondary text-sm mb-1",children:"Pendientes"}),g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("p",{className:"text-3xl font-bold text-warning",children:k.pending}),k.pending>0&&g.jsx("span",{className:"badge badge-pending text-xs",children:"Revisar"})]})]}),g.jsx(Kv,{className:"w-10 h-10 text-warning opacity-20"})]})}),g.jsx("div",{className:"card",children:g.jsxs("div",{className:"flex items-center justify-between",children:[g.jsxs("div",{children:[g.jsx("p",{className:"text-text-secondary text-sm mb-1",children:"Confirmadas"}),g.jsx("p",{className:"text-3xl font-bold text-success",children:k.confirmed})]}),g.jsx(of,{className:"w-10 h-10 text-success opacity-20"})]})}),g.jsx("div",{className:"card",children:g.jsxs("div",{className:"flex items-center justify-between",children:[g.jsxs("div",{children:[g.jsx("p",{className:"text-text-secondary text-sm mb-1",children:"Completadas"}),g.jsx("p",{className:"text-3xl font-bold text-primary",children:k.completed})]}),g.jsx(_s,{className:"w-10 h-10 text-primary opacity-20"})]})})]}),g.jsx("div",{className:"card mb-6",children:g.jsxs("div",{className:"flex flex-col sm:flex-row gap-4",children:[g.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[g.jsx(rM,{className:"w-5 h-5 text-text-secondary"}),g.jsx("button",{onClick:()=>o("today"),className:`px-4 py-2 rounded-elegant text-sm font-medium transition-all ${s==="today"?"bg-primary text-white":"bg-background text-text-secondary hover:bg-gray-200"}`,children:"Hoy"}),g.jsx("button",{onClick:()=>o("week"),className:`px-4 py-2 rounded-elegant text-sm font-medium transition-all ${s==="week"?"bg-primary text-white":"bg-background text-text-secondary hover:bg-gray-200"}`,children:"Esta Semana"}),g.jsx("button",{onClick:()=>o("biweekly"),className:`px-4 py-2 rounded-elegant text-sm font-medium transition-all ${s==="biweekly"?"bg-primary text-white":"bg-background text-text-secondary hover:bg-gray-200"}`,children:"Quincena"}),g.jsx("button",{onClick:()=>o("upcoming"),className:`px-4 py-2 rounded-elegant text-sm font-medium transition-all ${s==="upcoming"?"bg-primary text-white":"bg-background text-text-secondary hover:bg-gray-200"}`,children:"Próximas"})]}),g.jsxs("div",{className:"flex-1 relative",children:[g.jsx(dM,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5"}),g.jsx("input",{type:"text",placeholder:"Buscar por cliente, teléfono o email...",value:u,onChange:E=>l(E.target.value),className:"input pl-11 w-full"})]})]})}),r?g.jsx("div",{className:"card py-12",children:g.jsx(la,{size:"large",text:"Cargando citas..."})}):v.length===0?g.jsxs("div",{className:"card text-center py-12",children:[g.jsx(Ru,{className:"w-16 h-16 text-text-secondary mx-auto mb-4 opacity-50"}),g.jsx("h3",{className:"text-xl font-semibold text-primary mb-2",children:"No hay citas"}),g.jsx("p",{className:"text-text-secondary",children:u?"No se encontraron resultados para tu búsqueda":"No hay citas programadas para este período"})]}):g.jsxs("div",{className:"space-y-6",children:[x.pending.length>0&&g.jsxs("div",{children:[g.jsxs("h3",{className:"text-lg font-semibold text-warning mb-3 flex items-center gap-2",children:[g.jsx(Kv,{className:"w-5 h-5"}),"Pendientes de Confirmar",g.jsx("span",{className:"badge badge-pending",children:x.pending.length})]}),g.jsx("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-4",children:x.pending.map(E=>g.jsx(Od,{appointment:E,onUpdateStatus:P,isUpdating:c===E.id},E.id))})]}),x.confirmed.length>0&&g.jsxs("div",{children:[g.jsxs("h3",{className:"text-lg font-semibold text-success mb-3 flex items-center gap-2",children:[g.jsx(of,{className:"w-5 h-5"}),"Confirmadas"]}),g.jsx("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-4",children:x.confirmed.map(E=>g.jsx(Od,{appointment:E,onUpdateStatus:P,isUpdating:c===E.id},E.id))})]}),x.completed.length>0&&g.jsxs("div",{children:[g.jsxs("h3",{className:"text-lg font-semibold text-primary mb-3 flex items-center gap-2",children:[g.jsx(_s,{className:"w-5 h-5"}),"Completadas"]}),g.jsx("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-4",children:x.completed.map(E=>g.jsx(Od,{appointment:E,onUpdateStatus:P,isUpdating:c===E.id},E.id))})]})]})]})]})},Od=({appointment:t,onUpdateStatus:e,isUpdating:n})=>{const r={pending:{label:"Pendiente",class:"badge-pending"},confirmed:{label:"Confirmada",class:"badge-confirmed"},completed:{label:"Completada",class:"badge-completed"},cancelled:{label:"Cancelada",class:"badge-cancelled"}};return g.jsxs("div",{className:"card card-hover",children:[g.jsx("div",{className:"flex items-start justify-between mb-4",children:g.jsxs("div",{children:[g.jsx("h4",{className:"text-lg font-semibold text-primary mb-1",children:t.clientName}),g.jsx("span",{className:`badge ${r[t.status].class}`,children:r[t.status].label})]})}),g.jsxs("div",{className:"space-y-2 mb-4",children:[g.jsxs("div",{className:"flex items-center gap-2 text-sm text-text-secondary",children:[g.jsx(Ru,{className:"w-4 h-4"}),g.jsx("span",{children:Hi(t.date,"EEEE, d 'de' MMMM yyyy",{locale:af})})]}),g.jsxs("div",{className:"flex items-center gap-2 text-sm text-text-secondary",children:[g.jsx(sm,{className:"w-4 h-4"}),g.jsxs("span",{children:[Hi(t.date,"HH:mm")," hrs"]})]}),t.barberName&&g.jsxs("div",{className:"flex items-center gap-2 text-sm text-text-secondary",children:[g.jsx(aa,{className:"w-4 h-4"}),g.jsx("span",{children:t.barberName})]}),g.jsxs("div",{className:"flex items-center gap-2 text-sm text-text-secondary",children:[g.jsx(bu,{className:"w-4 h-4"}),g.jsx("span",{children:t.clientPhone})]}),t.clientEmail&&g.jsxs("div",{className:"flex items-center gap-2 text-sm text-text-secondary",children:[g.jsx(oa,{className:"w-4 h-4"}),g.jsx("span",{children:t.clientEmail})]})]}),t.notes&&g.jsx("div",{className:"mb-4 p-3 bg-background rounded-lg",children:g.jsx("p",{className:"text-sm text-text-secondary",children:t.notes})}),t.status!=="completed"&&t.status!=="cancelled"&&g.jsxs("div",{className:"flex gap-2 pt-4 border-t border-border",children:[t.status==="pending"&&g.jsxs("button",{onClick:()=>e(t.id,"confirmed"),disabled:n,className:"btn-gold flex-1 py-2 text-sm flex items-center justify-center gap-2",children:[g.jsx(_s,{className:"w-4 h-4"}),"Confirmar"]}),t.status==="confirmed"&&g.jsxs("button",{onClick:()=>e(t.id,"completed"),disabled:n,className:"btn-primary flex-1 py-2 text-sm flex items-center justify-center gap-2",children:[g.jsx(of,{className:"w-4 h-4"}),"Completar"]}),g.jsxs("button",{onClick:()=>e(t.id,"cancelled"),disabled:n,className:"btn-secondary py-2 px-4 text-sm flex items-center justify-center gap-2 text-danger border-danger hover:bg-danger hover:text-white",children:[g.jsx(mM,{className:"w-4 h-4"}),"Cancelar"]})]})]})};var tV=Object.defineProperty,Ou=Object.getOwnPropertySymbols,MI=Object.prototype.hasOwnProperty,LI=Object.prototype.propertyIsEnumerable,s_=(t,e,n)=>e in t?tV(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,nV=(t,e)=>{for(var n in e||(e={}))MI.call(e,n)&&s_(t,n,e[n]);if(Ou)for(var n of Ou(e))LI.call(e,n)&&s_(t,n,e[n]);return t},rV=(t,e)=>{var n={};for(var r in t)MI.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&Ou)for(var r of Ou(t))e.indexOf(r)<0&&LI.call(t,r)&&(n[r]=t[r]);return n};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var ci;(t=>{const e=class{constructor(l,c,d,f){if(this.version=l,this.errorCorrectionLevel=c,this.modules=[],this.isFunction=[],l<e.MIN_VERSION||l>e.MAX_VERSION)throw new RangeError("Version value out of range");if(f<-1||f>7)throw new RangeError("Mask value out of range");this.size=l*4+17;let m=[];for(let x=0;x<this.size;x++)m.push(!1);for(let x=0;x<this.size;x++)this.modules.push(m.slice()),this.isFunction.push(m.slice());this.drawFunctionPatterns();const v=this.addEccAndInterleave(d);if(this.drawCodewords(v),f==-1){let x=1e9;for(let P=0;P<8;P++){this.applyMask(P),this.drawFormatBits(P);const k=this.getPenaltyScore();k<x&&(f=P,x=k),this.applyMask(P)}}s(0<=f&&f<=7),this.mask=f,this.applyMask(f),this.drawFormatBits(f),this.isFunction=[]}static encodeText(l,c){const d=t.QrSegment.makeSegments(l);return e.encodeSegments(d,c)}static encodeBinary(l,c){const d=t.QrSegment.makeBytes(l);return e.encodeSegments([d],c)}static encodeSegments(l,c,d=1,f=40,m=-1,v=!0){if(!(e.MIN_VERSION<=d&&d<=f&&f<=e.MAX_VERSION)||m<-1||m>7)throw new RangeError("Invalid value");let x,P;for(x=d;;x++){const T=e.getNumDataCodewords(x,c)*8,O=u.getTotalBits(l,x);if(O<=T){P=O;break}if(x>=f)throw new RangeError("Data too long")}for(const T of[e.Ecc.MEDIUM,e.Ecc.QUARTILE,e.Ecc.HIGH])v&&P<=e.getNumDataCodewords(x,T)*8&&(c=T);let k=[];for(const T of l){r(T.mode.modeBits,4,k),r(T.numChars,T.mode.numCharCountBits(x),k);for(const O of T.getData())k.push(O)}s(k.length==P);const E=e.getNumDataCodewords(x,c)*8;s(k.length<=E),r(0,Math.min(4,E-k.length),k),r(0,(8-k.length%8)%8,k),s(k.length%8==0);for(let T=236;k.length<E;T^=253)r(T,8,k);let w=[];for(;w.length*8<k.length;)w.push(0);return k.forEach((T,O)=>w[O>>>3]|=T<<7-(O&7)),new e(x,c,w,m)}getModule(l,c){return 0<=l&&l<this.size&&0<=c&&c<this.size&&this.modules[c][l]}getModules(){return this.modules}drawFunctionPatterns(){for(let d=0;d<this.size;d++)this.setFunctionModule(6,d,d%2==0),this.setFunctionModule(d,6,d%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const l=this.getAlignmentPatternPositions(),c=l.length;for(let d=0;d<c;d++)for(let f=0;f<c;f++)d==0&&f==0||d==0&&f==c-1||d==c-1&&f==0||this.drawAlignmentPattern(l[d],l[f]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(l){const c=this.errorCorrectionLevel.formatBits<<3|l;let d=c;for(let m=0;m<10;m++)d=d<<1^(d>>>9)*1335;const f=(c<<10|d)^21522;s(f>>>15==0);for(let m=0;m<=5;m++)this.setFunctionModule(8,m,i(f,m));this.setFunctionModule(8,7,i(f,6)),this.setFunctionModule(8,8,i(f,7)),this.setFunctionModule(7,8,i(f,8));for(let m=9;m<15;m++)this.setFunctionModule(14-m,8,i(f,m));for(let m=0;m<8;m++)this.setFunctionModule(this.size-1-m,8,i(f,m));for(let m=8;m<15;m++)this.setFunctionModule(8,this.size-15+m,i(f,m));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let l=this.version;for(let d=0;d<12;d++)l=l<<1^(l>>>11)*7973;const c=this.version<<12|l;s(c>>>18==0);for(let d=0;d<18;d++){const f=i(c,d),m=this.size-11+d%3,v=Math.floor(d/3);this.setFunctionModule(m,v,f),this.setFunctionModule(v,m,f)}}drawFinderPattern(l,c){for(let d=-4;d<=4;d++)for(let f=-4;f<=4;f++){const m=Math.max(Math.abs(f),Math.abs(d)),v=l+f,x=c+d;0<=v&&v<this.size&&0<=x&&x<this.size&&this.setFunctionModule(v,x,m!=2&&m!=4)}}drawAlignmentPattern(l,c){for(let d=-2;d<=2;d++)for(let f=-2;f<=2;f++)this.setFunctionModule(l+f,c+d,Math.max(Math.abs(f),Math.abs(d))!=1)}setFunctionModule(l,c,d){this.modules[c][l]=d,this.isFunction[c][l]=!0}addEccAndInterleave(l){const c=this.version,d=this.errorCorrectionLevel;if(l.length!=e.getNumDataCodewords(c,d))throw new RangeError("Invalid argument");const f=e.NUM_ERROR_CORRECTION_BLOCKS[d.ordinal][c],m=e.ECC_CODEWORDS_PER_BLOCK[d.ordinal][c],v=Math.floor(e.getNumRawDataModules(c)/8),x=f-v%f,P=Math.floor(v/f);let k=[];const E=e.reedSolomonComputeDivisor(m);for(let T=0,O=0;T<f;T++){let U=l.slice(O,O+P-m+(T<x?0:1));O+=U.length;const z=e.reedSolomonComputeRemainder(U,E);T<x&&U.push(0),k.push(U.concat(z))}let w=[];for(let T=0;T<k[0].length;T++)k.forEach((O,U)=>{(T!=P-m||U>=x)&&w.push(O[T])});return s(w.length==v),w}drawCodewords(l){if(l.length!=Math.floor(e.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let c=0;for(let d=this.size-1;d>=1;d-=2){d==6&&(d=5);for(let f=0;f<this.size;f++)for(let m=0;m<2;m++){const v=d-m,P=(d+1&2)==0?this.size-1-f:f;!this.isFunction[P][v]&&c<l.length*8&&(this.modules[P][v]=i(l[c>>>3],7-(c&7)),c++)}}s(c==l.length*8)}applyMask(l){if(l<0||l>7)throw new RangeError("Mask value out of range");for(let c=0;c<this.size;c++)for(let d=0;d<this.size;d++){let f;switch(l){case 0:f=(d+c)%2==0;break;case 1:f=c%2==0;break;case 2:f=d%3==0;break;case 3:f=(d+c)%3==0;break;case 4:f=(Math.floor(d/3)+Math.floor(c/2))%2==0;break;case 5:f=d*c%2+d*c%3==0;break;case 6:f=(d*c%2+d*c%3)%2==0;break;case 7:f=((d+c)%2+d*c%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[c][d]&&f&&(this.modules[c][d]=!this.modules[c][d])}}getPenaltyScore(){let l=0;for(let m=0;m<this.size;m++){let v=!1,x=0,P=[0,0,0,0,0,0,0];for(let k=0;k<this.size;k++)this.modules[m][k]==v?(x++,x==5?l+=e.PENALTY_N1:x>5&&l++):(this.finderPenaltyAddHistory(x,P),v||(l+=this.finderPenaltyCountPatterns(P)*e.PENALTY_N3),v=this.modules[m][k],x=1);l+=this.finderPenaltyTerminateAndCount(v,x,P)*e.PENALTY_N3}for(let m=0;m<this.size;m++){let v=!1,x=0,P=[0,0,0,0,0,0,0];for(let k=0;k<this.size;k++)this.modules[k][m]==v?(x++,x==5?l+=e.PENALTY_N1:x>5&&l++):(this.finderPenaltyAddHistory(x,P),v||(l+=this.finderPenaltyCountPatterns(P)*e.PENALTY_N3),v=this.modules[k][m],x=1);l+=this.finderPenaltyTerminateAndCount(v,x,P)*e.PENALTY_N3}for(let m=0;m<this.size-1;m++)for(let v=0;v<this.size-1;v++){const x=this.modules[m][v];x==this.modules[m][v+1]&&x==this.modules[m+1][v]&&x==this.modules[m+1][v+1]&&(l+=e.PENALTY_N2)}let c=0;for(const m of this.modules)c=m.reduce((v,x)=>v+(x?1:0),c);const d=this.size*this.size,f=Math.ceil(Math.abs(c*20-d*10)/d)-1;return s(0<=f&&f<=9),l+=f*e.PENALTY_N4,s(0<=l&&l<=2568888),l}getAlignmentPatternPositions(){if(this.version==1)return[];{const l=Math.floor(this.version/7)+2,c=this.version==32?26:Math.ceil((this.version*4+4)/(l*2-2))*2;let d=[6];for(let f=this.size-7;d.length<l;f-=c)d.splice(1,0,f);return d}}static getNumRawDataModules(l){if(l<e.MIN_VERSION||l>e.MAX_VERSION)throw new RangeError("Version number out of range");let c=(16*l+128)*l+64;if(l>=2){const d=Math.floor(l/7)+2;c-=(25*d-10)*d-55,l>=7&&(c-=36)}return s(208<=c&&c<=29648),c}static getNumDataCodewords(l,c){return Math.floor(e.getNumRawDataModules(l)/8)-e.ECC_CODEWORDS_PER_BLOCK[c.ordinal][l]*e.NUM_ERROR_CORRECTION_BLOCKS[c.ordinal][l]}static reedSolomonComputeDivisor(l){if(l<1||l>255)throw new RangeError("Degree out of range");let c=[];for(let f=0;f<l-1;f++)c.push(0);c.push(1);let d=1;for(let f=0;f<l;f++){for(let m=0;m<c.length;m++)c[m]=e.reedSolomonMultiply(c[m],d),m+1<c.length&&(c[m]^=c[m+1]);d=e.reedSolomonMultiply(d,2)}return c}static reedSolomonComputeRemainder(l,c){let d=c.map(f=>0);for(const f of l){const m=f^d.shift();d.push(0),c.forEach((v,x)=>d[x]^=e.reedSolomonMultiply(v,m))}return d}static reedSolomonMultiply(l,c){if(l>>>8||c>>>8)throw new RangeError("Byte out of range");let d=0;for(let f=7;f>=0;f--)d=d<<1^(d>>>7)*285,d^=(c>>>f&1)*l;return s(d>>>8==0),d}finderPenaltyCountPatterns(l){const c=l[1];s(c<=this.size*3);const d=c>0&&l[2]==c&&l[3]==c*3&&l[4]==c&&l[5]==c;return(d&&l[0]>=c*4&&l[6]>=c?1:0)+(d&&l[6]>=c*4&&l[0]>=c?1:0)}finderPenaltyTerminateAndCount(l,c,d){return l&&(this.finderPenaltyAddHistory(c,d),c=0),c+=this.size,this.finderPenaltyAddHistory(c,d),this.finderPenaltyCountPatterns(d)}finderPenaltyAddHistory(l,c){c[0]==0&&(l+=this.size),c.pop(),c.unshift(l)}};let n=e;n.MIN_VERSION=1,n.MAX_VERSION=40,n.PENALTY_N1=3,n.PENALTY_N2=3,n.PENALTY_N3=40,n.PENALTY_N4=10,n.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],n.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],t.QrCode=n;function r(l,c,d){if(c<0||c>31||l>>>c)throw new RangeError("Value out of range");for(let f=c-1;f>=0;f--)d.push(l>>>f&1)}function i(l,c){return(l>>>c&1)!=0}function s(l){if(!l)throw new Error("Assertion error")}const o=class{constructor(l,c,d){if(this.mode=l,this.numChars=c,this.bitData=d,c<0)throw new RangeError("Invalid argument");this.bitData=d.slice()}static makeBytes(l){let c=[];for(const d of l)r(d,8,c);return new o(o.Mode.BYTE,l.length,c)}static makeNumeric(l){if(!o.isNumeric(l))throw new RangeError("String contains non-numeric characters");let c=[];for(let d=0;d<l.length;){const f=Math.min(l.length-d,3);r(parseInt(l.substr(d,f),10),f*3+1,c),d+=f}return new o(o.Mode.NUMERIC,l.length,c)}static makeAlphanumeric(l){if(!o.isAlphanumeric(l))throw new RangeError("String contains unencodable characters in alphanumeric mode");let c=[],d;for(d=0;d+2<=l.length;d+=2){let f=o.ALPHANUMERIC_CHARSET.indexOf(l.charAt(d))*45;f+=o.ALPHANUMERIC_CHARSET.indexOf(l.charAt(d+1)),r(f,11,c)}return d<l.length&&r(o.ALPHANUMERIC_CHARSET.indexOf(l.charAt(d)),6,c),new o(o.Mode.ALPHANUMERIC,l.length,c)}static makeSegments(l){return l==""?[]:o.isNumeric(l)?[o.makeNumeric(l)]:o.isAlphanumeric(l)?[o.makeAlphanumeric(l)]:[o.makeBytes(o.toUtf8ByteArray(l))]}static makeEci(l){let c=[];if(l<0)throw new RangeError("ECI assignment value out of range");if(l<128)r(l,8,c);else if(l<16384)r(2,2,c),r(l,14,c);else if(l<1e6)r(6,3,c),r(l,21,c);else throw new RangeError("ECI assignment value out of range");return new o(o.Mode.ECI,0,c)}static isNumeric(l){return o.NUMERIC_REGEX.test(l)}static isAlphanumeric(l){return o.ALPHANUMERIC_REGEX.test(l)}getData(){return this.bitData.slice()}static getTotalBits(l,c){let d=0;for(const f of l){const m=f.mode.numCharCountBits(c);if(f.numChars>=1<<m)return 1/0;d+=4+m+f.bitData.length}return d}static toUtf8ByteArray(l){l=encodeURI(l);let c=[];for(let d=0;d<l.length;d++)l.charAt(d)!="%"?c.push(l.charCodeAt(d)):(c.push(parseInt(l.substr(d+1,2),16)),d+=2);return c}};let u=o;u.NUMERIC_REGEX=/^[0-9]*$/,u.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,u.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:",t.QrSegment=u})(ci||(ci={}));(t=>{(e=>{const n=class{constructor(i,s){this.ordinal=i,this.formatBits=s}};let r=n;r.LOW=new n(0,1),r.MEDIUM=new n(1,0),r.QUARTILE=new n(2,3),r.HIGH=new n(3,2),e.Ecc=r})(t.QrCode||(t.QrCode={}))})(ci||(ci={}));(t=>{(e=>{const n=class{constructor(i,s){this.modeBits=i,this.numBitsCharCount=s}numCharCountBits(i){return this.numBitsCharCount[Math.floor((i+7)/17)]}};let r=n;r.NUMERIC=new n(1,[10,12,14]),r.ALPHANUMERIC=new n(2,[9,11,13]),r.BYTE=new n(4,[8,16,16]),r.KANJI=new n(8,[8,10,12]),r.ECI=new n(7,[0,0,0]),e.Mode=r})(t.QrSegment||(t.QrSegment={}))})(ci||(ci={}));var po=ci;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var iV={L:po.QrCode.Ecc.LOW,M:po.QrCode.Ecc.MEDIUM,Q:po.QrCode.Ecc.QUARTILE,H:po.QrCode.Ecc.HIGH},sV=128,oV="L",aV="#FFFFFF",lV="#000000",uV=!1,VI=4,cV=.1;function dV(t,e=0){const n=[];return t.forEach(function(r,i){let s=null;r.forEach(function(o,u){if(!o&&s!==null){n.push(`M${s+e} ${i+e}h${u-s}v1H${s+e}z`),s=null;return}if(u===r.length-1){if(!o)return;s===null?n.push(`M${u+e},${i+e} h1v1H${u+e}z`):n.push(`M${s+e},${i+e} h${u+1-s}v1H${s+e}z`);return}o&&s===null&&(s=u)})}),n.join("")}function hV(t,e){return t.slice().map((n,r)=>r<e.y||r>=e.y+e.h?n:n.map((i,s)=>s<e.x||s>=e.x+e.w?i:!1))}function fV(t,e,n,r){if(r==null)return null;const i=n?VI:0,s=t.length+i*2,o=Math.floor(e*cV),u=s/e,l=(r.width||o)*u,c=(r.height||o)*u,d=r.x==null?t.length/2-l/2:r.x*u,f=r.y==null?t.length/2-c/2:r.y*u;let m=null;if(r.excavate){let v=Math.floor(d),x=Math.floor(f),P=Math.ceil(l+d-v),k=Math.ceil(c+f-x);m={x:v,y:x,w:P,h:k}}return{x:d,y:f,h:c,w:l,excavation:m}}(function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0})();function pV(t){const e=t,{value:n,size:r=sV,level:i=oV,bgColor:s=aV,fgColor:o=lV,includeMargin:u=uV,imageSettings:l}=e,c=rV(e,["value","size","level","bgColor","fgColor","includeMargin","imageSettings"]);let d=po.QrCode.encodeText(n,iV[i]).getModules();const f=u?VI:0,m=d.length+f*2,v=fV(d,r,u,l);let x=null;l!=null&&v!=null&&(v.excavation!=null&&(d=hV(d,v.excavation)),x=Ni.createElement("image",{xlinkHref:l.src,height:v.h,width:v.w,x:v.x+f,y:v.y+f,preserveAspectRatio:"none"}));const P=dV(d,f);return Ni.createElement("svg",nV({height:r,width:r,viewBox:`0 0 ${m} ${m}`},c),Ni.createElement("path",{fill:s,d:`M0,0 h${m}v${m}H0z`,shapeRendering:"crispEdges"}),Ni.createElement("path",{fill:o,d:P,shapeRendering:"crispEdges"}),x)}const mV=()=>{const t=Ju(),{uid:e,barberData:n,refreshBarberData:r}=xc(),[i,s]=M.useState(!1),[o,u]=M.useState(!1),[l,c]=M.useState(!1),[d,f]=M.useState({name:"",phone:"",address:"",openingTime:"09:00",closingTime:"18:00",appointmentDuration:30,workingDays:[1,2,3,4,5,6],barbers:[{id:"barber-1",name:"Barbero 1",email:"",active:!0,autoAccept:!1}]}),[m,v]=M.useState(""),[x,P]=M.useState(""),[k,E]=M.useState(""),w=q=>{const V={...q,barbers:(q.barbers||[]).map(D=>{var B,Y;return{id:D.id,name:((B=D.name)==null?void 0:B.trim())||"",email:((Y=D.email)==null?void 0:Y.trim())||"",active:D.active!==!1,autoAccept:!!D.autoAccept}})};return JSON.stringify(V)},T=`${window.location.origin}/book/${e}`;M.useEffect(()=>{(async()=>{var V,D;if(n){const B=[{id:"barber-1",name:"Barbero 1",email:"",active:!0,autoAccept:!1}];f({name:n.name||"",phone:n.phone||"",address:n.address||"",openingTime:n.openingTime||"09:00",closingTime:n.closingTime||"18:00",appointmentDuration:n.appointmentDuration||30,workingDays:n.workingDays||[1,2,3,4,5,6],barbers:(V=n.barbers)!=null&&V.length?n.barbers:B}),E(w({name:n.name||"",phone:n.phone||"",address:n.address||"",openingTime:n.openingTime||"09:00",closingTime:n.closingTime||"18:00",appointmentDuration:n.appointmentDuration||30,workingDays:n.workingDays||[1,2,3,4,5,6],barbers:(D=n.barbers)!=null&&D.length?n.barbers:B}))}})()},[n]);const O=M.useMemo(()=>k?w(d)!==k:!1,[d,k]),U=()=>{navigator.clipboard.writeText(T),c(!0),Ne.success("URL copiada al portapapeles"),setTimeout(()=>c(!1),2e3)},z=()=>{const q=document.getElementById("qr-code"),V=new XMLSerializer().serializeToString(q),D=document.createElement("canvas"),B=D.getContext("2d"),Y=new Image;Y.onload=()=>{D.width=Y.width,D.height=Y.height,B.drawImage(Y,0,0);const J=D.toDataURL("image/png"),X=document.createElement("a");X.download="qcut-qr-code.png",X.href=J,X.click(),Ne.success("Código QR descargado")},Y.src="data:image/svg+xml;base64,"+btoa(V)},S=async q=>{q.preventDefault(),u(!0);const V=d.barbers.map(J=>{var X,ye;return{...J,name:((X=J.name)==null?void 0:X.trim())||"",email:((ye=J.email)==null?void 0:ye.trim())||"",active:J.active!==!1,autoAccept:!!J.autoAccept}}).filter(J=>J.name.length>0);if(V.length===0){Ne.error("Debes tener al menos un barbero"),u(!1);return}if(V.filter(J=>J.active).length===0){Ne.error("Debe existir al menos un barbero activo"),u(!1);return}const B={...d,barbers:V};(await zO(e,B)).success?(await r(),Ne.success("Configuración guardada exitosamente"),f(B),E(w(B))):Ne.error("Error al guardar configuración"),u(!1)},_=q=>{f(V=>({...V,workingDays:V.workingDays.includes(q)?V.workingDays.filter(D=>D!==q):[...V.workingDays,q].sort()}))},I=()=>`barber-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,A=()=>{const q=m.trim();if(!q){Ne.error("Ingresa el nombre del barbero");return}f(V=>({...V,barbers:[...V.barbers,{id:I(),name:q,email:x.trim(),active:!0,autoAccept:!1}]})),v(""),P("")},R=(q,V)=>{f(D=>({...D,barbers:D.barbers.map(B=>B.id===q?{...B,name:V}:B)}))},b=(q,V)=>{f(D=>({...D,barbers:D.barbers.map(B=>B.id===q?{...B,email:V}:B)}))},C=q=>{f(V=>({...V,barbers:V.barbers.map(D=>D.id===q?{...D,active:!D.active}:D)}))},Be=q=>{f(V=>({...V,barbers:V.barbers.map(D=>D.id===q?{...D,autoAccept:!D.autoAccept}:D)}))},zt=q=>{if(d.barbers.length<=1){Ne.error("Debe existir al menos un barbero");return}f(V=>({...V,barbers:V.barbers.filter(D=>D.id!==q)}))},wn=[{value:0,label:"Dom"},{value:1,label:"Lun"},{value:2,label:"Mar"},{value:3,label:"Mié"},{value:4,label:"Jue"},{value:5,label:"Vie"},{value:6,label:"Sáb"}];return g.jsxs("div",{className:"min-h-screen bg-background",children:[g.jsx(kI,{}),g.jsxs("main",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[g.jsxs("div",{className:"mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",children:[g.jsxs("div",{children:[g.jsx("h2",{className:"text-3xl font-bold text-primary mb-2",children:"Configuración"}),g.jsx("p",{className:"text-text-secondary",children:"Personaliza tu perfil y horarios de atención"})]}),g.jsxs("button",{type:"button",onClick:()=>{if(O){Ne.error("Guarda los cambios antes de regresar");return}t("/dashboard")},className:"btn-secondary flex items-center gap-2",children:[g.jsx(JO,{className:"w-4 h-4"}),"Volver al Panel"]})]}),g.jsxs("div",{className:"space-y-6",children:[g.jsxs("div",{className:"card",children:[g.jsxs("h3",{className:"text-xl font-semibold text-primary mb-4 flex items-center gap-2",children:[g.jsx(iM,{className:"w-5 h-5"}),"URL de Reservas"]}),g.jsx("p",{className:"text-text-secondary mb-4 text-sm",children:"Comparte esta URL con tus clientes para que puedan agendar citas online"}),g.jsxs("div",{className:"flex gap-3 mb-6",children:[g.jsx("input",{type:"text",value:T,readOnly:!0,className:"input flex-1 bg-background"}),g.jsxs("button",{onClick:U,className:"btn-gold flex items-center gap-2 whitespace-nowrap",children:[l?g.jsx(_s,{className:"w-4 h-4"}):g.jsx(tM,{className:"w-4 h-4"}),l?"Copiado":"Copiar"]})]}),g.jsxs("div",{className:"border-t border-border pt-6",children:[g.jsx("h4",{className:"font-medium text-primary mb-4",children:"Código QR"}),g.jsxs("div",{className:"flex flex-col sm:flex-row items-center gap-6",children:[g.jsx("div",{className:"bg-white p-4 rounded-elegant border border-border",children:g.jsx(pV,{id:"qr-code",value:T,size:180,level:"H",includeMargin:!0})}),g.jsxs("div",{className:"flex-1",children:[g.jsx("p",{className:"text-text-secondary text-sm mb-4",children:"Descarga este código QR para imprimirlo en tu local. Tus clientes pueden escanearlo para reservar citas."}),g.jsxs("button",{onClick:z,className:"btn-secondary flex items-center gap-2",children:[g.jsx(nM,{className:"w-4 h-4"}),"Descargar QR"]})]})]})]})]}),g.jsxs("form",{onSubmit:S,className:"card",children:[g.jsxs("h3",{className:"text-xl font-semibold text-primary mb-6 flex items-center gap-2",children:[g.jsx(aa,{className:"w-5 h-5"}),"Perfil de la Barbería"]}),g.jsxs("div",{className:"space-y-5",children:[g.jsxs("div",{children:[g.jsx("label",{htmlFor:"name",className:"label",children:"Nombre del Negocio"}),g.jsx("input",{type:"text",id:"name",value:d.name,onChange:q=>f(V=>({...V,name:q.target.value})),className:"input",placeholder:"Mi Barbería",required:!0})]}),g.jsxs("div",{children:[g.jsx("label",{htmlFor:"phone",className:"label",children:"Teléfono de Contacto"}),g.jsxs("div",{className:"relative",children:[g.jsx(bu,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5"}),g.jsx("input",{type:"tel",id:"phone",value:d.phone,onChange:q=>f(V=>({...V,phone:q.target.value})),className:"input pl-11",placeholder:"+34 123 456 789",required:!0})]})]}),g.jsxs("div",{children:[g.jsx("label",{htmlFor:"address",className:"label",children:"Dirección"}),g.jsxs("div",{className:"relative",children:[g.jsx(aM,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5"}),g.jsx("input",{type:"text",id:"address",value:d.address,onChange:q=>f(V=>({...V,address:q.target.value})),className:"input pl-11",placeholder:"Calle Principal 123"})]})]})]})]}),g.jsxs("div",{className:"card",children:[g.jsxs("h3",{className:"text-xl font-semibold text-primary mb-6 flex items-center gap-2",children:[g.jsx(pM,{className:"w-5 h-5"}),"Barberos de la Barbería"]}),g.jsxs("div",{className:"space-y-4",children:[g.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-3",children:[g.jsx("input",{type:"text",value:m,onChange:q=>v(q.target.value),className:"input",placeholder:"Nombre del barbero","aria-label":"Nombre del barbero"}),g.jsxs("div",{className:"relative",children:[g.jsx(oa,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5"}),g.jsx("input",{type:"email",value:x,onChange:q=>P(q.target.value),className:"input pl-11",placeholder:"Email del barbero","aria-label":"Email del barbero"})]}),g.jsxs("button",{type:"button",onClick:A,className:"btn-primary flex items-center gap-2",children:[g.jsx(uM,{className:"w-4 h-4"}),"Agregar"]})]}),g.jsx("div",{className:"space-y-3",children:d.barbers.map((q,V)=>g.jsxs("div",{className:"flex flex-col gap-3 p-3 bg-background rounded-elegant",children:[g.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-3",children:[g.jsxs("div",{children:[g.jsxs("label",{className:"label",children:["Barbero ",V+1]}),g.jsx("input",{type:"text",value:q.name,onChange:D=>R(q.id,D.target.value),className:"input",placeholder:"Nombre del barbero",required:!0})]}),g.jsxs("div",{children:[g.jsx("label",{className:"label",children:"Email del barbero"}),g.jsxs("div",{className:"relative",children:[g.jsx(oa,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5"}),g.jsx("input",{type:"email",value:q.email||"",onChange:D=>b(q.id,D.target.value),className:"input pl-11",placeholder:"barbero@email.com"})]})]}),g.jsxs("div",{className:"flex flex-col gap-2",children:[g.jsx("label",{className:"label",children:"Estado"}),g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("button",{type:"button",onClick:()=>C(q.id),className:"flex items-center gap-2 text-sm",children:q.active?g.jsxs(g.Fragment,{children:[g.jsx(Yv,{className:"w-5 h-5 text-success"}),"Activo"]}):g.jsxs(g.Fragment,{children:[g.jsx(Qv,{className:"w-5 h-5 text-text-secondary"}),"Inactivo"]})}),g.jsxs("button",{type:"button",onClick:()=>zt(q.id),disabled:d.barbers.length<=1,className:"btn-secondary flex items-center gap-2 text-danger border-danger hover:bg-danger hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",children:[g.jsx(fM,{className:"w-4 h-4"}),"Eliminar"]})]})]})]}),g.jsx("div",{className:"flex flex-col sm:flex-row items-start sm:items-center gap-3",children:g.jsx("button",{type:"button",onClick:()=>Be(q.id),className:"flex items-center gap-2 text-sm",children:q.autoAccept?g.jsxs(g.Fragment,{children:[g.jsx(Yv,{className:"w-5 h-5 text-success"}),"Auto-aceptar citas"]}):g.jsxs(g.Fragment,{children:[g.jsx(Qv,{className:"w-5 h-5 text-text-secondary"}),"Auto-aceptar desactivado"]})})})]},q.id))}),g.jsx("p",{className:"text-sm text-text-secondary",children:"Debe existir al menos un barbero activo. Los clientes podrán elegir su barbero al reservar. El auto-aceptar confirma automáticamente las citas que respeten disponibilidad."})]})]}),g.jsxs("div",{className:"card",children:[g.jsxs("h3",{className:"text-xl font-semibold text-primary mb-6 flex items-center gap-2",children:[g.jsx(sm,{className:"w-5 h-5"}),"Horarios de Atención"]}),g.jsxs("div",{className:"space-y-6",children:[g.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[g.jsxs("div",{children:[g.jsx("label",{htmlFor:"openingTime",className:"label",children:"Hora de Apertura"}),g.jsx("input",{type:"time",id:"openingTime",value:d.openingTime,onChange:q=>f(V=>({...V,openingTime:q.target.value})),className:"input",required:!0})]}),g.jsxs("div",{children:[g.jsx("label",{htmlFor:"closingTime",className:"label",children:"Hora de Cierre"}),g.jsx("input",{type:"time",id:"closingTime",value:d.closingTime,onChange:q=>f(V=>({...V,closingTime:q.target.value})),className:"input",required:!0})]})]}),g.jsxs("div",{children:[g.jsx("label",{htmlFor:"appointmentDuration",className:"label",children:"Duración de cada Cita (minutos)"}),g.jsxs("select",{id:"appointmentDuration",value:d.appointmentDuration,onChange:q=>f(V=>({...V,appointmentDuration:parseInt(q.target.value)})),className:"input",required:!0,children:[g.jsx("option",{value:15,children:"15 minutos"}),g.jsx("option",{value:30,children:"30 minutos"}),g.jsx("option",{value:45,children:"45 minutos"}),g.jsx("option",{value:60,children:"60 minutos"})]})]}),g.jsxs("div",{children:[g.jsx("label",{className:"label mb-3",children:"Días Laborables"}),g.jsx("div",{className:"flex flex-wrap gap-2",children:wn.map(q=>g.jsx("button",{type:"button",onClick:()=>_(q.value),className:`px-4 py-2 rounded-elegant font-medium transition-all ${d.workingDays.includes(q.value)?"bg-primary text-white":"bg-background text-text-secondary hover:bg-gray-200"}`,children:q.label},q.value))}),g.jsx("p",{className:"text-sm text-text-secondary mt-2",children:"Selecciona los días en los que tu negocio está abierto"})]})]})]}),g.jsx("div",{className:"flex justify-end",children:g.jsx("button",{type:"submit",onClick:S,disabled:o,className:"btn-gold px-8 flex items-center gap-2",children:o?g.jsxs(g.Fragment,{children:[g.jsx(la,{size:"small"}),"Guardando..."]}):g.jsxs(g.Fragment,{children:[g.jsx(cM,{className:"w-5 h-5"}),"Guardar Cambios"]})})})]})]})]})},gV=()=>{var q,V;const{businessId:t}=mA(),[e,n]=M.useState(null),[r,i]=M.useState(null),[s,o]=M.useState(!0),[u,l]=M.useState(!1),[c,d]=M.useState(!1),[f,m]=M.useState(!1),[v,x]=M.useState(null),[P,k]=M.useState(null),[E,w]=M.useState(""),[T,O]=M.useState(new Date),[U,z]=M.useState([]),[S,_]=M.useState({clientName:"",clientPhone:"",clientEmail:"",notes:""}),[I,A]=M.useState({});M.useEffect(()=>{t&&(async()=>{o(!0);const[B,Y]=await Promise.all([sf(t),KO(t)]);B.success?n(B.data):Ne.error("Barbería no encontrada"),Y.success&&i(Y.data),o(!1)})()},[t]),M.useEffect(()=>{var D,B,Y;if((D=e==null?void 0:e.barbers)!=null&&D.length){const X=((B=e.barbers.filter(ye=>ye.active!==!1)[0])==null?void 0:B.id)||e.barbers[0].id;w(ye=>ye||X)}else e&&!((Y=e.barbers)!=null&&Y.length)&&w("barber-1")},[e]),M.useEffect(()=>{(async()=>{if(v&&t){const B=await GO(t,v);if(B.success){const Y=B.data.filter(J=>J.status==="pending"||J.status==="confirmed");z(Y)}}})()},[v,t]),M.useEffect(()=>{k(null)},[E]),M.useEffect(()=>{k(null)},[v]);const R=M.useMemo(()=>{const D=e_(T),B=Zv(T);return SM({start:D,end:B})},[T]),b=D=>{if(!r)return!1;const B=D.getDay();return r.workingDays.includes(B)},C=D=>{const B=an(new Date);return!IL(D,B)&&b(D)},Be=M.useMemo(()=>{if(!v||!r||!E)return[];const D=[],[B,Y]=r.openingTime.split(":").map(Number),[J,X]=r.closingTime.split(":").map(Number),ye=B*60+Y,Mt=J*60+X,vt=r.appointmentDuration;for(let $e=ye;$e<Mt;$e+=vt){const wi=Math.floor($e/60),Ei=$e%60,Or=`${wi.toString().padStart(2,"0")}:${Ei.toString().padStart(2,"0")}`;new Date(v).setHours(wi,Ei,0,0);const Ds=U.some(Ti=>{var ba,Na;const Os=((Na=(ba=e==null?void 0:e.barbers)==null?void 0:ba[0])==null?void 0:Na.id)||"barber-1";return(Ti.barberId||Os)!==E?!1:Hi(Ti.date,"HH:mm")===Or});D.push({time:Or,available:!Ds})}return D},[v,r,U,E,e]),zt=()=>{const D={};return S.clientName.trim()||(D.clientName="El nombre es requerido"),S.clientPhone.trim()?/^\+?[\d\s-()]+$/.test(S.clientPhone)||(D.clientPhone="Teléfono inválido"):D.clientPhone="El teléfono es requerido",S.clientEmail&&!/\S+@\S+\.\S+/.test(S.clientEmail)&&(D.clientEmail="Email inválido"),v||(D.date="Selecciona una fecha"),E||(D.barber="Selecciona un barbero"),P?Be.some(Y=>Y.time===P&&Y.available)||(D.time="El horario seleccionado no está disponible"):D.time="Selecciona un horario",A(D),Object.keys(D).length===0},wn=async D=>{var vt;if(D.preventDefault(),!zt()){Ne.error("Por favor completa todos los campos requeridos");return}l(!0);const[B,Y]=P.split(":").map(Number),J=new Date(v);J.setHours(B,Y,0,0);const X=(vt=e==null?void 0:e.barbers)==null?void 0:vt.find($e=>$e.id===E),ye={clientName:S.clientName.trim(),clientPhone:S.clientPhone.trim(),clientEmail:S.clientEmail.trim(),notes:S.notes.trim(),date:J,status:X!=null&&X.autoAccept?"confirmed":"pending",barberId:E,barberName:(X==null?void 0:X.name)||"Barbero",barberEmail:(X==null?void 0:X.email)||""};if((await qO(t,ye)).success){const $e={barberName:ye.barberName,barberEmail:ye.barberEmail,clientName:ye.clientName,clientPhone:ye.clientPhone,appointmentDate:J.toISOString(),autoAccepted:(X==null?void 0:X.autoAccept)||!1};ye.barberEmail&&fetch("/.netlify/functions/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify($e)}).catch(Ei=>console.error("Error al enviar email:",Ei)),m((X==null?void 0:X.autoAccept)||!1),d(!0);const wi=X!=null&&X.autoAccept?"¡Cita confirmada automáticamente!":"¡Cita agendada! Espera la confirmación del barbero.";Ne.success(wi),_({clientName:"",clientPhone:"",clientEmail:"",notes:""}),x(null),k(null)}else Ne.error("Error al agendar la cita");l(!1)};return s?g.jsx("div",{className:"min-h-screen flex items-center justify-center bg-background",children:g.jsx(la,{size:"large",text:"Cargando..."})}):e?c?g.jsx("div",{className:"min-h-screen flex items-center justify-center bg-background px-4",children:g.jsxs("div",{className:"card max-w-md w-full text-center",children:[g.jsx("div",{className:`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${f?"bg-success/10":"bg-warning/10"}`,children:g.jsx(_s,{className:`w-8 h-8 ${f?"text-success":"text-warning"}`})}),g.jsx("h2",{className:"text-2xl font-bold text-primary mb-2",children:f?"¡Cita Confirmada!":"¡Cita Agendada!"}),g.jsx("p",{className:"text-text-secondary mb-6",children:f?"Tu cita ha sido confirmada automáticamente. ¡Te esperamos!":"Tu cita ha sido registrada exitosamente. El barbero la confirmará pronto."}),g.jsx("button",{onClick:()=>{d(!1),m(!1)},className:"btn-primary w-full",children:"Agendar Otra Cita"})]})}):g.jsx("div",{className:"min-h-screen bg-gradient-to-br from-background via-background to-gray-50 py-8 px-4",children:g.jsxs("div",{className:"max-w-4xl mx-auto",children:[g.jsxs("div",{className:"text-center mb-8",children:[g.jsx("h1",{className:"text-4xl font-bold text-primary mb-2",children:"Qcut"}),g.jsx("h2",{className:"text-2xl font-semibold text-primary mb-1",children:e.name}),g.jsx("p",{className:"text-text-secondary",children:"Agenda tu cita online"}),e.phone&&g.jsxs("p",{className:"text-sm text-text-secondary mt-2 flex items-center justify-center gap-2",children:[g.jsx(bu,{className:"w-4 h-4"}),e.phone]})]}),g.jsxs("form",{onSubmit:wn,className:"space-y-6",children:[g.jsxs("div",{className:"card",children:[g.jsxs("h3",{className:"text-lg font-semibold text-primary mb-4 flex items-center gap-2",children:[g.jsx(aa,{className:"w-5 h-5"}),"Selecciona un Barbero"]}),(q=e==null?void 0:e.barbers)!=null&&q.length&&e.barbers.filter(D=>D.active!==!1).length===0?g.jsx("p",{className:"text-sm text-danger",children:"No hay barberos activos disponibles. Intenta más tarde."}):g.jsxs("select",{value:E,onChange:D=>w(D.target.value),className:"input","aria-label":"Selecciona un barbero",required:!0,children:[g.jsx("option",{value:"",disabled:!0,children:"Selecciona un barbero"}),((V=e==null?void 0:e.barbers)!=null&&V.length?e.barbers.filter(D=>D.active!==!1):[{id:"barber-1",name:"Barbero 1"}]).map(D=>g.jsx("option",{value:D.id,children:D.name},D.id))]}),I.barber&&g.jsx("p",{className:"mt-2 text-sm text-danger",children:I.barber})]}),g.jsxs("div",{className:"card",children:[g.jsxs("h3",{className:"text-lg font-semibold text-primary mb-4 flex items-center gap-2",children:[g.jsx(Ru,{className:"w-5 h-5"}),"Selecciona una Fecha"]}),g.jsxs("div",{className:"flex items-center justify-between mb-4",children:[g.jsx("button",{type:"button",onClick:()=>O(D=>Nu(e_(D),-1)),className:"p-2 hover:bg-background rounded-elegant transition-colors",children:g.jsx(ZO,{className:"w-5 h-5"})}),g.jsx("h4",{className:"font-medium text-primary",children:Hi(T,"MMMM yyyy",{locale:af})}),g.jsx("button",{type:"button",onClick:()=>O(D=>Nu(Zv(D),1)),className:"p-2 hover:bg-background rounded-elegant transition-colors",children:g.jsx(eM,{className:"w-5 h-5"})})]}),g.jsxs("div",{className:"grid grid-cols-7 gap-2",children:[["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"].map(D=>g.jsx("div",{className:"text-center text-xs font-medium text-text-secondary py-2",children:D},D)),R.map(D=>{const B=C(D),Y=v&&EM(D,v);return g.jsx("button",{type:"button",onClick:()=>B&&x(D),disabled:!B,className:`
                      aspect-square p-2 rounded-elegant text-sm font-medium transition-all
                      ${Y?"bg-primary text-white":""}
                      ${B&&!Y?"hover:bg-background cursor-pointer":""}
                      ${B?"text-primary":"text-gray-300 cursor-not-allowed"}
                    `,children:Hi(D,"d")},D.toString())})]}),I.date&&g.jsx("p",{className:"mt-2 text-sm text-danger",children:I.date})]}),v&&g.jsxs("div",{className:"card",children:[g.jsxs("h3",{className:"text-lg font-semibold text-primary mb-4 flex items-center gap-2",children:[g.jsx(sm,{className:"w-5 h-5"}),"Selecciona un Horario"]}),g.jsx("p",{className:"text-sm text-text-secondary mb-4",children:Hi(v,"EEEE, d 'de' MMMM",{locale:af})}),g.jsx("div",{className:"grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2",children:Be.map(D=>g.jsx("button",{type:"button",onClick:()=>D.available&&k(D.time),disabled:!D.available,className:`
                      px-4 py-2 rounded-elegant text-sm font-medium transition-all
                      ${P===D.time?"bg-secondary text-primary":""}
                      ${D.available&&P!==D.time?"bg-background hover:bg-gray-200":""}
                      ${D.available?"":"bg-gray-100 text-gray-400 cursor-not-allowed line-through"}
                    `,children:D.time},D.time))}),Be.every(D=>!D.available)&&g.jsx("p",{className:"text-center text-text-secondary text-sm mt-4",children:"No hay horarios disponibles para esta fecha"}),I.time&&g.jsx("p",{className:"mt-2 text-sm text-danger",children:I.time})]}),v&&P&&g.jsxs("div",{className:"card",children:[g.jsxs("h3",{className:"text-lg font-semibold text-primary mb-4 flex items-center gap-2",children:[g.jsx(aa,{className:"w-5 h-5"}),"Tus Datos"]}),g.jsxs("div",{className:"space-y-4",children:[g.jsxs("div",{children:[g.jsx("label",{htmlFor:"clientName",className:"label",children:"Nombre Completo *"}),g.jsx("input",{type:"text",id:"clientName",value:S.clientName,onChange:D=>_(B=>({...B,clientName:D.target.value})),className:`input ${I.clientName?"input-error":""}`,placeholder:"Juan Pérez"}),I.clientName&&g.jsx("p",{className:"mt-1 text-sm text-danger",children:I.clientName})]}),g.jsxs("div",{children:[g.jsx("label",{htmlFor:"clientPhone",className:"label",children:"Teléfono *"}),g.jsxs("div",{className:"relative",children:[g.jsx(bu,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5"}),g.jsx("input",{type:"tel",id:"clientPhone",value:S.clientPhone,onChange:D=>_(B=>({...B,clientPhone:D.target.value})),className:`input pl-11 ${I.clientPhone?"input-error":""}`,placeholder:"+34 123 456 789"})]}),I.clientPhone&&g.jsx("p",{className:"mt-1 text-sm text-danger",children:I.clientPhone})]}),g.jsxs("div",{children:[g.jsx("label",{htmlFor:"clientEmail",className:"label",children:"Email (opcional)"}),g.jsxs("div",{className:"relative",children:[g.jsx(oa,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5"}),g.jsx("input",{type:"email",id:"clientEmail",value:S.clientEmail,onChange:D=>_(B=>({...B,clientEmail:D.target.value})),className:`input pl-11 ${I.clientEmail?"input-error":""}`,placeholder:"tu@email.com"})]}),I.clientEmail&&g.jsx("p",{className:"mt-1 text-sm text-danger",children:I.clientEmail})]}),g.jsxs("div",{children:[g.jsx("label",{htmlFor:"notes",className:"label",children:"Notas (opcional)"}),g.jsxs("div",{className:"relative",children:[g.jsx(lM,{className:"absolute left-3 top-3 text-text-secondary w-5 h-5"}),g.jsx("textarea",{id:"notes",value:S.notes,onChange:D=>_(B=>({...B,notes:D.target.value})),className:"input pl-11 min-h-[100px] resize-none",placeholder:"¿Algún detalle especial?"})]})]})]})]}),v&&P&&g.jsx("button",{type:"submit",disabled:u,className:"btn-gold w-full py-4 text-lg flex items-center justify-center gap-2",children:u?g.jsxs(g.Fragment,{children:[g.jsx(la,{size:"small"}),"Agendando..."]}):g.jsxs(g.Fragment,{children:[g.jsx(_s,{className:"w-5 h-5"}),"Confirmar Cita"]})})]})]})}):g.jsx("div",{className:"min-h-screen flex items-center justify-center bg-background px-4",children:g.jsxs("div",{className:"text-center",children:[g.jsx("h2",{className:"text-2xl font-bold text-primary mb-2",children:"Barbería no encontrada"}),g.jsx("p",{className:"text-text-secondary",children:"Verifica el enlace e intenta nuevamente"})]})})};function yV(){return g.jsxs(QO,{children:[g.jsx(OA,{children:g.jsxs(bA,{children:[g.jsx(Br,{path:"/book/:businessId",element:g.jsx(gV,{})}),g.jsx(Br,{path:"/login",element:g.jsx(gM,{})}),g.jsx(Br,{path:"/dashboard",element:g.jsx(Xv,{children:g.jsx(eV,{})})}),g.jsx(Br,{path:"/settings",element:g.jsx(Xv,{children:g.jsx(mV,{})})}),g.jsx(Br,{path:"/",element:g.jsx(kh,{to:"/dashboard",replace:!0})}),g.jsx(Br,{path:"*",element:g.jsx(kh,{to:"/dashboard",replace:!0})})]})}),g.jsx(TC,{position:"top-right",toastOptions:{duration:3e3,style:{background:"#fff",color:"#1a1a1a",borderRadius:"12px",padding:"16px",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.1)",fontFamily:"Inter, sans-serif"},success:{iconTheme:{primary:"#34c759",secondary:"#fff"}},error:{iconTheme:{primary:"#ff3b30",secondary:"#fff"}}}})]})}Md.createRoot(document.getElementById("root")).render(g.jsx(Ni.StrictMode,{children:g.jsx(yV,{})}));
