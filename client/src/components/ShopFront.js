import {useState, useEffect} from 'react';
import ShopItemDisplay from './ShopItemDisplay';

function ShopFront(props) {
    const [shopName, setShopName] = useState("");
    const [shopInv, setShopInv] = useState([]);
    const [userMoney, setUserMoney]=useState(props.money);
    useEffect(() => {
        setShopName(props.data.name);
        setShopInv(props.data.inventory);
        setUserMoney(props.money);
    }, []);

    const updateUserMoney=(value)=>{
        setUserMoney(value);
    }

    function displayInventory () {
        if(shopInv.length == 0) {
            return <p>The store is empty...</p>;
        }
        else {
            return <>
                {shopInv.map(item => {
                    return <ShopItemDisplay itemId={item} key={item} userId={props.userId} updateUserMoney={updateUserMoney} money={userMoney}/>
                })}
            </>
            
        }
    }

    return <>
        <h2>{shopName}</h2>
        Your Money: ${userMoney}
        <div id="menu">
            {displayInventory()}
        </div>
    </>
}

export default ShopFront;