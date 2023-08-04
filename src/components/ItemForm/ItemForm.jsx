import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as itemAPI from '../../utilities/itemsApi'
import * as remAPI from '../../utilities/reminderApi'

const moment = require('moment')
const momentTimeZone = require('moment-timezone')
export default function ItemForm({getItems, toggleItemForm, show }) {
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
          // this will set the alerttime to one day before expiry date at 8 am
          let alertTime = moment(new Date(newItem.expiryDate)).set('hour', 8).set('minute', 0).toDate()
          let newRem = {
            name: newItem.name,
            notification: '1',
            timeZone: getTimeZone(),
            time: alertTime
          }
          const rem = await remAPI.makeRem(newRem)
          let currentItem = newItem
          currentItem['reminder'] = rem._id
          const item = await itemAPI.makeItem(currentItem)
          console.log(item)
          setNewItem({
              name: '',
              expiryDate: '',
              inFridge: true,
              amountOfItem: 'High',
              category: 'Sauces',
          })
          getItems()
        } catch(err) {
            console.log(err)
            setError('New Item Making Failed - Try Again');
        }
    }

  return (
    <Modal show={show} onHide={toggleItemForm} className="itemFormFontColor">
    <Modal.Header closeButton>
      <h3 className="itemFormTitle">Add a new item!</h3>
    </Modal.Header>
    <Modal.Body className="itemForm">  
      <div>
        <div>
          <Form autoComplete="off" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control className='lowerMargin'type="text" name="name" value={newItem.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control className='lowerMargin' type="date" name="expiryDate" value={newItem.expiryDate} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Choose a Category:</Form.Label>
            <Form.Select className='lowerMargin'  name="category" value={newItem.category} onChange={handleChange} required>
                <option value="Sauces">Sauces</option>
                <option value="Drinks">Drinks</option>
                <option value="Dairy Products">Dairy Products</option>
                <option value="Meat, Seafood, Eggs">Meat, Seafood, Eggs</option>
                <option value="Fruits, Vegetables, Mushrooms">Fruits, Vegetables, Mushrooms</option>
                <option value="Frozen">Frozen</option>
                <option value="Oils, Spices">Oils, Spices</option>
                <option value="Miscellaneous">Miscellaneous</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount of Item </Form.Label>
            <Form.Select className='lowerMargin' name="amountOfItem" value={newItem.amountOfItem} onChange={handleChange} required>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Select name="inFridge" value={newItem.inFridge} onChange={handleChange}  className="moreMargin"required>
                <option value={true}>Fridge</option>
                <option value={false}>Pantry</option>
            </Form.Select>
          </Form.Group>

          <span>
            <button className='itemBtn'type="submit">Put Item in Inventory</button>
          </span>
          
        </Form>
        </div>
        {error && <p className="error-message">&nbsp;{error}</p>}
      </div>
    </Modal.Body>
  </Modal>
  );
}




