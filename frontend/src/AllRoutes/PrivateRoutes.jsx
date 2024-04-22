

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const PrivateRoutes = ({ children }) => {
  const { isAuth } = useSelector((store) => ({
    isAuth: store.authReduer.isAuth,
  }));
  const location = useLocation();
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    if (!isAuth && location.pathname !== "/login") {
      setRedirectPath(location.pathname);
      toast.error("Please log in to access this page");
    }
  }, [isAuth, location]);

  return (
    <>
      <ToastContainer /> 
      {isAuth ? (
        children
      ) : (
        <Navigate state={{ from: redirectPath }} to="/login" />
      )}
    </>
  );
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
