import * as userService from '../../utilities/usersService'
import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar({ user, setUser }) {
    const navigate = useNavigate()

    function logout() {
        userService.logOut()
        navigate(`/`)
        setUser(null)
    }

    return (
        <>
            <nav className='navBar hideOnMobile'>
                <span className='inLine'>
                    <img className='smallerLogo hideOnMobile' alt="companyLogo" src='../../fridgifylogo2.svg'/>
                    <NavLink className="navCompanyTitle" to="/">FRIDGIFY</NavLink>    
                    &nbsp;&nbsp;         
                    <span className='inLine'>
                    <NavLink className="navLinks" to="/">HOME</NavLink>  
                    &nbsp; <div className='vertLine'></div> &nbsp;            
                    <NavLink className="navLinks" to="/recipes">RECIPES</NavLink>  
                    &nbsp; <div className='vertLine'></div> &nbsp;            
                    <NavLink className="navLinks" to="/grocerylist">RESTOCK</NavLink>                   
                    </span>   
                </span>
                <span className='inLine'>
                <p className='helpBtn'>HELP</p>
                &nbsp; <div className='vertLine'></div> &nbsp;  
                <button className='logOutBtn' onClick={logout}>LOGOUT</button>
                </span>
            </nav>

            <nav className='navBar showOnMobile'>
                <span>
                    <img className='smallerLogo hideOnMobile' alt="companyLogo" src='../../fridgifylogo2.svg'/>
                    <div className='brandArea'>
                    <NavLink className="navCompanyTitle" to="/">FRIDGIFY</NavLink>         
                    </div>
                    <span className='mobileNav'>
                    <NavLink className="navLinks" to="/">HOME</NavLink>  
                        <div className='vertLine'></div>          
                    <NavLink className="navLinks" to="/recipes">RECIPES</NavLink>  
                        <div className='vertLine'></div>          
                    <NavLink className="navLinks" to="/grocerylist">RESTOCK</NavLink>                   
                    </span>   
                </span>
                <span className='inLine'>
                    <button className='logOutBtn' onClick={logout}>LOGOUT</button>
                </span>
            </nav>
        </>
    );
}