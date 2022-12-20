import { getInvoice } from "utils/lnurlPay";
import { createPaymentQuote, executePaymentQuote } from "utils/strikeApi";

export const payLightningAddress = async (lightningAddress: string) => {
  const invoice = await getInvoice(lightningAddress);
  const { paymentQuoteId } = await createPaymentQuote(invoice);

  return executePaymentQuote(paymentQuoteId);
};
