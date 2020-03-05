import { extractDomain } from "./extract-domain"

it("returns unchanged domain when correct domain is provided", () => {
  expect(extractDomain("example.com")).toBe("example.com")
})
it("returns empty string when incorrect url is provided", () => {
  expect(extractDomain("exampleExampleEXAMPLE")).toBe("")
})
it("returns domain when url with protocol is provided", () => {
  expect(extractDomain("https://example.com")).toBe("example.com")
  expect(extractDomain("http://example.com")).toBe("example.com")
  // expect(extractDomain("ftp://example.com")).toBe("example.com")
  expect(extractDomain("//example.com")).toBe("example.com")
})
it("returns domain when url with protocol and subdomain is provided", () => {
  expect(extractDomain("https://www.example.com")).toBe("example.com")
})
it("returns domain when url with path is provided", () => {
  expect(extractDomain("https://www.example.com/path")).toBe("example.com")
  expect(extractDomain("https://example.com/path?argument1=1&argument2=2")).toBe("example.com")
  expect(extractDomain("example.com/path?argument1=1&argument2=2")).toBe("example.com")
})
