import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as itemAPI from '../../utilities/itemsApi'
import * as remAPI from '../../utilities/reminderApi'
import * as THREE from 'three'
import ItemForm from "../../components/ItemForm/ItemForm";
import ItemUpdateForm from "../../components/ItemUpdateForm/ItemUpdateForm"
import Table from "../../components/Table/Table"
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
        'Oils, Spices':[],
        'Miscellaneous':[]
    })
    const [tables, setTables] = useState([])

    // TODO: make useState for Accumulating Item Change Requests, low, med, high? 
    // this gets to be confirmed if you leave category details page
    // TODO: remove duplicate change requests in the future
    // TODO: make expiry date optional / currently required in html form, if no expiry date no reminder
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
                let alreadyInCat = tempArr.find(itemIn => itemIn._id === item._id)
                if (!(alreadyInCat)) {
                    tempArr.push(item)
                    setCategories({...categories, [`${item.category}`]: tempArr})
                }
                
            })
        }   
        
        const cats = Object.keys(categories)
        let tablets = cats.map((cat)=> <Table catName={cat} category={categories[cat]}/>)

        setTables(tablets)

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
                
                
                <div className="row1">
                    {tables[0]}
                    {tables[1]}
                    {tables[2]}
                </div>
                <div className="row2">
                    {tables[3]}
                    {tables[4]}
                    {tables[5]}
                </div>
                <div className="row3">
                    {tables[6]}
                    {tables[7]}
                    <div className="spacer"></div>        
                </div>

                {/* Edit Item Here 
                {specificItem && <ItemUpdateForm specificItem={specificItem} getItems={getItems} setSpecificItem={setSpecificItem}/>} */}
                            
                </div>                
            </div>
        </>
        );
  }

