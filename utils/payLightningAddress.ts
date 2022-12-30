import { createPaymentQuote, executePaymentQuote } from "utils/strikeApi";
import { requestInvoice } from "lnurl-pay";
import { Satoshis } from "lnurl-pay/dist/types/types";

export const payLightningAddress = async (lightningAddress: string, tokens: number = 1000) => {
  const { invoice } = await requestInvoice({
    lnUrlOrAddress: lightningAddress,
    tokens: tokens as Satoshis,
    validateInvoice: true,
  });
  const { paymentQuoteId } = await createPaymentQuote(invoice);

  return executePaymentQuote(paymentQuoteId);
};
