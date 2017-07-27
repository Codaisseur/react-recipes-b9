import React, { Component } from 'react';
import RecipesContainer from './recipes/RecipesContainer'
import Loading from './components/Loading'
import LoadError from './components/LoadError'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Loading />
        <LoadError />
        <RecipesContainer />
      </div>
    );
  }
}

export default App;
