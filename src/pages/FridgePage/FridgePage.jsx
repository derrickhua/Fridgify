import { useEffect } from "react";
import ItemForm from "../../components/ItemForm/ItemForm";

export default function FridgePage({items, getItems}) {
    
    useEffect(()=> {
        getItems()
        console.log(items)
    }, [])


    return (
        <>
            
            <ItemForm />
        </>
        );
  }

