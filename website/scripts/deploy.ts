// Heroku doesn't support monorepos with shared code.
// Beceuase of that we deploy from different repo - "homepage", not "altruisto"
// This script automatically creates a deploy branch in that repo
import ncp from "ncp"
import replace from "replace-in-file"
import simpleGit from "simple-git/promise"
import shellExec from "shell-exec"

const git = simpleGit()
const getDate = () => {
  const t = Date.now()
  const d = new Date(t)
  const result =
    d.getDate() +
    "_" +
    (d.getMonth() + 1) +
    "_" +
    d.getFullYear() +
    "_" +
    (d.getHours() > 12 ? d.getHours() - 12 : d.getHours()) +
    "_" +
    d.getMinutes() +
    "_" +
    (d.getHours() >= 12 ? "PM" : "AM")
  return result
}
const time = getDate()
const branch = `deploy-${time}`

const deploy = async () => {
  await git.checkoutBranch(branch, "HEAD")
  ncp("../shared", "./shared", async err => {
    if (err) {
      console.error(err)
    }
    console.log(">> deploy: copied `./shared`")

    const options = {
      files: ["server.ts", "pages/*", "pages/*/*"],
      from: /\.\.\/shared/g,
      to: "./shared"
    }
    const results = await replace(options)
    console.log(">> deploy: replacement results:", results)

    await git.add(".")
    await git.commit(`deploy: ${time}`)
    console.log(">> deploy: commit created")
    const remotes = await git.getRemotes(true)
    if (remotes.every(r => !r.refs.push.includes("github.com:Altruisto/homepage.git"))) {
      await git.addRemote("homepage", "git@github.com:Altruisto/homepage.git")
      console.log(">> deploy: remote 'homepage' added")
    }
    console.log(`>> deploy: pushing new branch to the repo`)
    shellExec(`cd .. && git subtree push --prefix=website homepage ${branch} && cd website`)
      .then(x => {
        console.log(`>> deploy: branch pushed`)
      })
      .catch(console.log)
  })
}

deploy()
