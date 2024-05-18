import React, { useState } from 'react';
import { Form, Button, ToggleButton, DropdownButton, Dropdown, Card } from 'react-bootstrap';
import { Main, DrawerHeader } from '../Content';

function AddTatumio({ open }) {
    const [form, setForm] = useState({
        symbol: '',
        apiKey: '',
        pin: '',
        merchantAddress: '',
        createAddresses: false,
        status: 'Active',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <Main open={open}>
            <DrawerHeader />
            <Card>
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
                <Form.Group controlId="formSymbol">
                    <Form.Label>Symbol (eg - ₿)</Form.Label>
                    <Form.Control
                        type="text"
                        name="symbol"
                        value={form.symbol}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formLogo">
                    <Form.Label>Logo</Form.Label>
                    <Form.Control type="file" />
                    <Form.Text className="text-muted">
                        Recommended Dimension: 64 px * 64 px
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formApiKey">
                    <Form.Label>API Key</Form.Label>
                    <Form.Control
                        type="text"
                        name="apiKey"
                        value={form.apiKey}
                        onChange={handleChange}
                    />
                    <Form.Text muted>
                        *Network/Cryptocurrency is generated according to API key.
                        *Updating API key will update corresponding cryptocurrency.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formPin">
                    <Form.Label>PIN</Form.Label>
                    <Form.Control
                        type="password"
                        name="pin"
                        value={form.pin}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formMerchantAddress">
                    <Form.Label>Merchant Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="merchantAddress"
                        value={form.merchantAddress}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formCreateAddresses">
                    <Form.Check
                        type="switch"
                        label="Create Addresses"
                        name="createAddresses"
                        checked={form.createAddresses}
                        onChange={handleChange}
                    />
                    <Form.Text muted>
                        *If On, wallet addresses will be created for all registered users.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formStatus">
                    <Form.Label>Status</Form.Label>
                    <DropdownButton id="dropdown-item-button" title={form.status}>
                        <Dropdown.Item as="button">Active</Dropdown.Item>
                        <Dropdown.Item as="button">Inactive</Dropdown.Item>
                    </DropdownButton>
                    <Form.Text muted>
                        *Updating status will update corresponding cryptocurrency.
                    </Form.Text>
                </Form.Group>

                <Button variant="danger" className='mx-2' type="button">
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

export default AddTatumio;
