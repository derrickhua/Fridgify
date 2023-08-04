import * as userService from '../../utilities/usersService'

// import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import './NavBar.css'

export default function NavBar({ user, setUser }) {
    const navigate = useNavigate()

    function logout() {
        userService.logOut()
        navigate(`/`)
        setUser(null)
    }

    return (
        <>
            <nav className='navBar'>
                <span className='inLine'>
                    <img className='smallerLogo ' src='../../fridgifylogo2.svg'/>
                    <NavLink className="navCompanyTitle" to="/">FRIDGIFY</NavLink>    
                    &nbsp; <div className='vertLine'></div> &nbsp;            
                    <NavLink className="navLinks" to="/">HOME</NavLink>  
                    &nbsp; <div className='vertLine'></div> &nbsp;            
                    <NavLink className="navLinks" to="/recipes">RECIPES</NavLink>  
                    &nbsp; <div className='vertLine'></div> &nbsp;            
                    <NavLink className="navLinks" to="/grocerylist">RESTOCK</NavLink>  
                    &nbsp; <div className='vertLine'></div> &nbsp;                     
                </span>
                <span className='inLine'>
                <p className='helpBtn'>HELP</p>
                &nbsp; <div className='vertLine'></div> &nbsp;  
                <button className='logOutBtn' onClick={logout}>LOGOUT</button>
                </span>
            </nav>
        </>
    );
}