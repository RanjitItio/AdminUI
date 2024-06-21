import { Main, DrawerHeader } from '../Content';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import {Row , Col, Button} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';
import { useState , useEffect} from 'react';




export default function MerchantPaymentUpdate({ open }) {
    const initialFormData = {
        status: 'Success'
    }

    const location          = useLocation();
    const navigate          = useNavigate();
    const business_payments = location.state?.payments || ''

    const [transactionStatus, updateTransactionStatus] = useState(initialFormData);
    // const [statusValue, updateStatusValue]             = useState('')
    const [successMessage, SetSuccessMessage]          = useState('');
    const [disableButton, setDisableButton]            = useState(false);


    useEffect(() => {

      }, [])


    const handleChange = (e) => {
        updateTransactionStatus({
            ...transactionStatus,
            [e.target.name]: e.target.value.trim(),
        })
    };



    const handleTransactionStatusUpdate = () => {
        axiosInstance.put(`api/v4/admin/merchant/payment/update/`, {
            id: business_payments.id,
            status: transactionStatus.status

        }).then((res)=> {
            // console.log(res)
            SetSuccessMessage('Transaction updated successfully')
            setDisableButton(true)

            setTimeout(() => {
                navigate('/admin/merchant-payments/')
            }, 1000);
            

        }).catch((error)=> {
            console.log(error)

        })
    };

    // const handleUpdateStatusValue = (event) => {
    //     const value = event.target.value

    //     updateStatusValue(value)
    // }


    const getStatusColor = (status)=> {
          switch (status) {
            case 'Success':
                return 'success'
            case 'Cancelled':
                return 'danger'
            case 'Pending':
                return 'warning'
          }
    };

    if (business_payments === '') {
        return (
            <Main open={open}>
                <DrawerHeader />
                <p className='fs-3 d-flex justify-content-center'><b>Go back and re edit the Transaction</b></p>
            </Main>
        )
    };


    return (
        <Main open={open}>
            <DrawerHeader />
            <div className="d-flex justify-content-between align-items-center mb-3 rounded bg-light shadow p-3">
                <h1>Merchant Payment Details</h1>
                <h1>Status: <span className={`text-${getStatusColor(business_payments.status)}`}>{business_payments.status}</span></h1>
            </div>

            <Row>
                <Col xs={8} >
                    <div className='p-3 rounded bg-light shadow'>
                        
                        <div>
                            <p><b>User</b> : {business_payments.user}</p>

                            <p><b>Merchant</b> : {business_payments.merchant}</p>

                            <p><b>Transaction ID</b> : {business_payments.id}</p>

                            <p><b>Currency</b> : {business_payments.currency}</p>

                            <p><b>Payment Method</b> : {business_payments.pay_mode}</p>

                            <p><b>Date</b> : {business_payments.date}</p>

                            {/* Transaction Status */}
                            {business_payments.is_completed === true ? 
                            <>
                                <div className="d-flex pb-3">
                                <p>Change Status :</p>

                                <Form.Select 
                                      aria-label="Default select example" 
                                      style={{'width': '15rem'}} 
                                      onChange={handleChange} 
                                      name='status' 
                                      disabled
                                      >
                                    <option value="Success">Approved</option>
                                </Form.Select>
                                </div>
                                <Button variant="primary" className="ms-3 w-25" disabled={true}>Update</Button> 
                                <p className='text-warning'>Transaction Already Completed</p>
                                </>
                                :
                            <>
                                <div className="d-flex pb-3">
                                <p>Change Status :</p>
                                <Form.Select aria-label="Default select example " style={{'width': '15rem'}} onChange={(event)=> {handleChange(event);}} name='status' >
                                    <option value="Success">Approve</option>
                                    <option value="Pending">On Hold</option>  
                                    <option value="Cancel">Cancel</option>
                                </Form.Select>
                                </div>
                                <Button
                                    variant="primary" 
                                    className="ms-3 w-25" 
                                    onClick={handleTransactionStatusUpdate}
                                    disabled={disableButton}
                                    >
                                        Update
                                </Button>
                                <br />
                                <p className='text-success'>{successMessage && successMessage}</p>
                            </>
                                }

                        </div>
                    </div>
            </Col>
            <Col>
            <div className='p-3 rounded bg-light shadow'>
                
                <p><b>Transaction Amount</b>: {business_payments.total_amount} {business_payments.currency}</p>
                <p><b>Fees </b>: {business_payments.fee} {business_payments.currency}</p>
                <p><b>Credit Amount</b>: {business_payments.amount} {business_payments.currency}</p>
                <br/>
                
            </div>
            </Col>
            </Row>


        </Main>
    )
}