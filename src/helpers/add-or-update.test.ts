import { addOrUpdate } from "./add-or-update"

it("updates an array element based on specified property", () => {
  const array = [{ id: 0, name: "John" }, { id: 1, name: "Ann" }]
  const input = { id: 0, name: "Mark" }

  const result = addOrUpdate<typeof array[0]>(array, input, "id")
  expect(result[0]).toEqual(input)
  expect(array[0]).not.toEqual(input)
})

it("adds an element if no element found based on specified property", () => {
  const array = [{ id: 0, name: "John" }, { id: 1, name: "Ann" }]
  const input = { id: 2, name: "Mark" }

  const result = addOrUpdate<typeof array[0]>(array, input, "id")
  expect(result[2]).toEqual(input)
  expect(array[2]).not.toEqual(input)
})
