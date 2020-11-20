import React from "react";

declare global {
  interface Window {
    SqPaymentForm: any;
  }
}

const Square = ({
  paymentForm,
  setDisplayPaymentSuccess,
  setDisplayPaymentError,
  btnText,
  setBtnText,
}: any): JSX.Element => {
  const config = {
    // Initialize the payment form elements

    applicationId: process.env.SQUARE_APPLICATION_ID,
    inputClass: "sq-input",
    autoBuild: false,

    // Customize the CSS for SqPaymentForm iframe elements
    inputStyles: [
      {
        fontSize: "16px",
        lineHeight: "24px",
        padding: "16px",
        placeholderColor: "#a0a0a0",
        backgroundColor: "transparent",
      },
    ],
    // Initialize the credit card placeholders
    cardNumber: {
      elementId: "sq-card-number",
      placeholder: "Card Number",
    },
    cvv: {
      elementId: "sq-cvv",
      placeholder: "CVV",
    },
    expirationDate: {
      elementId: "sq-expiration-date",
      placeholder: "MM/YY",
    },
    postalCode: {
      elementId: "sq-postal-code",
      placeholder: "Postal",
    },

    // SqPaymentForm callback functions
    callbacks: {
      /* 
         callback function: cardNonceResponseReceived
         Triggered when: SqPaymentForm completes a card nonce request
      */
      cardNonceResponseReceived: function (
        errors: any,
        nonce: any,
        cardData: any
      ) {
        if (errors) {
          setDisplayPaymentError(true);
          return;
        }

        setBtnText("Don't refresh, your payment is in progress");

        //alert(`The generated nonce is:\n${nonce}`);
        fetch("http://localhost:3000/api/process-payment", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nonce: nonce,
          }),
        })
          .catch((err) => {
            setDisplayPaymentError(true);
          })
          .then((response) => {
            const res = response as any;
            if (!res.ok) {
              return res
                .text()
                .then((errorInfo: any) => Promise.reject(errorInfo));
            }
            return res.text();
          })
          .then((data) => {
            // Payment complete successfully
            setDisplayPaymentSuccess(true);
            return null;
          })
          .catch((err) => {
            // Payment failed to complete
            setDisplayPaymentError(true);
          })
          .then((_) => setBtnText("Send"));
      },
    },
  };

  paymentForm = new paymentForm(config);
  paymentForm.build();
  const requestCardNonce = () => {
    paymentForm.requestCardNonce();
  };

  return (
    <div id="form-container">
      <div id="sq-card-number"></div>
      <div className="third" id="sq-expiration-date"></div>
      <div className="third" id="sq-cvv"></div>
      <div className="third" id="sq-postal-code"></div>
      <button
        id="sq-creditcard"
        className="button-credit-card"
        onClick={requestCardNonce}
      >
        {" "}
        {btnText}
      </button>
    </div>
  );
};

export default Square;
