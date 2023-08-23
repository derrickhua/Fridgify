import { useEffect, useState } from "react";
import * as itemAPI from "../../utilities/itemsApi"

export default function RecipePage({items}) {
    const [currentInventory, setInventory] = useState([])
    const [apiParams, setApiParams] = useState({
      ingredients: '',
      number: '5',
      limitLicense: 'true',
      ignorePantry: 'false',
      ranking: '2'
    })

    const [possibleRecipes, setRecipes] = useState([])
    useEffect(()=>{
      if(items) {
        let inv = items.map((item) => item.name)
        setInventory(inv)
      }
      setApiParams({...apiParams,
        ingredients: currentInventory.join(',')
      })
    },[items])

    async function recipes(){
      let recs = await itemAPI.getRecipes(apiParams)
      setRecipes(recs)
      console.log(possibleRecipes)
    }

    return <>
      <h1>Recipe Page</h1>
      <p>Under Construction! Soon to be Available! Thank you for your patience!</p>
      {/* <button onClick={recipes}>Generate Recipes for the ingredients you have!</button> */}
    
    </>;
  }
  