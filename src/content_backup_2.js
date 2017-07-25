/* @question: should I just use babel?*/
/*import polyfill from './helpers/polyfill.js';*/
import { extractDomain } from './helpers/extract-domain.js';
import { truncateString } from './helpers/truncate-string.js';

import suggestionBox from './content/suggestion-box.js';
/*import topbar from './content/topbar.js';*/

suggestionBox('productivity');

//suggestionBox.getSuggestions('productivity');

/** 
 * Polyfill .prepend() function 
 *
 * @source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md  
 */
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.insertBefore(docFrag, this.firstChild);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);



//@question: Should I use template engine for this? 
/**
* Render "Suggestion Box" based on given data and show it on the website
*
* @param title {string} The title of the link displayed in the "Suggestion Box".
* @param description {string} The description of the link displayed in the "Suggestion Box".
* @param img {string} The URL to the image displayed in the "Suggestion Box".
* @param link {string} The URL to the website that is being advertised
*/
function addSuggestionBox(title, description, img, link) {
	var suggestionBox; 
	description = truncateString(description, 195, true);
	
	suggestionBox = '<style>#AltruistoSuggestionBox{position:fixed;z-index:2147483647;bottom:20px;right:20px;min-width:400px;max-width:400px;min-height:250px;max-height:250px;border:1px solid #e0e0e0;background:#fff;box-shadow:0 2px 50px 0 rgba(0,0,0,.3),0 0 0 1px rgba(0,0,0,.15);-webkit-animation:slide-in-br .5s cubic-bezier(.25,.46,.45,.94) .6s both;-moz-animation:slide-in-br .5s cubic-bezier(.25,.46,.45,.94) .6s both;animation:slide-in-br .5s cubic-bezier(.25,.46,.45,.94) .6s both;font-family:Helvetica,Arial,Verdana,sans-serif!important;text-align:left!important;line-height:1.4285}#AltruistoSuggestionBox *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}#AltruistoSuggestionBox :after,:before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}@-webkit-keyframes slide-in-br{0%{-webkit-transform:translateY(1000px) translateX(1000px);transform:translateY(1000px) translateX(1000px);opacity:0}100%{-webkit-transform:translateY(0) translateX(0);transform:translateY(0) translateX(0);opacity:1}}@keyframes slide-in-br{0%{-webkit-transform:translateY(1000px) translateX(1000px);transform:translateY(1000px) translateX(1000px);opacity:0}100%{-webkit-transform:translateY(0) translateX(0);transform:translateY(0) translateX(0);opacity:1}}#AltruistoSuggestionBoxPopover{display:none;position:absolute;transform:translateY(-113%);font-size:11px;color:#777;padding:10px 10px 0;background:#fff;border:1px solid #e0e0e0}#AltruistoSuggestionBoxPopover p{margin:0 0 10px}#AltruistoSuggestionBoxPopover:before{border-top:7px solid #e0e0e0;border-right:7px solid transparent;border-left:7px solid transparent;bottom:-7px;content:\'\';display:block;left:12%;margin-left:-7px;position:absolute}#AltruistoSuggestionBoxInfo{font-size:11px;margin-left:5px;color:#337ab7;text-decoration:none;cursor:pointer}#AltruistoSuggestionBoxInfo:hover{color:#337ab7;text-decoration:none}#AltruistoSuggestionBoxInfo:hover+#AltruistoSuggestionBoxPopover{display:block}#AltruistoSuggestionBoxOptions{display:none;position:absolute;right:0;transform:translateY(-101%);font-size:11px;color:#777;padding:10px 10px;background:#fff;border:1px solid #e0e0e0}#AltruistoSuggestionBoxOptions hr{border-top:1px solid #eee;margin:10px 0}#AltruistoSuggestionBoxOptions a{color:#337ab7;text-decoration:underline;font-size:11px;}#AltruistoSuggestionBoxOptionsIcon{max-width:13px;float:right;margin:3px 2px 2px;cursor:pointer;vertical-align:middle}#AltruistoSuggestionBoxCancel{max-width:10px;float:right;margin:5px;cursor:pointer;vertical-align:middle}#AltruistoSuggestionBoxAdIMG{max-width:100%;min-width:100%;height:140px;border:1px solid #e0e0e0;box-sizing:border-box}#AltruistoSuggestionBoxTitle{color:#337ab7;font-size:22px;padding:0 10px;text-decoration:underline;display:inline-block;max-width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;cursor:pointer}#AltruistoSuggestionBoxTitle:hover{color:#23527c;text-decoration:underline}#AltruistoSuggestionBoxDesc{padding:0 10px;margin:0;color:#959595;font-size:12px}</style><div id=AltruistoSuggestionBox><img id=AltruistoSuggestionBoxCancel onclick=\'this.parentNode.style.display="none"\'src="' + chrome.extension.getURL("assets/img/cancel.png") + '"> <img id=AltruistoSuggestionBoxOptionsIcon onclick=\'"block"==getElementById("AltruistoSuggestionBoxOptions").style.display?getElementById("AltruistoSuggestionBoxOptions").style.display="none":getElementById("AltruistoSuggestionBoxOptions").style.display="block"\'src="' + chrome.extension.getURL('/assets/img/settings.png') + '"><div id=AltruistoSuggestionBoxOptions><a href=https://goo.gl/forms/CkUb9obx1u4FkwtY2 target=_blank>Report this suggestion</a><hr><a href="' + chrome.extension.getURL("pages/options.html") + '">Turn off Sugestion Box</a></div><a href=# id=AltruistoSuggestionBoxInfo>Why do I see this?</a><div id=AltruistoSuggestionBoxPopover><p>This is so-called Suggestion Box which is a feature of an <em>Altruisto.com Chrome Extension</em> that you have installed. It displays pages and products that may interest you based on the content of the page that you are viewing.<p><strong>Anytime you decide to buy a suggested product, one of the World\'s most effective charities receives a portion of a profit from the sale</strong> (the price for you doesn\'t change)...<p>You can disable it at any time by clicking on <em>Altruisto.com Chrome Extension</em> icon (top right of the browser, green icon) and unchecking "Suggestion Box" option. You can also do it by going to extension\'s options page and disabeling the feature there.</div><a href="' + link + '"><div id=AltruistoSuggestionBoxAdIMG style="background:#fff url(' + img + ') no-repeat center center;background-size:cover"></div></a><a href="' + link + '" id=AltruistoSuggestionBoxTitle>' + title + '</a><p id=AltruistoSuggestionBoxDesc>' + description + '</div>';
	document.body.innerHTML += suggestionBox;
}

