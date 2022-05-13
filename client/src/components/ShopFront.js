import {useState, useEffect} from 'react';

function ShopFront(props) {
    const [shopName, setShopName] = useState("");
    const [shopInv, setShopInv] = useState([]);

    useEffect(() => {
        setShopName(props.data.name);
        setShopInv(props.data.inventory);
    }, []);

    function displayInventory() {
        if(shopInv.length == 0) {
            return <p>The store is empty...</p>;
        }
        else {
            return <>
                {shopInv.map(item => {
                    return <div className="menu_item" key={item}>
                        <img src={require('../assets/inv/placeholder.png')} />
                        <p>{item.name}</p>
                        <button>Buy Item</button>
                    </div>
                })}
            </>
        }
    }

    return <>
        <h2>{shopName}</h2>
        <div id="menu">
            {displayInventory()}
        </div>
    </>
}

export default ShopFront;