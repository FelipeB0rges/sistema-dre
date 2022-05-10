import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import CadastrarUsuario from './components/CadastrarUsuario/CadastrarUsuario';
import TiposReceitas from './components/TiposReceitas/TiposReceitas';
import ReceitaCadastrar from './components/ReceitaCadastrar/ReceitaCadastrar';

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
            <Route exact path='/tipos-receitas' component={TiposReceitas}>
            </Route>
            <Route exact path='/receitas-cadastrar' component={ReceitaCadastrar}>
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
