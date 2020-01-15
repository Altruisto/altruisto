export const classes = (classes: { [C: string]: boolean }) =>
  Object.keys(classes)
    .filter(e => classes[e])
    .join(" ")
