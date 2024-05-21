import { Main, DrawerHeader } from '../Content';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {Row , Col, Button} from 'react-bootstrap';

import { useState } from 'react';


export default function WithdrawUpdate({ open }) {
    return (
        <Main open={open}>
            <DrawerHeader />
            <div className="d-flex justify-content-between align-items-center mb-3 rounded bg-light shadow p-3">
                <h1>Withdrawl Details</h1>
                <h1>Status : Pending</h1>
            </div>
            
            <Row>
                <Col xs={8} >

            <div className='p-3 rounded bg-light shadow'>
                
                    <div>
                        <p>User : Kyla Sarah</p>
                        <p>Transaction ID : 23BE1D82EFC21</p>
                        <p>Currency : USD</p>
                        <p>Payment Method : Bank</p>
                        <p>Bank Name : HSBC</p>
                        <p>Branch Name : New York</p>
                        <p>Account Name : robiuzzaman parvez</p>
                        <p>Attached File : robiuzzaman parvez</p>
                        <p>Date : 14-05-2024 4:22 PM</p>
                        <div className="d-flex pb-3">

                        <p>Change Status :</p>
                        <Form.Select aria-label="Default select example " style={{'width': '15rem'}}>
                       
                        <option value="1">Success</option>
                        <option value="2">Pending</option>
                        <option value="3">Cancel</option>
                        </Form.Select>
                        </div>
                        <Button variant="primary" className="ms-3 w-25">Update</Button>

                    </div>


                
            </div>
            </Col>
            <Col>
            <div className='p-3 rounded bg-light shadow'>
                
                    <p>Amount : $12</p>
                    <p>Fees(0.12% + 1) : $1.02</p>
                    <br/>
                    <p>Total : $ 21.02</p>
                   
            </div>
            </Col>
            </Row>


        </Main>
    )
}