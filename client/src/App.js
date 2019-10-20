import React, { Component } from 'react';

import { Route, Redirect, Switch, BrowserRouter as Router} from 'react-router-dom';

import Movies from './components/Movies';
import Rentals from './components/rentals';
import Customers from './components/customers';
import NotFound from './components/notfound';

import Navbar from './components/Navbar';
import MovieForm from './components/movieForm';
import Login from './components/Login';
import './App.css';
import Register from './components/Register';
import AddMovieForm from './components/addMovie';
import { Provider } from 'react-redux';
import store from './store';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Switch> 
              <Route exact path="/movies/new" component={AddMovieForm}/>
              <Route exact path="/login" component={Login}/>
              <Route path="/resigter" component={Register}/>
              <Route path="/movies" exact component={Movies}/> 
              <Route path='/movies/:id' exact component={MovieForm}/>
              
              <Route path="/customers" component={Customers}/> 
              {/* <Route path="/rentals" component={Rentals}/>  */}
              <Route path="/not-found" component={NotFound}/> 

              <Redirect exact from='/' to='/movies'/>
              <Redirect to='not-found'/>
            </Switch>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
