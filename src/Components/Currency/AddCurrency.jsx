import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@mui/material';
import { Main, DrawerHeader } from '../Content';



const AddCurrency = ({ open }) => {

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [symbol, setSymbol] = useState('');
  const [type, setType] = useState('');
  const [rate, setRate] = useState('');
  const [logo, setLogo] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new currency object
    const newCurrency = {
      Name: name,
      Code: code,
      Symbol: symbol,
      Type: type,
      Rate: rate,
      Logo: logo,
      Status: status,
    };
    // Call the onAdd function with the new currency object

    // Clear the form fields
    setName('');
    setCode('');
    setSymbol('');
    setType('');
    setRate('');
    setLogo('');
    setStatus('');
  };

  return (
    <Main open={open}>
      <DrawerHeader />
      

      <form className="" onSubmit={handleSubmit} >
        <div className="d-flex flex-column gap-3">
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Code"
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <TextField
          label="Symbol"
          variant="outlined"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />
        <TextField
          label="Type"
          variant="outlined"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <TextField
          label="Rate"
          variant="outlined"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          required
        />
        <TextField
          type='file'
          label="Logo Image"
          variant="outlined"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          required
        />
        <TextField
          label="Status"
          variant="outlined"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Add Currency
        </Button>
        </div>
      </form>
     

    </Main>


  );
};

export default AddCurrency;
