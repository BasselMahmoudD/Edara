// import react from 'react'
import { Outlet , Navigate } from 'react-router-dom';
import { GetAuthUser } from '../helper/storage';

const guest = ()=>{
    const auth = GetAuthUser();
    return <> {auth && auth.type=== 1  ? <Outlet /> : <Navigate to={"/"} />} </>
}

export default guest;