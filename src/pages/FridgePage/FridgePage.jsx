import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as itemAPI from '../../utilities/itemsApi'
import * as remAPI from '../../utilities/reminderApi'
import * as THREE from 'three'
import ItemForm from "../../components/ItemForm/ItemForm";
import ItemUpdateForm from "../../components/ItemUpdateForm/ItemUpdateForm"
import Experience from "../../components/Experience/Experience"

export default function FridgePage({items, getItems}) {

    // const [deleteError, setDeleteError] = useState('')
    const [modalShow, setModalShow] = useState(false)
    const [categories, setCategories] = useState({
        'Sauces':[],
        'Drinks':[], 
        'Dairy Products':[], 
        'Frozen':[],
        'Meat, Seafood, Eggs':[], 
        'Fruits, Vegetables, Mushrooms':[], 
        'Miscellaneous':[]
    })

    async function deleteClass([remId, classId]){
        try {
            await remAPI.deleteRem(remId)
            await itemAPI.deleteItem(classId);
            getItems()
        } catch {
            console.log('itemDeleteFailed')
        }
    }
    
    function toggleItemForm() {
        if(modalShow) {
            setModalShow(false)
        } else {
            setModalShow(true)
        }
    }

    useEffect(()=> {
        if (items) {
            items.forEach((item) => {
                let tempArr = categories[`${item.category}`]
                if (!(item in tempArr)) {
                    tempArr.push(item)
                }
                
                setCategories({...categories, [`${item.category}`]: tempArr})
            })
        }   
             
    }, [items])

    return (
        <>
            <div className="fridgePage">
                <div className="modelSegment">
                    <div className="canvas">
                        <Canvas
                            gl={ {
                                antialias: true,
                                toneMapping: THREE.ACESFilmicToneMapping,
                                // outputColorSpace: THREE.SRGBColorSpace
                            } }
                            camera={ {
                                position: [ 0, 0, 7 ]
                            } }
                        >
                            <Experience />
                        </Canvas>
                    </div>

                    <button className='addBtn' onClick={toggleItemForm}>ADD</button>
                    {modalShow && <ItemForm getItems={getItems} toggleItemForm={toggleItemForm} show={modalShow}/>}
                </div>
                <div className="inventorySegment">
                Fridge STUFF

                {/* Edit Item Here 
                {specificItem && <ItemUpdateForm specificItem={specificItem} getItems={getItems} setSpecificItem={setSpecificItem}/>} */}
                            
                </div>                
            </div>
        </>
        );
  }

