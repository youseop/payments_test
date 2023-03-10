import "./css/App.scss";
import Navbar from "./components/Navbar";
import MainRoutes from "./Routes";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { firebaseAuth, handleGoogleLogin } from "./util/firebase";
import { signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState<User | undefined>(
    firebaseAuth.currentUser ?? undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
      } else {
        // No user is signed in.
      }
    });
  }, []);

  const onClickLogin = async () => {
    const userData = await handleGoogleLogin();
    if (userData.user.displayName && userData.user.email) {
      setUser(userData.user);
    } else {
      alert("invalid user data");
    }
  };

  const onClickLogout = async () => {
    await signOut(firebaseAuth);
    setUser(undefined);
    navigate("/");
  };

  return (
    <div className="App">
      <Navbar
        user={user}
        onClickLogin={onClickLogin}
        onClickLogout={onClickLogout}
      />
      <MainRoutes user={user} />
      <Footer />
    </div>
  );
}

export default App;
