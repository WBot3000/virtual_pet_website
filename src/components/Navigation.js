import {useState} from 'react';
import {Link} from "react-router-dom";

function Navigation() {
    //TODO: Add links to list elements, do Login/Logout stuff
    return (
        <nav id="navbar">
            <Link to="/createapet"><p>Create a Pet</p></Link>
            <Link to="/inventory"><p>Inventory</p></Link>
            <Link to="/shops"><p>Shops</p></Link>
            <Link to="/games"><p>Games</p></Link>
            <p>Search</p>
            <p>Pet Page</p>
            <Link to="/login"><p>Login</p></Link>
        </nav>
    );
}

export default Navigation;