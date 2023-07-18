import { Navigate } from 'react-router-dom';

const ProtectedRouteUser = ({ isLoggedIn,children }) => {
 

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRouteUser;
