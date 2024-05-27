import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Nav, Form, } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Main, DrawerHeader } from "../Content"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TicketTable from "./UsersTecketTable"
import WalletTable from './UserWalletsTable';
import TransactionTable from './UsersTransactionTable';
import DisputeTable from './UserDisputesTable'
import Modal from 'react-bootstrap/Modal';
import UserDeposit from './UserDeposit';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';



const Profile = ({ open }) => {
    const [phone, setPhone] = useState('');
    const [group, setGroup] = useState('');
    const [status, setStatus] = useState('');
    const [activeTab, setActiveTab] = useState('profile');
    const [showDeposit, setShowDeposit] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const handleCloseDeposit = () => setShowDeposit(false);
  const handleShowDeposit = () => setShowDeposit(true);

    const TicketTableHead = [
        {
            id: "date",
            numeric: false,
            disablePadding: true,
            label: "Date",
        },
        {
            id: "subject",
            numeric: false,
            disablePadding: false,
            label: "Subject",
        },
        {
            id: "status",
            numeric: false,
            disablePadding: true,
            label: "Status",
        },
        {
            id: "priority",
            numeric: false,
            disablePadding: false,
            label: "Priority",
        },

        {
            id: "lastreply",
            numeric: false,
            disablePadding: false,
            label: "Last Reply",
        },

        {
            id: "action",
            numeric: false,
            disablePadding: false,
            label: "Action",
        },


    ];

    const WalletTableHead = [
        {
            id: "date",
            numeric: false,
            disablePadding: true,
            label: "Date",
        },
        {
            id: "balance",
            numeric: false,
            disablePadding: false,
            label: "Balance",
        },
        {
            id: "currency",
            numeric: false,
            disablePadding: true,
            label: "Status",
        },
        {
            id: "defult",
            numeric: false,
            disablePadding: false,
            label: "Defult",
        },



    ];

    const TransactionTableHead = [
        {
            id: "date",
            numeric: false,
            disablePadding: true,
            label: "Date",
        },
        {
            id: "user",
            numeric: false,
            disablePadding: false,
            label: "User",
        },
        {
            id: "type",
            numeric: false,
            disablePadding: true,
            label: "Type",
        },
        {
            id: "Amount",
            numeric: false,
            disablePadding: false,
            label: "amount",
        },
        {
            id: "fees",
            numeric: false,
            disablePadding: false,
            label: "Fees",
        },
        {
            id: "total",
            numeric: false,
            disablePadding: false,
            label: "Total",
        },
        {
            id: "currency",
            numeric: false,
            disablePadding: false,
            label: "Currency",
        },
        {
            id: "receiver",
            numeric: false,
            disablePadding: false,
            label: "Receiver",
        },
        {
            id: "status",
            numeric: false,
            disablePadding: false,
            label: "Status",
        },
        {
            id: "action",
            numeric: false,
            disablePadding: false,
            label: "Action",
        },

    ];
    const DisputeTableHead = [
        {
            id: "date",
            numeric: false,
            disablePadding: true,
            label: "Date",
        },
        {
            id: "dispute_id",
            numeric: false,
            disablePadding: false,
            label: "Disputes",
        },
        {
            id: "title",
            numeric: false,
            disablePadding: true,
            label: "Title",
        },
        {
            id: "claimant",
            numeric: false,
            disablePadding: false,
            label: "Claimant",
        },
        {
            id: "transaction_id",
            numeric: false,
            disablePadding: false,
            label: "Transaction ID",
        },

        {
            id: "status",
            numeric: false,
            disablePadding: false,
            label: "Status",
        },


    ];



    const TicketTableName = "Tickets"
    const WalletsTableName = " Wallets"
    const TransactionTableName = "Transactions"
    const DisputeTableName = "Dispute"


    // Sample data for the table

    const ticketData = [];
    const WalletsData = [];
    const TransactionsData = [];
    const DisputeData = [];

    return (
        <Main open={open}>
            <DrawerHeader />

            <Modal show={showDeposit} style={{margin:'10rem'}} onHide={handleCloseDeposit} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Deposit</Modal.Title>
                </Modal.Header>
                <Card>
                   
                    <Card.Body>

                    <UserDeposit/>
                    </Card.Body>

                </Card>
            </Modal>
            <Modal show={show} style={{margin:'10rem'}} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Withdraw</Modal.Title>
                </Modal.Header>
                <Card>
                   
                    <Card.Body>

                    <UserDeposit/>
                    </Card.Body>

                </Card>
            </Modal>

            <Container fluid>
                <Row className="my-3">
                    <Col>
                        <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
                            <Nav.Item>
                                <Nav.Link eventKey="profile">Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="transactions">Transactions</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="wallets">Wallets</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="tickets">Tickets</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="disputes">Disputes</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
                {activeTab === 'profile' && (
                    <Card className='shadow'>
                        <Card.Body>
                            <Row className="">
                                <Col className="d-flex align-items-center justify-content-between mb-3">
                                    <h3>gvjjh hvbjkh <span className="badge bg-success">Active</span></h3>
                                    <div>
                                        <Button variant="primary" className="me-2" onClick={handleShowDeposit}>Deposit</Button>
                                        <Button variant="secondary" onClick={handleShow} >Withdraw</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                )}
                {activeTab === 'profile' && (
                    <Row>
                        <Col md={6} lg={4} className="mb-3">
                            <Card className='shadow'>
                                <Card.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <TextField label="First Name" variant="outlined" fullWidth />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <TextField label="Last Name" variant="outlined" fullWidth />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <TextField
                                                country={'us'}
                                                variant="outlined"
                                                value={phone}
                                                label="Phone Number"
                                                onChange={phone => setPhone(phone)}
                                                fullWidth
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <TextField label="Email" variant="outlined" fullWidth type="email" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Group</InputLabel>
                                                <Select
                                                    value={group}
                                                    onChange={e => setGroup(e.target.value)}
                                                    label="Group"
                                                >
                                                    <MenuItem value="Merchant Regular">Merchant Regular</MenuItem>
                                                    <MenuItem value="Merchant VIP">Merchant VIP</MenuItem>
                                                    <MenuItem value="Admin">Admin</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <TextField label="Password" variant="outlined" fullWidth type="password" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <TextField label="Confirm Password" variant="outlined" fullWidth type="password" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Status</InputLabel>
                                                <Select
                                                    value={status}
                                                    onChange={e => setStatus(e.target.value)}
                                                    label="Status"
                                                >
                                                    <MenuItem value="Active">Active</MenuItem>
                                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                                    <MenuItem value="Suspended">Suspended</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Form.Group>
                                        <div className="d-flex justify-content-between">
                                            <Button variant="danger">Cancel</Button>
                                            <Button variant="primary">Update</Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}

                {activeTab === 'wallets' && (
                    <WalletTable headCells={WalletTableHead} TableName={WalletsTableName} rows={WalletsData} />

                )}
                {activeTab === 'tickets' && (
                    <>

                        <TicketTable headCells={TicketTableHead} TableName={TicketTableName} rows={ticketData} />
                    </>

                )}
                {activeTab === 'transactions' && (
                    <TransactionTable headCells={TransactionTableHead} TableName={TransactionTableName} rows={TransactionsData} />
                )}
                {activeTab === 'disputes' && (
                    <DisputeTable headCells={DisputeTableHead} TableName={DisputeTableName} rows={DisputeData} />
                )}
            </Container>
        </Main>

    );
};

export default Profile;
