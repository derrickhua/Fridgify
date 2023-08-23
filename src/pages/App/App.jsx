import { useEffect, useState } from 'react';
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
  const [items, setItems] = useState({})
  const [unsortedItems, setUnsorted] = useState({})

  async function getItems() {
    const items = await itemAPI.getAll()
    setUnsorted(items)
    let realitems = turnIntoCategories(items)
    setItems(realitems)
  }

  function turnIntoCategories(arr) {
    let categories = {
      'Sauces':[],
      'Drinks':[], 
      'Dairy Products':[], 
      'Frozen':[],
      'Meat, Seafood, Eggs':[], 
      'Fruits, Vegetables, Mushrooms':[], 
      'Oils, Spices':[],
      'Miscellaneous':[]
    }
    // for each item in item array, push item into its specific category O(n) time
    arr.forEach((item) => categories[item.category].push(item))

    return categories
  }
  
  useEffect(()=> {
    if(user) {
      getItems()
    }
}, [user])

  return (
    <main className="App">
      {!user && <AuthPage setUser={setUser}/>}
      {user && <NavBar user={ user } setUser={setUser}/>}

      { user &&
      <>
        <Routes>
          <Route path="/" element={<FridgePage items={items} getItems={getItems}/>} /> 
          <Route path="/recipes" element={<RecipePage items={unsortedItems}/>} /> 
          <Route path="/grocerylist" element={<RestockPage />} /> 
        </Routes>          
      </>
      }
    </main>
  );
}

