import { useState } from "react";
import * as itemAPI from '../../utilities/itemsApi'

export default function ItemForm({specificItem, getItems, setSpecificItem}) {
    const [newEditItem, setNewEditItem] = useState({
        name: specificItem.name,
        expiryDate: specificItem.expiryDate,
        inFridge: specificItem.inFridge,
        amountOfItem: specificItem.amountOfItem,
        category: specificItem.category
    })


    const [updateError, setUpdateError] = useState('')
    
    function handleChange(evt) {
        setNewEditItem({ ...newEditItem, [evt.target.name]: evt.target.value });
        setUpdateError('');
    }
    
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await itemAPI.updateItem(specificItem._id, newEditItem);
            getItems()
            setSpecificItem(null)
        } catch {
            setUpdateError('New Item Making Failed - Try Again');
        }
    }

  return (
    <div>
        <h1>Edit Item!</h1>   
            <div>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" value={newEditItem.name} onChange={handleChange} required />
                    <label>Expiry Date</label>
                    <input type="date" name="expiryDate" value={newEditItem.expiryDate} onChange={handleChange} />
                    <label>Choose a Category:</label>
                    <select name='category' value={newEditItem.category} onChange={handleChange} required>
                        <option value="Sauces">Sauces</option>
                        <option value="Drinks">Drinks</option>
                        <option value="Dairy Products">Dairy Products</option>
                        <option value="Meat, Seafood, Eggs">Meat, Seafood, Eggs</option>
                        <option value="Fruits, Vegetables, Mushrooms">Fruits, Vegetables, Mushrooms</option>
                        <option value="Frozen">Frozen</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                    <label>Amount of Item</label>
                    <select name='amountOfItem' value={newEditItem.amountOfItem} onChange={handleChange} required>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <label>Location</label>
                    <select name='inFridge' value={newEditItem.inFridge} onChange={handleChange} required>
                        <option value={true}>Fridge</option>
                        <option value={false}>Pantry</option>
                    </select>
                    <button type="submit">Put Item in Inventory</button>
                </form>
            </div>
        <p className="error-message">&nbsp;{updateError}</p>
    </div>
  );
}




