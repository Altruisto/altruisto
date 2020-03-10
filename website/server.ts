import express from "express"
import next from "next"
import useragent from "express-useragent"
import cookieParser from "cookie-parser"
import querystring from "querystring"
import { readFileSync } from "fs"
import { CUSTOM_PAGES_OUTPUT_DIRECTORY, NEXT_PAGES_OUTPUT_DIRECTORY_NAME } from "./settings"
import { getCtaDestination } from "./utils/get-cta-destination"
import { REFERRED_BY_COOKIE_NAME } from "../shared/globals"
import { GetPartnersResponse } from "../shared/types/api"
import { api, apiUrl } from "./utils/api-url"

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

const server = express()

server.use(cookieParser())
server.use((req, res, next) => {
  if (!req.cookies[REFERRED_BY_COOKIE_NAME] && req.query["ref"]) {
    res.cookie(REFERRED_BY_COOKIE_NAME, req.query["ref"], {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })
  }
  next()
})

server.use(express.static("public"))
server.use(express.static(CUSTOM_PAGES_OUTPUT_DIRECTORY))
server.use(express.static(NEXT_PAGES_OUTPUT_DIRECTORY_NAME))

server.get("/", (req, res) => {
  const ua = useragent.parse(req.header("user-agent"))
  res.send(
    readFileSync("custom-generated-pages/index/index.html")
      .toString("utf8")
      .replace(/\{\{\{CTA\}\}\}/g, getCtaDestination(ua))
  )
})

// backwards compatibility
server.get("/api/partners", (req, res) => {
  api
    .get<GetPartnersResponse>("/partners")
    .then(response => res.send(response.data.map(p => p.domain)))
    .catch(error => res.status(error.status || 500).send(error.message || "Internal Server Error"))
})
server.get("/redirect", (req, res) => {
  const query = querystring.stringify(req.query)
  res.redirect(`${apiUrl}/redirect/?${query}`)
})
server.get("/confirm", (req, res) => {
  const query = querystring.stringify(req.query)
  res.redirect(`${apiUrl}/redirect/?${query}`)
})

// nextjs app
app.prepare().then(() => {
  server.all("*", (req, res) => {
    // trail ending slashes, eg. altruisto.com/partners/ should render altruisto.com/partners
    if (req.path.substr(-1) === "/" && req.path.length > 1) {
      return app.render(req, res, req.path.slice(0, -1), req.query)
    }
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