//@question: I am wondering if an evil person could delete user's cookies by abusing this function somehow?
/**
 * Deactivate getting commission from current webpage.
 *
 * This is accomplished by sending request to background.js. Background.js deletes all cookies from the domain of current page and removes the domain from locally stored list of activated websites. 
 *
 */
function deactivateAffiliate(){
	affiliateDomain = extractDomain(location.href);
	chrome.runtime.sendMessage({domain: affiliateDomain}, function(response) {
  		if(response.status === true){
  			showTopBar('isNotActive');
  		}
	});
}

/**
 * Create topbar scaffolding with display:none. It will be later updated based on current website's data.	
 */
function createTopBar() {
	var el, styleSheet;
	el = document.createElement('div');
    el.id = 'AltruistoTopBar';
    el.style.display = 'none';
    el.innerHTML = '<div id=AltruistoTopBar><img src=' + chrome.extension.getURL("assets/img/cancel.png") + ' id=AltruistoTopBarIcon> <a href=""id=AltruistoTopBarInfo>Why do I see this?</a><div id=AltruistoTopBarPopover>Because you\'re awesome and you\'ve installed <em>Altruisto.com Chrome Extension</em>. Anytime you visit a website of one of our partners you will see a bar at the top of a page giving you an opportunity to raise money for charities just by clicking one button. If you click on that button will be asked to confirm that you want to support altruisto through your purchases on the site you\'re viewing. After that, <strong>usually between 3-7% of your purchase will be donated to charities we support.</strong><p>You can turn it off at any time by clicking at the altruisto.com Chrome Extension icon (<img src=' + chrome.extension.getURL("assets/img/icon16.png") + ' style=max-width:11px;display:inline-block>) in the top right of your browser and switching off the option "Inform me when I have an opportunity to raise money for charities from my purchase".</div><a href=https://altruisto.com><img src=' + chrome.extension.getURL("assets/img/icon.png") + ' id=AltruistoTopBarLogo></a><div id=AltruistoTopBarCTA></div></div><div style=clear:both></div>';
    

    styleSheet = document.createElement('style'); 
    styleSheet.innerHTML = '#AltruistoTopBarButton,#AltruistoTopBarButtonGrey,#AltruistoTopBarCTA{display:inline-block;text-align:center}#AltruistoTopBar{width:100%!important;height:50px!important;border:1px solid #e0e0e0;background-color:#fff!important;box-shadow:0 2px 20px 0 rgba(0,0,0,.3);position:absolute;top:0;left:0;z-index:99999999999999999;box-sizing:border-box;font-family:Helvetica,Arial,Verdana,sans-serif!important;text-align:center!important;line-height:1.4285;font-size:14px;color:#959595!important}#AltruistoTopBarLogo{max-width:30px;margin:8px 8px 10px 10px;float:left}#AltruistoTopBarIcon{float:right;margin:18px 10px;cursor:pointer;max-width:12px}#AltruistoTopBarWelcome{font-size:12px;width:30%;float:left;margin:9px 0 0}#AltruistoTopBarCTA{font-weight:700;margin:7px 0}#AltruistoTopBarButton{border:1px solid #4CAF50;background:#4CAF50;color:#fff;border-radius:0;padding:6px 12px;text-decoration:none}#AltruistoTopBarButton:hover{text-decoration:underline;background-color:#439a46}#AltruistoTopBarButtonGrey{border:1px solid #e0e1e2;background:#e0e1e2;color:#fff;border-radius:0;padding:6px 12px;text-decoration:none}#AltruistoTopBarButtonGrey:hover{text-decoration:underline;background-color:#cacbcd}#AltruistoTopBarInfo{text-decoration:none;font-size:10px;float:right;color:#337ab7;margin-top:18px}#AltruistoTopBarInfo:hover{color:#337ab7}#AltruistoTopBarInfo:hover+#AltruistoTopBarPopover{display:block}#AltruistoTopBarPopover b,strong,i,em{color:#777!important}#AltruistoTopBarMoreInfo,#AltruistoTopBarPopover{color:#777;padding:10px 10px 0;background:#fff;border:1px solid #e0e0e0;display:none;width:400px;position:absolute}#AltruistoTopBarPopover{font-size:11px;float:right;right:0;top:49px}#AltruistoTopBarMoreInfoLink{font-size:10px;text-decoration:none;color:#337ab7;cursor:pointer;padding-left:5px}#AltruistoTopBarMoreInfoLink:hover+#AltruistoTopBarMoreInfo{display:block}#AltruistoTopBarMoreInfo{font-size:11px;margin-left:52%}';
    document.documentElement.prepend(el);
    document.documentElement.prepend(styleSheet);
}

 /**
 * Displays top bar.
 *
 * @param {(isNotActive|isActive)} mode There are two types of top bar: 1) allowing user to start monetizing current website 2) allowing user to stop monetizing current website
 * 
 */
