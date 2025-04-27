import React from 'react';
import MLLifecycleWrapper from './MLLifecycleWrapper.jsx'; // Adjusted import path
import './App.css'; // Optional: Add styling

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Example App</h1>
        <p>Embedding the ML Lifecycle Web Component:</p>
      </header>
      <main>
        <MLLifecycleWrapper />
      </main>
    </div>
  );
}

export default App; 