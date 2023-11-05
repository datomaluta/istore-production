import { Navigate } from "react-router-dom";
import { PropsType } from "./types";

const CheckAuthAndAdmin = ({ admin = false, children }: PropsType) => {
  const storedData = localStorage.getItem("isLoggedIn");
  const isLoggedIn = storedData ? JSON.parse(storedData) : false;

  if (isLoggedIn === false) {
    return <Navigate to="/" />;
  }

  if (admin) {
    if (isLoggedIn) {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default CheckAuthAndAdmin;
