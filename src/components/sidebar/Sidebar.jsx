import "./sidebar.css"
import {LineStyle , Inventory,Group ,LocalGroceryStore ,
   Email,Summarize } from "@mui/icons-material"
import { Link } from "react-router-dom"


export default function Sidebar() {

  return (
    <div className="sidebar">       
     <div className="sidebarWrapper">
        <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            
            <ul className="sidebarList">
            <Link to="/home" className="link">
                <li className="sidebarListItem " > 
                   <LineStyle className="sidebarIcon" />
                   Home
                </li>
                </Link>

            </ul>
        </div>


        <div className="sidebarMenu">
        <Link to="/warehouses" className="link">
            <h3 className="sidebarTitle">Warehouses</h3></Link>
            <ul className="sidebarList">


              <Link to="/warehouses" className="link">
                <li className="sidebarListItem " > 
                   <Inventory className="sidebarIcon" />
                   Warehouses-List
                </li>
                </Link>

              

                <Link to="/newWarehouse" className="link">
                <li className="sidebarListItem " > 
                   <Inventory className="sidebarIcon" />
                   Add-Warehouses
                </li>
                </Link>

               



            </ul>
        </div>


        <div className="sidebarMenu">
            <Link to="/users" className="link">      
            <h3 className="sidebarTitle"> Supervisors</h3></Link>
            
            <Link to="/users" className="link">
                <li className="sidebarListItem " > 
                   <Group className="sidebarIcon" />
                   Supervisors-List
                </li>
                </Link>
              
                <Link to="/newUser" className="link">
                <li className="sidebarListItem " > 
                   <Group className="sidebarIcon" />
                   Add-Supervisors
                </li>
                </Link>
         </div>


        <div className="sidebarMenu">
        <Link to="/products"  className="link">
            <h3 className="sidebarTitle">Products</h3></Link>
            <Link to="/products"  className="link">
                <li className="sidebarListItem"> 
                   <LocalGroceryStore className="sidebarIcon" />
                   Products-list
                </li>
                </Link>

               

                <Link to="/newProduct"  className="link">
                <li className="sidebarListItem"> 
                   <LocalGroceryStore className="sidebarIcon" />
                   Add-Products
                </li>
                </Link>
        </div>


        <div className="sidebarMenu">
            <h3 className="sidebarTitle">Mails</h3>
            
            <ul className="sidebarList">
             <Link to="/mails" className="link">
                <li className="sidebarListItem " > 
                   <Email className="sidebarIcon" />
                   Mails
                </li>
                </Link>
                 

                 <Link to="/reports" className="link">
                <li className="sidebarListItem"> 
                   <Summarize className="sidebarIcon" />
                   Reports
                </li> 
                </Link>

            </ul>
        </div>
     </div>
     
    </div>
    
  )
}
