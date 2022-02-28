import socketIOClient from "socket.io-client"

export type Donation = {
  donor: string
  amount: number
  currency: string
}

export type DonationEventData = {
  raised: {
    current: number
    goal: number
    currency: string
    donorsCount: number
  }
  mostRecentDonations: Donation[]
}

export const subscribeToDonationsEvent = async (
  userCurrency: string,
  callback: (payload: DonationEventData) => void
): Promise<true> => {
  return new Promise((resolve, reject) => {
    const client = socketIOClient(
      "https://altruisto-api-playground.herokuapp.com/direct-donation-events",
      {
        path: "/v2",
        query: {
          currency: userCurrency || "USD"
        }
      }
    )

    client.on("connect", () => resolve(true))
    client.on("connect_error", () => reject(true))
    client.on("NewDonation", (payload) => {
      callback(payload)
    })
  })
}
