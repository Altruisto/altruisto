// slightly simplified pick function from lodash
// https://github.com/lodash/lodash/blob/2.4.2/lodash.js#L3173

export const pick = <Source, Key extends keyof Source>(
  source: Source,
  keys: Key | Key[]
): Pick<Source, Key> => {
  let result: any = {}
  let index = -1
  const length = Object.keys(source).length

  if (typeof keys === "string") {
    result = { [keys]: source[keys] }
    return result
  }

  while (++index < length) {
    let key = (keys as Key[])[index]
    result[key] = source[key]
  }
  return result
}
