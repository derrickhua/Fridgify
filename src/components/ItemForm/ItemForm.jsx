import { useState } from "react";
import * as itemAPI from '../../utilities/itemsApi'

export default function ItemForm() {
    const [newItem, setNewItem] = useState({
        name: '',
        expiryDate: '',
        inFridge: true,
        amountOfItem: 'High',
        category: 'Sauces'
    })
    const [error, setError] = useState('')
    
    function handleChange(evt) {
        setNewItem({ ...newItem, [evt.target.name]: evt.target.value });
        setError('');
    }
    
    async function handleSubmit(evt) {
        evt.preventDefault();
        // console.log(newItem)
        try {
          const item = await itemAPI.makeItem(newItem);
          setNewItem({
            name: '',
            expiryDate: '',
            inFridge: '',
            amountOfItem: '',
            category: ''
          })
          console.log(item)
        } catch {
          setError('New Item Making Failed - Try Again');
        }
    }

  return (
    <div>
        <h1>New Item!</h1>   
            <div>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" value={newItem.name} onChange={handleChange} required />
                    <label>Expiry Date</label>
                    <input type="date" name="expiryDate" value={newItem.expiryDate} onChange={handleChange} />
                    <label>Choose a Category:</label>
                    <select name='category' value={newItem.category} onChange={handleChange} required>
                        <option value="Sauces">Sauces</option>
                        <option value="Drinks">Drinks</option>
                        <option value="Dairy Products">Dairy Products</option>
                        <option value="Meat, Seafood, Eggs">Meat, Seafood, Eggs</option>
                        <option value="Fruits, Vegetables, Mushrooms">Fruits, Vegetables, Mushrooms</option>
                        <option value="Frozen">Frozen</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                    <label>Amount of Item</label>
                    <select name='amountOfItem' value={newItem.amountOfItem} onChange={handleChange} required>
                        <option value="Sauces">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <label>Location</label>
                    <select name='inFridge' value={newItem.inFridge} onChange={handleChange} required>
                        <option value={true}>Fridge</option>
                        <option value={false}>Pantry</option>
                    </select>
                    <button type="submit">Put Item in Inventory</button>
                </form>
            </div>
        <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}




