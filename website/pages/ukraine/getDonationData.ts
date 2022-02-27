import axios from "axios";
import socketIOClient from 'socket.io-client';

type Donation = {
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

// export const getDonationData = async () => {
//     const data = await axios.get<DonationEventData>('');
//     // console.log(data)
//     return data;
// };

export const subscribeToDonationsEvent = async (
    callback: (payload: DonationEventData) => void
): Promise<true> => {
    return new Promise((resolve, reject) => {
        const client = socketIOClient('https://altruisto-api-playground.herokuapp.com/direct-donation-events', {
            path: '/v2',
            query: {
                currency: "USD",
                },
        });

        client.on('connect', () => resolve((true)));
        client.on('connect_error', () => reject((true)));
        client.on('NewDonation', callback);
    });
};