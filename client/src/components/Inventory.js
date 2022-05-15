import {useState, useEffect} from 'react';
import InvDisplay from './InvDisplay';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';


function Inventory(props) {
    const [items, setItems] = useState([]);
    const [pet, setPet] = useState(null);
    const [pets, setPetList] = useState([]);
    const [change, setChange] = useState(0);

    //setGid(props.userId);
    const gid = props.userId;
    console.log(gid);
    let error = null;

    async function itemAction(uid, iid, petName) {
        if(uid === null || iid === null)  {
            console.log("Error: uid or iid is null");
            return null;
        }
        if(petName == null){
            error = <p>Please select a pet</p>
            return null;
        }
        else{
            error = null;
        }
        try{
            return await axios.post(`http://localhost:3001/useItem`, 
            {
                uid: uid,
                iid: iid,
                petName: petName
            });
        }catch(e){
            console.log(e);
            return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`http://localhost:3001/GetAllUserPetIds/${gid}`)
            //console.log(data);
            if(data){
                setPetList(data);
            }
        };
        fetchData();
    },[gid, change])


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`http://localhost:3001/getUserItems/${gid}`);
            if(data){
                setItems(data.items);
            }
        };
        fetchData();
    },[gid,change])

    console.log("items: ", items);
    console.log("pets: ", pets);
    
    function consumeItem(iid) {
        console.log(gid, iid, pet);
        if(pet == null){
            error = <p>Please select a pet</p>
        }
        else{
            error = null;
        }
        itemAction(gid, iid, pet);
        setChange(oldkey => oldkey+1);
    }

    console.log(error);
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
                        <InvDisplay uid = {gid} itemId={item.itemId}/>
                            <p>Choose a Pet:</p>
                            {error}
                            <div>
                            {pets.map((pet,petidx) => {
                                return <button key={petidx} onClick={() => setPet(pet.petName)} >{pet.petName}</button>
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