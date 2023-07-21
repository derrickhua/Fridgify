import { useEffect, useState } from "react";
import * as itemAPI from "../../utilities/itemsApi"

export default function RecipePage({items}) {
    let currentInventory = []
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
        currentInventory = items.map((item) => item.name)
      }
      setApiParams({...apiParams,
        ingredients: currentInventory.join(',')
      })

      console.log(possibleRecipes)
    },[items, possibleRecipes])

    async function recipes(){
      let recs = await itemAPI.getRecipes(apiParams)
      setRecipes(recs)
    }

    return <>
      <h1>Recipe Page</h1>
      <button onClick={recipes}>Generate Recipes for the ingredients you have!</button>
    
    </>;
  }
  