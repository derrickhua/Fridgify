import { useEffect, useState } from 'react';
import * as itemAPI from '../../utilities/itemsApi'
import * as remAPI from '../../utilities/reminderApi'
const moment = require('moment')
const momentTimeZone = require('moment-timezone')
export default function EditExpiryForm({item, getItems}) {
  const [d, setD] = useState(item.expiryDate)

  useEffect(()=> {
    if (d !== item.expiryDate) {
      let newRemTime = moment(new Date(d)).set('hour', 8).set('minute', 0).toDate()
      remAPI.updateRem(item.reminder, {time: newRemTime})
      itemAPI.updateItem(item._id, {expiryDate: d})
      getItems()
    }
  }, [d])

  return (
    <div className="editExpForm">
      <form className="nicerForm" autoComplete="off">
        <input type="date" name="expiryDate" 
        value={d ? d.substring(0, 10) : '00-00-00'} onChange={(evt)=>setD(evt.target.value)}/>
      </form>
    </div>

  );
}
