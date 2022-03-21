export type Giveaway = {
  name: string
  logo: string
  website: string
  description: string
  perk: string
  claimInstructions?: string
}

export const GIVEAWAYS = [
  {
    name: "UNUM",
    logo:
      "https://uploads-ssl.webflow.com/61005d24feea1032c4ad8d29/61005d24feea1025daad8d51_UNUM%20Logo%20Black.svg",
    website: "https://www.unum.la",
    description:
      "An app used by 16M+ people to create beautiful content with photo editor, filters or a layout with collage.",
    perk: '1 year of free "Elite" subscription',
    claimInstructions: `Please make sure that you have a registered account in app.unum.la with the email address you used on the payment page before clicking "claim".`
  },
  {
    name: "BetterMe Health Coaching",
    website: "https://betterme.world/product/healthcoaching",
    logo: "/images/fundraiser/betterme.jpeg",
    perk: "Free access",
    description:
      "Personalized workout and nutrition plans supported by real human coaches, comprehensive progress tracking, and cognitive therapy practice-based tips. Created by a team from 🇺🇦",
    claimInstructions: `Please make sure that you have a registered account in the BetterMe Health Coaching app with the email address you used on the payment page before clicking "claim". It may takes up to a few hours for your account to be upgraded. Please make sure to reopen the app to check if the entitlement is granted.`
  },
  {
    name: "BetterMe Mental Health",
    website: "https://betterme.world/product/meditation",
    logo: "/images/fundraiser/betterme.jpeg",
    perk: "Free access",
    description:
      "Simple meditations and guided courses for mental well-being. Created by a team from 🇺🇦",
    claimInstructions: `Please make sure that you have a registered account in the BetterMe Mental Health app with the email address you used on the payment page before clicking "claim". It may takes up to a few hours for your account to be upgraded. Please make sure to reopen the app to check if the entitlement is granted.`
  },
  {
    name: "Bear App (iOS)",
    website: "https://bear.app",
    logo: "/images/fundraiser/bearapp.jpeg",
    perk: "1 year of Bear Pro (only 25 spots)",
    description: "Bear is a beautiful, flexible writing app for crafting notes and prose.",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "Bear App (Mac)",
    website: "https://bear.app",
    logo: "/images/fundraiser/bearapp.jpeg",
    perk: "1 year of Bear Pro (only 25 spots)",
    description: "Bear is a beautiful, flexible writing app for crafting notes and prose.",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "ABA English",
    website: "https://www.abaenglish.com/",
    logo: "/images/fundraiser/abaenglish.png",
    perk: "Free access for 1 year",
    description:
      "Recognized as one of the best English language learning apps in the world. Take your English to the next level.",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "Pixitca",
    website: "https://play.google.com/store/apps/details?id=com.perracolabs.pixtica",
    logo: "/images/fundraiser/pixitca.jpg",
    perk: "Free access",
    description:
      "Pixitca is a feature-rich «All-in-One» camera app with great photo and video editors, a comprehensive gallery, and plenty of creative tools.",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "Focus - Time Management for iOS",
    website: "https://meaningful-things.com/focus",
    logo: "/images/fundraiser/focus.png",
    perk: "Free access for 1 year",
    description: "Pomodoro Time Manager for Professionals",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "Attentive - Screen Time Control for iOS",
    website: "https://meaningful-things.com/attentive",
    logo: "/images/fundraiser/attentive.png",
    perk: "Free access for 1 year",
    description:
      "App that help you build healthy smartphone habits. Cut back on mindless screen time and change the way you use your phone.",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "Filter - App & Website Blocker for Mac",
    website: "https://meaningful-things.com/filter",
    logo: "/images/fundraiser/filter.png",
    perk: "Free access for 1 year",
    description:
      "Filter App helps you to block distractions and lets you regain time for what really matters. Don’t let distracting websites and apps steal your time. ",
    claimInstructions: "You will receive a promo code you can use in the app."
  }
] as const

export const POLISH_GIVEAWAYS = [
  {
    name: "Wczesnoszkolni.pl",
    website: "https://wczesnoszkolni.pl/",
    description:
      "Wczesnoszkolni.pl to portal z różnymi inspiracjami dla nauczycieli oraz rodziców. Znajdziesz tutaj pomysły na prace plastyczne czy zajęcia matematyczne!",
    logo: "/images/fundraiser/wczesnoszkolni.png",
    perk: "Pakiet 250 punktów",
    claimInstructions: "Otrzymany kod obniża do 0 zł pakiet 250 punktów w naszym portalu."
  }
] as const