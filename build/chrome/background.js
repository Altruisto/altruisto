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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
        //co.* and com.* exceptions (eg. example.com.au)        
        if(domain.indexOf('.co.') !== -1 || domain.indexOf('.com.') !== -1){
            domain = parts.slice(-3).join('.');
        }
        else {
            domain = parts.slice(-2).join('.');
        }
    }

    return domain;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getPartnersList;
/**
 * Get the list of partner stores' domain and save it locally
 */
function getPartnersList(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://altruisto.com/api/partners");
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
            if(xhr.responseText){
                var partners = JSON.parse(xhr.responseText);
                chrome.storage.local.remove(['partners']);
                chrome.storage.local.set({'partners': partners});
            }
        }
    }
    xhr.send();
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__background_on_installed_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__background_on_alarm_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__background_activate_monetizing_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__background_deactivate_monetizing_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__background_recognize_other_affiliates_js__ = __webpack_require__(7);

Object(__WEBPACK_IMPORTED_MODULE_0__background_on_installed_js__["a" /* onInstalled */])();


Object(__WEBPACK_IMPORTED_MODULE_1__background_on_alarm_js__["a" /* onAlarm */])();


Object(__WEBPACK_IMPORTED_MODULE_2__background_activate_monetizing_js__["a" /* activateMonetizing */])();


Object(__WEBPACK_IMPORTED_MODULE_3__background_deactivate_monetizing_js__["a" /* deactivateMonetizing */])();


Object(__WEBPACK_IMPORTED_MODULE_4__background_recognize_other_affiliates_js__["a" /* recognizeOtherAffiliates */])();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = onInstalled;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_get_partners_list_js__ = __webpack_require__(1);


function onInstalled() {
    chrome.runtime.onInstalled.addListener(function(details){
        //add alarms - these are used sort of like cron jobs here
        chrome.alarms.create('clearClosedWebsites', {periodInMinutes: 60}); //every 60 min redisplay topbar on the websites that users closed it
        chrome.alarms.create('clearDisabledWebsites', {periodInMinutes: 1440}); //every 24h redisplay topbar on websites that user visited through other affiliate's link
        chrome.alarms.create('getPartnersList', {periodInMinutes: 1440}); // every 24h update partners list from api

        //get list of partner shops from api
        Object(__WEBPACK_IMPORTED_MODULE_0__helpers_get_partners_list_js__["a" /* getPartnersList */])();

        //open welcome page for new installs
        if(details.reason == "install"){
            chrome.tabs.create({url: "https://altruisto.com/welcome/"});
        }
    });
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = onAlarm;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_get_partners_list_js__ = __webpack_require__(1);


function onAlarm() {
    chrome.alarms.onAlarm.addListener(function(details){
        switch(details.name){
            case 'clearClosedWebsites' :
                chrome.storage.local.remove(['closedWebsites']);
            break;
            
            case 'clearDisabledWebsites' :
                chrome.storage.local.remove(['disabledWebsites']);
            break;

            case 'getPartnersList' :
                Object(__WEBPACK_IMPORTED_MODULE_0__helpers_get_partners_list_js__["a" /* getPartnersList */])();
            break;
        }
    });
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = activateMonetizing;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_extract_domain_js__ = __webpack_require__(0);


 /**
 * When user requests an altruisto.com redirect - add redirect URL's domain to activatedAffiliates list (so that content.js knows that this particular domain is already being monetized)
 */ 
function activateMonetizing() {
    chrome.webRequest.onBeforeRequest.addListener(function(details){ //byc moze onCompleteRedirect - zalezy ktorym latwiej znalezc od pierwszego do ostatniego redirecta
        var redirectUrlParts = details.url.split("?url="),
            redirectDomain   = Object(__WEBPACK_IMPORTED_MODULE_0__helpers_extract_domain_js__["a" /* extractDomain */])(redirectUrlParts[1]);

        var data = {domain: redirectDomain, timestamp: details.timeStamp}
        updateActivatedAffiliates(data);
    }, {urls: ["https://altruisto.com/redirect*"], types: ["main_frame"]}); 
}

 /**
 * Save an affiliate's domain to the locally stored list of websites that the user has activated AKA started raising money from them 
 *
 * @param {object} data New data to be pushed into the list containing domain and current timestamp.
 */
function updateActivatedAffiliates(data) {
    var newData, i, domainAlreadySaved;

    //test if the given object is not empty
    if (Object.keys(data).length === 0 && data.constructor === Object) {
        return;
    }

    chrome.storage.local.get('activatedAffiliates', function(items) {
        if(items.activatedAffiliates != null){
            
            newData = items.activatedAffiliates;

            for(i = 0; i < newData.length; i++){
                if(newData[i].domain == data.domain){ //if the domain exist update timestamp
                    newData[i].timestamp = data.timestamp;
                    domainAlreadySaved = true;
                    break;
                }
            }

            if(!domainAlreadySaved){
                newData.push(data);
            }
        }
        else { //there was no data
            newData = new Array(data);
        }

        chrome.storage.local.set({'activatedAffiliates': newData});
    });
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = deactivateMonetizing;
 /**
 * When a message from content.js is received to deactivate monetizing given affiliate's - delete cookies and affiliate's domain from activatedAffiliates list. 
 */
function deactivateMonetizing() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        if(sender.tab){
            chrome.cookies.getAll({domain: request.domain}, function(cookies) {
                
                for(var i=0; i<cookies.length;i++) {                    
                    //delete cookies from given domain to stop monetizing this site
                    removeAffiliatesCookies(cookies[i], request.domain);                   
                }

                //delete domain from activated domains list
                removeFromActivatedAffiliates(request.domain);

            });

            sendResponse({status: true});
        }
    });
}

