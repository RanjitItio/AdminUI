import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, IconButton, TablePagination, InputAdornment } from '@mui/material';
import { Search, Delete, Edit } from '@mui/icons-material';
import { Main, DrawerHeader } from '../Content';
import Card from "react-bootstrap/Card";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const TicketTable = ({ open }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchText, setSearchText] = useState('');
    const TicketsData = [
        { Date: '24-08-2002', User: 'Ashish', Subject: '$', Status: 'Active', Priority: 'High', Assigned: 'Raman', LastReply: 'Ticket for USD currency', Action: '' },
        { Date: '24-08-2002', User: 'Ashish', Subject: '$', Status: 'Active', Priority: 'High', Assigned: 'Raman', LastReply: 'Ticket for USD currency', Action: '' },
        { Date: '24-08-2002', User: 'Ashish', Subject: '$', Status: 'Active', Priority: 'High', Assigned: 'Raman', LastReply: 'Ticket for USD currency', Action: '' },
        // Add more currency objects as needed
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredCurrencies = TicketsData.filter(User =>
        User.User.toLowerCase().includes(searchText.toLowerCase()) ||
        User.Subject.toLowerCase().includes(searchText.toLowerCase())
    );

    const getLastSevenDays = ()=> {
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        
        const formatDate = `0${sevenDaysAgo.getMonth()}/0${sevenDaysAgo.getDate()}/${sevenDaysAgo.getFullYear()}`;
        return formatDate;
      }
    const [dateFormat, setDateFormt] = React.useState('')
    const [wStatus, setwStatus] = React.useState('')
    const dateFormats = [
        {label: 'Today', value: '01/02/2024'},
        {label: 'Yesterday', value: '03/04/2024'},
        {label: 'Last 7 Days', value: getLastSevenDays()},
        {label: 'Last 30 Days', value: '10/02/2024'},
        {label: 'This Month', value: '10/02/2024'},
        {label: 'Last month', value: '10/02/2024'},
      ]
      
      const WithdrawlStatus = [
        {value: 'All'},
        {value: 'Success'},
        {value: 'Pending'},
        {value: 'Cancelled'},
      ]

    return (
        <Main open={open}>
            <DrawerHeader />
            <div className=' align-items-center mb-3'>
            <Paper sx={{ width: '100%', height: '90px', mb: 2 }}>
            <FormControl sx={{minWidth: 170, marginTop: '14px', marginLeft: '10px'}} >
                <InputLabel id="demo-simple-select-helper-label">Pick a date range</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={dateFormat} label="DateFormat">
                    {dateFormats.map((format, index)=> (
                        <MenuItem key={index} value={format.value}>{format.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            

            <FormControl sx={{minWidth: 120, marginTop: '14px', marginLeft: '10px'}} >
                <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={wStatus} label="wStatus">
                    {WithdrawlStatus.map((w, index)=> (
                        <MenuItem key={index} value={w.value}>{w.value}</MenuItem>
                    ))}
                </Select>
            </FormControl>  

            

            <TextField sx={{marginTop: '14px', marginLeft: '10px'}}  id="outlined-basic" label="Enter user name" variant="outlined" />

            <Button sx={{marginTop: '20px', marginRight: '10px', float: 'right'}} variant="contained">Filter</Button>
        </Paper>
                <div className='mt-5'>
                    <div className='w-100 shadow-sm mb-2 py-3 px-2 d-flex justify-content-end'>
                        <Button variant="contained" color="primary" startIcon={<Edit />}>Add Currency</Button>
                    </div>

                    <div className='w-100 shadow-sm mb-2 py-3 px-2 d-flex justify-content-around gap-5'>
                        <Card className='border-0 shadow-sm '>
                            <Card.Body>
                                <h1>2</h1>
                            </Card.Body>
                            <Card.Footer className='border-0 '>
                                OPEN
                            </Card.Footer>
                        </Card>
                        <Card className='border-0 shadow-sm '>
                            <Card.Body>
                                <h1>0</h1>
                            </Card.Body>
                            <Card.Footer className='border-0 '>
                            In Progress
                            </Card.Footer>
                        </Card>
                        <Card className='border-0 shadow-sm '>
                            <Card.Body>
                                <h1>2</h1>
                            </Card.Body>
                            <Card.Footer className='border-0 '>
                            Hold
                            </Card.Footer>
                        </Card>
                        <Card className='border-0 shadow-sm '>
                            <Card.Body >
                                <h1>2</h1>
                            </Card.Body>
                            <Card.Footer className='border-0 '>
                            Closed
                            </Card.Footer>
                        </Card>

                    </div>

                    <div className='w-100 shadow-sm mb-2 '>

                        <TextField
                            label="Search"
                            variant="outlined"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='px-5'>Date</TableCell>
                                        <TableCell className='px-5'>User</TableCell>
                                        <TableCell className='px-5'>Subject</TableCell>
                                        <TableCell className='px-5'>Status</TableCell>
                                        <TableCell className='px-5'>Priority</TableCell>
                                        <TableCell className='px-5'>Last Reply</TableCell>
                                        <TableCell className='px-5'>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredCurrencies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(currency => (
                                        <TableRow key={currency.Code}>
                                            <TableCell>{currency.Date}</TableCell>
                                            <TableCell>{currency.User}</TableCell>
                                            <TableCell>{currency.Subject}</TableCell>
                                            <TableCell>{currency.Status}</TableCell>
                                            <TableCell>{currency.Priority}</TableCell>
                                            <TableCell>{currency.LastReply}</TableCell>
                                            <TableCell>
                                                <IconButton color="primary">
                                                    {/* Edit Button */}
                                                    <Edit />
                                                </IconButton>
                                                <IconButton color="secondary">
                                                    {/* Delete Button */}
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredCurrencies.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>

                </div>
            </div>

        </Main>

    );
};

export default TicketTable;
