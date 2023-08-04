import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as itemAPI from '../../utilities/itemsApi'
import * as THREE from 'three'
import ItemForm from "../../components/ItemForm/ItemForm";
import ItemUpdateForm from "../../components/ItemUpdateForm/ItemUpdateForm"
import Experience from "../../components/Experience/Experience"

export default function FridgePage({items, getItems}) {

    const [specificItem, setSpecificItem] = useState()
    const [deleteError, setDeleteError] = useState('')
    const [modalShow, setModalShow] = useState(false)
    async function deleteClass(id){
        try {
            await itemAPI.deleteItem(id);
            setSpecificItem(null)
            getItems()
        } catch {
            console.log('itemDeleteFailed')
            setDeleteError('Item Delete Failed - Try Again');
        }
    }
    
    function toggleItemForm() {
        if(modalShow) {
            setModalShow(false)
        } else {
            setModalShow(true)
        }
    }
    let itemShow = ''
    if (items) {
        itemShow = items.map((item, idx) => <div key={idx} className='itemDisplay'>
                <p className="noBotMargin">{item.name}</p>
                {/* <button onClick={()=>setSpecificItem(item)}>Edit This Item</button> */}
                <button className='delBtn' onClick={()=>deleteClass(item._id)}>X</button>
            </div>)
    }
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
                {itemShow}

                {/* Edit Item Here 
                {specificItem && <ItemUpdateForm specificItem={specificItem} getItems={getItems} setSpecificItem={setSpecificItem}/>} */}
                            
                </div>                
            </div>

            

        </>
        );
  }

