import { getPartnersList } from '../helpers/get-partners-list.js';

export function onAlarm() {
    chrome.alarms.onAlarm.addListener(function(details){
        switch(details.name){
            case 'clearClosedWebsites' :
                chrome.storage.local.remove(['closedWebsites']);
            break;
            
            case 'clearDisabledWebsites' :
                chrome.storage.local.remove(['disabledWebsites']);
            break;

            case 'getPartnersList' :
                getPartnersList();
            break;
        }
    });
}