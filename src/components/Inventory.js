import {useState, useEffect} from 'react';
import InvDisplay from './InvDisplay';

function Inventory(props) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(props.items)
    }, []);

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
            <div id="inventory">
                {items.map((item, idx) => {
                    return <div className="inventory_item" key={item.id}>
                        <InvDisplay itemName={item.name}/>
                        <button onClick={() => consumeItem(idx)}>Use</button>
                    </div>
                })}
            </div>
        );
    }
}

export default Inventory;