import React from 'react';
import { Form, Button, ToggleButton, DropdownButton, Dropdown } from 'react-bootstrap';
import { Main, DrawerHeader } from '../Content';
import { Card } from 'react-bootstrap';

function AddBlockio({ open }) {
    // Add your form handling logic here

    return (
        <Main open={open}>
            <DrawerHeader />
            <Card>
        {/* <Card.Header>Add New Currency</Card.Header> */}
        <Card.Header>Add New Asset</Card.Header>
        <Card.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="e.g., Bitcoin or Litecoin" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Coin/Network</Form.Label>
                    <Form.Control type="text" placeholder="Enter network code (e.g., BTC)" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Symbol</Form.Label>
                    <Form.Control type="text" placeholder="Symbol (e.g., ₿)" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Logo</Form.Label>
                    <Form.Control type="file" />
                    <Form.Text muted>
                        *Recommended Dimension: 64 px * 64 px
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>API Key</Form.Label>
                    <Form.Control type="text" placeholder="Please enter valid API key" />
                    <Form.Text muted>
                        *Network/Cryptocurrency is generated according to API key.
                        *Updating API key will update corresponding cryptocurrency.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>PIN</Form.Label>
                    <Form.Control type="password" placeholder="Please enter valid PIN" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Merchant Address</Form.Label>
                    <Form.Control type="text" placeholder="Please enter valid merchant address" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Create Addresses</Form.Label>
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label=""

                    />
                    <Form.Text muted>
                        *If On, wallet addresses will be created for all registered users.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <DropdownButton id="dropdown-item-button" title="Active">
                        <Dropdown.Item as="button">Active</Dropdown.Item>
                        <Dropdown.Item as="button">Inactive</Dropdown.Item>
                    </DropdownButton>
                    <Form.Text muted>
                        *Status indicates whether the asset is currently active.
                    </Form.Text>
                </Form.Group>
                


                <Button variant="secondary" className="mx-2" type="button">
                    Cancel
                </Button>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                
            </Form>
            </Card.Body>
      </Card>
        </Main>
    );
}




export default AddBlockio;
