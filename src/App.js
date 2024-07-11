import usePasswordGenerator from "./hooks/use-password-generator";
import "./index.css";
import { useState } from "react";
import PasswordStrengthIndicator from "./components/StrengthChecker";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";

export default function App() {
  const [length, setlength] = useState(4);
  const [checkboxData, setcheckboxData] = useState([
    {title: "Include Uppercase Letters", state: false},
    {title: "Include Lowercase Letters", state: false},
    {title: "Include Numbers", state: false},
    {title: "Include Symbols", state: false}
  ]);
  const [copied, setcopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setcheckboxData(updatedCheckboxData);

  };
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setcopied(true);

    setTimeout(() => {
      setcopied(false);
    }, 1000);
  };


  const { password, errorMessage, generatePassword } = usePasswordGenerator()

  return (
    <div className="container">
      {/* Password Text and Copy */}
      {password && (
      <div className='header'>
        <div className='title'>{password}</div>
        
        <Button 
        onClick={handleCopy} 
        customClass="copyBtn"
        text={copied?"copied" : "copy"}/>
        
      </div>
      )}
      {/* Character Length */}
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
        type="range"
        min="4"
        max="20"
        value={length}
        onChange={(e) => setlength(e.target.value)}
        />
      </div>
      {/* Checkboxes */}
      <div className="checkboxes">
        {checkboxData.map((checkbox, index)=>{
          return (
          <Checkbox
          key={index}
          title={checkbox.title}
          state={checkbox.state}
          onChange={() => handleCheckboxChange(index)}/>
          );
        })}
      </div>
      {/* Strength */}
      <PasswordStrengthIndicator password={password}/>
      {/* Error Handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

      {/* Generate Button */}
      <div className="buttondiv">

      <Button 
        onClick={() => generatePassword(checkboxData, length)} 
        customClass="generateBtn"
        text="Generate Password"/>

      </div>
    </div>
  );
}