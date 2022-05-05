import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ComponentCollection from './pages/ComponentCollection';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
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
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/createapet" element={<CreateAPetPage/>}/>
                        <Route path="/inventory" element={<InventoryPage/>}/>
                        <Route path="/shops" element={<ShopListPage/>}/>
                        <Route path="/games" element={<GameListPage/>}/>
                        <Route path="/games/counting" element={<CountingGamePage/>}/>
                        <Route path="/games/rps" element={<RPSPage/>}/>
                        <Route path="/games/riddlemethis" element={<RiddleMeThisPage/>}/>
                        <Route path="/search" element={<SearchPage/>}/>
                        <Route path="/petpage/0" element={<PetPage/>}/>
                        <Route path="/components" element={<ComponentCollection />}/>
                        <Route path="/logout" element={<LogoutPage/>}/>
                    </Routes>
                </Router>
            </div>
    );
}

export default App;