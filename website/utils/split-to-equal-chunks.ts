export const splitToEqualChunks = (arr: any[], size: number) => {
  let chunks = []
  let i = 0
  let n = arr.length
  let len = Math.ceil(n / size)

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)))
  }

  return chunks
}
