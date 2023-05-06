import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedin, children }) => {
  if (!isLoggedin) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;
