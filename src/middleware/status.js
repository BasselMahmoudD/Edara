// import react from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { GetAuthUser } from "../helper/storage";

const status = () => {
  const auth = GetAuthUser();
  return <> {auth && auth.status === 'Active' ? <Outlet /> : <Navigate to={"/supervaisor"} />} </>;
};

export default status;
