import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "../css/MainPage.scss";

const MainPage = () => {
  const clientKey = process.env.REACT_APP_CLIENT_KEY;
  const secretKey = process.env.REACT_APP_SECRET_KEY;

  const [paymentWidget, setPaymentWidget] = useState<
    PaymentWidgetInstance | undefined
  >();
  const [customerKey, setCustomerKey] = useState<string>(uuid());

  useEffect(() => {
    if (clientKey !== undefined) {
      loadPaymentWidget(clientKey, customerKey).then((paymentWidget) => {
        setPaymentWidget(paymentWidget);
      });
    }
  }, [clientKey, customerKey]);

  return (
    <div className="mainpage">
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
          paymentWidget?.renderAgreement("#agreement");
          paymentWidget?.renderPaymentMethods("#payment-method", 15000);
        }}
      >
        display payment widget
      </div>
      <div id="payment-method"></div>
      <div id="agreement"></div>
    </div>
  );
};

export default MainPage;
