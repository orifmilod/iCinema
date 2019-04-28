import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import '../css/navbar.css';
import { connect } from 'react-redux';
import { SignIn } from '../actions/authAction';

const Navbar = () =>
{
    return(
        <nav className="background">
            <Link className="nav-brand" to="/">iCinema</Link>
        
            <ul className="navbar-list">
                <li> <NavLink to="/movies">Movies <span className="sr-only">(current)</span></NavLink></li>
                {/* <li> <NavLink to="/customers">Customers</NavLink> </li>
                <li> <NavLink to="/rentals">Rentals</NavLink> </li> */}
                <li> <NavLink to="/login">Login</NavLink> </li>
                <li> <NavLink to="/resigter">Register</NavLink></li>
            </ul>
        </nav>
    )
}
const mapStateToProps = state => {
    return { 
        // authError: state.auth.authError
    }
}
const mapDispatchToProps = dispatch => {
    console.log(dispatch);
    return {
        SignIn: (creds) => dispatch(SignIn(creds))  
    }
}


export default Navbar;