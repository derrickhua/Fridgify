
export default function DetailComponent({catName, category, setDetailShow}) {
    return ( 
        <div className="zoomTable">
            <table className="theTable">
                <span className="inlineSpan">
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
                                    <tr key={key} className="tableRow">
                                        <td>{item.name}</td>
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