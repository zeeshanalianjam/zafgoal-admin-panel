import { useSelector } from "react-redux";

const isAdmin = (check) => {
  const admin = useSelector(state => state.admin)


  if (check === "Admin") return true;

  return false;
};

export { isAdmin }