import {useState, useEffect} from 'react';

function ShopFront(props) {
    const [shopName, setShopName] = useState("");
    const [shopQuote, setShopQuote] = useState("Welcome!");
    const [shopInv, setShopInv] = useState([]);

    useEffect(() => {
        setShopName(props.shopName);
        let quoteIdx = Math.floor(Math.random() * props.shopQuotes.length);
        setShopQuote(props.shopQuotes[quoteIdx]);
        setShopInv(props.shopInv);
    }, []);

    function displayInventory() {
        if(shopInv.length == 0) {
            return <p>The store is empty...</p>;
        }
        else {
            return <>
                {shopInv.map(item => {
                    return <div className="menu_item">{item.name}</div>
                })}
            </>
        }
    }

    return <>
        <h2>{shopName}</h2>
        <p>{shopQuote}</p>
        <div id="menu">
            {displayInventory()}
        </div>
    </>
}

export default ShopFront;