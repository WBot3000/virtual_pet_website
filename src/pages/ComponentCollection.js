import Navigation from '../components/Navigation';
import PetBox from '../components/PetBox';
import CreateAPet from '../components/CreateAPet';
import Inventory from '../components/Inventory';
import ShopsList from '../components/ShopsList';
import GamesList from '../components/GamesList';
import RPS from '../components/RPS';
import CountingGame from '../components/CountingGame';
import ShopFront from '../components/ShopFront';

function ComponentCollection() {
    return <div>
        <Navigation />
        <CreateAPet/>
        <PetBox/>
        <Inventory/>
        <ShopsList/>
        <GamesList/>
        <RPS/>
        <CountingGame />
        <ShopFront shopName="The Awesome Shop" shopQuotes={["Hello there!", "So nice to see you...", "Please buy some stuff..."]} shopInv={[{id: "123", name: "Shop Item A"}, {id: "456", name: "Shop Item B"}, {id:"789", name: "Shop Item C"}]}/>
    </div>
}

export default ComponentCollection;