!function(t){var n={};function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:i})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(i,r,function(n){return t[n]}.bind(null,r));return i},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=8)}([function(t,n,e){"use strict";function i(t){var n,e=(n=(n=(n=(t=(t=t.toString()).toLowerCase()).indexOf("://")>-1?t.split("/")[2]:t.split("/")[0]).split(":")[0]).replace(/^www\./,"")).split(".");return e.length>2&&(n=-1!==n.indexOf(".co.")||-1!==n.indexOf(".com.")?e.slice(-3).join("."):e.slice(-2).join(".")),n}e.d(n,"a",function(){return i})},function(t,n,e){var i=e(2);t.exports=function(){var t=new i.Template({code:function(t,n,e){var i=this;return i.b(e=e||""),i.b('<div id="AltruistoTopBar"><img src="'),i.b(i.v(i.d("ASSETS_PATHS.icons.cancel",t,n,0))),i.b(' " id="AltruistoTopBarIcon"> <a href="https://altruisto.com" id="AltruistoTopBarLogoLink"><img src="'),i.b(i.v(i.d("ASSETS_PATHS.icons.icon",t,n,0))),i.b('" id="AltruistoTopBarLogo"></a><div id="AltruistoTopBarCTA"> '),i.b(i.t(i.f("content",t,n,0))),i.b('</div></div><div style="clear:both"></div>'),i.fl()},partials:{},subs:{}},'<div id="AltruistoTopBar"><img src="{{ASSETS_PATHS.icons.cancel}} " id="AltruistoTopBarIcon"> <a href="https://altruisto.com" id="AltruistoTopBarLogoLink"><img src="{{ASSETS_PATHS.icons.icon}}" id="AltruistoTopBarLogo"></a><div id="AltruistoTopBarCTA"> {{{content}}}</div></div><div style="clear:both"></div>',i);return t.render.apply(t,arguments)}},function(t,n,e){var i=e(3);i.Template=e(4).Template,i.template=i.Template,t.exports=i},function(t,n,e){!function(t){var n=/\S/,e=/\"/g,i=/\n/g,r=/\r/g,o=/\\/g,a=/\u2028/,s=/\u2029/;function c(t){"}"===t.n.substr(t.n.length-1)&&(t.n=t.n.substring(0,t.n.length-1))}function l(t){return t.trim?t.trim():t.replace(/^\s*|\s*$/g,"")}function u(t,n,e){if(n.charAt(e)!=t.charAt(0))return!1;for(var i=1,r=t.length;i<r;i++)if(n.charAt(e+i)!=t.charAt(i))return!1;return!0}t.tags={"#":1,"^":2,"<":3,$:4,"/":5,"!":6,">":7,"=":8,_v:9,"{":10,"&":11,_t:12},t.scan=function(e,i){var r=e.length,o=0,a=null,s=null,f="",p=[],h=!1,d=0,g=0,m="{{",b="}}";function v(){f.length>0&&(p.push({tag:"_t",text:new String(f)}),f="")}function x(e,i){if(v(),e&&function(){for(var e=!0,i=g;i<p.length;i++)if(!(e=t.tags[p[i].tag]<t.tags._v||"_t"==p[i].tag&&null===p[i].text.match(n)))return!1;return e}())for(var r,o=g;o<p.length;o++)p[o].text&&((r=p[o+1])&&">"==r.tag&&(r.indent=p[o].text.toString()),p.splice(o,1));else i||p.push({tag:"\n"});h=!1,g=p.length}function T(t,n){var e="="+b,i=t.indexOf(e,n),r=l(t.substring(t.indexOf("=",n)+1,i)).split(" ");return m=r[0],b=r[r.length-1],i+e.length-1}for(i&&(i=i.split(" "),m=i[0],b=i[1]),d=0;d<r;d++)0==o?u(m,e,d)?(--d,v(),o=1):"\n"==e.charAt(d)?x(h):f+=e.charAt(d):1==o?(d+=m.length-1,"="==(a=(s=t.tags[e.charAt(d+1)])?e.charAt(d+1):"_v")?(d=T(e,d),o=0):(s&&d++,o=2),h=d):u(b,e,d)?(p.push({tag:a,n:l(f),otag:m,ctag:b,i:"/"==a?h-m.length:d+b.length}),f="",d+=b.length-1,o=0,"{"==a&&("}}"==b?d++:c(p[p.length-1]))):f+=e.charAt(d);return x(h,!0),p};var f={_t:!0,"\n":!0,$:!0,"/":!0};function p(t,n){for(var e=0,i=n.length;e<i;e++)if(n[e].o==t.n)return t.tag="#",!0}function h(t,n,e){for(var i=0,r=e.length;i<r;i++)if(e[i].c==t&&e[i].o==n)return!0}function d(t){var n=[];for(var e in t.partials)n.push('"'+m(e)+'":{name:"'+m(t.partials[e].name)+'", '+d(t.partials[e])+"}");return"partials: {"+n.join(",")+"}, subs: "+function(t){var n=[];for(var e in t)n.push('"'+m(e)+'": function(c,p,t,i) {'+t[e]+"}");return"{ "+n.join(",")+" }"}(t.subs)}t.stringify=function(n,e,i){return"{code: function (c,p,i) { "+t.wrapMain(n.code)+" },"+d(n)+"}"};var g=0;function m(t){return t.replace(o,"\\\\").replace(e,'\\"').replace(i,"\\n").replace(r,"\\r").replace(a,"\\u2028").replace(s,"\\u2029")}function b(t){return~t.indexOf(".")?"d":"f"}function v(t,n){var e="<"+(n.prefix||"")+t.n+g++;return n.partials[e]={name:t.n,partials:{}},n.code+='t.b(t.rp("'+m(e)+'",c,p,"'+(t.indent||"")+'"));',e}function x(t,n){n.code+="t.b(t.t(t."+b(t.n)+'("'+m(t.n)+'",c,p,0)));'}function T(t){return"t.b("+t+");"}t.generate=function(n,e,i){g=0;var r={code:"",subs:{},partials:{}};return t.walk(n,r),i.asString?this.stringify(r,e,i):this.makeTemplate(r,e,i)},t.wrapMain=function(t){return'var t=this;t.b(i=i||"");'+t+"return t.fl();"},t.template=t.Template,t.makeTemplate=function(t,n,e){var i=this.makePartials(t);return i.code=new Function("c","p","i",this.wrapMain(t.code)),new this.template(i,n,this,e)},t.makePartials=function(t){var n,e={subs:{},partials:t.partials,name:t.name};for(n in e.partials)e.partials[n]=this.makePartials(e.partials[n]);for(n in t.subs)e.subs[n]=new Function("c","p","t","i",t.subs[n]);return e},t.codegen={"#":function(n,e){e.code+="if(t.s(t."+b(n.n)+'("'+m(n.n)+'",c,p,1),c,p,0,'+n.i+","+n.end+',"'+n.otag+" "+n.ctag+'")){t.rs(c,p,function(c,p,t){',t.walk(n.nodes,e),e.code+="});c.pop();}"},"^":function(n,e){e.code+="if(!t.s(t."+b(n.n)+'("'+m(n.n)+'",c,p,1),c,p,1,0,0,"")){',t.walk(n.nodes,e),e.code+="};"},">":v,"<":function(n,e){var i={partials:{},code:"",subs:{},inPartial:!0};t.walk(n.nodes,i);var r=e.partials[v(n,e)];r.subs=i.subs,r.partials=i.partials},$:function(n,e){var i={subs:{},code:"",partials:e.partials,prefix:n.n};t.walk(n.nodes,i),e.subs[n.n]=i.code,e.inPartial||(e.code+='t.sub("'+m(n.n)+'",c,p,i);')},"\n":function(t,n){n.code+=T('"\\n"'+(t.last?"":" + i"))},_v:function(t,n){n.code+="t.b(t.v(t."+b(t.n)+'("'+m(t.n)+'",c,p,0)));'},_t:function(t,n){n.code+=T('"'+m(t.text)+'"')},"{":x,"&":x},t.walk=function(n,e){for(var i,r=0,o=n.length;r<o;r++)(i=t.codegen[n[r].tag])&&i(n[r],e);return e},t.parse=function(n,e,i){return function n(e,i,r,o){var a,s=[],c=null,l=null;for(a=r[r.length-1];e.length>0;){if(l=e.shift(),a&&"<"==a.tag&&!(l.tag in f))throw new Error("Illegal content in < super tag.");if(t.tags[l.tag]<=t.tags.$||p(l,o))r.push(l),l.nodes=n(e,l.tag,r,o);else{if("/"==l.tag){if(0===r.length)throw new Error("Closing tag without opener: /"+l.n);if(c=r.pop(),l.n!=c.n&&!h(l.n,c.n,o))throw new Error("Nesting error: "+c.n+" vs. "+l.n);return c.end=l.i,s}"\n"==l.tag&&(l.last=0==e.length||"\n"==e[0].tag)}s.push(l)}if(r.length>0)throw new Error("missing closing tag: "+r.pop().n);return s}(n,0,[],(i=i||{}).sectionTags||[])},t.cache={},t.cacheKey=function(t,n){return[t,!!n.asString,!!n.disableLambda,n.delimiters,!!n.modelGet].join("||")},t.compile=function(n,e){e=e||{};var i=t.cacheKey(n,e),r=this.cache[i];if(r){var o=r.partials;for(var a in o)delete o[a].instance;return r}return r=this.generate(this.parse(this.scan(n,e.delimiters),n,e),n,e),this.cache[i]=r}}(n)},function(t,n,e){!function(t){function n(t,n,e){var i;return n&&"object"==typeof n&&(void 0!==n[t]?i=n[t]:e&&n.get&&"function"==typeof n.get&&(i=n.get(t))),i}t.Template=function(t,n,e,i){t=t||{},this.r=t.code||this.r,this.c=e,this.options=i||{},this.text=n||"",this.partials=t.partials||{},this.subs=t.subs||{},this.buf=""},t.Template.prototype={r:function(t,n,e){return""},v:function(t){return t=c(t),s.test(t)?t.replace(e,"&amp;").replace(i,"&lt;").replace(r,"&gt;").replace(o,"&#39;").replace(a,"&quot;"):t},t:c,render:function(t,n,e){return this.ri([t],n||{},e)},ri:function(t,n,e){return this.r(t,n,e)},ep:function(t,n){var e=this.partials[t],i=n[e.name];if(e.instance&&e.base==i)return e.instance;if("string"==typeof i){if(!this.c)throw new Error("No compiler available.");i=this.c.compile(i,this.options)}if(!i)return null;if(this.partials[t].base=i,e.subs){for(key in n.stackText||(n.stackText={}),e.subs)n.stackText[key]||(n.stackText[key]=void 0!==this.activeSub&&n.stackText[this.activeSub]?n.stackText[this.activeSub]:this.text);i=function(t,n,e,i,r,o){function a(){}function s(){}var c;a.prototype=t,s.prototype=t.subs;var l=new a;for(c in l.subs=new s,l.subsText={},l.buf="",i=i||{},l.stackSubs=i,l.subsText=o,n)i[c]||(i[c]=n[c]);for(c in i)l.subs[c]=i[c];for(c in r=r||{},l.stackPartials=r,e)r[c]||(r[c]=e[c]);for(c in r)l.partials[c]=r[c];return l}(i,e.subs,e.partials,this.stackSubs,this.stackPartials,n.stackText)}return this.partials[t].instance=i,i},rp:function(t,n,e,i){var r=this.ep(t,e);return r?r.ri(n,e,i):""},rs:function(t,n,e){var i=t[t.length-1];if(l(i))for(var r=0;r<i.length;r++)t.push(i[r]),e(t,n,this),t.pop();else e(t,n,this)},s:function(t,n,e,i,r,o,a){var s;return(!l(t)||0!==t.length)&&("function"==typeof t&&(t=this.ms(t,n,e,i,r,o,a)),s=!!t,!i&&s&&n&&n.push("object"==typeof t?t:n[n.length-1]),s)},d:function(t,e,i,r){var o,a=t.split("."),s=this.f(a[0],e,i,r),c=this.options.modelGet,u=null;if("."===t&&l(e[e.length-2]))s=e[e.length-1];else for(var f=1;f<a.length;f++)void 0!==(o=n(a[f],s,c))?(u=s,s=o):s="";return!(r&&!s)&&(r||"function"!=typeof s||(e.push(u),s=this.mv(s,e,i),e.pop()),s)},f:function(t,e,i,r){for(var o=!1,a=!1,s=this.options.modelGet,c=e.length-1;c>=0;c--)if(void 0!==(o=n(t,e[c],s))){a=!0;break}return a?(r||"function"!=typeof o||(o=this.mv(o,e,i)),o):!r&&""},ls:function(t,n,e,i,r){var o=this.options.delimiters;return this.options.delimiters=r,this.b(this.ct(c(t.call(n,i)),n,e)),this.options.delimiters=o,!1},ct:function(t,n,e){if(this.options.disableLambda)throw new Error("Lambda features disabled.");return this.c.compile(t,this.options).render(n,e)},b:function(t){this.buf+=t},fl:function(){var t=this.buf;return this.buf="",t},ms:function(t,n,e,i,r,o,a){var s,c=n[n.length-1],l=t.call(c);return"function"==typeof l?!!i||(s=this.activeSub&&this.subsText&&this.subsText[this.activeSub]?this.subsText[this.activeSub]:this.text,this.ls(l,c,e,s.substring(r,o),a)):l},mv:function(t,n,e){var i=n[n.length-1],r=t.call(i);return"function"==typeof r?this.ct(c(r.call(i)),i,e):r},sub:function(t,n,e,i){var r=this.subs[t];r&&(this.activeSub=t,r(n,e,this,i),this.activeSub=!1)}};var e=/&/g,i=/</g,r=/>/g,o=/\'/g,a=/\"/g,s=/[&<>\"\']/;function c(t){return String(null==t?"":t)}var l=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}}(n)},function(t,n,e){(t.exports=e(6)(!1)).push([t.i,"#AltruistoTopBarButton,\n#AltruistoTopBarButtonGrey,\n#AltruistoTopBarCTA {\n  display: inline-block;\n  text-align: center;\n  font-family: Helvetica, Arial, Verdana, sans-serif !important;\n}\n\n#AltruistoTopBar {\n  width: 350px !important;\n  max-height: 180px !important;\n  min-height: 120px !important;\n  border: 1px solid #e0e0e0;\n  background-color: #fff !important;\n  box-shadow: 2px 2px 20px 2px rgba(0, 0, 0, 0.3);\n  position: fixed;\n  top: 35px;\n  right: 35px;\n  z-index: 99999999999999999;\n  box-sizing: border-box;\n  font-family: Helvetica, Arial, Verdana, sans-serif !important;\n  text-align: center !important;\n  line-height: 1.4285;\n  font-size: 14px;\n  color: #959595 !important;\n  animation: altruisto-slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s 1 normal both;\n}\n\n#AltruistoTopBarLogoLink {\n  float: left !important;\n}\n\n#AltruistoTopBarLogo {\n  max-width: 20px !important;\n  margin: 8px;\n  float: left;\n}\n\n#AltruistoTopBarIcon {\n  float: right;\n  margin: 10px;\n  cursor: pointer;\n  max-width: 10px !important;\n}\n\n#AltruistoTopBarWelcome {\n  font-size: 12px;\n  width: 30%;\n  float: left;\n  margin: 9px 0 0;\n}\n\n#AltruistoTopBarCTA {\n  font-weight: 700;\n  margin: 7px 0;\n  font-family: Helvetica, Arial, Verdana, sans-serif !important;\n  width: 240px;\n  margin-top: 20px;\n}\n\n#AltruistoTopBarButton {\n  border: 1px solid #4caf50;\n  background: #4caf50;\n  color: #fff;\n  border-radius: 0;\n  padding: 6px 12px;\n  text-decoration: none;\n  font-weight: 700 !important;\n  line-height: 1.4285;\n  font-family: Helvetica, Arial, Verdana, sans-serif !important;\n  text-transform: uppercase;\n  font-size: 14px !important;\n}\n\n#AltruistoTopBarButton:hover {\n  text-decoration: underline;\n  background-color: #439a46;\n  color: #fff;\n}\n\n#AltruistoTopBarButtonGrey {\n  border: 1px solid #e0e1e2;\n  background: #e0e1e2;\n  color: #fff;\n  border-radius: 0;\n  padding: 6px 12px;\n  text-decoration: none;\n  font-weight: 700;\n  line-height: 1.4285;\n  font-family: Helvetica, Arial, Verdana, sans-serif !important;\n}\n\n#AltruistoTopBarButtonGrey:hover {\n  text-decoration: underline;\n  background-color: #cacbcd;\n  color: #fff;\n}\n\n#AltruistoSmallText {\n  font-weight: 300px;\n  font-size: 12px;\n}\n\n@-webkit-keyframes altruisto-slide-in-right {\n  0% {\n    -webkit-transform: translateX(1000px);\n    transform: translateX(1000px);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n\n@keyframes altruisto-slide-in-right {\n  0% {\n    -webkit-transform: translateX(1000px);\n    transform: translateX(1000px);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n",""])},function(t,n,e){"use strict";t.exports=function(t){var n=[];return n.toString=function(){return this.map(function(n){var e=function(t,n){var e=t[1]||"",i=t[3];if(!i)return e;if(n&&"function"==typeof btoa){var r=(a=i,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),o=i.sources.map(function(t){return"/*# sourceURL=".concat(i.sourceRoot).concat(t," */")});return[e].concat(o).concat([r]).join("\n")}var a,s,c;return[e].join("\n")}(n,t);return n[2]?"@media ".concat(n[2],"{").concat(e,"}"):e}).join("")},n.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},r=0;r<this.length;r++){var o=this[r][0];null!=o&&(i[o]=!0)}for(var a=0;a<t.length;a++){var s=t[a];null!=s[0]&&i[s[0]]||(e&&!s[2]?s[2]=e:e&&(s[2]="(".concat(s[2],") and (").concat(e,")")),n.push(s))}},n}},,function(t,n,e){"use strict";e.r(n);const i={icons:{cancel:chrome.extension.getURL("assets/img/cancel.png"),settings:chrome.extension.getURL("assets/img/settings.png"),icon:chrome.extension.getURL("assets/img/icon.png"),icon16:chrome.extension.getURL("assets/img/icon16.png")},pages:{options:chrome.extension.getURL("pages/options.html")}};var r=e(0);const o=Object(r.a)(location.href);function a(){let t=[];document.getElementById("AltruistoTopBar").style.display="none",chrome.storage.local.get({closedWebsites:[]},function(n){-1==n.closedWebsites.indexOf(o)&&((t=n.closedWebsites).push(o),chrome.storage.local.set({closedWebsites:t}))})}function s(t){let n=e(1),r=function(t){let n;return n=t?chrome.i18n.getMessage("topbarActivatedInfo")+'<p id="AltruistoSmallText">'+chrome.i18n.getMessage("topbarActivatedClose")+"</p>":-1!==o.indexOf("ebay")?chrome.i18n.getMessage("topbarActivateInfo")+"<a href=https://altruisto.com/confirm?url="+location.href+"&lang="+chrome.i18n.getUILanguage()+" id=AltruistoTopBarButton>"+chrome.i18n.getMessage("topbarActivateButton")+"</a>":chrome.i18n.getMessage("topbarActivateInfo")+"<a href=https://altruisto.com/redirect?url="+location.href+"&lang="+chrome.i18n.getUILanguage()+" id=AltruistoTopBarButton>"+chrome.i18n.getMessage("topbarActivateButton")+"</a>"}(t);return n({ASSETS_PATHS:i,content:r})}function c(t){let n=e(5).toString(),i=document.createElement("style");i.innerHTML=n;let r=s(t),o=document.createElement("div");o.id="Altruisto","ar"==chrome.i18n.getUILanguage()&&(o.dir="rtl"),o.innerHTML=r,document.documentElement.prepend(i),document.documentElement.prepend(o),t&&setInterval(function(){a()},6e3),document.getElementById("AltruistoTopBarIcon").addEventListener("click",function(){a()})}function l(t){if(t.length)for(let n=0;n<t.length;n++)if(t[n].domain==o){if(t[n].timestamp+6048e5>Date.now())return!0}}var u=function(){chrome.storage.local.get({activatedAffiliates:[],closedWebsites:[],disabledWebsites:[],partners:[]},function(t){if(-1!=t.partners.indexOf(o)){if(-1==t.closedWebsites.indexOf(o)&&-1==t.disabledWebsites.indexOf(o)){let n=!1;l(t.activatedAffiliates)&&(n=!0),c(n)}if(-1==t.disabledWebsites.indexOf(o)&&(location.href,"booking.com"==o&&-1!==location.href.indexOf("book.html")||"etsy.com"==o&&-1!==location.href.indexOf("/cart/")||"aliexpress.com"==o&&-1!==location.href.indexOf("/confirm_order.htm")||"barnesandnoble.com"==o&&-1!==location.href.indexOf("/checkout/"))){let n=!1;l(t.activatedAffiliates)&&(n=!0),c(n)}}})};chrome.storage.sync.get({addTopBar:!0},function(t){t.addTopBar&&u()})}]);