import React, { useEffect, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import Square from "./payment_gateway";

declare global {
  interface Window {
    SqPaymentForm: any;
  }
}

const PaymentForm: React.FC = () => {
  const [isLoad, setLoad] = useState(false);
  const [btnText, setBtnText] = useState("Pay $ 1.00");
  const [displayPaymentSuccess, setDisplayPaymentSuccess] = useState(false);
  const [displayPaymentError, setDisplayPaymentError] = useState(false);

  useEffect(() => {
    let sqPaymentScript = document.createElement("script");

    // sandbox: https://js.squareupsandbox.com/v2/paymentform
    // production: https://js.squareup.com/v2/paymentform

    sqPaymentScript.src = "https://js.squareupsandbox.com/v2/paymentform";
    sqPaymentScript.type = "text/javascript";
    sqPaymentScript.async = false;
    sqPaymentScript.onload = () => {
      setLoad(true);
    };

    document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
  }, []);

  const squarePayment = isLoad ? (
    <Square
      setDisplayPaymentError={setDisplayPaymentError}
      setDisplayPaymentSuccess={setDisplayPaymentSuccess}
      paymentForm={window.SqPaymentForm}
      btnText={btnText}
      setBtnText={setBtnText}
    />
  ) : null;

  return (
    <section className="payment">
      <h1>Payment</h1>

      <div className="info">This is one time payment</div>

      <SweetAlert
        success
        show={displayPaymentSuccess}
        title="Pool Service"
        onConfirm={() => setDisplayPaymentSuccess(false)}
      >
        Payment successfully sent
      </SweetAlert>

      <SweetAlert
        error
        show={displayPaymentError}
        title="Pool Service"
        onConfirm={() => setDisplayPaymentError(false)}
      >
        Payment was not sent, Please try again
      </SweetAlert>

      {squarePayment}
    </section>
  );
};

export default PaymentForm;
