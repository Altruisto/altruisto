/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extractDomain;
 /**
 * Extract the domain from given url. Subdomains will be striped down to main domain.
 *
 * @param {string} url The url from which the function will extract the main domain.
 * @returns {string} Main domain ("example.com").
 */
function extractDomain(url) {
    var domain;
    url = url.toString();
    url = url.toLowerCase();

    //find & remove protocol 
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    //remove www.
    domain = domain.replace(/^www\./, "");
    

    //find & remove subdomains
    var parts = domain.split('.');
    if(parts.length > 2){
        //co.uk exception        
        if(parts.indexOf('co') !== -1 && parts.indexOf('uk') !== -1){
            domain = parts.slice(-3).join('.');
        }
        else {
            domain = parts.slice(-2).join('.');
        }
    }

    return domain;
}


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__content_topbar_js__ = __webpack_require__(9);
/*import suggestionBox from './content/suggestion-box.js';*/



/* Load settings and act accordingly */

browser.storage.sync.get({
    addTopBar: true
}, function(items){

    /*if(items.addSuggestionBox){
        suggestionBox();
    }*/

    if(items.addTopBar){

        Object(__WEBPACK_IMPORTED_MODULE_0__content_topbar_js__["a" /* default */])();

    }
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_assets_paths_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_extract_domain_js__ = __webpack_require__(0);



const DOMAIN = Object(__WEBPACK_IMPORTED_MODULE_1__helpers_extract_domain_js__["a" /* extractDomain */])(location.href);

/**
 * Change topbar's inner HTML.
 */
function updateTopbar(activated) {
    let innerHTML = getInnerHTML(activated);
    let topbarElement = document.getElementById('Altruisto');
    topbarElement.innerHTML = innerHTML;
} 

/**
 * Deactivate getting commission from current webpage.
 *
 * This is accomplished by sending request to background.js. Background.js deletes all cookies from the domain of current page and removes the domain from locally stored list of activated websites. 
 *
 */
function deactivateAffiliate() {
    browser.runtime.sendMessage({domain: DOMAIN}, function(response) {
        if(response.status === true){
            updateTopbar(false);
        }
    });
}

/**
 * Set topbar's display property to none and save to storage.local the information that on this website the topbar should not be (temporarily) displayed.
 */
function hideTopbar(){
    let updatedClosedWebsites = [];

    document.getElementById("AltruistoTopBar").style.display = 'none';
    //moveWebsite('-50px');

    browser.storage.local.get({closedWebsites: []}, function(items) {
        updatedClosedWebsites = items.closedWebsites;
        updatedClosedWebsites.push(DOMAIN);
        browser.storage.local.set({'closedWebsites': updatedClosedWebsites});
    });
}

/**
 * Add proper event listeners to topbar elements.
 *
 * @param {boolean} activated Topbar's activation status.
 */
function addListeners(activated){
    document.getElementById("AltruistoTopBarIcon").addEventListener("click", function(){ 
        hideTopbar(); 
    });

    if(activated){
        document.getElementById("AltruistoTopBarButtonGrey").addEventListener("click", function(){ 
            deactivateAffiliate(); 
        });
    }
}

/**
 * Return topbar's content based on activation status.
 *
 * @param {boolean} activated Topbar's activation status.
 */
function getContent(activated){
    let content;

    if(activated){
        content = 'Congratulations - you\'re now raising money for charities with this website. <a href=# id=AltruistoTopBarButtonGrey>Stop raising money</a>';
    }
    else {
        content = 'Start raising money for charities with this website by clicking here: <a href=https://altruisto.com/confirm?url=' + location.href + ' id=AltruistoTopBarButton>Start raising money</a>';    
    }

    return content;
}

/**
 * Load html template and fill it with proper content.
 *
 * @param {boolean} activated Topbar's activation status.
 */
function getInnerHTML(activated) {
    let template = __webpack_require__(11);
    let content = getContent(activated);
    let innerHTML = template({
        ASSETS_PATHS: __WEBPACK_IMPORTED_MODULE_0__helpers_assets_paths_js__["a" /* ASSETS_PATHS */],
        content: content,
    });

    return innerHTML;
}

/**
 * Load CSS style and HTML of topbar, create html elements, append them to the document and add listeners.
 *
 * @param {boolean} activated Topbar's activation status.
 */
function renderTopbar(activated){
    let style = __webpack_require__(15).toString();
    let styleElement = document.createElement('style'); 
    styleElement.innerHTML = style;

    let innerHTML = getInnerHTML(activated);

    let topbarElement = document.createElement('div');
    topbarElement.id = 'Altruisto';
    topbarElement.innerHTML = innerHTML;

    //moveWebsite('50px');
    
    document.documentElement.prepend(styleElement);
    document.documentElement.prepend(topbarElement);

    addListeners(activated);
}


/**
 * Check if raising money with current website has been already activated (and not longer than 7 days ago).
 *
 * @param {array} activatedAffiliates Array containing domains and timestamps of affiliates that has already been activated. Should be loaded from storage.local.
 */
function isAlreadyActivated(activatedAffiliates){
    //if activatedAffiliates has any values
    if(activatedAffiliates.length){
        //loop through all the values
        for(let i = 0; i < activatedAffiliates.length; i++){
            //if current page is in our list of already activated pages
            if(activatedAffiliates[i].domain == DOMAIN){
                //if page was activated not longer than 7 days ago 
                let activationEndTimestamp = activatedAffiliates[i].timestamp + 1000*60*60*24*7;
                let currentTimestamp = Date.now();
                if(activationEndTimestamp > currentTimestamp ){
                    return true;
                }
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (function () {
    browser.storage.local.get({
            activatedAffiliates: [], 
            closedWebsites: [], 
            disabledWebsites: [],
            partners: []
        }, function(items) {

            //if current domain is one of our partners
            if(items.partners.indexOf(DOMAIN) != -1){

                //if current domain is not on disabled or closed websites list
                if(items.closedWebsites.indexOf(DOMAIN) == -1 
                && items.disabledWebsites.indexOf(DOMAIN) == -1){                   
                    let activated = false;
                    if(isAlreadyActivated(items.activatedAffiliates)){
                        activated = true;
                    }

                    renderTopbar(activated);
                }

            }
        
        });

});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const ASSETS_PATHS = {
    icons: {
        cancel: browser.extension.getURL("assets/img/cancel.png"),
        settings: browser.extension.getURL("assets/img/settings.png"),
        icon: browser.extension.getURL("assets/img/icon.png"),
        icon16: browser.extension.getURL("assets/img/icon16.png"),
    },
    pages: {
        options: browser.extension.getURL("pages/options.html"),
    },
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ASSETS_PATHS;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(12);
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"AltruistoTopBar\"><img src=\"");t.b(t.v(t.d("ASSETS_PATHS.icons.cancel",c,p,0)));t.b("\" id=\"AltruistoTopBarIcon\"> <a href=\"\" id=\"AltruistoTopBarInfo\">Why do I see this?</a><div id=\"AltruistoTopBarPopover\">Because you're awesome and you've installed <em>Altruisto.com Chrome Extension</em>. Anytime you visit a website of one of our partners you will see a bar at the top of a page giving you an opportunity to raise money for charities just by clicking one button. If you click on that button will be asked to confirm that you want to support altruisto through your purchases on the site you're viewing. After that, <strong>usually between 3-7% of your purchase will be donated to charities we support.</strong><p>You can turn it off at any time by clicking at the altruisto.com Chrome Extension icon (<img src=\"");t.b(t.v(t.d("ASSETS_PATHS.icons.icon16",c,p,0)));t.b("\" style=\"max-width:11px;display:inline-block\">) in the top right of your browser and switching off the option \"Inform me when I have an opportunity to raise money for charities from my purchase\".</p></div><a href=\"https://altruisto.com\" style=\"float:left\"><img src=\"");t.b(t.v(t.d("ASSETS_PATHS.icons.icon",c,p,0)));t.b("\" id=\"AltruistoTopBarLogo\"></a><div id=\"AltruistoTopBarCTA\">");t.b(t.t(t.f("content",c,p,0)));t.b("</div></div><div style=\"clear:both\"></div>");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"AltruistoTopBar\"><img src=\"{{ASSETS_PATHS.icons.cancel}}\" id=\"AltruistoTopBarIcon\"> <a href=\"\" id=\"AltruistoTopBarInfo\">Why do I see this?</a><div id=\"AltruistoTopBarPopover\">Because you're awesome and you've installed <em>Altruisto.com Chrome Extension</em>. Anytime you visit a website of one of our partners you will see a bar at the top of a page giving you an opportunity to raise money for charities just by clicking one button. If you click on that button will be asked to confirm that you want to support altruisto through your purchases on the site you're viewing. After that, <strong>usually between 3-7% of your purchase will be donated to charities we support.</strong><p>You can turn it off at any time by clicking at the altruisto.com Chrome Extension icon (<img src=\"{{ASSETS_PATHS.icons.icon16}}\" style=\"max-width:11px;display:inline-block\">) in the top right of your browser and switching off the option \"Inform me when I have an opportunity to raise money for charities from my purchase\".</p></div><a href=\"https://altruisto.com\" style=\"float:left\"><img src=\"{{ASSETS_PATHS.icons.icon}}\" id=\"AltruistoTopBarLogo\"></a><div id=\"AltruistoTopBarCTA\">{{{content}}}</div></div><div style=\"clear:both\"></div>", H);return T.render.apply(T, arguments); };

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// This file is for use with Node.js. See dist/ for browser files.

var Hogan = __webpack_require__(13);
Hogan.Template = __webpack_require__(14).Template;
Hogan.template = Hogan.Template;
module.exports = Hogan;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function (Hogan) {
  // Setup regex  assignments
  // remove whitespace according to Mustache spec
  var rIsWhitespace = /\S/,
      rQuot = /\"/g,
      rNewline =  /\n/g,
      rCr = /\r/g,
      rSlash = /\\/g,
      rLineSep = /\u2028/,
      rParagraphSep = /\u2029/;

  Hogan.tags = {
    '#': 1, '^': 2, '<': 3, '$': 4,
    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
    '{': 10, '&': 11, '_t': 12
  };

  Hogan.scan = function scan(text, delimiters) {
    var len = text.length,
        IN_TEXT = 0,
        IN_TAG_TYPE = 1,
        IN_TAG = 2,
        state = IN_TEXT,
        tagType = null,
        tag = null,
        buf = '',
        tokens = [],
        seenTag = false,
        i = 0,
        lineStart = 0,
        otag = '{{',
        ctag = '}}';

    function addBuf() {
      if (buf.length > 0) {
        tokens.push({tag: '_t', text: new String(buf)});
        buf = '';
      }
    }

    function lineIsWhitespace() {
      var isAllWhitespace = true;
      for (var j = lineStart; j < tokens.length; j++) {
        isAllWhitespace =
          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
        if (!isAllWhitespace) {
          return false;
        }
      }

      return isAllWhitespace;
    }

    function filterLine(haveSeenTag, noNewLine) {
      addBuf();

      if (haveSeenTag && lineIsWhitespace()) {
        for (var j = lineStart, next; j < tokens.length; j++) {
          if (tokens[j].text) {
            if ((next = tokens[j+1]) && next.tag == '>') {
              // set indent to token value
              next.indent = tokens[j].text.toString()
            }
            tokens.splice(j, 1);
          }
        }
      } else if (!noNewLine) {
        tokens.push({tag:'\n'});
      }

      seenTag = false;
      lineStart = tokens.length;
    }

    function changeDelimiters(text, index) {
      var close = '=' + ctag,
          closeIndex = text.indexOf(close, index),
          delimiters = trim(
            text.substring(text.indexOf('=', index) + 1, closeIndex)
          ).split(' ');

      otag = delimiters[0];
      ctag = delimiters[delimiters.length - 1];

      return closeIndex + close.length - 1;
    }

    if (delimiters) {
      delimiters = delimiters.split(' ');
      otag = delimiters[0];
      ctag = delimiters[1];
    }

    for (i = 0; i < len; i++) {
      if (state == IN_TEXT) {
        if (tagChange(otag, text, i)) {
          --i;
          addBuf();
          state = IN_TAG_TYPE;
        } else {
          if (text.charAt(i) == '\n') {
            filterLine(seenTag);
          } else {
            buf += text.charAt(i);
          }
        }
      } else if (state == IN_TAG_TYPE) {
        i += otag.length - 1;
        tag = Hogan.tags[text.charAt(i + 1)];
        tagType = tag ? text.charAt(i + 1) : '_v';
        if (tagType == '=') {
          i = changeDelimiters(text, i);
          state = IN_TEXT;
        } else {
          if (tag) {
            i++;
          }
          state = IN_TAG;
        }
        seenTag = i;
      } else {
        if (tagChange(ctag, text, i)) {
          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
          buf = '';
          i += ctag.length - 1;
          state = IN_TEXT;
          if (tagType == '{') {
            if (ctag == '}}') {
              i++;
            } else {
              cleanTripleStache(tokens[tokens.length - 1]);
            }
          }
        } else {
          buf += text.charAt(i);
        }
      }
    }

    filterLine(seenTag, true);

    return tokens;
  }

  function cleanTripleStache(token) {
    if (token.n.substr(token.n.length - 1) === '}') {
      token.n = token.n.substring(0, token.n.length - 1);
    }
  }

  function trim(s) {
    if (s.trim) {
      return s.trim();
    }

    return s.replace(/^\s*|\s*$/g, '');
  }

  function tagChange(tag, text, index) {
    if (text.charAt(index) != tag.charAt(0)) {
      return false;
    }

    for (var i = 1, l = tag.length; i < l; i++) {
      if (text.charAt(index + i) != tag.charAt(i)) {
        return false;
      }
    }

    return true;
  }

  // the tags allowed inside super templates
  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

  function buildTree(tokens, kind, stack, customTags) {
    var instructions = [],
        opener = null,
        tail = null,
        token = null;

    tail = stack[stack.length - 1];

    while (tokens.length > 0) {
      token = tokens.shift();

      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
        throw new Error('Illegal content in < super tag.');
      }

      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
        stack.push(token);
        token.nodes = buildTree(tokens, token.tag, stack, customTags);
      } else if (token.tag == '/') {
        if (stack.length === 0) {
          throw new Error('Closing tag without opener: /' + token.n);
        }
        opener = stack.pop();
        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
        }
        opener.end = token.i;
        return instructions;
      } else if (token.tag == '\n') {
        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
      }

      instructions.push(token);
    }

    if (stack.length > 0) {
      throw new Error('missing closing tag: ' + stack.pop().n);
    }

    return instructions;
  }

  function isOpener(token, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].o == token.n) {
        token.tag = '#';
        return true;
      }
    }
  }

  function isCloser(close, open, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].c == close && tags[i].o == open) {
        return true;
      }
    }
  }

  function stringifySubstitutions(obj) {
    var items = [];
    for (var key in obj) {
      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
    }
    return "{ " + items.join(",") + " }";
  }

  function stringifyPartials(codeObj) {
    var partials = [];
    for (var key in codeObj.partials) {
      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
    }
    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
  }

  Hogan.stringify = function(codeObj, text, options) {
    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
  }

  var serialNo = 0;
  Hogan.generate = function(tree, text, options) {
    serialNo = 0;
    var context = { code: '', subs: {}, partials: {} };
    Hogan.walk(tree, context);

    if (options.asString) {
      return this.stringify(context, text, options);
    }

    return this.makeTemplate(context, text, options);
  }

  Hogan.wrapMain = function(code) {
    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
  }

  Hogan.template = Hogan.Template;

  Hogan.makeTemplate = function(codeObj, text, options) {
    var template = this.makePartials(codeObj);
    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
    return new this.template(template, text, this, options);
  }

  Hogan.makePartials = function(codeObj) {
    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
    for (key in template.partials) {
      template.partials[key] = this.makePartials(template.partials[key]);
    }
    for (key in codeObj.subs) {
      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
    }
    return template;
  }

  function esc(s) {
    return s.replace(rSlash, '\\\\')
            .replace(rQuot, '\\\"')
            .replace(rNewline, '\\n')
            .replace(rCr, '\\r')
            .replace(rLineSep, '\\u2028')
            .replace(rParagraphSep, '\\u2029');
  }

  function chooseMethod(s) {
    return (~s.indexOf('.')) ? 'd' : 'f';
  }

  function createPartial(node, context) {
    var prefix = "<" + (context.prefix || "");
    var sym = prefix + node.n + serialNo++;
    context.partials[sym] = {name: node.n, partials: {}};
    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
    return sym;
  }

  Hogan.codegen = {
    '#': function(node, context) {
      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
                      't.rs(c,p,' + 'function(c,p,t){';
      Hogan.walk(node.nodes, context);
      context.code += '});c.pop();}';
    },

    '^': function(node, context) {
      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
      Hogan.walk(node.nodes, context);
      context.code += '};';
    },

    '>': createPartial,
    '<': function(node, context) {
      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
      Hogan.walk(node.nodes, ctx);
      var template = context.partials[createPartial(node, context)];
      template.subs = ctx.subs;
      template.partials = ctx.partials;
    },

    '$': function(node, context) {
      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
      Hogan.walk(node.nodes, ctx);
      context.subs[node.n] = ctx.code;
      if (!context.inPartial) {
        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
      }
    },

    '\n': function(node, context) {
      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
    },

    '_v': function(node, context) {
      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
    },

    '_t': function(node, context) {
      context.code += write('"' + esc(node.text) + '"');
    },

    '{': tripleStache,

    '&': tripleStache
  }

  function tripleStache(node, context) {
    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
  }

  function write(s) {
    return 't.b(' + s + ');';
  }

  Hogan.walk = function(nodelist, context) {
    var func;
    for (var i = 0, l = nodelist.length; i < l; i++) {
      func = Hogan.codegen[nodelist[i].tag];
      func && func(nodelist[i], context);
    }
    return context;
  }

  Hogan.parse = function(tokens, text, options) {
    options = options || {};
    return buildTree(tokens, '', [], options.sectionTags || []);
  }

  Hogan.cache = {};

  Hogan.cacheKey = function(text, options) {
    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
  }

  Hogan.compile = function(text, options) {
    options = options || {};
    var key = Hogan.cacheKey(text, options);
    var template = this.cache[key];

    if (template) {
      var partials = template.partials;
      for (var name in partials) {
        delete partials[name].instance;
      }
      return template;
    }

    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
    return this.cache[key] = template;
  }
})( true ? exports : Hogan);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var Hogan = {};

