import React, { useEffect } from 'react'
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import { HashLink as HLink } from 'react-router-hash-link';
// import img from "../../../media/logo.svg"
import "./navbar.css"

const Navbar = () => {
   useEffect(() => {
      const sidenav = document.querySelector("#mobile-nav");
      M.Sidenav.init(sidenav, {});
   }, [])

   const links = [
      { id: 1, Name: 'Home', to: '/#home' },
      { id: 2, Name: 'Browse', to: '/list' },
      // { id: 3, Name: 'Log In', to: 'https://google.com' },
   ];

   const links_mob = [
      { id: 1, Name: 'Home', to: '/#home' },
      { id: 2, Name: 'Browse', to: '/list' },
      // { id: 3, Name: 'Log In', to: 'https://google.com' },
   ];

   return (
      <div className="navbar">
         <div className="navbar-fixed">
            <nav className="nav-wrapper " style={{ "backgroundColor": "white" }}>
               <div className="container">
                  <a href="/" data-target="mobile-nav" className="sidenav-trigger">
                     <i className="material-icons" style={{ color: "#5f8ddc" }}>menu</i>
                  </a>
                  {/* <img src={img} alt="" className="logo"/> */}
                  <ul className="right hide-on-med-and-down menu_nav" >
                     {links.map(link => (
                        <li key={link.id}>
                           <HLink style={{'color':'#5f8ddc', 'fontSize':'1.2rem'}} to={link.to} >{link.Name}</HLink>
                        </li>
                     ))}
                     <li >
                        {/* <button className="login_button">                        
                           <a style={{'color':'#5f8ddc'}} href={"https://google.com"} >{"Login"}</a>
                        </button> */}
                     </li>
                  </ul>
               </div>
            </nav>
         </div>

         <ul className="sidenav" id='mobile-nav' style={{ "backgroundColor": "white", 'paddingTop':'20vh' }}>
            {links_mob.map(link => (
               <li key={link.id} >
                  <HLink className='white-text' style={{'margin':'5vh 0', 'textAlign':'center'}}
                  to={link.to} >{link.Name}</HLink>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default Navbar