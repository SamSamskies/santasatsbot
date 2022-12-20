import { AxiosError } from "axios";
import { Sha256 } from "@aws-crypto/sha256-js";
import lightningPayReq from "bolt11";
import { requestInvoice } from "lnurl-pay";
import { Satoshis } from "lnurl-pay/dist/types/types";

const buf2hex = (buffer: ArrayBuffer) => {
  return Array.from(new Uint8Array(buffer))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
};

const verifyDescriptionHash = async (metadata: string, invoice: string) => {
  const hash = new Sha256();

  hash.update(new TextEncoder().encode(metadata));

  const result = await hash.digest();

  return (
    buf2hex(result) ===
    lightningPayReq.decode(invoice).tagsObject.purpose_commit_hash
  );
};

export const getInvoice = async (
  lightningAddress: string,
  tokens: number = 1000
) => {
  const { invoice, params } = await requestInvoice({
    lnUrlOrAddress: lightningAddress,
    tokens: tokens as Satoshis,
  });
  const isValidAmount =
    lightningPayReq.decode(invoice).satoshis === Number(tokens);
  const isValidDescriptionHash = await verifyDescriptionHash(
    JSON.stringify(params.metadata),
    invoice
  );

  if (isValidAmount && isValidDescriptionHash) {
    return invoice;
  } else {
    throw new AxiosError("Bad Request", "400");
  }
};
