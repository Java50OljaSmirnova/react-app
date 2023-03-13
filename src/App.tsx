import React from 'react';

import './App.css';
import { Timer } from './components/Timer';

function App() {
  const column : React.CSSProperties = {display: "flex", flexDirection: "column", 
  height: "90vh", justifyContent: "center"};
  const row : React.CSSProperties = {display: "flex", flexDirection: "row",
   justifyContent: "space-around"};
  return <div style={column}>
    <div style={row}>
    <Timer cityCountry='Israel'/>
    <Timer cityCountry='New York'/>
    </div>
    <div style={row}>
    <Timer cityCountry='Yekaterinburg'/>
    <Timer cityCountry='Japan'/>
    </div>
    </div>
  
}

export default App;
