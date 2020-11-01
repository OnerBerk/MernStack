import './App.css';
import Hello from './component/hello'
import React from 'react';
import GetPlace from './component/place/place'


function App(props) {
  
  return (
    <div className="App">
        <Hello/>
        <GetPlace/>
    </div>
  );
}

export default App;
