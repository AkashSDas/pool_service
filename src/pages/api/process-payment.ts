import * as crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import * as squareConnect from "square-connect";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;

  // Set Square Connect credentials and environment
  const defaultClient = squareConnect.ApiClient.instance;

  // Configure OAuth2 access token for authorization: oauth2
  const oauth2 = defaultClient.authentications["oauth2"];
  oauth2.accessToken = accessToken as string;

  // Set 'basePath' to switch between sandbox env and production env
  // sandbox: https://connect.squareupsandbox.com
  // production: https://connect.squareup.com
  defaultClient.basePath = "https://connect.squareupsandbox.com";

  const request_params = req.body;

  // length of idempotency_key should be less than 45
  const idempotency_key = crypto.randomBytes(22).toString("hex");

  // Charge the customer's card
  const payments_api = new squareConnect.PaymentsApi();
  const request_body: squareConnect.CreatePaymentRequest = {
    source_id: request_params.nonce,
    amount_money: {
      amount: 1 * 100, // = $1
      currency: "USD",
    },
    idempotency_key: idempotency_key,
  };

  try {
    const response = await payments_api.createPayment(request_body);
    res.status(200).json({
      success: true,
      error: false,
      title: "Payment Successful",
      result: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      title: "Payment Failure",
      result: error.response.text,
    });
  }
}
