import { useState, useEffect } from 'react';
import axios from 'axios';

function InvDisplay(props) {
    const iid = props.itemId;
    const uid = props.uid;
    const [itemName, setItemName] = useState("");
    const [itemDes, setItemDes] = useState("");
    const [itemUse, setItemUse] = useState(0);
    const [hap, setHap] = useState(0);
    const [hun, setHun] = useState(0)
    const [hyg, setHyg] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`http://localhost:3001/item/${iid}`);
            const data2 = await axios.get(`http://localhost:3001/GetUserItem/${uid}/${iid}`)
            if(data){
                setItemName(data.name);
                setItemDes(data.description);
                setItemUse(data2.data.items.useCount);
                setHap(data.happinessChange);
                setHun(data.hungerChange);
                setHyg(data.hygieneChange);
            }
        };
        fetchData();
    })

    return (
        <>
            <img src={require('../assets/inv/placeholder.png')} />
            <p>{itemName}</p>
            <p>{itemDes}</p>
            <p>Uses: {itemUse}</p>
            <p>Happiness: {hap}</p>
            <p>Hunger: {hun}</p>
            <p>Hygiene: {hyg}</p>
        </>
    );
}

export default InvDisplay;