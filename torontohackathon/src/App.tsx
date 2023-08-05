import './App.css';
import { w3, connect, getSelfAddress} from './core';
import React, { useState } from 'react';

function App() {
  const [address, setAddress] = useState('null');
  const onClickConnect =async () => {
    await connect();
    if (!w3) return;
    let myAddress = await w3.eth.getAccounts();
    console.log(myAddress);
  }
  const onClickUpdateAddress =async () => {
    let x = await getSelfAddress()
    setAddress(x);
  }
  return (
    <div className="App">
      <button onClick={onClickConnect}>Connect MM</button>
      <button onClick={onClickUpdateAddress}>update address</button>
      <div>Address</div>
      <div id='address'>{address}</div>
    </div>
  );
}

export default App;
