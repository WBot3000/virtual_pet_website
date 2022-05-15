import {useState, useEffect} from 'react';
import InvDisplay from './InvDisplay';
import axios from 'axios';
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Inventory(props) {
    const [items, setItems] = useState([]);
    const [pet, setPet] = useState(null);
    const [pets, setPetList] = useState([]);
    const [change, setChange] = useState(0);
    const [error, setError] = useState(null);

    //setGid(props.userId);
    const gid = props.userId;
    console.log(gid);

    async function itemAction(uid, iid, petName) {
        if(uid === null || iid === null)  {
            console.log("Error: uid or iid is null");
            return null;
        }
        if(petName == null){
            setError("Please select a pet");
            return null;
        }
        else{
            setError(null);
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

    let errorComponent = null;
    if(error){
        errorComponent = <Alert severity="error">{error}</Alert>
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
            setError("Please select a pet");
        }
        else{
            setError(null);
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
            <div>
                {errorComponent}
                <div id="menu">
                    
                    {items.map((item, idx) => {
                        return <div className="menu_item" key={idx}>
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
            </div>
        );
    }
}

export default Inventory;