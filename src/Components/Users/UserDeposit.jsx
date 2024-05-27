import React, { useState } from 'react';
import { Stepper, Step, StepLabel, TextField, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const steps = ['Input', 'Confirmation', 'Success'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return (
                <div className='d-flex p-3 '>
                    <div className='col'>

                    <InputLabel >Currency</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                     
                        label="Currency"
                        fullWidth
                   
                    >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"EURO"}>EURO</MenuItem>
                        <MenuItem value={"INR"}>INR</MenuItem>
                        
                    </Select>
                    </div>
                    <div className='col'>
                    <InputLabel >Amount</InputLabel>



                    <TextField label="Amount" variant="outlined" fullWidth />
                    </div>
                </div>
            );
        case 1:
            return "Confirm your details";
        case 2:
            return "Success! Your transaction is complete.";
        default:
            return "Unknown step";
    }
}

export default function UserDeposit() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className='m-3'>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {/* {getStepContent(activeStep)} */}
                {activeStep=== 0?  <div className='d-flex p-3 '>
                    <div className='col'>

                    <InputLabel >Currency</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Currency" fullWidth >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"EURO"}>EURO</MenuItem>
                        <MenuItem value={"INR"}>INR</MenuItem>
                        
                    </Select>
                    </div>
                    <div className='col'>
                    <InputLabel >Amount</InputLabel>
                    <TextField label="Amount" variant="outlined" fullWidth />
                    </div>
                </div>:null}
                {activeStep === 1 ? "Confirm your details" : null}
                {activeStep === 2 ? "Success! Your transaction is complete." : null}
                <div>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                    <Button variant="contained" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
