import { onInstalled } from "./background/on-installed"
import { onAlarm } from "./background/on-alarm"
import { monitorActivatedPartners } from "./background/monitor-activated-partners"
import { recognizeOtherAffiliates, recognizeEbayAffiliates } from "./background/recognize-other-affiliates"

onInstalled()
onAlarm()
monitorActivatedPartners()
recognizeOtherAffiliates()
recognizeEbayAffiliates()
