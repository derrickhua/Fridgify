import { useState } from "react";

import * as itemAPI from '../../utilities/itemsApi'

import ItemForm from "../../components/ItemForm/ItemForm";
import ItemUpdateForm from "../../components/ItemUpdateForm/ItemUpdateForm"

export default function FridgePage({items, getItems}) {
    const [specificItem, setSpecificItem] = useState()
    const [deleteError, setDeleteError] = useState('')
    async function deleteClass(id){
        try {
            await itemAPI.deleteItem(id);
            setSpecificItem(null)
            getItems()
        } catch {
            setDeleteError('Item Delete Failed - Try Again');
        }
    }
    
    let itemShow = ''
    if (items) {
        itemShow = items.map((item, idx) => <div key={idx}>
                <p >{item.name}</p>
                <button onClick={()=>setSpecificItem(item)}>Edit This Item</button>
                <button onClick={()=>deleteClass(item._id)}>Delete This Item</button>
                <p>{deleteError}</p>
            </div>)
    }
    return (
        <>
            
            <ItemForm getItems={getItems}/>
            Fridge STUFF
            {itemShow}

            Edit Item Here 
            {specificItem && <ItemUpdateForm specificItem={specificItem} getItems={getItems} setSpecificItem={setSpecificItem}/>}

        </>
        );
  }

