import React from 'react'
import "./topbar.css"
import {NotificationsNone } from '@mui/icons-material';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import { removeAuthUSer  } from '../../helper/storage.js'
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function Topbar() {
    const navigate = useNavigate();
    const logout = () =>{
        removeAuthUSer();
        navigate("/");
    }
  return (
    <div className='topbar'>
        <div className='topbarWrapper'>
            <div className="topLeft">
                <span className='logo'>Edara</span>
            </div>

            <div className="topRight">
            
                <Nav className="topbarIconContainer">
                    <Nav.Link onClick={logout} className='link' > Logout </Nav.Link>
                </Nav> 
              
               <div className="topbarIconContainer">
               <Link to="/mails" className='link'>
                <NotificationsNone/></Link>
               
                </div> 
                
            </div>
            

        </div>
    </div>
  )
}
