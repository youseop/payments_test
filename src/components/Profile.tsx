import { User } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Profile.scss";

interface ProfileProps {
  user: User | undefined;
}

const Profile = ({ user }: ProfileProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) {
      navigate("/");
    }
  }, [user, navigate]);

  if (user === undefined) return <></>;

  return <div className="profile">profile {JSON.stringify(user)}</div>;
};

export default Profile;
