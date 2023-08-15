import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from 'three'
import ItemForm from "../../components/ItemForm/ItemForm";
import ItemUpdateForm from "../../components/ItemUpdateForm/ItemUpdateForm"
import Table from "../../components/Table/Table"
import Experience from "../../components/Experience/Experience"
import DetailComponent from "../../components/DetailComponent/DetailComponent";

export default function FridgePage({items, getItems}) {

    // const [deleteError, setDeleteError] = useState('')
    const [detailShow, setDetailShow] = useState()
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
    
    function toggleItemForm() {
        if(modalShow) {
            setModalShow(false)
        } else {
            setModalShow(true)
        }
    }

    useEffect(()=> {
        // this resets the categories
        setCategories({
            'Sauces':[],
            'Drinks':[], 
            'Dairy Products':[], 
            'Frozen':[],
            'Meat, Seafood, Eggs':[], 
            'Fruits, Vegetables, Mushrooms':[], 
            'Oils, Spices':[],
            'Miscellaneous':[]
        })

        if (items) {
            items.forEach((item) => {
                // set a temporary array to insert into object
                let tempArr = categories[`${item.category}`]
                // if not already in categories, this will be false
                let alreadyInCat = tempArr.find(itemIn => itemIn._id === item._id)
                // if false, add it to temporary array and then
                if (!(alreadyInCat)) {
                    tempArr.push(item)
                    setCategories({...categories, [`${item.category}`]: tempArr})
                }
            })
        }   
        
        const cats = Object.keys(categories)
        let tablets = cats.map((cat)=> 
        <Table catName={cat} category={categories[cat]} setDetailShow={setDetailShow}/>)

        setTables(tablets)
        // once categories change, i need to reset detailShow
        if (detailShow) {
            setDetailShow({
                ...detailShow,
                ['category'] : categories[`${detailShow.catName}`]
            })

            console.log(detailShow)
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
                    {modalShow && 
                    <ItemForm getItems={getItems} toggleItemForm={toggleItemForm} show={modalShow}/>}
                </div>
                <div className="inventorySegment">
                
                {
                    !detailShow && 
                    <>
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
                    </>
                }

                {
                    detailShow && 
                    <>
                    <DetailComponent catName={detailShow.catName} category={detailShow.category} 
                    setDetailShow={setDetailShow} getItems={getItems}/>
                    </>
                }


                {/* Edit Item Here 
                {specificItem && <ItemUpdateForm specificItem={specificItem} getItems={getItems} setSpecificItem={setSpecificItem}/>} */}
                            
                </div>                
            </div>
        </>
        );
  }

