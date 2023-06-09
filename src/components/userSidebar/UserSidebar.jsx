import "./userSidebar.css"
import {History ,Work ,Email} from "@mui/icons-material"
import { Link } from "react-router-dom"


export default function UserSidebar() {
 
  return (
    <div className="userSidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
            
        { <div className="sidebarMenu">
            <Link to="/supervisor" className="link">
            <h3 className="sidebarTitle">Supervisor</h3></Link>
            <ul className="sidebarList">
                      

            <li className="sidebarListItem">
                <Link to="/supervisor" className="link">
                   <Work className="sidebarIcon" />
                   warehouse 
                   </Link> 
                  </li>
         
                <li className="sidebarListItem"> 
                <Link to="/sendEmail" className="link">
                   <Email className="sidebarIcon" />
                   Send_Mail
                   </Link>
                </li> 
                

                <li className="sidebarListItem"> 
                <Link  to="/requests" className="link">
                   <History className="sidebarIcon" />
                   Requests
                   </Link>
                </li> 
                

            </ul>
        </div> 
        }
        </div>
     </div>
</div>

  )
}
