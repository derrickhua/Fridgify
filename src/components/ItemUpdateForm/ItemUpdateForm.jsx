import { useState } from "react";
import * as itemAPI from '../../utilities/itemsApi'
import * as remAPI from '../../utilities/reminderApi'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const moment = require('moment')
const momentTimeZone = require('moment-timezone')
export default function ItemForm({editItem, getItems, setEditItem, show}) {
    const [newEditItem, setNewEditItem] = useState({
        name: editItem.name,
        expiryDate: editItem.expiryDate.substring(0, 10),
        inFridge: editItem.inFridge,
        amountOfItem: editItem.amountOfItem,
        category: editItem.category
    })



    const [updateError, setUpdateError] = useState('')
    
    function handleChange(evt) {
        setNewEditItem({ ...newEditItem, [evt.target.name]: evt.target.value });
        setUpdateError('');
    }
    
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await itemAPI.updateItem(editItem._id, newEditItem);
            let alertTime = moment(new Date(newEditItem.expiryDate)).set('hour', 8).set('minute', 0).toDate()
            await remAPI.updateRem(editItem.reminder, {name:newEditItem.name, time: alertTime})
            setEditItem(null)
            getItems()
        } catch {
            setUpdateError('New Item Making Failed - Try Again');
        }
    }

  return (

    <Modal show={show} onHide={()=>setEditItem(null)} className="itemFormFontColor">
    <Modal.Header closeButton>
      <h3 className="itemFormTitle">Edit an Item!</h3>
    </Modal.Header>
    <Modal.Body className="itemForm">  
      <div>
        <div>
          <Form autoComplete="off" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control className='lowerMargin'type="text" name="name" value={newEditItem.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control className='lowerMargin' type="date" name="expiryDate" value={newEditItem.expiryDate} onChange={handleChange}  />
          </Form.Group>
          <Form.Group>
            <Form.Label>Choose a Category:</Form.Label>
            <Form.Select className='lowerMargin'  name="category" value={newEditItem.category} onChange={handleChange} >
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
            <Form.Select className='lowerMargin' name="amountOfItem" value={newEditItem.amountOfItem} onChange={handleChange} >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Select name="inFridge" value={newEditItem.inFridge} onChange={handleChange}  className="moreMargin">
                <option value={true}>Fridge</option>
                <option value={false}>Pantry</option>
            </Form.Select>
          </Form.Group>

          <span>
            <button className='itemBtn'type="submit">Update</button>
          </span>
          
        </Form>
        </div>
        {updateError && <p className="error-message">&nbsp;{updateError}</p>}
      </div>
    </Modal.Body>
  </Modal>
  );
}




