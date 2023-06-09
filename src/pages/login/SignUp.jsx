/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */

import './SignUp.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { Alert } from 'bootstrap';
import {Alert} from '@chakra-ui/react';
import { setAuthUser } from '../../helper/storage.js'
import { useNavigate } from 'react-router-dom';
const SignUp= () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email : "",
        password : "", 
        loading : false,
        err : []
    });

    const loginFun = (e)=>{
        e.preventDefault();
        setLogin({...login , loading : true , err : []});
        axios.post("http://localhost:4000/auth/login", {
            email : login.email,
            password : login.password,
        }).then(resp => {
            setLogin({...login , loading : false , err : []});
            setAuthUser(resp.data);
            if(resp.data.type===0){
                navigate("/home");
            }
            else{
            navigate("/supervisor");
            }
            
        }).catch(errors => {
            // console.log(errors);
            setLogin({...login , loading : false , err : errors.response.data.errors});
        });
    }
    return(

        <div className='signup'>
        
            <div className='register'>
                <div className='header'>
                    <h1>Login </h1>
                </div>
                {login.err.map((error , index) => (
                    <Alert key={index} variant="danger" className="ppp">
                        Email OR Password are Wrong..
                    </Alert>
                ))}

        <form  className='edit' onSubmit={loginFun}>
                
                <label  className='head'>Email:</label>
                <input
                className='inp'
                type='email'
                id='email'
                placeholder='Email...' 
                required 
                value={login.email}
                onChange={(e) => setLogin({...login , email : e.target.value}) }
                />
                
                <label  className='head'>Password:</label>
                <input 
                className='inp'
                type='password' 
                id='password' 
                placeholder='Password...'  
                required 
                value={login.password}
                onChange={(e) => setLogin({...login , password : e.target.value}) }
                />
            
                <div className='fButton'>
                {/* <Link to="/home" className='link'> */}
                <button type="submit"  disabled = {login.loading === true}>Log In</button>
                {/* </Link> */}
                </div>
            </form>
            </div>
        </div>
    );
}
export default SignUp;