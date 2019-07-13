/**
 * Extract the domain from given url. Subdomains will be striped down to main domain.
 *
 * @param {string} url The url from which the function will extract the main domain.
 * @returns {string} Main domain ("example.com").
 */
export function extractDomain(url) {
  var domain
  url = url.toString()
  url = url.toLowerCase()

  //find & remove protocol
  if (url.indexOf("://") > -1) {
    domain = url.split("/")[2]
  } else {
    domain = url.split("/")[0]
  }

  //find & remove port number
  domain = domain.split(":")[0]

  //remove www.
  domain = domain.replace(/^www\./, "")

  //find & remove subdomains
  var parts = domain.split(".")
  if (parts.length > 2) {
    //co.* and com.* exceptions (eg. example.com.au)
    if (domain.indexOf(".co.") !== -1 || domain.indexOf(".com.") !== -1) {
      domain = parts.slice(-3).join(".")
    } else {
      domain = parts.slice(-2).join(".")
    }
  }

  return domain
}
