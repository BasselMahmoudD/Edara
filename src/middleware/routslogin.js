// import react from 'react'
import { Outlet , Navigate } from 'react-router-dom';
import { GetAuthUser } from '../helper/storage';

const login = ()=>{
    const auth = GetAuthUser();
    return <> {!auth  ? <Outlet /> : <Navigate to={"/"} />} </>
}

export default login;