import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  return (
    <div className="flex flex-col justify-center lg:flex-row gap-12 2xl:gap-32 mt-6">
      <div className="flex flex-col justify-center lg:items-center lg:border-r-2 px-6">
        <h3 className="text-xl lg:text-4xl text-info font-medium mb-4">$399</h3>
        <div className="text-sm lg:text-xl font-medium">
          <div className="grid grid-cols-2 gap-12">
            <span className="text-primary">Tangle Care service</span>
            <span className="text-info">$299</span>
          </div>
          <div className="grid grid-cols-2 gap-12 border-b-2 border-info pb-4">
            <span className="text-primary">GST @18%</span>
            <span className="text-info">$100</span>
          </div>
          <div className=" grid grid-cols-2 gap-12">
            <span className="text-primary">Total Due</span>
            <span className="text-info">$399</span>
          </div>
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
