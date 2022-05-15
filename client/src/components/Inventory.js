import {useState, useEffect} from 'react';
import InvDisplay from './InvDisplay';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';


function Inventory(props) {
    const [items, setItems] = useState([]);
    const [pet, setPet] = useState(null);
    const [pets, setPetList] = useState([]);
    //const [gid, setGid] = useState(null);

    //setGid(props.userId);
    const gid = props.userId;
    console.log(gid);

    async function itemAction(uid, iid, petName) {
        if(uid === null || iid === null) {
            console.log("Error: uid or iid is null");
            return null;
        }
        if(petName === null){
            return <Alert variant="warning"> Please select a pet to use the item on!</Alert>
        }
        try{
            return await axios.post(`http://localhost:3001/useItem`, 
            {
                uid: uid,
                iid: iid,
                petName: petName
            });
        }catch(e){
            console.log("error fetching items");
            return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`http://localhost:3001/GetAllUserPetIds/${gid}`)
            console.log(data);
            if(data){
                setPetList(data);
            }
        };
        fetchData();
    },[gid])


    useEffect(() => {
        const fetchData = async () => {
            if(gid) {
                const { data } = await axios.get(`http://localhost:3001/getUserItems/${gid}`);
                if(data){
                    setItems(data.items);
                }
            }
        };
        fetchData();
    },[gid])

    console.log("items: ", items);
    console.log("pets: ", pets);
    
    function consumeItem(iid) {
        console.log(gid, iid, pet);
        itemAction(gid, iid, pet);
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
                        <InvDisplay itemId={item.itemId}/>
                            <p>Choose a Pet:</p>
                            <div>
                            {pets.map((pet,petidx) => {
                                return <button onClick={() => setPet(pet.petName)} >{pet.petName}</button>
                            })}
                            </div>
                            <br></br>
                        <button onClick={() => consumeItem(item.itemId)}>Use</button>
                    </div>
                })}
            </div>
        );
    }
}

export default Inventory;