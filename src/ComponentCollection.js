import Navigation from './components/Navigation';
import PetBox from './components/PetBox';
import Inventory from './components/Inventory';
import ShopsList from './components/ShopsList';
import GamesList from './components/GamesList';
import RPS from './components/RPS';
import CountingGame from './components/CountingGame';
import ShopFront from './components/ShopFront';

function ComponentCollection() {
    return <>
        <header>
            <h1 id="title">Virtual Pet</h1>
            <Navigation />
        </header>
        <PetBox pet={{name: "Little Cat", hunger: 100, happiness: 100, cleanliness: 100}} money={42}/>
        <Inventory items={[{id: "123", name: "Item1"}, {id: "456", name: "Item2"}, {id:"789", name: "Item3"}, {id:"000", name: "Item4"}, {id:"101", name: "Item5"}]}/>
        <ShopsList/>
        <GamesList/>
        <RPS/>
        <CountingGame />
        <ShopFront shopName="The Awesome Shop" shopQuotes={["Hello there!", "So nice to see you...", "Please buy some stuff..."]} shopInv={[{id: "123", name: "Shop Item A"}, {id: "456", name: "Shop Item B"}, {id:"789", name: "Shop Item C"}]}/>
    </>
}

export default ComponentCollection;