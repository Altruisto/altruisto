import transformUSDToBeingsSaves from "./transform-usd-to-beings-saved"

it("returns 1 for donating $4.85 to Against Malaria Foundation", () => {
    expect(transformUSDToBeingsSaves(4.85, "AMF")).toBe(1)
})

it("returns 1 for donating $1.19 to Schistosomiasis Control Initiative", () => {
    expect(transformUSDToBeingsSaves(1.19, "SCI")).toBe(1)
})

it("return 1 when calculated impact equals less then one", () => {
    expect(transformUSDToBeingsSaves(1, "AMF")).toBe(1)
})

it("rounds down the result to x for x.49", () => {
    expect(transformUSDToBeingsSaves(7.2265, "AMF")).toBe(1)
})

it("rounds up the result to x for x.5", () => {
    expect(transformUSDToBeingsSaves(7.275, "AMF")).toBe(2)
})
