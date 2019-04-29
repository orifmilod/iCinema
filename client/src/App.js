import React, { Component } from 'react';

import { Route, Redirect, Switch, BrowserRouter as Router} from 'react-router-dom';

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
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Switch> 
                
              <Route exact path="/movies/new" component={AddMovieForm}/>
              <Route exact path="/login" component={LoginForm}/>
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
        </Router>
      </Provider>
    );
  }
}

export default App;
