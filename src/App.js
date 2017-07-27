import React, { Component } from 'react';
import RecipesContainer from './recipes/RecipesContainer'
import Loading from './components/Loading'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Loading />
        <RecipesContainer />
      </div>
    );
  }
}

export default App;