function showTopBar(mode) {
	var topBarElement    = document.getElementById('AltruistoTopBar');
	var topBarCTAElement = document.getElementById('AltruistoTopBarCTA');	
	
	switch(mode){
		case 'isNotActive' : //therefore show button to activate monetizing this affiliate

			topBarCTAElement.innerHTML = 'Start raising money for charities with ' + extractDomain(location.href) + ' by clicking here: <a href=https://altruisto.com/confirm?url=' + location.href + ' id=AltruistoTopBarButton>Start raising money</a>';
			
			break;
		case 'isActive' : //therefore show button to deactivate monetizing this affiliate
			
      topBarCTAElement.innerHTML = 'Congratulations - you\'re now raising money for charities with this website. <a href=# id=AltruistoTopBarButtonGrey>Stop raising money</a>';

			document.getElementById("AltruistoTopBarButtonGrey").addEventListener("click", function(){ 
				deactivateAffiliate(); 
			});
			
			break;
	}

  topBarElement.style.display = 'inline-block';
	document.getElementById("AltruistoTopBarIcon").addEventListener("click", function(){ 
		hideTopBar(); 
	});
}

 /**
 * Hide top bar and remember to not show it on this domain. Function is activated when user clicks "x" icon.
 */
function hideTopBar(){
  var updatedClosedWebsites = [];

	document.getElementById("AltruistoTopBar").style.display = 'none';
	//removeEmptySpaceForTopBar();

  //remember to not show topbar at this website (for 7 days)
  //@question: Should I put this part in background.js file to keep it more coherent where content.js only retreieves data and background.js manages it?
  chrome.storage.local.get({closedWebsites: []}, function(items) {
    updatedClosedWebsites = items.closedWebsites;
    updatedClosedWebsites.push(extractDomain(location.href));
    chrome.storage.local.set({'closedWebsites': updatedClosedWebsites});
  });
}


