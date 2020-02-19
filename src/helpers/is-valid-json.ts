export const isValidJSON = (source: string) => {
  try {
    return JSON.parse(source) && true
  } catch (e) {
    return false
  }
}
