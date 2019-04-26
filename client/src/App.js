import React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { Route, Redirect, Switch} from 'react-router-dom';
import Movies from './components/movies';
import Rentals from './components/rentals';
import Customers from './components/customers';
import NotFound from './components/notfound';

import Navbar from './components/navbar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import './App.css';
import RegisterForm from './components/registerForm';
import AddMovieForm from './components/addMovie';
window.$ = window.jQuery = require('jquery');


class App extends Component {

  render() {
    return (
      <div className="App">
      <ToastContainer/>
      <Navbar/>
      <Switch> 
          
        <Route path="/login" component={LoginForm}/>
        <Route path="/movies/new" component={AddMovieForm}/>
        <Route path="/resigter" component={RegisterForm}/>
        <Route path="/movies" exact component={Movies}/> 
        <Route path='/movies/:id' exact component={MovieForm}/>
        
        <Route path="/customers" component={Customers}/> 
        <Route path="/rentals" component={Rentals}/> 
        <Route path="/not-found" component={NotFound}/> 

        <Redirect exact from='/' to='/movies'/>
        <Redirect to='not-found'/>
      </Switch>
      </div>
    );
  }
}

export default App;
