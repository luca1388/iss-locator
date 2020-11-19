import React from 'react';
import './App.css';
import WorldMap from './components/Map/WorldMap';

function App() {
  return (
    <div className="App">
      <WorldMap zoom={2} center={{ lat: 3, lng: 5 }} />
    </div>
  );
}

export default App;
