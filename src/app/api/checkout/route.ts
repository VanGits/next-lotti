import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export async function POST(request: Request) {
  const { cartItems } = await request.json();
  // TODO: switch stripe API to LOtti's
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${request.headers.get("origin")}/`,
      // TODO: Push paid customers' details to an array in Sanity and display it in admin panel
      cancel_url: `${request.headers.get("origin")}/`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}