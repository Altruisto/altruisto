export const fromHtml = (html: string) => {
  let div = document.createElement("div")
  div.innerHTML = html
  return div.firstChild
}
