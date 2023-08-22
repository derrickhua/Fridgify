
export default function Table({catName, category, setDetailShow}) {
    let scrolling = category.length > 6
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
                        <th className="nameCol">Name</th>
                        <th className="expDate">Exp. Date</th>
                        <th></th>
                    </tr>                    
                </thead>
                <tbody className="tableBody">
                    {category.map((item,key)=> {
                        
                        return (
                                <tr key={key} className="tableRow">
                                    <td className="nameCol">{item.name}</td>
                                    <td className={scrolling ? "expCol" : ""}>{item.expiryDate ? item.expiryDate.substring(0, 10) : '-'}</td>
                                    <td></td>
                                </tr>
                                )
                    })}                    
                </tbody>

            </table>
        </div>
    );
}        

