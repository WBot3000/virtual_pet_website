import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ComponentCollection from './pages/ComponentCollection';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

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
                        <Route exact path="/components" element={<ComponentCollection />}/>
                    </Routes>
                </Router>
            </div>
    );
}

export default App;
