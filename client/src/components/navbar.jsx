import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import '../css/navbar.css';
import { connect } from 'react-redux';
import { SignOut } from '../actions/authAction';

const Navbar = props => {
    return ( 
        <nav className="background">
            <Link className="nav-brand" to="/">iCinema</Link>

            <ul className="navbar-list">
                <li> <NavLink to="/movies">Movies <span className="sr-only">(current)</span></NavLink></li>
                { 
                    !props.loggedIn ? (
                        <>
                            <li> <NavLink to="/login">Login</NavLink> </li>
                            <li> <NavLink to="/resigter">Register</NavLink></li> 
                        </>
                        ) : (
                            <li> <NavLink to="#" onClick={props.logOut}>Log out</NavLink></li> 
                        ) 
                }
            </ul>
        </nav>
    )
}
const mapStateToProps = state => {
    return { 
        loggedIn: state.auth.loggedIn
    }
}
const mapDispatchToProps = dispatch => {
    return { 
        logOut: () => dispatch(SignOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);