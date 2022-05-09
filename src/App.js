import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import CadastrarUsuario from './components/CadastrarUsuario/CadastrarUsuario';

class App extends Component {

  render() {

    return (
      <>
        <Router>
          <Switch>
            <Route exact path='/' component={Login}>
            </Route>
            <Route exact path='/cadastrar-usuario' component={CadastrarUsuario}>
            </Route>
            <Route exact path='/home' component={Home}>
            </Route>
            <Route path='*' component={NotFound}>
            </Route>
          </Switch>


        </Router>
      </>
    );
  }
}



export default App;
