import { pick } from "./pick"

it("creates new object and copy provided single prop from source object", () => {
  const o = {
    id: 1,
    name: "Andy",
    age: 22
  }
  expect(pick(o, "age")).toEqual({ age: 22 })
  expect(pick(o, "age")).not.toBe(o)
})
it("creates new object and copy provided props from source object", () => {
  const o = {
    id: 1,
    name: "Andy",
    age: 22
  }
  expect(pick(o, ["age", "name"])).toEqual({ name: "Andy", age: 22 })
  expect(pick(o, ["age", "name"])).not.toBe(o)
})
