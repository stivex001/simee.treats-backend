const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.pay = (req, res, next) => {
  const { tokenId, amount } = req.body;
  stripe.charges.create(
    {
      source: tokenId,
      amount,
      currency: "naira",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripes);
      }
    }
  );
};
