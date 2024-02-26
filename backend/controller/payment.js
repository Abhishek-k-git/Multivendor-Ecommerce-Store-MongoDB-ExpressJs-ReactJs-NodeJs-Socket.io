const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        company: "ecommerce",
      },
      description: "payment from ecommerce shop",
      shipping: {
        name: req.body.name,
        address: {
          line1: req.body.address.address1,
          city: req.body.address.city,
          postal_code: req.body.address.zipCode,
          state: req.body.address.state,
          country: req.body.address.country,
        },
      },
    });
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

module.exports = router;
