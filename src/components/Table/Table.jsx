import { useEffect, useState } from "react";

export default function Table({catName, category}) {
    console.log(catName, category)
    return (
        <table>
            <h4>{catName}</h4>
            <tr>
            <th>Name</th>
            <th>Exp. Date</th>
            </tr>
            {category.map((item,key)=> {
            return (
                    <tr key={key}>
                        <td>{item.name}</td>
                        <td>{item.expiryDate}</td>
                    </tr>
                    )
            })}
        </table>
    );
}        

