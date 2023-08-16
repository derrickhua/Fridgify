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
    const [queue, setQ] = useState([])

    // when queue changes, look through it and delete queues that have the same id and same object
    const [tables, setTables] = useState([])

    // TODO: make useState for Accumulating Item Change Requests, low, med, high? 
    // this gets to be confirmed if you leave category details page

    // TODO: make expiry date optional / currently required in html form, if no expiry date no reminder
    
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

    useEffect(()=> {
        let newQ = queue
        let recentEntry = newQ[newQ.length-1]
        for (let i=newQ.length-2; i>=0; i--) {
            let currentEntry = newQ[i]
            if (currentEntry[0] === recentEntry[0]) {
                if (Object.keys(currentEntry[1])[0] === Object.keys(recentEntry[1])[0])
                newQ.splice(i, 1)
            }
        }

        setQ(newQ)
        console.log('q is updating detailShow')
    }, [queue])

    useEffect(()=> {
        if (queue.length) {
            for (let query of queue) {
                itemAPI.updateItem(query[0], query[1])
            }
            setQ([])
            getItems()            
        }

        console.log('detailSHOWWWWWWWWW')
    }, [detailShow])

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

                    {/* {editItem && <ItemUpdateForm editItem={editItem} getItems={getItems} setEditItem={setEditItem} show={editItem}/>} */}
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
                    setDetailShow={setDetailShow} deleteItems={deleteItems} getItems={getItems}
                    setQ={setQ} queue={queue}
                    />
                    </>
                }
      
                </div>                
            </div>
        </>
        );
  }

