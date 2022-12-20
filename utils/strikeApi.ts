import axios from "axios";

export const createPaymentQuote = (lnInvoice: string) => {
    return axios({
        method: "post",
        url: `https://api.next.strike.me/v1/payment-quotes/lightning`,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${process.env.STRIKE_API_KEY}`,
        },
        data: { lnInvoice, sourceCurrency: 'USD' },
    }).then(({ data }) => data);
};

export const executePaymentQuote = (paymentQuote: string) => {
    return axios({
        method: "patch",
        url: `https://api.next.strike.me/v1/payment-quotes/${paymentQuote}/execute`,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${process.env.STRIKE_API_KEY}`,
        },
    }).then(({ data }) => data);
}

