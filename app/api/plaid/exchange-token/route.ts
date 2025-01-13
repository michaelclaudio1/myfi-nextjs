import { plaidClient } from "@/lib/plaid";
// import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const public_token = (await req.json()).public_token;

  try {
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SECRET,
    });

    const accessToken = exchangeResponse.data.access_token;

    // This is the ID of the bank that was selected
    // const itemId = exchangeResponse.data.item_id

    // revalidatePath("/temp-test");
    return Response.json({ access_token: accessToken });
  } catch (error) {
    console.error(error);
    return Response.json({ message: error });
  }
}
