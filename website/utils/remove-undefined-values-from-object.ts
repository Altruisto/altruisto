type GenericObject = {
  [key: string]: any
}

const removeUndefinedValuesFromObject = (obj: GenericObject): GenericObject => {
  let objectWithoutUndefinedValues = {}
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      objectWithoutUndefinedValues = {
        ...objectWithoutUndefinedValues,
        [key]: obj[key]
      }
    }
  })

  return objectWithoutUndefinedValues
}

export default removeUndefinedValuesFromObject
