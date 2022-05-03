import { useState } from "react";

function CreateAPet() {
    const [petCreated, setPetCreated] = useState(false);
    
    const [petType, setPetType] = useState("");
    const [petName, setPetName] = useState("");
    const [invalidType, setInvalidType] = useState(false);
    const [invalidName, setInvalidName] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        let valid = true;
        if(!petType || !petType.trim()) {
            valid = false;
            setInvalidType(true);
        }
        else {
            setInvalidType(false);
        }
        if(!petName || !petName.trim()) {
            valid = false;
            setInvalidName(true);
        }
        else {
            setInvalidName(false);
        }
        if(valid) {
            setPetCreated(true);
        }
    }

    if(petCreated) {
        return <>
            <h2>Create A Pet</h2>
            <p>You already have a pet!</p>
        </>
    }
    else {
        return <>
            <h2>Create A Pet</h2>
            <p>Create your own virtual pet here! Choose a species and a name!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Choose your pet's species: <br/>
                    <input type="radio" name="type" value="petA" onChange={e => setPetType(e.target.value)}/> Pet A <img src={require('../assets/inv/placeholder.png')} /> <br/>
                    <input type="radio" name="type" value="petB" onChange={e => setPetType(e.target.value)}/> Pet B <img src={require('../assets/inv/placeholder.png')} /> <br/>
                    <input type="radio" name="type" value="petC" onChange={e => setPetType(e.target.value)}/> Pet C <img src={require('../assets/inv/placeholder.png')} /> <br/>
                    <input type="radio" name="type" value="petD" onChange={e => setPetType(e.target.value)}/> Pet D <img src={require('../assets/inv/placeholder.png')} /> <br/>
                </label>
                {invalidType && <p>Please choose a species for your pet.</p>}
                <label>
                    Enter your pet's name here: <br/>
                    <input type="text" onChange={e => setPetName(e.target.value)}/>
                </label>
                {!invalidName && <br/>}
                {invalidName && <p>Please write a name for your pet.</p>}
                <label>
                    Submit <br/>
                    <input type="submit" value="Create A Pet!"/>
                </label>
            </form>
        </>
    }

}

export default CreateAPet;