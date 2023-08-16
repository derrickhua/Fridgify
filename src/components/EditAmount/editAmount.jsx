import { useState, useEffect } from "react";


const moment = require('moment')
const momentTimeZone = require('moment-timezone')
export default function editAmountForm({item, setQueue}) {



  return (
    <>
      <button>-</button>
      <p> {item.amountOfItem} </p>  
      <button>+</button>     
    </>

  );
}




