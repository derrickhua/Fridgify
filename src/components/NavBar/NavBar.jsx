import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './NavBar.css'
import { useState, useEffect } from "react";


export default function NavBar({ user, setUser }) {

    return (
        <>
            Nav Bar
            {/* <nav>
                <span>
                <NavLink to="/">TA-O</NavLink>    
                </span>
                &nbsp; | &nbsp;            
                <span>
                FUTURE SEARCH BAR
                </span>
                &nbsp; | &nbsp;            
                <span>
                {user && <p> Welcome, {user.name}</p>}
                &nbsp; | &nbsp; 
                <DropdownButton id="dropdown-basic-button" title="Profile">
                    <Dropdown.Item onClick={handleShow}>Log In</Dropdown.Item>
                    <Dropdown.Item>Sign Up</Dropdown.Item>
                    <Dropdown.Item>Help</Dropdown.Item>
                    {user && <Dropdown.Item>LogOut</Dropdown.Item>}
                </DropdownButton>
                </span>
                <MyModal show={showModal} handleClose={handleClose} handleShow={handleShow}/>
            </nav> */}
        </>

    );
}