import {useState, useEffect} from 'react';
import axios from 'axios';

function ShopFront(props) {
    const [shopName, setShopName] = useState("");
    const [shopInv, setShopInv] = useState([]);
    const [itemData,setItemData]=useState([]);
    useEffect(() => {
        setShopName(props.data.name);
        setShopInv(props.data.inventory);
        getItemData();
    }, []);

    function getItemData(){
        Promise.all(shopInv.map((item)=>axios.get(`http://localhost:3001/getShopItem/${props.data._id}/${item}`))).then((data)=>{
            setItemData(data);
        });
    }

    function displayInventory () {
        if(shopInv.length == 0) {
            return <p>The store is empty...</p>;
        }
        else {
            getItemData();
            return <>
                {itemData.map(item => {
                    return <div className="menu_item" key={item.data._id}>
                        <img src={require(`../assets/store_pics/${item.data.name}.png`)} />
                        <p>{item.data.name}</p>
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