import { Request, Response } from "express";
import { stripe } from "../service/stripe.service";
import * as stripeService from "../service/stripe.service";

export const createSampleCheckoutSession = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const { sample_ids } = req.body;

    const result = await stripeService.createSampleCheckoutSession(
      userId,
      sample_ids
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const createSamplePackCheckoutSession = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const { sample_pack_ids } = req.body;

    const result = await stripeService.createSamplePackCheckoutSession(
      userId,
      sample_pack_ids
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(400).json({
      success: false,
      message: "Webhook signature or secret missing",
    });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } 
  catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    try {
      await stripeService.fulfillOrderFromSession(session);
      console.log(`Order successfully fulfilled for user ${session.metadata?.userId}`);
    } 
    catch (fulfillError: any) {
      console.error("Error fulfilling order from webhook:", fulfillError);
      return res.status(500).json({ success: false, message: fulfillError.message });
    }
  }

  return res.status(200).json({ received: true });
};
