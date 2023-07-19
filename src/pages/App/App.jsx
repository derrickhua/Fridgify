import { useCallback, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/usersService';

// API 
import * as itemAPI from '../../utilities/itemsApi'

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
  const [items, setItems] = useState([])

  const getItems = useCallback(async ()=> {
    const items = await itemAPI.getAll()
    setItems(items)
  }, [])

  return (
    <main className="App">
      {!user && <AuthPage setUser={setUser}/>}
      {user && <NavBar user={ user } setUser={setUser}/>}

      { user &&
      <>
        <Routes>
          <Route path="/" element={<FridgePage items={items} getItems={getItems}/>} /> 
          <Route path="/recipes" element={<RecipePage />} /> 
          <Route path="/grocerylist" element={<RestockPage />} /> 
        </Routes>          
      </>

      }
    </main>
  );
}

