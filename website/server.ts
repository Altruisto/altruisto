import express, { Request, Response, NextFunction } from "express"
import next from "next"
import compression from "compression"
import useragent from "express-useragent"
import cookieParser from "cookie-parser"
import querystring from "querystring"
import { readFileSync } from "fs"
import { CUSTOM_PAGES_OUTPUT_DIRECTORY, NEXT_PAGES_OUTPUT_DIRECTORY_NAME } from "./settings"
import { getCtaDestination, getCtaText } from "./utils/get-cta-destination"
import { REFERRED_BY_COOKIE_NAME } from "../shared/globals"
import { GetPartnersResponse } from "../shared/types/api"
import { api, apiUrl } from "./utils/api-url"

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

const server = express()

const saveRefCookie = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies[REFERRED_BY_COOKIE_NAME] && req.query["ref"]) {
    res.cookie(REFERRED_BY_COOKIE_NAME, req.query["ref"], {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })
  }
  next()
}
const requireHTTPS = (req: Request, res: Response, next: NextFunction) => {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get("x-forwarded-proto") !== "https" &&
    process.env.NODE_ENV !== "development"
  ) {
    return res.redirect("https://" + req.get("host") + req.url)
  }
  next()
}

const wwwRedirect = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.host.slice(0, 4) === "www.") {
    const newHost = req.headers.host.slice(4)
    return res.redirect(301, req.protocol + "://" + newHost + req.originalUrl)
  }
  next()
}

server.use(compression())
server.use(cookieParser())
server.use(saveRefCookie)
server.set("trust proxy", true)
server.use(requireHTTPS)
server.use(wwwRedirect)

server.use(express.static("public", { maxAge: "30 days" }))
server.use(express.static(CUSTOM_PAGES_OUTPUT_DIRECTORY))
server.use(express.static(NEXT_PAGES_OUTPUT_DIRECTORY_NAME))

server.get("/", async (req, res) => {
  return res.redirect(301, "https://join.altruisto.com")
  const ua = useragent.parse(req.header("user-agent"))
  try {
    const covidApiResponse = await api.get("https://covidapi.info/api/v1/global", {
      timeout: 3000
    })
    const covidStatistics = covidApiResponse.data.result
    res.send(
      readFileSync("custom-generated-pages/index/covid.html")
        .toString("utf8")
        .replace(/\{\{\{CTA\}\}\}/g, getCtaDestination(ua))
        .replace(/\{\{\{CTA_TEXT\}\}\}/g, getCtaText(ua))
        .replace(
          /\{\{\{CONFIRMED_COVID_CASES\}\}\}/g,
          new Intl.NumberFormat().format(covidStatistics.confirmed)
        )
        .replace(
          /\{\{\{CONFIRMED_COVID_DEATHS\}\}\}/g,
          new Intl.NumberFormat().format(covidStatistics.deaths)
        )
    )
  } catch (e) {
    res.send(
      readFileSync("custom-generated-pages/index/covid.html")
        .toString("utf8")
        .replace(/\{\{\{CTA\}\}\}/g, getCtaDestination(ua))
        .replace(/\{\{\{CTA_TEXT\}\}\}/g, getCtaText(ua))
        .replace(/\{\{\{CONFIRMED_COVID_CASES\}\}\}/g, "over 68 million")
        .replace(/\{\{\{CONFIRMED_COVID_DEATHS\}\}\}/g, "over 1,500,000")
    )
  }
})

server.get("/extreme-poverty", (req, res) => {
  if (!req.cookies[REFERRED_BY_COOKIE_NAME] && !req.query["ref"]) {
    res.cookie(REFERRED_BY_COOKIE_NAME, "poverty")
  }
  const ua = useragent.parse(req.header("user-agent"))
  res.send(
    readFileSync("custom-generated-pages/index/extreme-poverty.html")
      .toString("utf8")
      .replace(/\{\{\{CTA\}\}\}/g, getCtaDestination(ua))
      .replace(/\{\{\{CTA_TEXT\}\}\}/g, getCtaText(ua))
  )
})

server.get("/animals", (req, res) => {
  if (!req.cookies[REFERRED_BY_COOKIE_NAME] && !req.query["ref"]) {
    res.cookie(REFERRED_BY_COOKIE_NAME, "animals")
  }
  const ua = useragent.parse(req.header("user-agent"))
  res.send(
    readFileSync("custom-generated-pages/index/animals.html")
      .toString("utf8")
      .replace(/\{\{\{CTA\}\}\}/g, getCtaDestination(ua))
      .replace(/\{\{\{CTA_TEXT\}\}\}/g, getCtaText(ua))
  )
})

server.get("/progress-of-humanity", (req, res) => {
  if (!req.cookies[REFERRED_BY_COOKIE_NAME] && !req.query["ref"]) {
    res.cookie(REFERRED_BY_COOKIE_NAME, "progress")
  }
  const ua = useragent.parse(req.header("user-agent"))
  res.send(
    readFileSync("custom-generated-pages/index/progress.html")
      .toString("utf8")
      .replace(/\{\{\{CTA\}\}\}/g, getCtaDestination(ua))
  )
})

