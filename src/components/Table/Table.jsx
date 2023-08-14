
export default function Table({catName, category, setDetailShow}) {

    return (
        <div className="catTable">
            <table className="theTable">
                <span className="inlineSpan">
                    <h5>{catName === 'Fruits, Vegetables, Mushrooms' ? 'Fruits, Veg-, Mush-' : catName}</h5>
                    <button className="detailBtn" 
                        onClick={()=>setDetailShow({
                            catName: catName,
                            category: category
                        })}>
                        <img className='detailImg' src='../../DetailBtn.svg'/>
                    </button>
                </span>
                <hr className="horizontalLine"/>
                <thead>
                    <tr className="tableRow">
                        <th>Name</th>
                        <th className="expDate">Exp. Date</th>
                    </tr>                    
                </thead>
                <tbody className="tableBody">
                    {category.map((item,key)=> {
    
                    return (
                            <tr key={key} className="tableRow">
                                <td>{item.name}</td>
                                <td>{item.expiryDate.substring(0, 10)}</td>
                            </tr>
                            )
                    })}                    
                </tbody>

            </table>
        </div>
    );
}        

