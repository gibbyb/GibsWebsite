import React, { useState } from 'react';
import consoleImage from './terminal_photo.png';
import powerlineImage from './powerline_photo.png';
import './App.css';

function App() {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      // Process the command entered by the user
      // For example, if (input === 'read resume') { ... }
      setInput('');
    }
  };

  return (
    <div className="App">
      <header className="console-header">
        <div
          className="console"
          style={{ backgroundImage: `url(${consoleImage})` }}
        >
          <div
            className="powerline"
            style={{ backgroundImage: `url(${powerlineImage})` }}
          />
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleCommand}
            placeholder=""
          />
        </div>
      </header>
    </div>
  );
}

export default App;

