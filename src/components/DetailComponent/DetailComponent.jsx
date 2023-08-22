
import { useEffect } from 'react';
import * as itemAPI from '../../utilities/itemsApi'
import * as remAPI from '../../utilities/reminderApi'
import EditAmountForm from '../EditAmount/EditAmount';
import EditExpiryForm from '../EditExpiry/EditExpiry';
export default function DetailComponent({catName, category, setDetailShow, deleteItems, itemQueue, setItemQ, remQueue, setRemQueue}) {
    let scrolling = category.length >= 10
    // instead of setting the edit item for the form create a request array here 

    return ( 
        <div className="zoomTable">
            <table className="theTable">
                <span className='inlineSpan'>
                    <h1 className='betterTitle'>{catName}</h1>
                    <button className='exitDetailBtn' onClick={()=> {setDetailShow(null)}}>X</button>                    
                </span>

                    
                <hr className="horizontalLine"/>
                <thead>
                    <tr className="tableRow">
                        <th className='detailName'>Name</th>
                        <th>Amount </th>
                        <th >Exp. Date</th>
                        <th className={scrolling ? "solveMargin" : "solveMarginMore"}></th>
                    </tr>                    
                </thead>
                <tbody className="tableBody">
                    {
                    category.map((item,key)=> {
                        return (
                                    <tr key={key} className="tableRow zoomRow">
                                        <td className='detailName'>
                                            <div >{item.name}</div>
                                        </td>
                                        <td className='detailAmt'>
                                            <EditAmountForm itemQueue={itemQueue} item={item} setItemQ={setItemQ}/>
                                        </td>
                                        <td className='detailExp'>
                                            <EditExpiryForm itemQueue={itemQueue} item={item} setItemQ={setItemQ} 
                                            remQueue={remQueue} setRemQueue={setRemQueue} />
                                        </td>
                                        <td className='detailDel'><p className='deleteBtn' onClick={()=>deleteItems([item.reminder, item._id])}>X</p></td>
                                    </tr>
                                )
                        })                                
                    }           
                </tbody>
            </table>
        </div>
    );
}    