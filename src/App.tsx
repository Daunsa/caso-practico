import React, {useState} from 'react';
import './App.css';

import Navbar from './Navbar/Navbar';
import Bar from './Lateral/Bar';

function App() {

  const [character, setCharacter] = useState(false);
  const [name, setName] = useState('People of Star Wars');

  return (
    <div className='flex flex-col max-h-screen'>
      <Navbar character={character} setCharacter={setCharacter} name={name} setName={setName} />
      <Bar character={character} setCharacter={setCharacter} setName={setName} />
    </div>
  );
}

export default App;
