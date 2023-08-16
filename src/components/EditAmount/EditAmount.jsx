import { useState } from "react";
export default function EditAmountForm({item, queue, setQ}) {
  const amountArray = ['Low', "Medium", 'High']
  const [idx, setIdx] = useState(amountArray.indexOf(item.amountOfItem))
  const [amount, setAmt] = useState(amountArray[idx])
  function changeIdx(num) {
    let currIdx = idx + num
    // if idx does not go above 2 and below 0, change state otherwise keep
    if (!(currIdx > 2 || currIdx < 0)) {
      setIdx(currIdx)
      setAmt(amountArray[currIdx])
      setQ([...queue, [item._id, {amountOfItem: amountArray[currIdx]}]])

      // TODO: possible problem setting it to a different value and then setting it back sends 2 queries
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




