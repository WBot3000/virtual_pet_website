import {useState} from 'react';
import {Link} from "react-router-dom";

function Navigation() {
    //TODO: Do Login/Logout stuff
    return (
        <nav id="navbar">
            <Link to="/createapet"><p>Create a Pet</p></Link>
            <Link to="/inventory"><p>Inventory</p></Link>
            <Link to="/shops"><p>Shops</p></Link>
            <Link to="/games"><p>Games</p></Link>
            <Link to="/search"><p>Search</p></Link>
            <Link to="/petpage/0"><p>Pet Page</p></Link>
            <Link to="/logout"><p>Logout</p></Link>
        </nav>
    );
}

export default Navigation;