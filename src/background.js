import {
  onInstalled
} from "./background/on-installed.js"
import {
  onAlarm
} from "./background/on-alarm.js"
import {
  activateMonetizing
} from "./background/activate-monetizing.js"
import {
  deactivateMonetizing
} from "./background/deactivate-monetizing.js"
import {
  recognizeOtherAffiliates
} from "./background/recognize-other-affiliates.js"

onInstalled()
onAlarm()
activateMonetizing()
deactivateMonetizing()
recognizeOtherAffiliates()