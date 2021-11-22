import React from 'react';
import './styles/App.scss';
import Calendar from './features/caldendar/Calendar';


function App() {
  localStorage.setItem('eventList', JSON.stringify([]))
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

export default App;
