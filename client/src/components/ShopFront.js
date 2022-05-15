import {useState, useEffect} from 'react';
import ShopItemDisplay from './ShopItemDisplay';

function ShopFront(props) {
    const [shopName, setShopName] = useState("");
    const [shopInv, setShopInv] = useState([]);
    useEffect(() => {
        setShopName(props.data.name);
        setShopInv(props.data.inventory);
    }, []);

    function displayInventory () {
        if(shopInv.length == 0) {
            return <p>The store is empty...</p>;
        }
        else {
            return <>
                {shopInv.map(item => {
                    // return <div className="menu_item" key={item}>
                    //     <ShopItemDisplay itemId={item}/>
                    // </div>
                    return <ShopItemDisplay itemId={item} key={item} userId={props.userId}/>
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