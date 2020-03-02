export const addOrUpdate = <Item extends { [key: string]: any }>(
  source: Item[],
  item: Item,
  propertyToCompareBy: keyof Item
): Item[] => {
  const result = [...source]
  const index = result.findIndex(
    element => element[propertyToCompareBy] === item[propertyToCompareBy]
  )

  if (index > -1) {
    result[index] = item
  } else {
    result.push(item)
  }

  return result
}
