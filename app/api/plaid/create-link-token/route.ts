import { plaidClient } from "@/lib/plaid";
import { Products, CountryCode } from "plaid";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const client_user_id = uuidv4();
    console.log(client_user_id);

    const tokenResponse = await plaidClient.linkTokenCreate({
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SECRET,
      user: {
        client_user_id: client_user_id ?? "",
      },
      client_name: "MyFi",
      language: "en",
      products: [Products.Auth, Products.Transactions],
      country_codes: [CountryCode.Us],
    });

    return Response.json(tokenResponse.data);
  } catch (error) {
    return Response.json({ message: error });
  }
}
