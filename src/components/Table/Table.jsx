import { useEffect, useState } from "react";

export default function Table({catName, category}) {
    return (
        <div className="catTable">
            <table className="theTable">
                <h5>{catName}</h5>
                <thead>
                    <tr className="tableRow">
                        <th>Name</th>
                        <th className="expDate">Exp. Date</th>
                    </tr>                    
                </thead>
                <tbody>
                    {category.map((item,key)=> {
    
                    return (
                            <tr key={key} className="tableRow">
                                <td>{item.name}</td>
                                {console.log(item.expiryDate)}
                                <td>{item.expiryDate.substring(0, 10)}</td>
                            </tr>
                            )
                    })}                    
                </tbody>

            </table>
        </div>
    );
}        

