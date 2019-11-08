import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { signOut } from '../../actions/authAction';
import './style.css';

function toggleNav(e) {
  const slider = document.getElementsByClassName('slider')[0];
  const burger = document.getElementsByClassName('burger')[0];
  const list = document.getElementsByClassName('list')[0];
  document.getElementById('root').style.overflow = 'hidden';
  burger.classList.toggle('burger-active')
  slider.classList.toggle('active')
  list.childNodes.forEach((e, index) => {
    if(e.style.animation)
      e.style.animation=''
    else 
      e.style.animation = `listItemFade 0.5s ease forwards ${index / 5 + 0.3}s`;
  });
}
const Navbar = props => {
  return ( 
    <nav className="nav-wrapper">
       <div className="burger" onClick={e => toggleNav(e)}>
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
      </div>
      {/* <Link className="nav-brand" to="/">iCinema</Link> */}
      <div className='slider'>
        <ul className='list'>
          <Link onClick={() => toggleNav()} to="/movies">Home</Link>
          { !props.loggedIn ? <>
              <Link onClick={() => toggleNav()} to="/login">Login</Link>
              <Link onClick={() => toggleNav()} to="/resigter">Register</Link>
            </>
            : <Link onClick={() => {toggleNav(); props.signOut()}} to="/#">Log out</Link>
          }
        </ul>
      </div>
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
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);