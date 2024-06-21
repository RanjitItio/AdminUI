import { Main, DrawerHeader } from '../Content';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import {Row , Col, Button} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';

import { useState } from 'react';



export default function DepositUpdate({ open }) {
    const initialFormData = {
        status: 'Success'
    }

    const location = useLocation()
    const TransactionID = location.state.transactionID

    const [transactionDetail, updateTransactionDetail] = React.useState([]);
    const [transactionStatus, updateTransactionStatus] = React.useState(initialFormData);
    const [statusValue, updateStatusValue]             = useState('')
    const [successMessage, SetSuccessMessage]          = useState('')


    React.useEffect(() => {
        axiosInstance.get(`api/v2/admin/transaction/details/${TransactionID}/`).then((res)=> {
          // console.log(res.data.transaction_data)
          if (res.status === 200) {
            //   console.log(res.data.transaction_data)
              updateTransactionDetail(res.data.transaction_data[0])
          }
        }).catch((error)=> {
          console.log(error.response)
        })
      }, [])


    const handleChange = (e) => {
        updateTransactionStatus({
            ...transactionStatus,
            [e.target.name]: e.target.value.trim(),
        })
    };

    
    const handleTransactionStatusUpdate = () => {
        axiosInstance.put(`api/v4/transactions/`, {
            status: transactionStatus.status,
            transaction_id: TransactionID

        }).then((res)=> {
            // console.log(res)
            if (res.status === 200)  {
                SetSuccessMessage('Transaction Updated Successfully')
            }

        }).catch((error)=> {
            console.log(error)

        })
    };

    const handleUpdateStatusValue = (event) => {
        const value = event.target.value

        updateStatusValue(value)
    }


    return (
        <Main open={open}>
            <DrawerHeader />
            <div className="d-flex justify-content-between align-items-center mb-3 rounded bg-light shadow p-3">
                <h1>Deposit Details</h1>
                <h1>Status : {transactionDetail.transaction_status === 'Success' ? 
                        <span className="text-success">Success</span> : 
                        transactionDetail.transaction_status === 'Pending' ? 
                        <span className="text-warning">Pending</span> : 
                        transactionDetail.transaction_status === 'Cancelled' ?
                        <span className="text-danger">Cancelled</span> : 
                        <span className="text-danger">None</span>
                        }
                </h1>
            </div>
            
            <Row>
                <Col xs={8} >

            <div className='p-3 rounded bg-light shadow'>
                
                    <div>
                        <p>Sender : {transactionDetail.sender ? transactionDetail.sender.first_name : 'NA'} {transactionDetail.sender ? transactionDetail.sender.last_name : 'NA'}</p>

                        <p>Transaction ID : {transactionDetail.txdid}</p>

                        <p>Currency : {transactionDetail.sender_currency ? transactionDetail.sender_currency.name: 'NA'}</p>

                        <p>Payment Method : {transactionDetail.sender_payment_mode}</p>

                        <p>Date : {transactionDetail.transaction_time ? (transactionDetail.transaction_time).split('.')[0] : 'NA'}</p>

                        {/* Transaction Status */}
                        {transactionDetail.is_completed === true ? 
                        <>
                            <div className="d-flex pb-3">
                            <p>Change Status :</p>
                            <Form.Select aria-label="Default select example " style={{'width': '15rem'}} onChange={handleChange} name='status' >
                                <option value="Success">Success</option>
                            </Form.Select>
                            </div>
                            <Button variant="primary" className="ms-3 w-25" disabled={true}>Update</Button> 
                            <p className='text-warning'>Transaction already succeeded</p>
                         </>
                         :
                        <>
                            <div className="d-flex pb-3">
                            <p>Change Status :</p>
                            <Form.Select aria-label="Default select example " style={{'width': '15rem'}} onChange={(event)=> {handleChange(event); handleUpdateStatusValue(event);}} name='status' >
                                <option value="Success">Success</option>
                                <option value="Pending">Pending</option>  
                                <option value="Cancelled">Cancel</option>
                            </Form.Select>
                            </div>
                            <Button variant="primary" className="ms-3 w-25" onClick={handleTransactionStatusUpdate}>Update</Button>
                            <br />
                            <p className='text-success'>{successMessage && successMessage}</p>
                        </>
                         }

                    </div>


                
            </div>
            </Col>
            <Col>
            <div className='p-3 rounded bg-light shadow'>
                
                <p>Amount : {transactionDetail.sender_currency ? transactionDetail.sender_currency.name : 'NA'} {transactionDetail.send_amount}</p>
                <p>Fees : {transactionDetail.transaction_fee}</p>
                <br/>
                <p>Total : {transactionDetail.sender_currency ? transactionDetail.sender_currency.name : 'NA'} {transactionDetail.total_amount}</p>
                
            </div>
            </Col>
            </Row>


        </Main>
    )
}