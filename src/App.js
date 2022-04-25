import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ComponentCollection from './pages/ComponentCollection';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateAPetPage from './pages/CreateAPetPage';
import InventoryPage from './pages/InventoryPage';
import ShopListPage from './pages/ShopListPage';
import GameListPage from './pages/GameListPage';
import CountingGamePage from './pages/CountingGamePage';
import RPSPage from './pages/RPSPage';
import RiddleMeThisPage from './pages/RiddleMeThisPage';
import SearchPage from './pages/SearchPage';
import PetPage from "./pages/PetPage";

function App() {
    return (
            <div>
                <Router>
                    <header>
                        <h1 id="title">Virtual Pet</h1>
                    </header>
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>
                        <Route exact path="/login" element={<LoginPage/>}/>
                        <Route exact path="/createapet" element={<CreateAPetPage/>}/>
                        <Route exact path="/inventory" element={<InventoryPage/>}/>
                        <Route exact path="/shops" element={<ShopListPage/>}/>
                        <Route exact path="/games" element={<GameListPage/>}/>
                        <Route exact path="/games/counting" element={<CountingGamePage/>}/>
                        <Route exact path="/games/rps" element={<RPSPage/>}/>
                        <Route exact path="/games/riddlemethis" element={<RiddleMeThisPage/>}/>
                        <Route exact path="/search" element={<SearchPage/>}/>
                        <Route exact path="/petpage/0" element={<PetPage/>}/>
                        <Route exact path="/components" element={<ComponentCollection />}/>
                    </Routes>
                </Router>
            </div>
    );
}

export default App;