server.get("/gearbest", async (req, res) => {
  const ua = useragent.parse(req.header("user-agent"))
  try {
    const covidApiResponse = await api.get("https://covidapi.info/api/v1/global")
    const covidStatistics = covidApiResponse.data.result
    res.send(
      readFileSync("custom-generated-pages/index/gearbest.html")
        .toString("utf8")
        .replace(/\{\{\{CTA\}\}\}/g, getCtaDestination(ua))
        .replace(/\{\{\{CTA_TEXT\}\}\}/g, getCtaText(ua))
        .replace(
          /\{\{\{CONFIRMED_COVID_CASES\}\}\}/g,
          new Intl.NumberFormat().format(covidStatistics.confirmed)
        )
        .replace(
          /\{\{\{CONFIRMED_COVID_DEATHS\}\}\}/g,
          new Intl.NumberFormat().format(covidStatistics.deaths)
        )
    )
  } catch (e) {
    res.send(
      readFileSync("custom-generated-pages/index/covid.html")
        .toString("utf8")
        .replace(/\{\{\{CTA\}\}\}/g, getCtaDestination(ua))
        .replace(/\{\{\{CTA_TEXT\}\}\}/g, getCtaText(ua))
        .replace(/\{\{\{CONFIRMED_COVID_CASES\}\}\}/g, "over 68 million")
        .replace(/\{\{\{CONFIRMED_COVID_DEATHS\}\}\}/g, "over 1,500,000")
    )
  }
})
server.get("/axatravel", async (req, res) => {
  const ua = useragent.parse(req.header("user-agent"))
  try {
    const covidApiResponse = await api.get("https://covidapi.info/api/v1/global")
    const covidStatistics = covidApiResponse.data.result
    res.send(
      readFileSync("custom-generated-pages/index/axatravel.html")
        .toString("utf8")
        .replace(/\{\{\{CTA\}\}\}/g, getCtaDestination(ua))
        .replace(/\{\{\{CTA_TEXT\}\}\}/g, getCtaText(ua))
        .replace(
          /\{\{\{CONFIRMED_COVID_CASES\}\}\}/g,
          new Intl.NumberFormat().format(covidStatistics.confirmed)
        )
        .replace(
          /\{\{\{CONFIRMED_COVID_DEATHS\}\}\}/g,
          new Intl.NumberFormat().format(covidStatistics.deaths)
        )
    )
  } catch (e) {
    res.send(
      readFileSync("custom-generated-pages/index/covid.html")
        .toString("utf8")
        .replace(/\{\{\{CTA\}\}\}/g, getCtaDestination(ua))
        .replace(/\{\{\{CTA_TEXT\}\}\}/g, getCtaText(ua))
        .replace(/\{\{\{CONFIRMED_COVID_CASES\}\}\}/g, "over 68 million")
        .replace(/\{\{\{CONFIRMED_COVID_DEATHS\}\}\}/g, "over 1,500,000")
    )
  }
})

// backwards compatibility
server.get("/api/partners", (req, res) => {
  api
    .get<GetPartnersResponse>("/partners")
    .then((response) => res.send(response.data.map((p) => p.domain)))
    .catch((error) =>
      res.status(error.status || 500).send(error.message || "Internal Server Error")
    )
})
server.get("/redirect", (req, res) => {
  const query = querystring.stringify(req.query)
  res.redirect(`${apiUrl}/redirect/?${query}`)
})
server.get("/confirm", (req, res) => {
  const query = querystring.stringify(req.query)
  res.redirect(`${apiUrl}/redirect/?${query}`)
})
server.get("/confirm.html", (req, res) => {
  res.redirect(`/email-subscriber-confirm`)
})
server.get("/thankyou.html", (req, res) => {
  res.redirect(`/email-subscriber-thankyou`)
})

// nextjs app
app.prepare().then(() => {
  // @TODO: make general solution for cluster rewrites
  server.get("/blog/poverty", (req, res) => res.redirect("/poverty"))
  server.get("/poverty", (req, res) => {
    return app.render(req, res, "/blog/poverty", req.query)
  })
  server.get("/blog/poverty-definition", (req, res) => res.redirect("/poverty/poverty-definition"))
  server.get("/poverty/poverty-definition", (req, res) => {
    return app.render(req, res, "/blog/poverty-definition", req.query)
  })
  server.get("/blog/children-in-poverty", (req, res) =>
    res.redirect("/poverty/children-in-poverty")
  )
  server.get("/poverty/children-in-poverty", (req, res) => {
    return app.render(req, res, "/blog/children-in-poverty", req.query)
  })
  server.get("/blog/war-on-poverty", (req, res) => res.redirect("/poverty/war-on-poverty"))
  server.get("/poverty/war-on-poverty", (req, res) => {
    return app.render(req, res, "/blog/war-on-poverty", req.query)
  })
  server.get("/blog/solutions-to-poverty", (req, res) =>
    res.redirect("/poverty/solutions-to-poverty")
  )
  server.get("/poverty/solutions-to-poverty", (req, res) => {
    return app.render(req, res, "/blog/solutions-to-poverty", req.query)
  })
  server.get("/blog/poverty-and-education", (req, res) =>
    res.redirect("/poverty/poverty-and-education")
  )
  server.get("/poverty/poverty-and-education", (req, res) => {
    return app.render(req, res, "/blog/poverty-and-education", req.query)
  })
  server.get("/blog/poverty-in-india", (req, res) => res.redirect("/poverty/poverty-in-india"))
  server.get("/poverty/poverty-in-india", (req, res) => {
    return app.render(req, res, "/blog/poverty-in-india", req.query)
  })

  server.all("*", (req, res) => {
    // trail ending slashes, eg. altruisto.com/partners/ should render altruisto.com/partners
    if (req.path.substr(-1) === "/" && req.path.length > 1) {
      return app.render(req, res, req.path.slice(0, -1), req.query)
    }
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
