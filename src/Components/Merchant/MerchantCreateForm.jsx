import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {Main, DrawerHeader} from '../Content';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




function MerchantCreateForm({open}) {
    
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    'user_id': '',
    'user': '',
    'merchant_name': '',
    'merchant_type': '',
    'url': '',
    'status': '',
    'logo': '',
  })

  const [formData, updateFormData] = useState(initialFormData)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormChange = (e)=> {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleFormSubmit = async (e)=> {
    e.preventDefault();
    let validationError = [];
    console.log(formData)

    if (formData.user == ''){
      validationError.push('Please Select any user')
    }
    else if (formData.user_id == ''){
      validationError.push('Please fill in the User ID')
    }
    else if (formData.merchant_name == ''){
      validationError.push('Please fill in Merchant name ')
    }
    else if (formData.merchant_type == ''){
      validationError.push('Please fill in Merchant Type')
    }
    else if (formData.status == ''){
      validationError.push('Please Select Merchant status')
    }

    if (validationError.length > 0) {
      setError(validationError.join(''));
      return;
    } else {
      setError('')
      setSuccessMessage(`Dear ${formData.first_name} ${formData.last_name} you have been Registered Successfully Please fill the KYC details`)

    }
  };

  return (

    <Main open={open} style={{ backgroundImage: 'url("/vite.svg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
    <DrawerHeader />

        <Form className='container my-4 rounded shadow-lg' method='post' >
            <h4><b>Add New Merchant</b></h4>
            <Row className="mb-2">
                <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12 my-2' controlId="last_name">
                    <Form.Label><b>User ID :</b></Form.Label>
                    <Form.Control type="text" placeholder="Enter User ID" name='user_id' onChange={handleFormChange} />
                </Form.Group>

                <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12 my-2' controlId="user">
                    <Form.Label><b>User :</b></Form.Label>
                    <Form.Select defaultValue="Choose..." name='user' onChange={handleFormChange}>
                        <option>Choose...</option>
                        <option>Ranjit</option>
                        <option>Ramesh</option>
                        <option>Naresh</option>
                    </Form.Select>
                </Form.Group>
            </Row>

            <Row className="mb-2">
                <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="merchant_name">
                    <Form.Label><b>Merchant Name :</b></Form.Label>
                    <Form.Control type="text" placeholder="Enter merchant name" name='merchant_name' onChange={handleFormChange} />
                </Form.Group>

                <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="merchant_type">
                    <Form.Label><b>Merchant Type :</b></Form.Label>
                    <Form.Control type="text" placeholder="Enter Merchant type" name='merchant_type' onChange={handleFormChange} />
                </Form.Group>
            </Row>

            <Row className="mb-2">
                <Form.Group className='col-md-12 col-lg-12 col-sm-12 col-xs-12' controlId="url">
                    <Form.Label><b>Web URL :</b></Form.Label>
                    <Form.Control type="text" placeholder="Enter Web URL" name='url' onChange={handleFormChange} />
                </Form.Group>

            </Row>

            <Row className="mb-2">
                <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="formGridEmail">
                    <Form.Label><b>Upload Logo :</b></Form.Label>
                    <Form.Control type="file" placeholder="logo" name='logo' onChange={handleFormChange} />
                </Form.Group>
            </Row>
            
            <Row className="mb-2">
                <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="formGridEmail">
                    <Form.Label><b>Status :</b></Form.Label>
                    <Form.Select defaultValue="Choose..." name='status' onChange={handleFormChange}>
                        <option>Choose...</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </Form.Select>
                </Form.Group>
            </Row>

            <center>
                <Button variant="primary" type="submit" className='my-3' onClick={handleFormSubmit}>
                Create Merchant
                </Button>

                <Button variant="danger" type="submit" className='mx-2' onClick={()=> navigate('/admin/merchant/')}>
                    Cancel
                </Button>
                <br />

                {error &&  <p className="text-danger">{error}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}
            </center>
            
        </Form>
    </Main>
    
  );
}


export default MerchantCreateForm;