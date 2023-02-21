import { User } from "firebase/auth";
import queryString from "query-string";

interface PaymentSuccessProps {
  user: User | undefined;
}
const PaymentSuccess = ({ user }: PaymentSuccessProps) => {
  const query = queryString.parse(window.location.search); //사용
  return (
    <div className="PaymentSuccess">
      <h1>Payment Success</h1>
      <div>amount: {query.amount}</div>
      <div>orderId: {query.orderId}</div>
      <div>paymentKey: {query.paymentKey}</div>
    </div>
  );
};

export default PaymentSuccess;
