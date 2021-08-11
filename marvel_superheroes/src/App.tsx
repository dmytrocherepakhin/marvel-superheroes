import React from 'react';
import './App.css';
import ComicsMainWindow from './components/ComicsMainWindow';
import HeroMainWindow from './components/HeroMainWindow';

function App(): JSX.Element {

  return (

    <div className="App">
      <HeroMainWindow />
      <ComicsMainWindow />
    </div>
  );
}

export default App;
