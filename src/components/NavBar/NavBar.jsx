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
            <nav>
                <span>
                <NavLink to="/">Fridgify</NavLink>    
                </span>
                &nbsp; | &nbsp;            
                <span>
                <NavLink to="/recipes">Possible Recipes</NavLink>  
                </span>
                &nbsp; | &nbsp;            
                <span>
                <NavLink to="/grocerylist">Restock List</NavLink>  
                &nbsp; | &nbsp; 
                    <button onClick={logout}>LogOut</button>
                </span>
            </nav>
        </>
    );
}