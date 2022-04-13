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
    name: "My Tasks App",
    website: "https://mytasksapp.com",
    logo: "/images/fundraiser/mytasksapp.png",
    perk: "Get premium account for free",
    description:
      "Tasks is a beautifully simple, todo list and reminder app that will help keep your busy life organised everyday. Used by over 1 million people worldwide.",
    claimInstructions:
      "Click the button below to activate the account. Then login to the app on your phone and click Upgrade to Premium. The last step is to click continue (ignore the paywall) and you're done!"
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
  },
  {
    name: "Mindspa",
    website: "https://www.mindspa.me/",
    logo: "/images/fundraiser/mindspa.png",
    perk: "Free access to PTSD therapeutic program",
    description:
      "Mindspa is a mobile app designed to provide emotional support in everyday challenges.",
    claimInstructions: "Please contact the app via the contact form in the application."
  },
  {
    name: "Concepts (iOS)",
    website: "https://concepts.app ",
    logo: "/images/fundraiser/concepts.png",
    perk: "Free access for 1 year",
    description:
      "Every idea begins as a concept. Write notes on the infinite canvas, make mind-maps and mood boards, sketch plans, designs and illustrations. Share with friends, clients and other apps.",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "OurFlat (iOS)",
    website: "https://ourflat-app.com/",
    logo: "/images/fundraiser/ourflat.png",
    perk: "Free access for 1 year",
    description: "Shared shopping list, finances, calendar, chores, and chat for your household.",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "OurFlat (Android)",
    website: "https://ourflat-app.com/",
    logo: "/images/fundraiser/ourflat.png",
    perk: "Free access for 1 year",
    description: "Shared shopping list, finances, calendar, chores, and chat for your household.",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "Food List Tracking & Shopping",
    website: "https://chester-sw.com/food-checklist/",
    logo: "/images/fundraiser/foodlist.png",
    perk: "Free access",
    description:
      "This application allows you to track your food supplies at home, keep an eye on expiration dates of products, use the shopping list to replenish your stock of food. Scan barcodes to speed up your work. Made by a team in 🇷🇺.",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "Stock and Inventory Simple",
    website: "https://chester-sw.com/",
    logo: "/images/fundraiser/stock.png",
    perk: "Free access",
    description:
      "If you need to keep track of your stock of any kind of items - this application can help you to do it. It can be used as a stock management tool or inventory tracker at home or in a warehouse. A small shop can use it for sales and purchases management. Made by a team in 🇷🇺.",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "Taskito",
    website: "https://taskito.io/",
    logo: "/images/fundraiser/taskito.png",
    perk: "Free access",
    description: "Keep daily goals small, life goals bigger!",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "uTalk",
    website: "https://utalk.com",
    logo: "/images/fundraiser/utalk.svg",
    perk: "Free access for 1 language",
    description:
      "We have over 140 languages to start speaking. Simple, fun and with immediate results.",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "Bazaart",
    website: "https://bazaart.me",
    logo: "/images/fundraiser/bazaart.png",
    perk: "Free yearly subscription",
    description:
      "Bazaart is an award-winning photo editor and graphic design app that helps you easily create beautiful photos, professional designs & stunning collage art.",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "Neo (iOS)",
    website: "https://www.neomeditation.com/en",
    logo: "/images/fundraiser/neo.jpeg",
    perk: "Free access",
    description:
      "Let us carry you away by the inviting and soothing voice of your meditation guide in inspiring landscapes. This app takes you on a personal, poetic, and immersive voyage to approach this ancient practice of meditation in a new way.",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "Neo (Android)",
    website: "https://www.neomeditation.com/en",
    logo: "/images/fundraiser/neo.jpeg",
    perk: "Free access",
    description:
      "Let us carry you away by the inviting and soothing voice of your meditation guide in inspiring landscapes. This app takes you on a personal, poetic, and immersive voyage to approach this ancient practice of meditation in a new way.",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "Ckbk",
    website: "https://app.ckbk.com/",
    logo: "/images/fundraiser/ckbk.png",
    perk: "Free access for 3 months",
    description:
      "Ckbk is a digital cookbook with over 100,000 recipes recommended by leading chefs and food writers.",
    claimInstructions: "You will receive a promo code you can use in the app."
  },
  {
    name: "Slowly",
    website: "https://getslowly.com",
    logo: "/images/fundraiser/slowly.jpeg",
    perk: "Free access for 1 year",
    description:
      "SLOWLY lets you meet pen pals from your smartphone! Match with someone that shares your passion, write a letter and collect stamps from around the world. Speak your mind – one letter at a time!",
    claimInstructions: `Please make sure that you have a registered account in the BetterMe Mental Health app with the email address you used on the payment page before clicking "claim". It may takes up to a few hours for your account to be upgraded. Please make sure to reopen the app to check if the entitlement is granted.`
  },
  {
    name: "Timelog Plus (Pro) - Android",
    website: "https://timelog.link",
    logo: "/images/fundraiser/timelog.png",
    perk: "Free access",
    description:
      "Track your habits and activities, set goals and gain insights on how you spend your time.",
    claimInstructions: "You will receive a promo code you can use in the app."
  }
] as const

export const POLISH_GIVEAWAYS = [
  {
    name: "Wczesnoszkolni.pl",
    website: "https://wczesnoszkolni.pl/",
    description:
      "Wczesnoszkolni.pl to portal z różnymi inspiracjami dla nauczycieli oraz rodziców. Znajdziesz tutaj pomysły na prace plastyczne czy zajęcia matematyczne!",
    logo: "/images/fundraiser/wczesnoszkolni.svg",
    perk: "Pakiet 250 punktów",
    claimInstructions: "Otrzymany kod obniża do 0 zł pakiet 250 punktów w naszym portalu."
  }
] as const
