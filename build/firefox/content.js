!function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(r,i,function(n){return t[n]}.bind(null,i));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=8)}([function(t,n,e){"use strict";function r(t){var n,e=(n=(n=(n=(t=(t=t.toString()).toLowerCase()).indexOf("://")>-1?t.split("/")[2]:t.split("/")[0]).split(":")[0]).replace(/^www\./,"")).split(".");return e.length>2&&(n=-1!==n.indexOf(".co.")||-1!==n.indexOf(".com.")?e.slice(-3).join("."):e.slice(-2).join(".")),n}e.d(n,"a",function(){return r})},function(t,n,e){var r=e(2);t.exports=function(){var t=new r.Template({code:function(t,n,e){var r=this;return r.b(e=e||""),r.b('<div id="AltruistoTopBar"><img src="'),r.b(r.v(r.d("ASSETS_PATHS.icons.cancel",t,n,0))),r.b(' " id="AltruistoTopBarIcon"> <a href="https://altruisto.com" id="AltruistoTopBarLogoLink"><img src="'),r.b(r.v(r.d("ASSETS_PATHS.icons.icon",t,n,0))),r.b('" id="AltruistoTopBarLogo"></a><div id="AltruistoTopBarCTA"> '),r.b(r.t(r.f("content",t,n,0))),r.b('</div></div><div style="clear:both"></div>'),r.fl()},partials:{},subs:{}},'<div id="AltruistoTopBar"><img src="{{ASSETS_PATHS.icons.cancel}} " id="AltruistoTopBarIcon"> <a href="https://altruisto.com" id="AltruistoTopBarLogoLink"><img src="{{ASSETS_PATHS.icons.icon}}" id="AltruistoTopBarLogo"></a><div id="AltruistoTopBarCTA"> {{{content}}}</div></div><div style="clear:both"></div>',r);return t.render.apply(t,arguments)}},function(t,n,e){var r=e(3);r.Template=e(4).Template,r.template=r.Template,t.exports=r},function(t,n,e){!function(t){var n=/\S/,e=/\"/g,r=/\n/g,i=/\r/g,o=/\\/g,a=/\u2028/,s=/\u2029/;function c(t){"}"===t.n.substr(t.n.length-1)&&(t.n=t.n.substring(0,t.n.length-1))}function l(t){return t.trim?t.trim():t.replace(/^\s*|\s*$/g,"")}function u(t,n,e){if(n.charAt(e)!=t.charAt(0))return!1;for(var r=1,i=t.length;r<i;r++)if(n.charAt(e+r)!=t.charAt(r))return!1;return!0}t.tags={"#":1,"^":2,"<":3,$:4,"/":5,"!":6,">":7,"=":8,_v:9,"{":10,"&":11,_t:12},t.scan=function(e,r){var i=e.length,o=0,a=null,s=null,f="",p=[],d=!1,g=0,h=0,b="{{",m="}}";function v(){f.length>0&&(p.push({tag:"_t",text:new String(f)}),f="")}function x(e,r){if(v(),e&&function(){for(var e=!0,r=h;r<p.length;r++)if(!(e=t.tags[p[r].tag]<t.tags._v||"_t"==p[r].tag&&null===p[r].text.match(n)))return!1;return e}())for(var i,o=h;o<p.length;o++)p[o].text&&((i=p[o+1])&&">"==i.tag&&(i.indent=p[o].text.toString()),p.splice(o,1));else r||p.push({tag:"\n"});d=!1,h=p.length}function T(t,n){var e="="+m,r=t.indexOf(e,n),i=l(t.substring(t.indexOf("=",n)+1,r)).split(" ");return b=i[0],m=i[i.length-1],r+e.length-1}for(r&&(r=r.split(" "),b=r[0],m=r[1]),g=0;g<i;g++)0==o?u(b,e,g)?(--g,v(),o=1):"\n"==e.charAt(g)?x(d):f+=e.charAt(g):1==o?(g+=b.length-1,"="==(a=(s=t.tags[e.charAt(g+1)])?e.charAt(g+1):"_v")?(g=T(e,g),o=0):(s&&g++,o=2),d=g):u(m,e,g)?(p.push({tag:a,n:l(f),otag:b,ctag:m,i:"/"==a?d-b.length:g+m.length}),f="",g+=m.length-1,o=0,"{"==a&&("}}"==m?g++:c(p[p.length-1]))):f+=e.charAt(g);return x(d,!0),p};var f={_t:!0,"\n":!0,$:!0,"/":!0};function p(t,n){for(var e=0,r=n.length;e<r;e++)if(n[e].o==t.n)return t.tag="#",!0}function d(t,n,e){for(var r=0,i=e.length;r<i;r++)if(e[r].c==t&&e[r].o==n)return!0}function g(t){var n=[];for(var e in t.partials)n.push('"'+b(e)+'":{name:"'+b(t.partials[e].name)+'", '+g(t.partials[e])+"}");return"partials: {"+n.join(",")+"}, subs: "+function(t){var n=[];for(var e in t)n.push('"'+b(e)+'": function(c,p,t,i) {'+t[e]+"}");return"{ "+n.join(",")+" }"}(t.subs)}t.stringify=function(n,e,r){return"{code: function (c,p,i) { "+t.wrapMain(n.code)+" },"+g(n)+"}"};var h=0;function b(t){return t.replace(o,"\\\\").replace(e,'\\"').replace(r,"\\n").replace(i,"\\r").replace(a,"\\u2028").replace(s,"\\u2029")}function m(t){return~t.indexOf(".")?"d":"f"}function v(t,n){var e="<"+(n.prefix||"")+t.n+h++;return n.partials[e]={name:t.n,partials:{}},n.code+='t.b(t.rp("'+b(e)+'",c,p,"'+(t.indent||"")+'"));',e}function x(t,n){n.code+="t.b(t.t(t."+m(t.n)+'("'+b(t.n)+'",c,p,0)));'}function T(t){return"t.b("+t+");"}t.generate=function(n,e,r){h=0;var i={code:"",subs:{},partials:{}};return t.walk(n,i),r.asString?this.stringify(i,e,r):this.makeTemplate(i,e,r)},t.wrapMain=function(t){return'var t=this;t.b(i=i||"");'+t+"return t.fl();"},t.template=t.Template,t.makeTemplate=function(t,n,e){var r=this.makePartials(t);return r.code=new Function("c","p","i",this.wrapMain(t.code)),new this.template(r,n,this,e)},t.makePartials=function(t){var n,e={subs:{},partials:t.partials,name:t.name};for(n in e.partials)e.partials[n]=this.makePartials(e.partials[n]);for(n in t.subs)e.subs[n]=new Function("c","p","t","i",t.subs[n]);return e},t.codegen={"#":function(n,e){e.code+="if(t.s(t."+m(n.n)+'("'+b(n.n)+'",c,p,1),c,p,0,'+n.i+","+n.end+',"'+n.otag+" "+n.ctag+'")){t.rs(c,p,function(c,p,t){',t.walk(n.nodes,e),e.code+="});c.pop();}"},"^":function(n,e){e.code+="if(!t.s(t."+m(n.n)+'("'+b(n.n)+'",c,p,1),c,p,1,0,0,"")){',t.walk(n.nodes,e),e.code+="};"},">":v,"<":function(n,e){var r={partials:{},code:"",subs:{},inPartial:!0};t.walk(n.nodes,r);var i=e.partials[v(n,e)];i.subs=r.subs,i.partials=r.partials},$:function(n,e){var r={subs:{},code:"",partials:e.partials,prefix:n.n};t.walk(n.nodes,r),e.subs[n.n]=r.code,e.inPartial||(e.code+='t.sub("'+b(n.n)+'",c,p,i);')},"\n":function(t,n){n.code+=T('"\\n"'+(t.last?"":" + i"))},_v:function(t,n){n.code+="t.b(t.v(t."+m(t.n)+'("'+b(t.n)+'",c,p,0)));'},_t:function(t,n){n.code+=T('"'+b(t.text)+'"')},"{":x,"&":x},t.walk=function(n,e){for(var r,i=0,o=n.length;i<o;i++)(r=t.codegen[n[i].tag])&&r(n[i],e);return e},t.parse=function(n,e,r){return function n(e,r,i,o){var a,s=[],c=null,l=null;for(a=i[i.length-1];e.length>0;){if(l=e.shift(),a&&"<"==a.tag&&!(l.tag in f))throw new Error("Illegal content in < super tag.");if(t.tags[l.tag]<=t.tags.$||p(l,o))i.push(l),l.nodes=n(e,l.tag,i,o);else{if("/"==l.tag){if(0===i.length)throw new Error("Closing tag without opener: /"+l.n);if(c=i.pop(),l.n!=c.n&&!d(l.n,c.n,o))throw new Error("Nesting error: "+c.n+" vs. "+l.n);return c.end=l.i,s}"\n"==l.tag&&(l.last=0==e.length||"\n"==e[0].tag)}s.push(l)}if(i.length>0)throw new Error("missing closing tag: "+i.pop().n);return s}(n,0,[],(r=r||{}).sectionTags||[])},t.cache={},t.cacheKey=function(t,n){return[t,!!n.asString,!!n.disableLambda,n.delimiters,!!n.modelGet].join("||")},t.compile=function(n,e){e=e||{};var r=t.cacheKey(n,e),i=this.cache[r];if(i){var o=i.partials;for(var a in o)delete o[a].instance;return i}return i=this.generate(this.parse(this.scan(n,e.delimiters),n,e),n,e),this.cache[r]=i}}(n)},function(t,n,e){!function(t){function n(t,n,e){var r;return n&&"object"==typeof n&&(void 0!==n[t]?r=n[t]:e&&n.get&&"function"==typeof n.get&&(r=n.get(t))),r}t.Template=function(t,n,e,r){t=t||{},this.r=t.code||this.r,this.c=e,this.options=r||{},this.text=n||"",this.partials=t.partials||{},this.subs=t.subs||{},this.buf=""},t.Template.prototype={r:function(t,n,e){return""},v:function(t){return t=c(t),s.test(t)?t.replace(e,"&amp;").replace(r,"&lt;").replace(i,"&gt;").replace(o,"&#39;").replace(a,"&quot;"):t},t:c,render:function(t,n,e){return this.ri([t],n||{},e)},ri:function(t,n,e){return this.r(t,n,e)},ep:function(t,n){var e=this.partials[t],r=n[e.name];if(e.instance&&e.base==r)return e.instance;if("string"==typeof r){if(!this.c)throw new Error("No compiler available.");r=this.c.compile(r,this.options)}if(!r)return null;if(this.partials[t].base=r,e.subs){for(key in n.stackText||(n.stackText={}),e.subs)n.stackText[key]||(n.stackText[key]=void 0!==this.activeSub&&n.stackText[this.activeSub]?n.stackText[this.activeSub]:this.text);r=function(t,n,e,r,i,o){function a(){}function s(){}var c;a.prototype=t,s.prototype=t.subs;var l=new a;for(c in l.subs=new s,l.subsText={},l.buf="",r=r||{},l.stackSubs=r,l.subsText=o,n)r[c]||(r[c]=n[c]);for(c in r)l.subs[c]=r[c];for(c in i=i||{},l.stackPartials=i,e)i[c]||(i[c]=e[c]);for(c in i)l.partials[c]=i[c];return l}(r,e.subs,e.partials,this.stackSubs,this.stackPartials,n.stackText)}return this.partials[t].instance=r,r},rp:function(t,n,e,r){var i=this.ep(t,e);return i?i.ri(n,e,r):""},rs:function(t,n,e){var r=t[t.length-1];if(l(r))for(var i=0;i<r.length;i++)t.push(r[i]),e(t,n,this),t.pop();else e(t,n,this)},s:function(t,n,e,r,i,o,a){var s;return(!l(t)||0!==t.length)&&("function"==typeof t&&(t=this.ms(t,n,e,r,i,o,a)),s=!!t,!r&&s&&n&&n.push("object"==typeof t?t:n[n.length-1]),s)},d:function(t,e,r,i){var o,a=t.split("."),s=this.f(a[0],e,r,i),c=this.options.modelGet,u=null;if("."===t&&l(e[e.length-2]))s=e[e.length-1];else for(var f=1;f<a.length;f++)void 0!==(o=n(a[f],s,c))?(u=s,s=o):s="";return!(i&&!s)&&(i||"function"!=typeof s||(e.push(u),s=this.mv(s,e,r),e.pop()),s)},f:function(t,e,r,i){for(var o=!1,a=!1,s=this.options.modelGet,c=e.length-1;c>=0;c--)if(void 0!==(o=n(t,e[c],s))){a=!0;break}return a?(i||"function"!=typeof o||(o=this.mv(o,e,r)),o):!i&&""},ls:function(t,n,e,r,i){var o=this.options.delimiters;return this.options.delimiters=i,this.b(this.ct(c(t.call(n,r)),n,e)),this.options.delimiters=o,!1},ct:function(t,n,e){if(this.options.disableLambda)throw new Error("Lambda features disabled.");return this.c.compile(t,this.options).render(n,e)},b:function(t){this.buf+=t},fl:function(){var t=this.buf;return this.buf="",t},ms:function(t,n,e,r,i,o,a){var s,c=n[n.length-1],l=t.call(c);return"function"==typeof l?!!r||(s=this.activeSub&&this.subsText&&this.subsText[this.activeSub]?this.subsText[this.activeSub]:this.text,this.ls(l,c,e,s.substring(i,o),a)):l},mv:function(t,n,e){var r=n[n.length-1],i=t.call(r);return"function"==typeof i?this.ct(c(i.call(r)),r,e):i},sub:function(t,n,e,r){var i=this.subs[t];i&&(this.activeSub=t,i(n,e,this,r),this.activeSub=!1)}};var e=/&/g,r=/</g,i=/>/g,o=/\'/g,a=/\"/g,s=/[&<>\"\']/;function c(t){return String(null==t?"":t)}var l=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}}(n)},function(t,n,e){(t.exports=e(6)(!1)).push([t.i,"#AltruistoTopBarButton,\n#AltruistoTopBarButtonGrey,\n#AltruistoTopBarCTA {\n  display: inline-block;\n  text-align: center;\n  font-family: Helvetica, Arial, Verdana, sans-serif !important;\n}\n\n#AltruistoTopBar {\n  width: 350px !important;\n  max-height: 180px !important;\n  min-height: 120px !important;\n  border: 1px solid #e0e0e0;\n  background-color: #fff !important;\n  box-shadow: 2px 2px 20px 2px rgba(0, 0, 0, 0.3);\n  position: fixed;\n  top: 35px;\n  right: 35px;\n  z-index: 99999999999999999;\n  box-sizing: border-box;\n  font-family: Helvetica, Arial, Verdana, sans-serif !important;\n  text-align: center !important;\n  line-height: 1.4285;\n  font-size: 14px;\n  color: #959595 !important;\n  animation: altruisto-slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s 1 normal both;\n}\n\n#AltruistoTopBarLogoLink {\n  float: left !important;\n}\n\n#AltruistoTopBarLogo {\n  max-width: 20px !important;\n  margin: 8px;\n  float: left;\n}\n\n#AltruistoTopBarIcon {\n  float: right;\n  margin: 10px;\n  cursor: pointer;\n  max-width: 10px !important;\n}\n\n#AltruistoTopBarWelcome {\n  font-size: 12px;\n  width: 30%;\n  float: left;\n  margin: 9px 0 0;\n}\n\n#AltruistoTopBarCTA {\n  font-weight: 700;\n  margin: 7px 0;\n  font-family: Helvetica, Arial, Verdana, sans-serif !important;\n  width: 240px;\n  margin-top: 20px;\n}\n\n#AltruistoTopBarButton {\n  border: 1px solid #4caf50;\n  background: #4caf50;\n  color: #fff;\n  border-radius: 0;\n  padding: 6px 12px;\n  text-decoration: none;\n  font-weight: 700 !important;\n  line-height: 1.4285;\n  font-family: Helvetica, Arial, Verdana, sans-serif !important;\n  text-transform: uppercase;\n  font-size: 14px !important;\n}\n\n#AltruistoTopBarButton:hover {\n  text-decoration: underline;\n  background-color: #439a46;\n  color: #fff;\n}\n\n#AltruistoTopBarButtonGrey {\n  border: 1px solid #e0e1e2;\n  background: #e0e1e2;\n  color: #fff;\n  border-radius: 0;\n  padding: 6px 12px;\n  text-decoration: none;\n  font-weight: 700;\n  line-height: 1.4285;\n  font-family: Helvetica, Arial, Verdana, sans-serif !important;\n}\n\n#AltruistoTopBarButtonGrey:hover {\n  text-decoration: underline;\n  background-color: #cacbcd;\n  color: #fff;\n}\n\n#AltruistoSmallText {\n  font-weight: 300px;\n  font-size: 12px;\n}\n\n@-webkit-keyframes altruisto-slide-in-right {\n  0% {\n    -webkit-transform: translateX(1000px);\n    transform: translateX(1000px);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n\n@keyframes altruisto-slide-in-right {\n  0% {\n    -webkit-transform: translateX(1000px);\n    transform: translateX(1000px);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n",""])},function(t,n,e){"use strict";t.exports=function(t){var n=[];return n.toString=function(){return this.map(function(n){var e=function(t,n){var e=t[1]||"",r=t[3];if(!r)return e;if(n&&"function"==typeof btoa){var i=(a=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),o=r.sources.map(function(t){return"/*# sourceURL=".concat(r.sourceRoot).concat(t," */")});return[e].concat(o).concat([i]).join("\n")}var a,s,c;return[e].join("\n")}(n,t);return n[2]?"@media ".concat(n[2],"{").concat(e,"}"):e}).join("")},n.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];null!=o&&(r[o]=!0)}for(var a=0;a<t.length;a++){var s=t[a];null!=s[0]&&r[s[0]]||(e&&!s[2]?s[2]=e:e&&(s[2]="(".concat(s[2],") and (").concat(e,")")),n.push(s))}},n}},,function(t,n,e){"use strict";e.r(n);const r={icons:{cancel:browser.extension.getURL("assets/img/cancel.png"),settings:browser.extension.getURL("assets/img/settings.png"),icon:browser.extension.getURL("assets/img/icon.png"),icon16:browser.extension.getURL("assets/img/icon16.png")},pages:{options:browser.extension.getURL("pages/options.html")}};var i=e(0);const o=Object(i.a)(location.href);function a(){let t=[];document.getElementById("AltruistoTopBar").style.display="none",browser.storage.local.get({closedWebsites:[]},function(n){-1==n.closedWebsites.indexOf(o)&&((t=n.closedWebsites).push(o),browser.storage.local.set({closedWebsites:t}))})}function s(t){let n=e(1),i=function(t){let n;return n=t?browser.i18n.getMessage("topbarActivatedInfo")+'<p id="AltruistoSmallText">'+browser.i18n.getMessage("topbarActivatedClose")+"</p>":-1!==o.indexOf("ebay")?browser.i18n.getMessage("topbarActivateInfo")+"<a href=https://altruisto.com/confirm?url="+location.href+"&lang="+browser.i18n.getUILanguage()+" id=AltruistoTopBarButton>"+browser.i18n.getMessage("topbarActivateButton")+"</a>":browser.i18n.getMessage("topbarActivateInfo")+"<a href=https://altruisto.com/redirect?url="+location.href+"&lang="+browser.i18n.getUILanguage()+" id=AltruistoTopBarButton>"+browser.i18n.getMessage("topbarActivateButton")+"</a>"}(t);return n({ASSETS_PATHS:r,content:i})}function c(t){let n=e(5).toString(),r=document.createElement("style");r.innerHTML=n;let i=s(t),o=document.createElement("div");o.id="Altruisto","ar"==browser.i18n.getUILanguage()&&(o.dir="rtl"),o.innerHTML=i,document.documentElement.prepend(r),document.documentElement.prepend(o),t&&setInterval(function(){a()},6e3),document.getElementById("AltruistoTopBarIcon").addEventListener("click",function(){a()})}function l(t){if(t.length)for(let n=0;n<t.length;n++)if(t[n].domain==o){if(t[n].timestamp+6048e5>Date.now())return!0}}var u=function(){browser.storage.local.get({activatedAffiliates:[],closedWebsites:[],disabledWebsites:[],partners:[]},function(t){if(-1!=t.partners.indexOf(o)){if(-1==t.closedWebsites.indexOf(o)&&-1==t.disabledWebsites.indexOf(o)){let n=!1;l(t.activatedAffiliates)&&(n=!0),c(n)}if(-1==t.disabledWebsites.indexOf(o)&&(location.href,"booking.com"==o&&-1!==location.href.indexOf("book.html")||"etsy.com"==o&&-1!==location.href.indexOf("/cart/")||"aliexpress.com"==o&&-1!==location.href.indexOf("/confirm_order.htm")||"barnesandnoble.com"==o&&-1!==location.href.indexOf("/checkout/"))){let n=!1;l(t.activatedAffiliates)&&(n=!0),c(n)}}})};browser.storage.sync.get({addTopBar:!0},function(t){t.addTopBar&&u()})}]);