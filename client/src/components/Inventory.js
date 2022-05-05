import axios from 'axios';
import {useState, useEffect} from 'react';
import InvDisplay from './InvDisplay';

function Inventory() {

    const [items, setItems] = useState([{id: "123", name: "Item1"}, {id: "456", name: "Item2"}, {id:"789", name: "Item3"}, {id:"000", name: "Item4"}, {id:"101", name: "Item5"},
                                        {id: "888", type:"face", name:"yayface"}, {id: "999", type:"face", name:"loveface"}]);

    async function consumeItem(idx) {
        let usedItem = items[idx];
        let returnedClothing;
        let returnVal;
        let petObj = { //Will have to do something with Firebase/Redis/etc.
            species: "lilcat",
            hat: null,
            face: null,
            shirt: null,
            pants: null,
            shoes: null
        }
        switch(usedItem.type) {
            case "hat":
                returnedClothing = petObj.hat;
                petObj.hat = usedItem.name;
                returnVal = axios.put("http://localhost:3001/images/updateClothing/1/1", {petObj: petObj});
                break;
            case "face":
                returnedClothing = petObj.face;
                petObj.face = usedItem.name;
                returnVal = axios.put("http://localhost:3001/images/updateClothing/1/1", {petObj: petObj});
                break;
            case "shirt":
                returnedClothing = petObj.shirt;
                petObj.shirt = usedItem.name;
                returnVal = axios.put("http://localhost:3001/images/updateClothing/1/1", {petObj: petObj});
                break;
            case "pants":
                returnedClothing = petObj.pants;
                petObj.pants = usedItem.name;
                returnVal = axios.put("http://localhost:3001/images/updateClothing/1/1", {petObj: petObj});
                break;
            case "shoes":
                returnedClothing = petObj.shoes;
                petObj.shoes = usedItem.shoes;
                returnVal = axios.put("http://localhost:3001/images/updateClothing/1/1", {petObj: petObj});
                break;
            default:
        }
        let newInv = items.slice(0, idx).concat(items.slice(idx+1));
        if(returnedClothing) {
            newInv.push(returnedClothing);
        }
        //TODO: Sync this up with the database
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
                        <button onClick={async () => await consumeItem(idx)}>Use</button>
                    </div>
                })}
            </div>
        );
    }
}

export default Inventory;