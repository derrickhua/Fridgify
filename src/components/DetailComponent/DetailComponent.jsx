
import { useEffect } from 'react';
import * as itemAPI from '../../utilities/itemsApi'
import * as remAPI from '../../utilities/reminderApi'

export default function DetailComponent({catName, category, setDetailShow, getItems}) {
    async function deleteClass([remId, classId]){
        try {
            await remAPI.deleteRem(remId)
            await itemAPI.deleteItem(classId);
            await getItems()
        } catch {
            console.log('itemDeleteFailed')
        }
    }
    useEffect(()=> {
        console.log(category)
    }, [category])
    return ( 
        <div className="zoomTable">
            <table className="theTable">
                <span className='inlineSpan'>
                    <h1>{catName}</h1>
                    <button className='exitDetailBtn' onClick={()=> setDetailShow(null)}>X</button>                    
                </span>

                    
                <hr className="horizontalLine"/>
                <thead>
                    <tr className="tableRow">
                        <th>Name</th>
                        <th className="expDate">Exp. Date</th>
                    </tr>                    
                </thead>
                <tbody className="tableBody">
                    {
                    category.map((item,key)=> {
                        return (
                                    <tr key={key} className="tableRow zoomRow">
                                        <td className='inlineTableRow'>
                                            {item.name}
                                            <p className='deleteBtn' onClick={()=>deleteClass([item.reminder, item._id])}>X</p>
                                        </td>
                                        <td>{item.expiryDate.substring(0, 10)}</td>
                                    </tr>
                                )
                        })                                
                    }           
                </tbody>
            </table>
        </div>
    );
}    