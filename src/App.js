import React, { Component } from 'react';

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
window.$ = window.jQuery = require('jquery')


class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar/>
      <Switch> 
          
        <Route path='/login' component={LoginForm}/>
        <Route path="/movies/addmovie" component={AddMovieForm}/>
        <Route path="/resigter" component={RegisterForm}/>
        <Route path='/movies/:id' component={MovieForm}/>
        <Route path="/movies" component={Movies}/> 
        
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
