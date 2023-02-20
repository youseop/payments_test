import { User } from "firebase/auth";
import "../css/Navbar.scss";

interface NavbarProps {
  user: User | undefined;
  onClickLogin: () => Promise<void>;
  onClickLogout: () => Promise<void>;
}

const Navbar = ({ user, onClickLogin, onClickLogout }: NavbarProps) => {
  const renderAuthRelatedBtn = () => {
    if (user) {
      return (
        <div>
          <div>{user.displayName}</div>
          <div onClick={onClickLogout}>logout</div>
        </div>
      );
    } else {
      return <div onClick={onClickLogin}>login</div>;
    }
  };

  return (
    <div className="navbar">
      <div>navbar unknown ocean</div>
      {renderAuthRelatedBtn()}
    </div>
  );
};

export default Navbar;
