import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, IconButton, TablePagination, InputAdornment } from '@mui/material';
import { Search ,Delete ,Edit} from '@mui/icons-material';
import { Main,DrawerHeader }  from '../Content';
const CurrencyTable = ({open}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchText, setSearchText] = useState('');
    const currenciesData = [
        { Name: 'USD', Code: 'USD', Symbol: '$', Type: 'USD', Rate: 1, Logo: 'url_to_logo', Status: 'Active' },
        { Name: 'EUR', Code: 'EUR', Symbol: '€', Type: 'EUR', Rate: 0.85, Logo: 'url_to_logo', Status: 'Active' },
        { Name: 'INR', Code: 'INR', Symbol: 'rd', Type: 'INR', Rate: 0.85, Logo: 'url_to_logo', Status: 'Active' },
        // Add more currency objects as needed
      ];
    
    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };

    const filteredCurrencies = currenciesData.filter(currency =>
    currency.Name.toLowerCase().includes(searchText.toLowerCase()) ||
    currency.Code.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <Main open={open}>
        <DrawerHeader />
    <div className='d-flex justify-content-end align-items-center mb-3'>
        <div className='mt-5'>
    <div className='w-100 shadow-sm mb-2 py-3 px-2 d-flex justify-content-end'>
        <Button variant="contained" color="primary" startIcon={<Edit />}>Add Currency</Button>
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
      <TableContainer  component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='px-5'>Name</TableCell>
              <TableCell className='px-5'>Code</TableCell>
              <TableCell className='px-5'>Symbol</TableCell>
              <TableCell className='px-5'>Type</TableCell>
              <TableCell className='px-5'>Rate</TableCell>
              <TableCell className='px-5'>Logo</TableCell>
              <TableCell className='px-5'>Status</TableCell>
              <TableCell className='px-5'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCurrencies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(currency => (
              <TableRow key={currency.Code}>
                <TableCell>{currency.Name}</TableCell>
                <TableCell>{currency.Code}</TableCell>
                <TableCell>{currency.Symbol}</TableCell>
                <TableCell>{currency.Type}</TableCell>
                <TableCell>{currency.Rate}</TableCell>
                <TableCell><img src={currency.Logo} alt={currency.Code} style={{ width: 50, height: 50 }} /></TableCell>
                <TableCell>{currency.Status}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    {/* Edit Button */}
                    <Edit/>
                  </IconButton>
                  <IconButton color="secondary">
                    {/* Delete Button */}
                    <Delete/>
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

export default CurrencyTable;
