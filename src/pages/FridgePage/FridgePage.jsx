import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from 'three'
import * as itemAPI from '../../utilities/itemsApi'
import * as remAPI from '../../utilities/reminderApi'
import ItemForm from "../../components/ItemForm/ItemForm";
import Table from "../../components/Table/Table"
import Experience from "../../components/Experience/Experience"
import DetailComponent from "../../components/DetailComponent/DetailComponent";

export default function FridgePage({items, getItems}) {

    // const [deleteError, setDeleteError] = useState('')
    const [detailShow, setDetailShow] = useState(null)
    const [modalShow, setModalShow] = useState(false)
    const [tables, setTables] = useState([])

    
    async function deleteItems([remId, classId]){
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

    useEffect( ()=> {
        const cats = Object.keys(items)
        let tablets = cats.map((cat)=> 
        <Table catName={cat} category={items[cat]} setDetailShow={setDetailShow}/>)

        setTables(tablets)

        if (detailShow) {
            setDetailShow({
                ...detailShow,
                'category' : items[`${detailShow.catName}`]
            })
        }

    }, [items])


    return (
        <>
            <div className="fridgePage">
                <div className="modelSegment hideOnMobile">
                    <div className="canvas">
                        <Canvas
                            gl={ {
                                antialias: true,
                                toneMapping: THREE.ACESFilmicToneMapping,
                                outputColorSpace: THREE.SRGBColorSpace
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
                <div className="inventorySegment hideOnMobile">
                
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
                    setDetailShow={setDetailShow} deleteItems={deleteItems} getItems={getItems}/>
                    </>
                }
      
                </div>  
    
                <div className="mobileInventory showOnMobile">
                    {
                        !detailShow && 
                        <>
                            <button className="categoryBtn" 
                            onClick={()=>setDetailShow({
                                    catName: 'Sauces',
                                    category: items['Sauces']
                                })}>Sauces</button>
                            <button className="categoryBtn"
                            onClick={()=>setDetailShow({
                                catName: 'Drinks',
                                category: items['Drinks']
                            })}>Drinks</button>
                            <button className="categoryBtn"
                            onClick={()=>setDetailShow({
                                    catName: 'Dairy Products',
                                    category: items['Dairy Products']
                                })}>Dairy Products</button>
                            <button className="categoryBtn"
                            onClick={()=>setDetailShow({
                                catName: 'Frozen',
                                category: items['Frozen']
                            })}>Frozen</button>
                            <button className="categoryBtn"
                            onClick={()=>setDetailShow({
                                catName: 'M.S.E.',
                                category: items['Meat, Seafood, Eggs']
                            })}>Meat, Seafood, Eggs</button>
                            <button className="categoryBtn"
                            onClick={()=>setDetailShow({
                                catName: 'F.V.M.',
                                category: items['Fruits, Vegetables, Mushrooms']
                            })}>Fruits, Vegetables, Mushrooms</button>
                            <button className="categoryBtn"
                            onClick={()=>setDetailShow({
                                catName: 'Oils, Spices',
                                category: items['Oils, Spices']
                            })}>Oils, Spices</button>
                            <button className="categoryBtn"
                            onClick={()=>setDetailShow({
                                catName: 'Miscellaneous',
                                category: items['Miscellaneous']
                            })}>Miscellaneous</button>

                            <button className="plusBtn" onClick={toggleItemForm}
                            >+</button>
                        </>
                    }

                    {
                    detailShow && 
                    <>
                    <DetailComponent catName={detailShow.catName} category={detailShow.category} 
                    setDetailShow={setDetailShow} deleteItems={deleteItems} getItems={getItems}/>
                    </>
                    }

                </div>              
            </div>
        </>
        );
  }

