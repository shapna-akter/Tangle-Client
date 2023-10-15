import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </form> */}
      <div className="px-6">
        <h3 className="text-xl lg:text-4xl text-info font-medium">
          Pay with Card
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="text-sm lg:text-xl">
            <div className="form-control my-4">
              <label className="label">
                <span className="font-medium text-primary">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-info rounded-md p-2"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="font-medium text-primary">
                  Card Information
                </span>
              </label>
              <input
                type=""
                placeholder="1234 1234 1234 1234"
                className="w-full border border-info rounded-tl-md rounded-tr-md p-2"
              />
              <div className="flex">
                <input
                  type=""
                  placeholder="MM/YY"
                  className="w-full max-w-xs border border-info border-t-0 rounded-bl-md p-2"
                />
                <input
                  type=""
                  placeholder="CVC"
                  className="w-full max-w-xs border border-info border-t-0 border-l-0 rounded-br-md p-2"
                />
              </div>
            </div>
            <div className="form-control my-4">
              <label className="label">
                <span className="font-medium text-primary">Name Of Card</span>
              </label>
              <input
                type=""
                placeholder=""
                className="w-full border border-info rounded-md p-2"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="font-medium text-primary">
                  Billing Address
                </span>
              </label>
              <input
                type=""
                placeholder="India"
                className="w-full border border-info rounded-tl-md rounded-tr-md p-2"
              />
              <input
                type=""
                placeholder="Address Line 1"
                className="w-full border border-info border-t-0 p-2"
              />
              <input
                type=""
                placeholder="Address Line 2"
                className="w-full border border-info border-t-0 p-2"
              />
              <div className="flex">
                <input
                  type=""
                  placeholder="City"
                  className="w-full max-w-xs border border-info border-t-0 p-2"
                />
                <input
                  type=""
                  placeholder="ZipCode"
                  className="w-full max-w-xs border border-info border-t-0 border-l-0 p-2"
                />
              </div>

              <input
                type="text"
                placeholder="State"
                className="w-full border border-info border-t-0 p-2 rounded-bl-md rounded-br-md"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={!stripe}
              className="w-full text-base-100 bg-primary rounded-lg py-2 my-8 cursor-pointer"
            >
              Pay $399
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutForm;
