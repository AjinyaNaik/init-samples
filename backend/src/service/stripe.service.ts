import Stripe from "stripe";
import { findStandaloneSamplesByIds } from "../repository/sample.repository";
import { findSamplePacksByIds } from "../repository/sample-pack.repository";
import * as orderRepository from "../repository/order.repository";
import * as orderService from "./order.service";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing from environment variables.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16" as any,
});

export const createSampleCheckoutSession = async (
  userId: number,
  sampleIds: number[]
) => {
  if (sampleIds.length === 0) {
    throw new Error("At least one sample is required");
  }

  // Verify samples exist
  const samples = await findStandaloneSamplesByIds(sampleIds);
  if (samples.length !== sampleIds.length) {
    throw new Error("One or more sample IDs are invalid");
  }

  // Verify user doesn't already own any
  const purchasedSamples = await orderRepository.findPurchasedSamplesByUserId(userId);
  const purchasedSampleIds = new Set(purchasedSamples.map((item) => item.sample_id));
  const alreadyOwned = sampleIds.filter((id) => purchasedSampleIds.has(id));

  if (alreadyOwned.length > 0) {
    throw new Error(`You already own sample(s): ${alreadyOwned.join(", ")}`);
  }

  // Format line items (converting dollars to cents)
  const lineItems = samples.map((sample) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: sample.name,
        description: sample.description || "Audio Sample",
      },
      unit_amount: Math.round((sample.price || 0) * 100),
    },
    quantity: 1,
  }));

  // Create Stripe session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/cart`,
    metadata: {
      userId: userId.toString(),
      type: "samples",
      itemIds: JSON.stringify(sampleIds),
    },
  });

  return {
    checkout_url: session.url,
    session_id: session.id,
  };
};

export const createSamplePackCheckoutSession = async (
  userId: number,
  samplePackIds: number[]
) => {
  if (samplePackIds.length === 0) {
    throw new Error("At least one sample pack is required");
  }

  // Verify sample packs exist
  const samplePacks = await findSamplePacksByIds(samplePackIds);
  if (samplePacks.length !== samplePackIds.length) {
    throw new Error("One or more sample pack IDs are invalid");
  }

  // Verify user doesn't already own any
  const purchasedSamplePacks = await orderRepository.findPurchasedSamplePacksByUserId(userId);
  const purchasedPackIds = new Set(purchasedSamplePacks.map((item) => item.sample_pack_id));
  const alreadyOwned = samplePackIds.filter((id) => purchasedPackIds.has(id));

  if (alreadyOwned.length > 0) {
    throw new Error(`You already own sample pack(s): ${alreadyOwned.join(", ")}`);
  }

  // Format line items
  const lineItems = samplePacks.map((samplePack) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: samplePack.name,
        description: samplePack.description || "Sample Pack",
      },
      unit_amount: Math.round((samplePack.price || 0) * 100),
    },
    quantity: 1,
  }));

  // Create Stripe session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/cart`,
    metadata: {
      userId: userId.toString(),
      type: "sample_packs",
      itemIds: JSON.stringify(samplePackIds),
    },
  });

  return {
    checkout_url: session.url,
    session_id: session.id,
  };
};

export const fulfillOrderFromSession = async (session: Stripe.Checkout.Session) => {
  const userId = Number(session.metadata?.userId);
  const type = session.metadata?.type;
  const itemIds: number[] = JSON.parse(session.metadata?.itemIds || "[]");
  const paymentId = (session.payment_intent as string) || session.id;

  if (type === "samples") {
    return await orderService.createOrderSamples(userId, { sample_ids: itemIds });
  } 
  else if (type === "sample_packs") {
    return await orderService.createOrderSamplePacks(userId, { sample_pack_ids: itemIds });
  }
};
