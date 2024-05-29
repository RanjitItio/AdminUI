import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {Main, DrawerHeader} from '../Content';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




function TicketAddForm({open}) {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    'first_name': '',
    'last_name': '',
    'email': '',
    'group': '',

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

    if (formData.first_name == ''){
      validationError.push('Please fill in the First Name')
    }
    else if (formData.last_name == ''){
      validationError.push('Please fill in the Last Name')
    }
    else if (formData.email == ''){
      validationError.push('Please fill in the Email Address')
    }
  
 
    else if (formData.group == ''){
      validationError.push('Please Select the Group type')
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

    <Main open={open} >
    <DrawerHeader />

  <Form className='container my-4 rounded shadow-lg' method='post' >
      <h4><b>Add Ticket</b></h4>
      <Form.Group className='my-2' controlId="first_name">
          <Form.Label><b>Subject :</b> </Form.Label>
          <Form.Control type="text" placeholder="Enter Subject" name='Subject' onChange={handleFormChange} />
        </Form.Group>

        <Form.Group className='my-2' controlId="first_name">
          <Form.Label><b>Body:</b> </Form.Label>
          <Form.Control as="textarea" rows={8} />
        </Form.Group>

      <Row className="mb-2">
        <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12 my-2' controlId="first_name">
          <Form.Label><b>Assignee :</b> </Form.Label>
          <Form.Select defaultValue="Choose..." name='group' onChange={handleFormChange}>
            <option>Choose...</option>
            <option>Default User</option>
            <option>Admin user</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12 my-2' controlId="last_name">
          <Form.Label><b>Status :</b></Form.Label>
          <Form.Select defaultValue="Choose..." name='group' onChange={handleFormChange}>
            <option>Choose...</option>
            <option>Open</option>
            <option>In Process</option>
            <option>Hold</option>
            <option>Close</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-2">
        <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="formGridEmail">
          <Form.Label><b>User :</b></Form.Label>
          <Form.Control type="text" placeholder="Enter email" name='email' onChange={handleFormChange} />
        </Form.Group>

        
      
        <Form.Group className='col-md-6 col-lg-6 col-sm-12 col-xs-12' controlId="formGridEmail">
          <Form.Label><b>Priority :</b></Form.Label>
          <Form.Select defaultValue="Choose..." name='group' onChange={handleFormChange}>
            <option>Choose...</option>
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
          </Form.Select>
        </Form.Group>
      </Row>


      <center>
        <Button variant="primary" type="submit" className='my-3' onClick={handleFormSubmit}>
          Create User
        </Button>

        <Button variant="danger" type="submit" className='mx-2' onClick={()=> navigate('/admin/admin-user/')}>
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


export default TicketAddForm;