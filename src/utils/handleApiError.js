import toast from "react-hot-toast";

const adminToken = localStorage.getItem("adminToken");
const superAdminToken = localStorage.getItem("superAdminToken");


export const handleApiError = (error) => {
  let ErrorMsg = error.response?.data?.message || error?.message;

  // network error
  if (error.code === "ERR_NETWORK") {
    ErrorMsg =
      "Network Error: Unable to connect to the server. Please check your internet or server status.";
    toast.error(ErrorMsg);
  } else if (error.code === "ECONNABORTED") {
    ErrorMsg = "Request Timeout: The server took too long to respond.";
    toast.error(ErrorMsg);
  } else if (error.response) {
    let status = error.response.status;

    // status error handle

    if (status >= 500) {
      toast.error(ErrorMsg);
    } else if (status === 404) {
      toast.error(ErrorMsg);
    } else if (status === 403) {
      toast.error(ErrorMsg);
    } else if (status === 401) {
      toast.error(ErrorMsg);
      if (adminToken) {
        localStorage.removeItem("adminToken")
        window.location.href = "/";
      } else if (superAdminToken) {
        localStorage.removeItem("superAdminToken")
        window.location.href = "/";
      }
      return;
    } else if (status === 409) {
      toast.error(ErrorMsg)
    } else if (status === 400) {
      toast.error(ErrorMsg);
    } else {
      toast.error(ErrorMsg);
    }
  } else {
    ErrorMsg;
  }

  console.log("Full error: ", error);
};
