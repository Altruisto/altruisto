/**
 * When a message from content.js is received to deactivate monetizing given affiliate's - delete cookies and affiliate's domain from activatedAffiliates list.
 */
export function deactivateMonetizing() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (sender.tab) {
      chrome.cookies.getAll({ domain: request.domain }, function(cookies) {
        for (var i = 0; i < cookies.length; i++) {
          //delete cookies from given domain to stop monetizing this site
          removeAffiliatesCookies(cookies[i], request.domain)
        }

        //delete domain from activated domains list
        removeFromActivatedAffiliates(request.domain)
      })

      sendResponse({ status: true })
    }
  })
}

function removeAffiliatesCookies(cookie, domain) {
  var cookieProtocol
  cookie.secure ? (cookieProtocol = "https://") : (cookieProtocol = "http://")

  chrome.cookies.remove({
    url: cookieProtocol + domain + cookie.path,
    name: cookie.name
  })
}

function removeFromActivatedAffiliates(domain) {
  chrome.storage.local.get({ activatedAffiliates: [] }, function(items) {
    for (let i = 0; i < items.activatedAffiliates.length; i++) {
      if (items.activatedAffiliates[i].domain == domain) {
        let updatedActivatedAffiliates = items.activatedAffiliates
        updatedActivatedAffiliates.splice(i, 1)

        chrome.storage.local.set({
          activatedAffiliates: updatedActivatedAffiliates
        })

        break
      }
    }
  })
}
