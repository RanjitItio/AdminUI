import { Main, DrawerHeader } from '../Content';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {Row , Col, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';
import PropTypes from 'prop-types';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';



function Media(props) {
    const { loading = false } = props;
  
    return (
      <Card sx={{ maxWidth: 345, m: 2 }}>
        
        {loading ? (
          <Skeleton sx={{ height: 240 }} animation="wave" variant="rectangular" />
        ) : (
            <></>
       
        )}
  
        <CardContent>
          {loading ? (
            <React.Fragment>
              <Skeleton animation="wave" height={50} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={40} width="80%" />
            </React.Fragment>
          ) : (
           
            <></>
          )}
        </CardContent>
      </Card>
    );
  }
  
  Media.propTypes = {
    loading: PropTypes.bool,
  };

  

export default function TransferTransactionDetail({ open }) {

    const initialFormData = {
        status: 'Success'
    }

    const location      = useLocation()
    const TransactionID = location.state.transaction_id

    const [transactionDetail, updateTransactionDetail] = useState([]);
    const [transactionStatus, updateTransactionStatus] = useState(initialFormData);
    const [statusValue, updateStatusValue]             = useState('')
    const [successMessage, SetSuccessMessage]          = useState('')
    const [loader, setLoader]                          = useState(true)


    if (TransactionID) {
        React.useEffect(() => {
            axiosInstance.get(`api/v2/admin/transaction/details/${TransactionID}/`).then((res)=> {
              // console.log(res.data.transaction_data)
              if (res.status === 200) {
                //   console.log(res.data.transaction_data)
                  updateTransactionDetail(res.data.transaction_data[0])
                  setLoader(false)
              }
            }).catch((error)=> {
              console.log(error.response)

            })
          }, [])
    };
    

    const handleChange = (e) => {
        updateTransactionStatus({
            ...transactionStatus,
            [e.target.name]: e.target.value.trim(),
        })
    };

    const handleTransactionStatusUpdate = () => {
        axiosInstance.put(`api/v4/transactions/`, {
            status:         transactionStatus.status,
            transaction_id: TransactionID

        }).then((res)=> {
            // console.log(res)
            SetSuccessMessage('Transaction updated Successfully')

        }).catch((error)=> {
            console.log(error)

        })
    };


    const handleUpdateStatusValue = (event) => {
        const value = event.target.value

        updateStatusValue(value)
    };

    useEffect(() => {
        // Synchronize statusValue with transactionStatus on component mount
        if (transactionStatus.status) {
            updateStatusValue(transactionStatus.status);
        }
    }, [transactionStatus.status]);



    return (
        <Main open={open}>
            <DrawerHeader />
            {loader ? 
                <>
                    <Media loading />
                    <Media />
                </>
            : (
            <>
            {/* Loader Starts */}

            <div className="d-flex justify-content-between align-items-center mb-3 rounded bg-light shadow p-3">
                <h1>Transaction Details</h1>
                <h2>Status : {transactionDetail.transaction_status === 'Success' ? 
                        <span className="text-success">Success</span> : 
                        transactionDetail.transaction_status === 'Pending' ? 
                        <span className="text-warning">Pending</span> : 
                        transactionDetail.transaction_status === 'Cancelled' ?
                        <span className="text-danger">Cancelled</span>  :

                        <span className="text-danger">None</span>
                        }
                 </h2>
            </div>
            <Row>
                <Col xs={8} >

            <div className='p-3 rounded bg-light shadow'>
                    <div>
                        <p>Transaction No: {transactionDetail.transaction_id}</p>

                        <p>Transaction ID : {transactionDetail.txdid}</p>

                        {/* Check the Transaction type is Transfer or Not */}
                        {transactionDetail.transaction_type === 'Transfer' && (
                          <>
                            <b>Sender Details</b>
                            <hr />
                            <p>Sender : {transactionDetail.sender ? transactionDetail.sender.first_name : 'NA'} {transactionDetail.sender ? transactionDetail.sender.last_name : 'NA'}</p>
                            <p>Sender Payment Mode: {transactionDetail.sender_payment_mode}</p>
                            <p>Sender Currency: {transactionDetail.sender_currency.name}</p>
                            <p>Send Amount: {transactionDetail.send_amount} {transactionDetail.sender_currency.name}</p>

                            {transactionDetail.receiver_payment_mode && (
                                <div>{transactionDetail.receiver_payment_mode === 'Wallet' ? 
                                    <>
                                    <b>Receiver Details</b>
                                    <hr />
                                        <p>Name: {transactionDetail.receiver ? transactionDetail.receiver.first_name : 'NA'} {transactionDetail.receiver ? transactionDetail.receiver.last_name : 'NA'}</p>
                                        <p>Email: {transactionDetail.receiver ? transactionDetail.receiver.email : 'NA'}</p>
                                        <p>Payment Mode: {transactionDetail.receiver_payment_mode}</p>
                                        <p>Currency: {transactionDetail.receiver_curreny ? transactionDetail.receiver_curreny : 'NA'}</p>
                                        <p>Amount Receive: {transactionDetail.receiver_amount ? transactionDetail.receiver_amount : 'NA'}</p>
                                    </>
                                : 
                                    <>
                                    <b>Receiver Details</b>
                                    <hr />
                                        <p>Name:                  {transactionDetail.receiver_details ? transactionDetail.receiver_details.full_name : 'NA'}</p>
                                        <p>Email:                 {transactionDetail.receiver_details ? transactionDetail.receiver_details.email : 'NA'}</p>
                                        <p>Payment Mode:          {transactionDetail.receiver_details ? transactionDetail.receiver_details.pay_mode : 'NA'}</p>
                                        <p>Currency:              {transactionDetail.receiver_details ? transactionDetail.receiver_details.currency : 'NA'}</p>
                                        <p>Amount Receive:        {transactionDetail.receiver_details ? transactionDetail.receiver_details.received_amount : 'NA'}</p>
                                        <p>Bank name:             {transactionDetail.receiver_details ? transactionDetail.receiver_details.bank_name : 'NA'}</p>
                                        <p>Account Number:        {transactionDetail.receiver_details ? transactionDetail.receiver_details.acc_no : 'NA'}</p>
                                        <p>IFSC Code:             {transactionDetail.receiver_details ? transactionDetail.receiver_details.ifsc_code : 'NA'}</p>
                                        <p>Additional Info:       {transactionDetail.receiver_details ? transactionDetail.receiver_details.additional_info : 'NA'}</p>
                                        <p>Address:               {transactionDetail.receiver_details ? transactionDetail.receiver_details.address : 'NA'}</p>
                                    </>
                                }</div>
                            )}

                          </>
                        )}

                        <p>Transaction Date : {transactionDetail.transaction_date ? (transactionDetail.transaction_date).split('.')[0] : 'NA'} &nbsp;
                                              {transactionDetail.transaction_time ? (transactionDetail.transaction_time).split('.')[0] : 'NA'}
                        </p>

                          <br />

                        {transactionDetail.transaction_status === 'Success' ? 
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
                            <Form.Select aria-label="Default select example" style={{'width': '15rem'}} onChange={(event)=> {handleChange(event); handleUpdateStatusValue(event);}} name='status' value={statusValue} >
                                <option value="Success">Success</option>
                                <option value="Pending">Pending</option>  
                                <option value="Cancelled">Cancel</option>
                            </Form.Select>
                            </div>
                            <Button variant="primary" className="ms-3 w-25" onClick={handleTransactionStatusUpdate}>Update</Button>

                            {successMessage && <p className='text-success'>{successMessage}</p>}
                        </>
                         }
                        
                    </div>
            </div>
            </Col>
            <Col>
            <div className='p-3 rounded bg-light shadow'>
                
                    <p>Send Amount : {transactionDetail.sender_currency ? transactionDetail.sender_currency.name : 'NA'} {transactionDetail.send_amount}</p>
                    <p>Fees : {transactionDetail.transaction_fee}</p>
                    <br/>
                    <p>Total Amount : {transactionDetail.sender_currency ? transactionDetail.sender_currency.name : 'NA'} {transactionDetail.total_amount}</p>
                   
            </div>
            </Col>
            </Row>


            {/* Loader Ends */}
              </>)}
            


        </Main>
    )
}