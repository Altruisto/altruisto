export const addIfNotIncluded = <Item>(source: Item[], item: Item) =>
  source.includes(item) ? [...source] : [...source].concat(item)
