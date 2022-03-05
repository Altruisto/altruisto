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
    claimInstructions: `Please make sure that you have a registered account in the BetterMe Health Coaching app with the email address you used on the payment page before clicking "claim". It may takes up to a few hours for your account to be upgraded.`
  },
  {
    name: "BetterMe Mental Health",
    website: "https://betterme.world/product/meditation",
    logo: "/images/fundraiser/betterme.jpeg",
    perk: "Free access",
    description:
      "Simple meditations and guided courses for mental well-being. Created by a team from 🇺🇦",
    claimInstructions: `Please make sure that you have a registered account in the BetterMe Mental Health app with the email address you used on the payment page before clicking "claim". It may takes up to a few hours for your account to be upgraded.`
  },
  {
    name: "Bear App",
    website: "https://bear.app",
    logo: "/images/fundraiser/bearapp.jpeg",
    perk: "1 year of Bear Pro (only 50 spots)",
    description: "Bear is a beautiful, flexible writing app for crafting notes and prose.",
    claimInstructions: "You will receive a promo code you can use in the app."
  }
] as const
