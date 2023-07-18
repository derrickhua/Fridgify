import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/usersService';
// Pages
import AuthPage from '../AuthPage/AuthPage';
import FridgePage from '../FridgePage/FridgePage'
import RecipePage from '../RecipePage/RecipePage';
import RestockPage from '../RestockPage/RestockPage';

//Components
import NavBar from '../../components/NavBar/NavBar';

import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());


  return (
    <main className="App">
      {!user && <AuthPage setUser={setUser}/>}
      {user && <NavBar user={ user } setUser={setUser}/>}

      { user &&
      <>
        <Routes>
          <Route path="/" element={<FridgePage />} /> 
          <Route path="/recipes" element={<RecipePage />} /> 
          <Route path="/grocerylist" element={<RestockPage />} /> 
        </Routes>          
      </>

      }
    </main>
  );
}

        {/* {showForm.login && <button onClick={changeForm}>Sign Up</button>}
        {showForm.signUp && <button onClick={changeForm}>Login</button>}
        {showForm.signUp && <AuthPage setUser={setUser}/>}
        {showForm.login && <LoginForm setUser={setUser}/>} */}
