import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedin, children }) => {
  if (!isLoggedin) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};
export default Protected;
