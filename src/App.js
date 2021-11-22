import React from 'react';
import './styles/App.scss';
import Calendar from './features/caldendar/Calendar';


function App() {
  console.log = ()=>{}
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

export default App;
