import { useState, useEffect } from 'react';

function InvDisplay(props) {

    const [itemName, setItemName] = useState("");

    useEffect(() => {
        setItemName(props.itemName);
    }, []);

    return (
        <>
            <img src={require('../assets/inv/placeholder.png')} title={props.itemName} />
            <p>{itemName}</p>
        </>
    );
}

export default InvDisplay;