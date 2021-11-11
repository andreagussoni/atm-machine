import React from "react";
import './styles.css';

const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input className='input-field' id="number-input" type="number" width="200" onChange={onChange}></input>
      <input className='input-button' disabled={!isValid} type="submit" width="200" value="Submit" id="submit-input">
      </input>
    </label>
    
  );
};
const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('')
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(Number(event.target.value));
    if (Number(event.target.value) <= 0) {
      return setValidTransaction(false);
    }
    if (atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };
  const handleModeSelect = (e) => {
    
    console.log(e.target.value)
    setAtmMode(e.target.value)
    
    if (e.target.value == 'Deposit') {
      setIsDeposit(true)
      } else {
        setIsDeposit(false)
      }
    e.preventDefault()
  }

  return (
    <div className='container'>
    <form className='form' onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select className='select' onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
      <option id="no-selection" value=""></option>
      <option id="deposit-selection" value="Deposit">Deposit</option>
      <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      { atmMode &&
      <ATMDeposit onChange={handleChange} 
      isDeposit={isDeposit}
      isValid={validTransaction}
      >
      </ATMDeposit>
      }
    </form>
    </div>
  );
};

export default Account;
