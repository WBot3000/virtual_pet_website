import {useState, useEffect} from 'react';
import InvDisplay from './InvDisplay';
import axios from 'axios';

function Inventory(props) {
    
    const gid = props.userId;
    console.log(gid);
    const [items, setItems] = useState([]);

    async function fetchData(id) {
        try{
            return await axios.get(`http://localhost:3001/getUserItems/${id}`);
        }catch(e){
            console.log("error fetching items");
            return null;
        }
    }

    const getItems = async () =>{
        const inven = await fetchData(gid);
        console.log("inven1: ", inven.data.items);
        setItems(inven.data.items);
    }

    useEffect(() => {
        getItems();
    })

    console.log("items: ", items);
    
    function consumeItem(idx) {
        let newInv = items.slice(0, idx).concat(items.slice(idx+1));
        setItems(newInv);
    }


    if(items.length === 0) {
        return (
            <div id="inventory">You have no items! Buy some at the shops!</div>
        )
    }
    else {
        return (
            <div id="menu">
                {items.map((item, idx) => {
                    return <div className="menu_item" key={item.id}>
                        <InvDisplay itemName={item.name}/>
                        <button onClick={() => consumeItem(idx)}>Use</button>
                    </div>
                })}
            </div>
        );
    }
}

export default Inventory;