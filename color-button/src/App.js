import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {



  const [buttonColor, setButtonColor] = useState('red')

  const [disabled, setDisabled] = useState(false);

  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';


  
  
  return (
    <div>
        <button 
        style={{backgroundColor: disabled ? 'gray' : buttonColor}}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}>
          Change to {newButtonColor}
        </button>

        <input 
        type="checkbox" 
        id="enable-button-checkbox"
        defaultChecked={disabled}
        aria-checked={disabled}
        onChange={(e) => setDisabled(e.target.checked)} 
        />
        <label htmlFor="disable-button-checkbox">Disable button</label>

        
    </div>
  );
}

export default App;
