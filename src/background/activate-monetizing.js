import { extractDomain } from '../helpers/extract-domain.js';

 /**
 * When user requests an altruisto.com redirect - add redirect URL's domain to activatedAffiliates list (so that content.js knows that this particular domain is already being monetized)
 */ 
export function activateMonetizing() {
    chrome.webRequest.onBeforeRequest.addListener(function(details){ //byc moze onCompleteRedirect - zalezy ktorym latwiej znalezc od pierwszego do ostatniego redirecta
        var redirectUrlParts = details.url.split("?url="),
            redirectDomain   = extractDomain(redirectUrlParts[1]);

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

        chrome.storage.local.set({'activatedAffiliates': newData}, function (){
            chrome.storage.local.get('activatedAffiliates');
        });
    });
}