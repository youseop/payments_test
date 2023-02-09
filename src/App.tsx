import "./App.css";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk/types";
import uuid from "react-uuid";
import { useEffect, useState } from "react";

function App() {
  const clientKey = process.env.REACT_APP_CLIENT_KEY ?? "";
  console.log(clientKey);
  const secretKey = process.env.REACT_APP_SECRET_KEY ?? "";
  const customerKey = uuid();

  const [paymentWidget, setPaymentWidget] = useState<
    PaymentWidgetInstance | undefined
  >();

  useEffect(() => {
    loadPaymentWidget(clientKey, customerKey).then((paymentWidget) => {
      setPaymentWidget(paymentWidget);
    });
  }, [loadPaymentWidget]);

  return (
    <div className="App">
      <h1>toss payments</h1>
      <div>{clientKey}</div>
      <div>{secretKey}</div>
      <div>{customerKey}</div>
      <div>
        {paymentWidget
          ? "paymentWidget is loaded"
          : "paymentWidget is not loaded yet"}
      </div>
      <div
        onClick={() => {
          console.log(paymentWidget);
          paymentWidget?.renderAgreement("#agreement");
          const test = paymentWidget?.renderPaymentMethods(
            "#payment-method",
            15000
          );
          console.log("return value of renderPaymentMethods", test);
        }}
      >
        display payment widget
      </div>
      <div id="payment-method"></div>
      <div id="agreement"></div>
    </div>
  );
}

export default App;