function removeAffiliatesCookies(cookie, domain){
    var cookieProtocol;
    (cookie.secure) ? cookieProtocol = 'https://' : cookieProtocol = 'http://';

    chrome.cookies.remove({url: cookieProtocol + domain + cookie.path, name: cookie.name});
}

function removeFromActivatedAffiliates(domain){
    chrome.storage.local.get({activatedAffiliates: []}, function(items) {
        for(let i = 0; i < items.activatedAffiliates.length; i++){
            if(items.activatedAffiliates[i].domain == domain){
                let updatedActivatedAffiliates = items.activatedAffiliates;
                updatedActivatedAffiliates.splice(i, 1);
                
                chrome.storage.local.set({'activatedAffiliates': updatedActivatedAffiliates});
                
                break;
            }
        }
    });
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = recognizeOtherAffiliates;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_extract_domain_js__ = __webpack_require__(0);


/**
* If user vists website through some other affiliates' link, prevent showing topbar by adding it to disabledWebsites list                                                                                                                                                                           link, we add the website to the locally stored list, so content.js does not show the top bar at this website.
*/
function recognizeOtherAffiliates() {
    var affiliateRedirectDetected = false; 
    var altruistoRedirectDetected = false;
    var redirectTabId;


    chrome.webRequest.onBeforeRedirect.addListener(function(details){
        var urlDomain       = Object(__WEBPACK_IMPORTED_MODULE_0__helpers_extract_domain_js__["a" /* extractDomain */])(details.url);
        var redirectDomain  = Object(__WEBPACK_IMPORTED_MODULE_0__helpers_extract_domain_js__["a" /* extractDomain */])(details.redirectUrl);
        var currentTab      = details.tabId;

        if(isAffiliateRedirectLink(urlDomain) || isAffiliateRedirectLink(redirectDomain)){
            affiliateRedirectDetected = true;
            if(isAltruistoLink(details.url) || isAltruistoLink(details.redirectUrl)){
                altruistoRedirectDetected = true;
            }
            else {
                redirectTabId = currentTab;
            }
        }
    }, {urls: ['<all_urls>'], types: ["main_frame"]});

    chrome.webRequest.onCompleted.addListener(function(details){
        var currentTab = details.tabId;

        if(affiliateRedirectDetected && !altruistoRedirectDetected){
            if(redirectTabId == currentTab){
                disableAffiliate(Object(__WEBPACK_IMPORTED_MODULE_0__helpers_extract_domain_js__["a" /* extractDomain */])(details.url));
                
                //reset triggers
                affiliateRedirectDetected = false;
                altruistoRedirectDetected = false;
                redirectTabId = 0;
            }
        } 
        else if(affiliateRedirectDetected && altruistoRedirectDetected){
            //reset triggers
            affiliateRedirectDetected = false;
            altruistoRedirectDetected = false;
        }
    }, {urls: ['<all_urls>'], types: ["main_frame"]});
}

/**
* Add given domain to the list of websites that are monetized by other affiliates, so the top bar is not being shown on them.
*
* @param {string} domain Domain of the website that is already monetized by other affiliate.
*/
function disableAffiliate(domain) {
    var updatedDisabledWebsites = [];
    chrome.storage.local.get({disabledWebsites: []}, function(items) {
        updatedDisabledWebsites = items.disabledWebsites;
        if(items.disabledWebsites.indexOf(domain) == -1){
            updatedDisabledWebsites.push(domain);
            chrome.storage.local.set({'disabledWebsites': updatedDisabledWebsites});
        }
    });
}

/**
* Check if given URL is altruisto's affiliate link by comparing it against our stamps
*
* @returns {boolean}
*/
function isAltruistoLink(url){
    var altruistoStamps = ['id=XK9XruzkyUo', '8106588'];
    if(new RegExp(altruistoStamps.join("|")).test(url)) {
        return true;
    }
    else {
        return false;
    }
}

/**
* Check if given URL is affiliate redirect link by compating it against list of domains of affiliate networks
*
* @returns {boolean}
*/
function isAffiliateRedirectLink(domain){
    var trackedDomains = ['anrdoezrs.net', 'commission-junction.com', 'dpbolvw.net', 'apmebf.com', 'jdoqocy.com', 'kqzyfj.com', 'qksrv.net', 'tkqlhce.com', 'ww.qksz.net', 
    'emjcd.com', 'afcyhf.com', 'awltovhc.com', 'ftjcfx.com', 'lduhtrp.net', 'tqlkg.com', 'awxibrm.com', 'cualbr.com', 'rnsfpw.net', 'vofzpwh.com', 'yceml.net',
    'linksynergy.com'];
    
    if(trackedDomains.indexOf(domain) == -1) {
        return false;
    }
    else {
        return true;
    }
}

/***/ })
/******/ ]);