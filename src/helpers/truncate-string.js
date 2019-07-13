/**
 * Truncate given string after given number of characters.
 *
 * @param {string} string The string to be truncated.
 * @param {number} n Number of characters after which the string should be truncated.
 * @param {boolean} [useWordBoundary=false] If true don't cut in the middle of the word.
 * @returns {string} String shortened after given number of characters with "..." added.
 */
export function truncateString(string, n, useWordBoundary) {
  var subString

  if (string.length <= n) {
    return string
  }

  subString = string.substr(0, n - 3)
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "..."
  )
}