(function (Hogan) {
  Hogan.Template = function (codeObj, text, compiler, options) {
    codeObj = codeObj || {};
    this.r = codeObj.code || this.r;
    this.c = compiler;
    this.options = options || {};
    this.text = text || '';
    this.partials = codeObj.partials || {};
    this.subs = codeObj.subs || {};
    this.buf = '';
  }

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    // triple stache
    t: coerceToString,

    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },

    // render internal -- a hook for overrides that catches partials too
    ri: function (context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // ensurePartial
    ep: function(symbol, partials) {
      var partial = this.partials[symbol];

      // check to see that if we've instantiated this partial before
      var template = partials[partial.name];
      if (partial.instance && partial.base == template) {
        return partial.instance;
      }

      if (typeof template == 'string') {
        if (!this.c) {
          throw new Error("No compiler available.");
        }
        template = this.c.compile(template, this.options);
      }

      if (!template) {
        return null;
      }

      // We use this to check whether the partials dictionary has changed
      this.partials[symbol].base = template;

      if (partial.subs) {
        // Make sure we consider parent template now
        if (!partials.stackText) partials.stackText = {};
        for (key in partial.subs) {
          if (!partials.stackText[key]) {
            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
          }
        }
        template = createSpecializedPartial(template, partial.subs, partial.partials,
          this.stackSubs, this.stackPartials, partials.stackText);
      }
      this.partials[symbol].instance = template;

      return template;
    },

    // tries to find a partial in the current scope and render it
    rp: function(symbol, context, partials, indent) {
      var partial = this.ep(symbol, partials);
      if (!partial) {
        return '';
      }

      return partial.ri(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var tail = context[context.length - 1];

      if (!isArray(tail)) {
        section(context, partials, this);
        return;
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        section(context, partials, this);
        context.pop();
      }
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ms(val, ctx, partials, inverted, start, end, tags);
      }

      pass = !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {
      var found,
          names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          doModelGet = this.options.modelGet,
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        val = ctx[ctx.length - 1];
      } else {
        for (var i = 1; i < names.length; i++) {
          found = findInScope(names[i], val, doModelGet);
          if (found !== undefined) {
            cx = val;
            val = found;
          } else {
            val = '';
          }
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.mv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false,
          doModelGet = this.options.modelGet;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        val = findInScope(key, v, doModelGet);
        if (val !== undefined) {
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.mv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ls: function(func, cx, partials, text, tags) {
      var oldTags = this.options.delimiters;

      this.options.delimiters = tags;
      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
      this.options.delimiters = oldTags;

      return false;
    },

    // compile text
    ct: function(text, cx, partials) {
      if (this.options.disableLambda) {
        throw new Error('Lambda features disabled.');
      }
      return this.c.compile(text, this.options).render(cx, partials);
    },

    // template result buffering
    b: function(s) { this.buf += s; },

    fl: function() { var r = this.buf; this.buf = ''; return r; },

    // method replace section
    ms: function(func, ctx, partials, inverted, start, end, tags) {
      var textSource,
          cx = ctx[ctx.length - 1],
          result = func.call(cx);

      if (typeof result == 'function') {
        if (inverted) {
          return true;
        } else {
          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
        }
      }

      return result;
    },

    // method replace variable
    mv: function(func, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = func.call(cx);

      if (typeof result == 'function') {
        return this.ct(coerceToString(result.call(cx)), cx, partials);
      }

      return result;
    },

    sub: function(name, context, partials, indent) {
      var f = this.subs[name];
      if (f) {
        this.activeSub = name;
        f(context, partials, this, indent);
        this.activeSub = false;
      }
    }

  };

  //Find a key in an object
  function findInScope(key, scope, doModelGet) {
    var val;

    if (scope && typeof scope == 'object') {

      if (scope[key] !== undefined) {
        val = scope[key];

      // try lookup with get for backbone or similar model data
      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
        val = scope.get(key);
      }
    }

    return val;
  }

  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
    function PartialTemplate() {};
    PartialTemplate.prototype = instance;
    function Substitutions() {};
    Substitutions.prototype = instance.subs;
    var key;
    var partial = new PartialTemplate();
    partial.subs = new Substitutions();
    partial.subsText = {};  //hehe. substext.
    partial.buf = '';

    stackSubs = stackSubs || {};
    partial.stackSubs = stackSubs;
    partial.subsText = stackText;
    for (key in subs) {
      if (!stackSubs[key]) stackSubs[key] = subs[key];
    }
    for (key in stackSubs) {
      partial.subs[key] = stackSubs[key];
    }

    stackPartials = stackPartials || {};
    partial.stackPartials = stackPartials;
    for (key in partials) {
      if (!stackPartials[key]) stackPartials[key] = partials[key];
    }
    for (key in stackPartials) {
      partial.partials[key] = stackPartials[key];
    }

    return partial;
  }

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos = /\'/g,
      rQuot = /\"/g,
      hChars = /[&<>\"\']/;

  function coerceToString(val) {
    return String((val === null || val === undefined) ? '' : val);
  }

  function hoganEscape(str) {
    str = coerceToString(str);
    return hChars.test(str) ?
      str
        .replace(rAmp, '&amp;')
        .replace(rLt, '&lt;')
        .replace(rGt, '&gt;')
        .replace(rApos, '&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

})( true ? exports : Hogan);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)(undefined);
// imports


// module
exports.push([module.i, "#AltruistoTopBarButton,#AltruistoTopBarButtonGrey,#AltruistoTopBarCTA{display:inline-block;text-align:center;font-family:Helvetica,Arial,Verdana,sans-serif!important}#AltruistoTopBar{width:100%!important;height:50px!important;border:1px solid #e0e0e0;background-color:#fff!important;box-shadow:0 2px 20px 0 rgba(0,0,0,.3);position:absolute;top:0;left:0;z-index:100000000000000000;box-sizing:border-box;font-family:Helvetica,Arial,Verdana,sans-serif!important;text-align:center!important;line-height:1.4285;font-size:14px;color:#959595!important}#AltruistoTopBarLogo{max-width:30px;margin:8px 8px 10px 10px;float:left}#AltruistoTopBarIcon{float:right;margin:18px 10px;cursor:pointer;max-width:12px}#AltruistoTopBarWelcome{font-size:12px;width:30%;float:left;margin:9px 0 0}#AltruistoTopBarCTA{margin:7px 0}#AltruistoTopBarButton,#AltruistoTopBarCTA{font-weight:700;font-family:Helvetica,Arial,Verdana,sans-serif!important}#AltruistoTopBarButton{border:1px solid #4caf50;background:#4caf50;color:#fff;border-radius:0;padding:6px 12px;text-decoration:none;line-height:1.4285}#AltruistoTopBarButton:hover{text-decoration:underline;background-color:#439a46}#AltruistoTopBarButtonGrey{border:1px solid #e0e1e2;background:#e0e1e2;color:#fff;border-radius:0;padding:6px 12px;text-decoration:none;font-weight:700;line-height:1.4285;font-family:Helvetica,Arial,Verdana,sans-serif!important}#AltruistoTopBarButtonGrey:hover{text-decoration:underline;background-color:#cacbcd}#AltruistoTopBarInfo{text-decoration:none;font-size:10px;float:right;color:#337ab7;margin-top:18px;font-family:Helvetica,Arial,Verdana,sans-serif!important}#AltruistoTopBarInfo:hover{color:#337ab7}#AltruistoTopBarInfo:hover+#AltruistoTopBarPopover{display:block}#AltruistoTopBarPopover b,em,i,strong{color:#777!important}#AltruistoTopBarMoreInfo,#AltruistoTopBarPopover{color:#777;padding:10px 10px 0;background:#fff;border:1px solid #e0e0e0;display:none;width:400px;position:absolute;font-family:Helvetica,Arial,Verdana,sans-serif!important}#AltruistoTopBarPopover{font-size:11px;float:right;right:0;top:49px}#AltruistoTopBarMoreInfoLink{font-size:10px;text-decoration:none;color:#337ab7;cursor:pointer;padding-left:5px;font-family:Helvetica,Arial,Verdana,sans-serif!important}#AltruistoTopBarMoreInfoLink:hover+#AltruistoTopBarMoreInfo{display:block}#AltruistoTopBarMoreInfo{font-size:11px;margin-left:52%}", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ })
/******/ ]);