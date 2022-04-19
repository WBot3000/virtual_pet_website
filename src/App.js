import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1 className = 'App-title'>Virtual Pet</h1>
          <Link className = 'Nav-link' to='/'>
            Home
          </Link>
          <Link className = 'Nav-link' to='/myPets'>
            My Pets
          </Link>
          <Link className = 'Nav-link' to='/login'>
            Login  
          </Link>
        </header>
      <div className='App-body'>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/myPets' element={<PetList/>}/>
            <Route exact path='/pet/:id' element={<Pet/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/signup' element={<Signup/>}/>
          </Routes>
          
        </div>
    </div>  
  );
}

export default App;
