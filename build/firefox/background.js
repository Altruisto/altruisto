!function(e){var r={};function t(n){if(r[n])return r[n].exports;var s=r[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.l=!0,s.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var s in e)t.d(n,s,function(r){return e[r]}.bind(null,s));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=55)}([function(e,r,t){var n,s,o;s=[e],void 0===(o="function"==typeof(n=function(e){"use strict";if("undefined"==typeof browser||Object.getPrototypeOf(browser)!==Object.prototype){const r="The message port closed before a response was received.",t="Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)",n=e=>{const n={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getBrowserInfo:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(0===Object.keys(n).length)throw new Error("api-metadata.json has not been included in browser-polyfill");const s=(r,t)=>(...n)=>{e.runtime.lastError?r.reject(e.runtime.lastError):t.singleCallbackArg||n.length<=1&&!1!==t.singleCallbackArg?r.resolve(n[0]):r.resolve(n)},o=e=>1==e?"argument":"arguments",a=(e,r,t)=>new Proxy(r,{apply:(r,n,s)=>t.call(n,e,...s)});let i=Function.call.bind(Object.prototype.hasOwnProperty);const c=(e,r={},t={})=>{let n=Object.create(null),l={has:(r,t)=>t in e||t in n,get(l,u,m){if(u in n)return n[u];if(!(u in e))return;let g=e[u];if("function"==typeof g)if("function"==typeof r[u])g=a(e,e[u],r[u]);else if(i(t,u)){let r=((e,r)=>(function(t,...n){if(n.length<r.minArgs)throw new Error(`Expected at least ${r.minArgs} ${o(r.minArgs)} for ${e}(), got ${n.length}`);if(n.length>r.maxArgs)throw new Error(`Expected at most ${r.maxArgs} ${o(r.maxArgs)} for ${e}(), got ${n.length}`);return new Promise((o,a)=>{if(r.fallbackToNoCallback)try{t[e](...n,s({resolve:o,reject:a},r))}catch(s){console.warn(`${e} API method doesn't seem to support the callback parameter, `+"falling back to call it without a callback: ",s),t[e](...n),r.fallbackToNoCallback=!1,r.noCallback=!0,o()}else r.noCallback?(t[e](...n),o()):t[e](...n,s({resolve:o,reject:a},r))})}))(u,t[u]);g=a(e,e[u],r)}else g=g.bind(e);else{if("object"!=typeof g||null===g||!i(r,u)&&!i(t,u))return Object.defineProperty(n,u,{configurable:!0,enumerable:!0,get:()=>e[u],set(r){e[u]=r}}),g;g=c(g,r[u],t[u])}return n[u]=g,g},set:(r,t,s,o)=>(t in n?n[t]=s:e[t]=s,!0),defineProperty:(e,r,t)=>Reflect.defineProperty(n,r,t),deleteProperty:(e,r)=>Reflect.deleteProperty(n,r)},u=Object.create(e);return new Proxy(u,l)},l=e=>({addListener(r,t,...n){r.addListener(e.get(t),...n)},hasListener:(r,t)=>r.hasListener(e.get(t)),removeListener(r,t){r.removeListener(e.get(t))}});let u=!1;const m=new class extends WeakMap{constructor(e,r){super(r),this.createItem=e}get(e){return this.has(e)||this.set(e,this.createItem(e)),super.get(e)}}(e=>"function"!=typeof e?e:function(r,n,s){let o,a,i=!1,c=new Promise(e=>{o=function(r){u||(console.warn(t,(new Error).stack),u=!0),i=!0,e(r)}});try{a=e(r,n,o)}catch(e){a=Promise.reject(e)}const l=!0!==a&&(e=>e&&"object"==typeof e&&"function"==typeof e.then)(a);if(!0!==a&&!l&&!i)return!1;const m=e=>{e.then(e=>{s(e)},e=>{let r;r=e&&(e instanceof Error||"string"==typeof e.message)?e.message:"An unexpected error occurred",s({__mozWebExtensionPolyfillReject__:!0,message:r})}).catch(e=>{console.error("Failed to send onMessage rejected reply",e)})};return m(l?a:c),!0}),g=(t,n,s,...a)=>{if(a.length<n.minArgs)throw new Error(`Expected at least ${n.minArgs} ${o(n.minArgs)} for ${t}(), got ${a.length}`);if(a.length>n.maxArgs)throw new Error(`Expected at most ${n.maxArgs} ${o(n.maxArgs)} for ${t}(), got ${a.length}`);return new Promise((t,n)=>{const o=(({reject:t,resolve:n},s)=>{e.runtime.lastError?e.runtime.lastError.message===r?n():t(e.runtime.lastError):s&&s.__mozWebExtensionPolyfillReject__?t(new Error(s.message)):n(s)}).bind(null,{resolve:t,reject:n});a.push(o),s.sendMessage(...a)})},f={runtime:{onMessage:l(m),onMessageExternal:l(m),sendMessage:g.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:g.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},d={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return n.privacy={network:{networkPredictionEnabled:d,webRTCIPHandlingPolicy:d},services:{passwordSavingEnabled:d},websites:{hyperlinkAuditingEnabled:d,referrersEnabled:d}},c(e,f,n)};e.exports=n(chrome)}else e.exports=browser})?n.apply(r,s):n)||(e.exports=o)},function(e,r,t){"use strict";var n=t(6),s=t(21),o=Object.prototype.toString;function a(e){return"[object Array]"===o.call(e)}function i(e){return null!==e&&"object"==typeof e}function c(e){return"[object Function]"===o.call(e)}function l(e,r){if(null!=e)if("object"!=typeof e&&(e=[e]),a(e))for(var t=0,n=e.length;t<n;t++)r.call(null,e[t],t,e);else for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&r.call(null,e[s],s,e)}e.exports={isArray:a,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:s,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:i,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:c,isStream:function(e){return i(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:l,merge:function e(){var r={};function t(t,n){"object"==typeof r[n]&&"object"==typeof t?r[n]=e(r[n],t):r[n]=t}for(var n=0,s=arguments.length;n<s;n++)l(arguments[n],t);return r},deepMerge:function e(){var r={};function t(t,n){"object"==typeof r[n]&&"object"==typeof t?r[n]=e(r[n],t):r[n]="object"==typeof t?e({},t):t}for(var n=0,s=arguments.length;n<s;n++)l(arguments[n],t);return r},extend:function(e,r,t){return l(r,function(r,s){e[s]=t&&"function"==typeof r?n(r,t):r}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,r,t){"use strict";function n(e){var r,t=(r=(r=(r=(e=(e=e.toString()).toLowerCase()).indexOf("://")>-1?e.split("/")[2]:e.split("/")[0]).split(":")[0]).replace(/^www\./,"")).split(".");return t.length>2&&(r=-1!==r.indexOf(".co.")||-1!==r.indexOf(".com.")?t.slice(-3).join("."):t.slice(-2).join(".")),r}t.d(r,"a",function(){return n})},,,,function(e,r,t){"use strict";e.exports=function(e,r){return function(){for(var t=new Array(arguments.length),n=0;n<t.length;n++)t[n]=arguments[n];return e.apply(r,t)}}},function(e,r,t){"use strict";var n=t(1);function s(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,r,t){if(!r)return e;var o;if(t)o=t(r);else if(n.isURLSearchParams(r))o=r.toString();else{var a=[];n.forEach(r,function(e,r){null!=e&&(n.isArray(e)?r+="[]":e=[e],n.forEach(e,function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),a.push(s(r)+"="+s(e))}))}),o=a.join("&")}if(o){var i=e.indexOf("#");-1!==i&&(e=e.slice(0,i)),e+=(-1===e.indexOf("?")?"?":"&")+o}return e}},function(e,r,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,r,t){"use strict";(function(r){var n=t(1),s=t(27),o={"Content-Type":"application/x-www-form-urlencoded"};function a(e,r){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=r)}var i,c={adapter:(void 0!==r&&"[object process]"===Object.prototype.toString.call(r)?i=t(10):"undefined"!=typeof XMLHttpRequest&&(i=t(10)),i),transformRequest:[function(e,r){return s(r,"Accept"),s(r,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(a(r,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(a(r,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},n.forEach(["delete","get","head"],function(e){c.headers[e]={}}),n.forEach(["post","put","patch"],function(e){c.headers[e]=n.merge(o)}),e.exports=c}).call(this,t(26))},function(e,r,t){"use strict";var n=t(1),s=t(28),o=t(7),a=t(30),i=t(31),c=t(11);e.exports=function(e){return new Promise(function(r,l){var u=e.data,m=e.headers;n.isFormData(u)&&delete m["Content-Type"];var g=new XMLHttpRequest;if(e.auth){var f=e.auth.username||"",d=e.auth.password||"";m.Authorization="Basic "+btoa(f+":"+d)}if(g.open(e.method.toUpperCase(),o(e.url,e.params,e.paramsSerializer),!0),g.timeout=e.timeout,g.onreadystatechange=function(){if(g&&4===g.readyState&&(0!==g.status||g.responseURL&&0===g.responseURL.indexOf("file:"))){var t="getAllResponseHeaders"in g?a(g.getAllResponseHeaders()):null,n={data:e.responseType&&"text"!==e.responseType?g.response:g.responseText,status:g.status,statusText:g.statusText,headers:t,config:e,request:g};s(r,l,n),g=null}},g.onabort=function(){g&&(l(c("Request aborted",e,"ECONNABORTED",g)),g=null)},g.onerror=function(){l(c("Network Error",e,null,g)),g=null},g.ontimeout=function(){l(c("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",g)),g=null},n.isStandardBrowserEnv()){var p=t(32),A=(e.withCredentials||i(e.url))&&e.xsrfCookieName?p.read(e.xsrfCookieName):void 0;A&&(m[e.xsrfHeaderName]=A)}if("setRequestHeader"in g&&n.forEach(m,function(e,r){void 0===u&&"content-type"===r.toLowerCase()?delete m[r]:g.setRequestHeader(r,e)}),e.withCredentials&&(g.withCredentials=!0),e.responseType)try{g.responseType=e.responseType}catch(r){if("json"!==e.responseType)throw r}"function"==typeof e.onDownloadProgress&&g.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&g.upload&&g.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){g&&(g.abort(),l(e),g=null)}),void 0===u&&(u=null),g.send(u)})}},function(e,r,t){"use strict";var n=t(29);e.exports=function(e,r,t,s,o){var a=new Error(e);return n(a,r,t,s,o)}},function(e,r,t){"use strict";var n=t(1);e.exports=function(e,r){r=r||{};var t={};return n.forEach(["url","method","params","data"],function(e){void 0!==r[e]&&(t[e]=r[e])}),n.forEach(["headers","auth","proxy"],function(s){n.isObject(r[s])?t[s]=n.deepMerge(e[s],r[s]):void 0!==r[s]?t[s]=r[s]:n.isObject(e[s])?t[s]=n.deepMerge(e[s]):void 0!==e[s]&&(t[s]=e[s])}),n.forEach(["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"],function(n){void 0!==r[n]?t[n]=r[n]:void 0!==e[n]&&(t[n]=e[n])}),t}},function(e,r,t){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},,,function(e,r,t){e.exports=t(20)},,,,function(e,r,t){"use strict";var n=t(1),s=t(6),o=t(22),a=t(12);function i(e){var r=new o(e),t=s(o.prototype.request,r);return n.extend(t,o.prototype,r),n.extend(t,r),t}var c=i(t(9));c.Axios=o,c.create=function(e){return i(a(c.defaults,e))},c.Cancel=t(13),c.CancelToken=t(35),c.isCancel=t(8),c.all=function(e){return Promise.all(e)},c.spread=t(36),e.exports=c,e.exports.default=c},function(e,r){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&null!=e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}},function(e,r,t){"use strict";var n=t(1),s=t(7),o=t(23),a=t(24),i=t(12);function c(e){this.defaults=e,this.interceptors={request:new o,response:new o}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=i(this.defaults,e)).method=e.method?e.method.toLowerCase():"get";var r=[a,void 0],t=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){r.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){r.push(e.fulfilled,e.rejected)});r.length;)t=t.then(r.shift(),r.shift());return t},c.prototype.getUri=function(e){return e=i(this.defaults,e),s(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],function(e){c.prototype[e]=function(r,t){return this.request(n.merge(t||{},{method:e,url:r}))}}),n.forEach(["post","put","patch"],function(e){c.prototype[e]=function(r,t,s){return this.request(n.merge(s||{},{method:e,url:r,data:t}))}}),e.exports=c},function(e,r,t){"use strict";var n=t(1);function s(){this.handlers=[]}s.prototype.use=function(e,r){return this.handlers.push({fulfilled:e,rejected:r}),this.handlers.length-1},s.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},s.prototype.forEach=function(e){n.forEach(this.handlers,function(r){null!==r&&e(r)})},e.exports=s},function(e,r,t){"use strict";var n=t(1),s=t(25),o=t(8),a=t(9),i=t(33),c=t(34);function l(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return l(e),e.baseURL&&!i(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=s(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),n.forEach(["delete","get","head","post","put","patch","common"],function(r){delete e.headers[r]}),(e.adapter||a.adapter)(e).then(function(r){return l(e),r.data=s(r.data,r.headers,e.transformResponse),r},function(r){return o(r)||(l(e),r&&r.response&&(r.response.data=s(r.response.data,r.response.headers,e.transformResponse))),Promise.reject(r)})}},function(e,r,t){"use strict";var n=t(1);e.exports=function(e,r,t){return n.forEach(t,function(t){e=t(e,r)}),e}},function(e,r){var t,n,s=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function i(e){if(t===setTimeout)return setTimeout(e,0);if((t===o||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:o}catch(e){t=o}try{n="function"==typeof clearTimeout?clearTimeout:a}catch(e){n=a}}();var c,l=[],u=!1,m=-1;function g(){u&&c&&(u=!1,c.length?l=c.concat(l):m=-1,l.length&&f())}function f(){if(!u){var e=i(g);u=!0;for(var r=l.length;r;){for(c=l,l=[];++m<r;)c&&c[m].run();m=-1,r=l.length}c=null,u=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===a||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(r){try{return n.call(null,e)}catch(r){return n.call(this,e)}}}(e)}}function d(e,r){this.fun=e,this.array=r}function p(){}s.nextTick=function(e){var r=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)r[t-1]=arguments[t];l.push(new d(e,r)),1!==l.length||u||i(f)},d.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=p,s.addListener=p,s.once=p,s.off=p,s.removeListener=p,s.removeAllListeners=p,s.emit=p,s.prependListener=p,s.prependOnceListener=p,s.listeners=function(e){return[]},s.binding=function(e){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},function(e,r,t){"use strict";var n=t(1);e.exports=function(e,r){n.forEach(e,function(t,n){n!==r&&n.toUpperCase()===r.toUpperCase()&&(e[r]=t,delete e[n])})}},function(e,r,t){"use strict";var n=t(11);e.exports=function(e,r,t){var s=t.config.validateStatus;!s||s(t.status)?e(t):r(n("Request failed with status code "+t.status,t.config,null,t.request,t))}},function(e,r,t){"use strict";e.exports=function(e,r,t,n,s){return e.config=r,t&&(e.code=t),e.request=n,e.response=s,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,r,t){"use strict";var n=t(1),s=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var r,t,o,a={};return e?(n.forEach(e.split("\n"),function(e){if(o=e.indexOf(":"),r=n.trim(e.substr(0,o)).toLowerCase(),t=n.trim(e.substr(o+1)),r){if(a[r]&&s.indexOf(r)>=0)return;a[r]="set-cookie"===r?(a[r]?a[r]:[]).concat([t]):a[r]?a[r]+", "+t:t}}),a):a}},function(e,r,t){"use strict";var n=t(1);e.exports=n.isStandardBrowserEnv()?function(){var e,r=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a");function s(e){var n=e;return r&&(t.setAttribute("href",n),n=t.href),t.setAttribute("href",n),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:"/"===t.pathname.charAt(0)?t.pathname:"/"+t.pathname}}return e=s(window.location.href),function(r){var t=n.isString(r)?s(r):r;return t.protocol===e.protocol&&t.host===e.host}}():function(){return!0}},function(e,r,t){"use strict";var n=t(1);e.exports=n.isStandardBrowserEnv()?{write:function(e,r,t,s,o,a){var i=[];i.push(e+"="+encodeURIComponent(r)),n.isNumber(t)&&i.push("expires="+new Date(t).toGMTString()),n.isString(s)&&i.push("path="+s),n.isString(o)&&i.push("domain="+o),!0===a&&i.push("secure"),document.cookie=i.join("; ")},read:function(e){var r=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return r?decodeURIComponent(r[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,r,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,r,t){"use strict";e.exports=function(e,r){return r?e.replace(/\/+$/,"")+"/"+r.replace(/^\/+/,""):e}},function(e,r,t){"use strict";var n=t(13);function s(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var r;this.promise=new Promise(function(e){r=e});var t=this;e(function(e){t.reason||(t.reason=new n(e),r(t.reason))})}s.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},s.source=function(){var e;return{token:new s(function(r){e=r}),cancel:e}},e.exports=s},function(e,r,t){"use strict";e.exports=function(e){return function(r){return e.apply(null,r)}}},,,,,,,,,,,,,,,,,,,function(e,r,t){"use strict";t.r(r);var n=t(0);function s(){var e=new XMLHttpRequest;e.open("GET","https://altruisto.com/api/partners"),e.onreadystatechange=function(){if(4==e.readyState&&e.responseText){var r=JSON.parse(e.responseText);n.storage.local.remove(["partners"]),n.storage.local.set({partners:r})}},e.send()}var o=t(16),a=t.n(o).a.create({baseURL:"http://api.altruisto.localhost:8000"});var i,c,l,u=t(2);function m(e){return new RegExp(["id=XK9XruzkyUo","8106588"].join("|")).test(e)}function g(e){return["anrdoezrs.net","commission-junction.com","dpbolvw.net","apmebf.com","jdoqocy.com","kqzyfj.com","qksrv.net","tkqlhce.com","ww.qksz.net","emjcd.com","afcyhf.com","awltovhc.com","ftjcfx.com","lduhtrp.net","tqlkg.com","awxibrm.com","cualbr.com","rnsfpw.net","vofzpwh.com","yceml.net","linksynergy.com"].includes(e)}n.runtime.onInstalled.addListener(async function(e){if(n.alarms.create("clearClosedWebsites",{periodInMinutes:60}),n.alarms.create("clearDisabledWebsites",{periodInMinutes:1440}),n.alarms.create("getPartnersList",{periodInMinutes:1440}),s(),"install"==e.reason){const e=await n.cookies.get({url:"https://altruisto.com",name:"r"}),{installationId:r,ref:t}=await a.post("/installations",{referredBy:e?e.value:""}).then(e=>({installationId:e.data.installation_id,ref:e.data.ref}));n.storage.local.set({refferedBy:e?e.value:"",installationId:r}),n.storage.sync.set({ref:t}),n.tabs.create({url:"https://altruisto.com/welcome/"})}}),n.alarms.onAlarm.addListener(function(e){switch(e.name){case"clearClosedWebsites":n.storage.local.remove(["closedWebsites"]);break;case"clearDisabledWebsites":n.storage.local.remove(["disabledWebsites"]);break;case"getPartnersList":s()}}),n.webRequest.onBeforeRequest.addListener(function(e){var r=e.url.split("?url=");!function(e){var r,t,s;0===Object.keys(e).length&&e.constructor===Object||n.storage.local.get("activatedAffiliates").then(o=>{if(null!=o.activatedAffiliates){for(r=o.activatedAffiliates,t=0;t<r.length;t++)if(r[t].domain==e.domain){r[t].timestamp=e.timestamp,s=!0;break}s||r.push(e)}else r=new Array(e);n.storage.local.set({activatedAffiliates:r})})}({domain:Object(u.a)(r[1]),timestamp:e.timeStamp})},{urls:["https://altruisto.com/redirect*"],types:["main_frame"]}),n.runtime.onMessage.addListener(function(e,r,t){r.tab&&(n.cookies.getAll({domain:e.domain},function(r){for(var t=0;t<r.length;t++)s=r[t],o=e.domain,a=void 0,a=s.secure?"https://":"http://",n.cookies.remove({url:a+o+s.path,name:s.name});var s,o,a;!function(e){n.storage.local.get({activatedAffiliates:[]}).then(r=>{for(let t=0;t<r.activatedAffiliates.length;t++)if(r.activatedAffiliates[t].domain==e){let e=r.activatedAffiliates;e.splice(t,1),n.storage.local.set({activatedAffiliates:e});break}})}(e.domain)}),t({status:!0}))}),c=!1,l=!1,n.webRequest.onBeforeRedirect.addListener(function(e){var r=Object(u.a)(e.url),t=Object(u.a)(e.redirectUrl),n=e.tabId;(g(r)||g(t))&&(c=!0,m(e.url)||m(e.redirectUrl)?l=!0:i=n)},{urls:["<all_urls>"],types:["main_frame"]}),n.webRequest.onCompleted.addListener(function(e){var r,t,s=e.tabId;c&&!l?i==s&&(r=Object(u.a)(e.url),t=[],n.storage.local.get({disabledWebsites:[]}).then(e=>{t=e.disabledWebsites,-1===e.disabledWebsites.indexOf(r)&&(t.push(r),n.storage.local.set({disabledWebsites:t}))}),c=!1,l=!1,i=0):c&&l&&(c=!1,l=!1)},{urls:["<all_urls>"],types:["main_frame"]})}]);