/* This is where the magic happens */

chrome.storage.sync.get({
    addSuggestionBox: false,
    addTopBar: true
}, function(items){

    if(items.addTopBar){

        chrome.storage.local.get({
            activatedAffiliates: [], 
            closedWebsites: [], 
            disabledWebsites: [],
            partners: []
        }, function(itemsLocal) {

            var currentDomain = extractDomain(location.href);
            //is current page's domain on the list of our partners? if so add Top Bar
            if(itemsLocal.partners.indexOf(currentDomain) != -1){

                //if current page's domain is not on disabled or closed websites list - add Top Bar
                if(itemsLocal.closedWebsites.indexOf(currentDomain) == -1 
                && itemsLocal.disabledWebsites.indexOf(currentDomain) == -1){

                    createTopBar();
                    var topBar = 'isNotActive';

                    //check if the partner has already been activated and not longer than 7 days ago
                    if(itemsLocal.activatedAffiliates.length){
                        for(i = 0; i < itemsLocal.activatedAffiliates.length; i++){
                            if(itemsLocal.activatedAffiliates[i].domain == currentDomain){ //if current page is in our list of already activated pages
                              activationEndTimestamp = itemsLocal.activatedAffiliates[i].timestamp + 1000*60*60*24*7; //1000 milliseconds * 60 seconds * 60 minutes * 24 hours * 7 days
                              currentTimestamp = Date.now();
                              if(activationEndTimestamp > currentTimestamp ){ //if monetizing current page have been activated less then 7 days ago we display an option to deactivate monetizing
                                  topBar = 'isActive';
                              } 
                            } 
                        }
                    }  
                    /* @todo: add in version 1.2 */
                    //addEmptySpaceForTopBar();
                    showTopBar(topBar);

              }

          }

        });

    }

    if(items.addSuggestionBox){

        if(document.title){ //if title is empty then no pattern will match it therefore there is no point in running the loop
            
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://altruisto.com/api/suggestions?q=" + escape(document.title), true);
            xhr.onreadystatechange = function() {
                
                if(xhr.readyState == 4){
                
                    if(xhr.responseText){
                        var suggestionBoxData = JSON.parse(xhr.responseText);
                        
                        //don't show suggestions leading to websites that have been disabled
                        chrome.storage.local.get({disabledWebsites: []}, function(itemsLocal){

                            var suggestionBoxRedirectURL = suggestionBoxData['url'].replace('https://altruisto.com/redirect/?url=', '');
                            if(itemsLocal.disabledWebsites.indexOf(extractDomain(suggestionBoxRedirectURL)) == -1){

                                addSuggestionBox(suggestionBoxData['title'], suggestionBoxData['description'], suggestionBoxData['img'], suggestionBoxData['url']);

                            }

                        });

                    }
                
                }
            }
            xhr.send();

        }

    }
});