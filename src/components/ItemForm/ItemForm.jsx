import { useState } from "react";
import * as itemAPI from '../../utilities/itemsApi'
import * as remAPI from '../../utilities/reminderApi'
const moment = require('moment')
const momentTimeZone = require('moment-timezone')
export default function ItemForm({getItems}) {
    const getTimeZone = function() {
        return moment.tz.guess()
    };

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
        try {
            const item = await itemAPI.makeItem(newItem)
            // this will set the alerttime to one day before expiry date at 8 am
            let alertTime = moment(new Date(newItem.expiryDate)).set('hour', 8).set('minute', 0).toDate()
            let newRem = {
                name: newItem.name,
                notification: '1',
                timeZone: getTimeZone(),
                time: alertTime
            }
            const rem = await remAPI.makeRem(newRem)
            console.log(rem)
            setNewItem({
                name: '',
                expiryDate: '',
                inFridge: true,
                amountOfItem: 'High',
                category: 'Sauces'
            })
            getItems()
        } catch(err) {
            console.log(err)
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
                        <option value="High">High</option>
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




