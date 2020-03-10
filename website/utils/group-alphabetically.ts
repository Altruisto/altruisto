type GenericObject = { [K: string]: any }
type K = {}

export const groupAplabetically = <O extends GenericObject>(
  arrayOfObjects: O[],
  propertyToGroupBy: keyof O
) => {
  const isNumeric = (a: string) => !isNaN(+a)
  const initOrPush = <El extends GenericObject>(a: Array<El> | null | undefined, obj: El) =>
    typeof a === "undefined" ? [obj] : a.concat(obj)
  const sortOn = property => {
    return function(a, b) {
      if (a[property] < b[property]) {
        return -1
      } else if (a[property] > b[property]) {
        return 1
      } else {
        return 0
      }
    }
  }

  const sorted = arrayOfObjects.sort(sortOn(propertyToGroupBy))

  return sorted.reduce((acc, obj) => {
    const group = obj[propertyToGroupBy][0].toUpperCase()
    if (isNumeric(group)) {
      acc["#"] = initOrPush(acc["#"], obj)
    } else {
      acc[group] = initOrPush(acc[group], obj)
    }

    return acc
  }, {} as any)
}
