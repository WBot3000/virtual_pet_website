function ShopsList() { //TODO: Add links to the individual store pages
    return <>
        <p className="indented">Here are all the shops the world of Virtual Pet has to offer!</p> 
        <div id="shops_list"> 
            <p>Food</p>
            <dl className="shops_category">
                <dt>Groceries of Goodness</dt>
                <dd>Good food at a great price!</dd>
                <dt>Candylocation</dt>
                <dd>Delicious candy, now trademark infringement free!</dd>
                <dt>Très Cher et Petit</dt>
                <dd>Food for those who like luxury...</dd>
            </dl>
            <p>Clothes</p>
            <dl className="shops_category">
                <dt>Taylor the Tailor's Tailor-y</dt>
                <dd>Clothes made by the legendary tailor, Taylor.</dd>
                <dt>The Rainbow Express</dt>
                <dd>Paint your pet a crazy color on the Rainbow Express.</dd>
                <dt>Wally's Wears</dt>
                <dd>Unconventional clothing for the unconventional pet.</dd>
            </dl>
            <p>Entertainment</p>
            <dl className="shops_category">
                <dt>Toytopia</dt>
                <dd>Who doesn't love toys?</dd>
                <dt>Gamers R Us</dt>
                <dd>It's dangerous to go alone. Take these!</dd>
                <dt>Richard's Sporting Stuffs</dt>
                <dd>GOOOOOOOOOOOOOAL!!!</dd>
            </dl>
            <p>Cleanliness</p>
            <dl className="shops_category">
                <dt>Spa-licious</dt>
                <dd>The finest in pet grooming</dd>
            </dl>
        </div>
    </>
}

export default ShopsList;