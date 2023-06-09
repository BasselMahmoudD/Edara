// import react from 'react'
import { Outlet , Navigate } from 'react-router-dom';
import { GetAuthUser } from '../helper/storage';

const admin = ()=>{
    const auth = GetAuthUser();
    return <> {auth && auth.type=== 0 ? <Outlet /> : <Navigate to={"/"} />} </>
}

export default admin;