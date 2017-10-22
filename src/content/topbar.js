import { ASSETS_PATHS } from '../helpers/assets-paths.js';
import { extractDomain } from '../helpers/extract-domain.js';

const DOMAIN = extractDomain(location.href);

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
// eslint-disable-next-line no-unused-vars
function deactivateAffiliate() {
    chrome.runtime.sendMessage({domain: DOMAIN}, function(response) {
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

    chrome.storage.local.get({closedWebsites: []}, function(items) {
        if(items.closedWebsites.indexOf(DOMAIN) == -1){
            updatedClosedWebsites = items.closedWebsites;
            updatedClosedWebsites.push(DOMAIN);
            chrome.storage.local.set({'closedWebsites': updatedClosedWebsites});
        }
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
        setInterval(function(){
            hideTopbar();
        }, 6000);
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
        content = 'You\'re now raising money for charities with this website. <p id="AltruistoSmallText">This windows will be automatically closed in 5 seconds</p>';
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
    let template = require('./topbar.html');
    let content = getContent(activated);
    let innerHTML = template({
        ASSETS_PATHS: ASSETS_PATHS,
        content: content,
    });

    return innerHTML;
}

/**
 * Load CSS style and HTML of topbar, create html elements, append them to the document and add listeners.
 *
 * @param {boolean} activated Topbar's activation status.
 */
function renderTopbar(activated) {
    let style = require('./topbar.css').toString();
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

export default function () {
    chrome.storage.local.get({
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

}
