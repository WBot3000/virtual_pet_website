import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import PetBox from './components/PetBox';
import Inventory from './components/Inventory';
import ShopsList from './components/ShopsList';
import GamesList from './components/GamesList';

function App() {
    return (
            <div>
                <header>
                    <h1 id="title">Virtual Pet</h1>
                    <Navigation />
                </header>
                <PetBox pet={{name: "Little Cat", hunger: 100, happiness: 100, cleanliness: 100}} money={42}/>
                <Inventory items={[{id: "123", name: "Item1"}, {id: "456", name: "Item2"}, {id:"789", name: "Item3"}]}/>
                <ShopsList/>
                <GamesList/>
            </div>
    );
}

export default App;
