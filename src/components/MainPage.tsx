import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import classNames from "classnames";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "../css/MainPage.scss";

interface ProfileProps {
  user: User | undefined;
}
const MainPage = ({ user }: ProfileProps) => {
  const clientKey = process.env.REACT_APP_CLIENT_KEY;
  const secretKey = process.env.REACT_APP_SECRET_KEY;

  const [paymentWidget, setPaymentWidget] = useState<
    PaymentWidgetInstance | undefined
  >();
  const [isPaymentWidgetOpen, setIsPaymentWidgetOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (clientKey !== undefined && user !== undefined) {
      loadPaymentWidget(clientKey, user.uid).then((paymentWidget) => {
        setPaymentWidget(paymentWidget);
      });
    }
  }, [clientKey, user]);

  const togglePaymentWidget = () => {
    if (!isPaymentWidgetOpen) {
      if (paymentWidget !== undefined) {
        paymentWidget.renderPaymentMethods("#payment-widget", 15000);
        paymentWidget.renderAgreement("#agreement");
      } else {
        alert("Error: paymentWidget is not loaded");
      }
    }
    setIsPaymentWidgetOpen(!isPaymentWidgetOpen);
  };

  const requestPayment = () => {
    if (user !== undefined && paymentWidget !== undefined) {
      const orderId = uuid();
      paymentWidget.requestPayment({
        orderId: orderId,
        orderName: "토스 티셔츠 외 2건",
        successUrl: "https://localhost:3000/success",
        failUrl: "https://localhost:3000/fail",
        customerEmail: user.email,
        customerName: user.displayName,
      });
      togglePaymentWidget();
    } else {
      if (user === undefined) alert("Error: invalid user info");
      else alert("Error: paymentWidget is not loaded");
    }
  };

  const renderModal = (
    isPaymentWidgetOpen: boolean,
    closeModal: () => void
  ) => {
    const hidden = !isPaymentWidgetOpen;
    return (
      <div
        className={classNames("modal-wrapper", { hidden })}
        onClick={(e) => {
          e.stopPropagation();
          closeModal();
        }}
      >
        <div className="modal-background" />
        <div
          className="modal-content"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="content" id={"payment-widget"}></div>
          <div className="content" id={"agreement"}></div>
          <div className="btn-wrapper">
            <div className="btn" onClick={requestPayment}>
              결제하기
            </div>
            <div className="btn" onClick={closeModal}>
              Close
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mainpage">
      <h1>toss payments</h1>
      <div>clientkey: {clientKey}</div>
      <div>secretKey: {secretKey}</div>
      <div>
        {paymentWidget
          ? "paymentWidget is loaded"
          : "paymentWidget is not loaded yet"}
      </div>
      <div onClick={togglePaymentWidget} className="btn">
        display payment widget
      </div>
      {renderModal(isPaymentWidgetOpen, togglePaymentWidget)}
    </div>
  );
};

export default MainPage;
