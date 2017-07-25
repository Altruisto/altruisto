/**
 * Get the list of partner stores' domain and save it locally
 */
export function getPartnersList(){
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