import { useState } from "react";
import * as remAPI from '../../utilities/reminderApi'
import * as itemAPI from '../../utilities/itemsApi'
export default function EditAmountForm({item, getItems}) {
  const amountArray = ['Low', "Medium", 'High']
  const [idx, setIdx] = useState(amountArray.indexOf(item.amountOfItem))
  const [amount, setAmt] = useState(amountArray[idx])
  function changeIdx(num) {
    let currIdx = idx + num

    if (!(currIdx > 2 || currIdx < 0)) {
      setIdx(currIdx)
      setAmt(amountArray[currIdx])
      itemAPI.updateItem(item._id, {amountOfItem: amountArray[currIdx]})
      getItems()
    }
  }

  return (
    <div className="editAmtForm">
      <button className="amtBtn" onClick={()=>changeIdx(-1)}>-</button>
      <p className="amtDisplay">{amount}</p>
      <button className="amtBtn" onClick={()=>changeIdx(1)}>+</button>  
    </div>

  );
}




