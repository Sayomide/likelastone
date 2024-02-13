import stripe from 'stripe';
import express from 'express';
const app = express();

let theStripeGateway = stripe("sk_test_51OScz1FDiGCp6miEnWUQfp7d0Jmd5phX3s2aQqi3Q1Ufbf0PHRWY7CbGemcgn5FUMpgCEpmoRTmWiJv2FQMIQrnx00vEP6MgQW");

app.use(express.json()); 

app.post('/stripe-checkout', async (req,res) => {
  console.log("Request body:", req.body);
try {
  const session = await theStripeGateway.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "http://localhost:8158/success.html",
    cancel_url: "http://localhost:8158/cancel.html",
    line_items: req.body.items.map(item => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: items.desc,
  //          images: [item.img]
          },
          unit_amount: item.price * 100
        },
        quantity: item.item
      }
    })
  });
  console.log("Session object:", session); 
  res.json(session.url);
} catch (error) {
  console.log("error:", error);
  res.status(500).json({ error: "An errror occured during checkout."});
}
});





app.listen(3000, () => {
 console.log('Server is running on port 3000');
});
