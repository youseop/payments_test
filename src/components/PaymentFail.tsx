import { User } from "firebase/auth";

interface PaymentFailProps {
  user: User | undefined;
}

const PaymentFail = ({ user }: PaymentFailProps) => {
  return <div className="PaymentFail">PaymentFail</div>;
};

export default PaymentFail;
