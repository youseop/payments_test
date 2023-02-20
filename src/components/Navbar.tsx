import "../css/Navbar.scss";
import { handleGoogleLogin } from "../util/firebase";

const Navbar = () => {
  return (
    <div className="navbar">
      <div>navbar unknown ocean</div>
      <div
        onClick={async () => {
          const data = await handleGoogleLogin();
          console.log("data", data);
        }}
      >
        login
      </div>
    </div>
  );
};

export default Navbar;
