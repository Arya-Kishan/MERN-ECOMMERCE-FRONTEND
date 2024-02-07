import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectOrders } from "../features/order/orderSlice";
import { selectCartItems } from "../features/cart/cartSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51OTSOaSCLk89VVV2y65ICM1KafKVLbOIhdp06xHCYFST0x3lQGymFiCjyl2Ji6qOcmmugvwPipgsLxtF6bDOhcNM00Msw33mYG");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectOrders)
  const cart = useSelector(selectCartItems)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios.post("/create-payment-intent", { items: currentOrder })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}