import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
const moment = require('moment')
const momentTimeZone = require('moment-timezone')
export default function EditExpiryForm({item, itemQueue, setItemQ, remQueue, setRemQueue}) {
  const [d, setD] = useState(item.expiryDate)

  useEffect(()=> {
    if (d !== item.expiryDate) {
      let newRemTime = moment(new Date(d)).set('hour', 8).set('minute', 0).toDate()
      setRemQueue([...remQueue, [item.reminder, {time: newRemTime}]])
      setItemQ([...itemQueue, [item._id, {expiryDate: d}]])
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
