import {useState, useEffect} from 'react';
import InvDisplay from './InvDisplay';

function Inventory() {

    const [items, setItems] = useState([{id: "123", name: "Item1"}, {id: "456", name: "Item2"}, {id:"789", name: "Item3"}, {id:"000", name: "Item4"}, {id:"101", name: "Item5"}]);

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