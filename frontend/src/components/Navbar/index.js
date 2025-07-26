import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions/authAction";
import "./style.css";

function Navbar(props) {
  function toggleNav() {
    animateSlider();
    const burgerButton = document.getElementById("burger");
    burgerButton.classList.toggle("is-active");
  }

  function animateSlider() {
    const slider = document.getElementsByClassName("slider")[0];
    document.getElementById("root").style.overflow = "hidden";
    slider.classList.toggle("active");

    const list = document.getElementsByClassName("list")[0];
    list.childNodes.forEach((e, index) => {
      if (e.style.animation) e.style.animation = "";
      else
        e.style.animation = `listItemFade 0.5s ease forwards ${
          index / 5 + 0.3
        }s`;
    });
  }

  return (
    <nav className="nav-wrapper">
      <div id="burger" className="ico-btn" onClick={toggleNav}>
        <span className="ico-btn__burger"></span>
      </div>

      {/* <Link className="nav-brand" to="/">iCinema</Link> */}

      <div id="slider" className="slider">
        <ul className="list">
          <Link onClick={toggleNav} to="/movies">
            Home
          </Link>
          {!props.loggedIn ? (
            <>
              <Link onClick={toggleNav} to="/login">
                Login
              </Link>

              <Link onClick={toggleNav} to="/register">
                Register
              </Link>
            </>
          ) : (
            <Link
              onClick={() => {
                toggleNav();
                props.signOut();
              }}
              to="/#"
            >
              Log out
            </Link>
          )}
          {props.user && props.user.role === "admin" && (
            <>
              <Link onClick={toggleNav} to="/movies/new">
                Add Movie
              </Link>
              <Link onClick={toggleNav} to="/genres/new">
                Add Genre
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
