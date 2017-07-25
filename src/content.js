/*import suggestionBox from './content/suggestion-box.js';*/
import displayTopbar from './content/topbar.js';


/* Load settings and act accordingly */

chrome.storage.sync.get({
    addTopBar: true
}, function(items){

    /*if(items.addSuggestionBox){
        suggestionBox();
    }*/

    if(items.addTopBar){

        displayTopbar();

    }
});