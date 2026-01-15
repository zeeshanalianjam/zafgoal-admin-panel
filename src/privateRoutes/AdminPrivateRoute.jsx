import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { handleApiError } from "../utils/handleApiError";
import { Axios } from "../common/Axios";
import { summaryApi } from "../common/summaryApi";
import { useDispatch } from "react-redux";
import { setAdmin } from "../store/admin/adminSlice";
import { jwtDecode } from "jwt-decode";

const AdminPrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const validateTokenAndFetchUser = async () => {
      try {
        const decodedToken = jwtDecode(token);

        const currentTime = Date.now() / 1000;
        const response = await Axios({
          ...summaryApi.getUserDetails,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (decodedToken.exp < currentTime) {
          // Token expired
          localStorage.removeItem("adminToken");
          navigate("/");
          return;
        }

        if (response.data.success) {
          dispatch(setAdmin(response.data.data));
        }
      } catch (error) {
        localStorage.removeItem("adminToken");
        handleApiError(error);
        navigate("/");
      }
    };



    validateTokenAndFetchUser();
  }, [token, dispatch, navigate]);

  return children;
};

export default AdminPrivateRoute;
