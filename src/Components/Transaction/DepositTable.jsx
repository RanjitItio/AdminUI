import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import DepositTableEditModal from './DepositEditModal';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';
import { useState } from 'react';
import { subDays, startOfMonth, endOfMonth, subMonths, format } from 'date-fns';





function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}




function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}



function EnhancedTableHead({ headCells, order, orderBy, onRequestSort, rowCount, numSelected, onSelectAllClick }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <b>{headCell.label}</b>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  headCells: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar({ numSelected, TableName }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 3 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          <b>{TableName}</b>
        </Typography>
      )}
      {/* Add your filter and download buttons here */}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  TableName: PropTypes.string.isRequired,
};


function getStatusColor(status){
    switch (status) {
        case 'Success':
            return 'green';
        case 'Pending':
            return 'orange';
        case 'Cancelled':
            return 'red';
        default:
            return 'black';
    }
}



export default function DepositTable({headCells, rows, TableName, handleTransactionStatusUpdate, setStaus, status, updateTransactionData}) {

  const initialFormData = {
    from_date: '',
    to_date: '',
    currency: '',
    status: '',
    user_name: '',
    payment_mode: ''
  }

  const [order, setOrder]             = useState('desc');
  const [orderBy, setOrderBy]         = useState('id');
  const [selected, setSelected]       = useState([]);
  const [page, setPage]               = useState(0);
  const [dense, setDense]             = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError]             = useState('')

  const navigate =  useNavigate()

  // State to opon dialogue box for edit button
  const [open, setOpen] = React.useState(false);

  // Open the edit modal
  const handleDepositEdit = () => {
    setOpen(true);
  };

  // Close the Edit Modal
  const handleDepositEditClose = () => {
    setOpen(false);
  };


  // Update the transaction id and send in API request
  const handleUpdateTransactionID = (transaction)=> {
      // handleDepositEdit();
      navigate('/admin/deposits/update/', {state: {transactionID: transaction}})
   };

   const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
 

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const rowsperPage = parseInt(event.target.value, 10)
    setRowsPerPage(rowsperPage);
    setPage(0);

    let limit = rowsperPage
    let offset = 0

    axiosInstance.get(`api/v1/deposits/?limit=${limit}&offset=${offset}`).then((res)=> {
         if (res.data && res.data.data) {
          console.log(res.data.data)
            updateTransactionData(res.data.data)
         }
    }).catch((error)=> {
        console.log(error.response)
    })
  };


  // To change the pagination of table after page loads
  useEffect(()=> {
    setTimeout(() => {
      setRowsPerPage(25);
      setPage(0);
      // console.log('Changed')

    }, 1000);

  }, [])

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );
  // console.log(visibleRows)


  // Filter Methods////
  /////////-------///////
  const [currencies, setCurrencies]             = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [filterFormData, updateFilterFormData]  = useState(initialFormData);
  const [dateFormat, setDateFormat]             = useState('');
  const [filterRerender, setFilterRerender]     = useState(false);
  const [wStatus, setwStatus]                   = useState('');
  const [payMethod, setPaymethod]               = useState('');


  

  const handleCurrencyChange = (event)=> {
    setSelectedCurrency(event.target.value)
  }

  const handleStausChange = (event)=> {
    setwStatus(event.target.value)
  }

  const handelPaymentMethodChange = (event)=> {
    setPaymethod(event.target.value)
  }
  

  const PaymentMethods = [
    {value: 'Bank'},
    {value: 'Crypto'},
    {value: 'Wallet'},
    {value: 'Stripe'},
    {value: 'Paypal'},
    {value: 'UPI'},
  ]

  const WithdrawlStatus = [
    {value: 'All'},
    {value: 'Success'},
    {value: 'Pending'},
    {value: 'Cancelled'},
  ]


  const dateFormats = [
    {label: 'Today', value: 'Today'},
    {label: 'Yesterday', value: 'Yesterday'},
    {label: 'Last 7 Days', value: 'Last 7 Days'},
    {label: 'Last 30 Days', value: 'Last 30 Days'},
    {label: 'This Month', value: 'This Month'},
    {label: 'Last month', value: 'Last month'},
  ]

  // Fetch the currencies from API and show in Dropdown
  useEffect(() => {
    axiosInstance.get(`api/v2/currency/`).then((res)=> {

      if (res.data && res.data.currencies){
        setCurrencies(res.data.currencies)
        // console.log(res.data.currencies)
      };
    }).catch((error)=> {
      console.log(error.response)
    });

  }, [])


  // date Configurations
  const getCurrentDate = () =>  {
    const today = new Date();
    return format(today, 'yyyy-MM-dd')
  }

  const getYesterDay = () => {
    const yesterday = subDays(new Date(), 1)
    return format(yesterday, 'yyyy-MM-dd');
  }

  const getLastSevenDays = () => {
    const today = new Date()

    const lastSevenDays = subDays(today, 7)
    return {
      from_date: format(lastSevenDays, 'yyyy-MM-dd'),
      to_date: format(today, 'yyyy-MM-dd'),
    };
  }

  const getLastThirtyDays = () => {
    const today = new Date();
    const lastThirtyDays = subDays(today, 30);
    return {
      from_date: format(lastThirtyDays, 'yyyy-MM-dd'),
      to_date: format(today, 'yyyy-MM-dd'),
    };
  };

  const getThisMonth = () => {
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);
    return {
      from_date: format(start, 'yyyy-MM-dd'),
      to_date: format(end, 'yyyy-MM-dd'),
    };
  };


  const getLastMonth = () => {
    const today = new Date();
    const start = startOfMonth(subMonths(today, 1));
    const end = endOfMonth(subMonths(today, 1));
    return {
      from_date: format(start, 'yyyy-MM-dd'),
      to_date: format(end, 'yyyy-MM-dd'),
    };
  };

  const handleDateFormatChange = (event)=> {
    const selectedFormat = event.target.value;
    setDateFormat(selectedFormat)

    switch (selectedFormat) {
      case 'Today':
        updateFilterFormData({from_date: getCurrentDate(), to_date: getCurrentDate()})
        break;

      case 'Yesterday':
        updateFilterFormData({from_date: getYesterDay(), to_date: getCurrentDate()})
        break;

      case 'Last 7 Days':
        updateFilterFormData(getLastSevenDays())
        break;

      case 'Last 30 Days':
        updateFilterFormData(getLastThirtyDays())
        break;

      case 'This Month':
        updateFilterFormData(getThisMonth())
        break;

      case 'Last month':
        updateFilterFormData(getLastMonth())
        break;
    }
  };

  // console.log(filterFormData)
  const handleFilterChange = (event) => {
    updateFilterFormData({...filterFormData,
      [event.target.name]: event.target.value
    })
  };


  const handleFilterSubmit = ()=> {
    if (filterFormData.currency === '') {
      setError('Please select currency')

    } else if(filterFormData.status === '') {
      setError('Please select The status')

    } else {
      setError('')

      axiosInstance.post(`api/v1/admin/filter/deposit/`, {
        from_date: filterFormData.from_date,
        to_date: filterFormData.to_date,
        currency: filterFormData.currency,
        status: filterFormData.status,
        user_name: filterFormData.user_name,
        pay_mode: filterFormData.payment_mode

      }).then((res)=> {

        console.log(res.data.data)
        if (res.data.data) {
          updateTransactionData(res.data.data)
          setFilterRerender(true)
        }

      }).catch((error)=> {
        console.log(error.response)

      })
    }
  };


  
  useEffect(() => {

    if(filterRerender) {

      setTimeout(() => {
        if(rowsPerPage === 10) {
          setRowsPerPage(25)
          setPage(0)

        } else if (rowsPerPage === 25) {
          setRowsPerPage(10)
          setPage(0)

        } else {
          setRowsPerPage(25)
          setPage(0)
        }
          // console.log('Page Changed')
          setFilterRerender(false)

      }, 2000);
    }

  }, [filterRerender])


  return (
    <>
    <Box sx={{ width: '100%' }}>

        {/* Filter Section */}
        <Paper sx={{ width: '100%', height: '90px', mb: 2 }}>
            <FormControl sx={{minWidth: 170, marginTop: '14px', marginLeft: '10px'}} >
                <InputLabel id="demo-simple-select-helper-label">Pick a date range</InputLabel>
                <Select 
                    labelId="demo-simple-select-label" 
                    id="demo-simple-select" 
                    value={dateFormat} 
                    label="DateFormat" 
                    onChange={(event)=> {handleDateFormatChange(event);}}
                    >
                    {dateFormats.map((format, index)=> (
                        <MenuItem key={index} value={format.value}>{format.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{minWidth: 120, marginTop: '14px', marginLeft: '10px'}} >
                <InputLabel id="demo-simple-select-helper-label">Currency</InputLabel>
                <Select 
                     labelId="demo-simple-select-label" 
                     id="demo-currency-select" 
                     name='currency'
                     value={selectedCurrency}
                     label="Currency" 
                     onChange={(event)=> {handleCurrencyChange(event); handleFilterChange(event);}}
                     >
                    {currencies.map((cur, index)=> (
                        <MenuItem key={index} value={cur.name}>{cur.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{minWidth: 120, marginTop: '14px', marginLeft: '10px'}} >
                <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                <Select 
                     labelId="demo-simple-select-label" 
                    id="demo-status-select" 
                    value={wStatus} 
                    label="wStatus" 
                    name='status'
                    onChange={(event)=> {handleStausChange(event); handleFilterChange(event);}}
                    >
                    {WithdrawlStatus.map((w, index)=> (
                        <MenuItem key={index} value={w.value}>{w.value}</MenuItem>
                    ))}
                </Select>
            </FormControl>  

            <FormControl sx={{minWidth: 165, marginTop: '14px', marginLeft: '10px'}} >
                <InputLabel id="demo-simple-select-helper-label">Payment Method</InputLabel>
                <Select 
                     labelId="demo-payment-select-label" 
                     id="demo-payment-select" 
                     name='payment_mode'
                     value={payMethod}
                     label="Payment Method" 
                     onChange={(event)=> {handelPaymentMethodChange(event); handleFilterChange(event);}}
                     >
                    {PaymentMethods.map((pm, index)=> (
                        <MenuItem key={index} value={pm.value}>{pm.value}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField 
                 sx={{marginTop: '14px', marginLeft: '10px'}}  
                 id="outlined-basic" 
                 name='user_name'
                 label="Enter user name" 
                 variant="outlined" 
                 onChange={handleFilterChange}
                 />

            <Button 
                sx={{marginTop: '20px', marginRight: '10px', float: 'right'}} 
                variant="contained"
                onClick={handleFilterSubmit}
                >
                Filter
              </Button>
        </Paper>
      {/* End Filter Section */}
      
      {/* Data Table Scrtio */}
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} TableName={TableName} />

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.transaction.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.transaction.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.transaction.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        onClick={(event) => handleClick(event, row.transaction.id)}
                      />
                    </TableCell>
                    {/* ID Column */}
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <small>{row.transaction.txdid}</small>
                    </TableCell>

                    {/* Name Column */}
                    <TableCell component="th" id={labelId} scope="row" padding="normal">
                      {row.user.first_name} {row.user.lastname}
                    </TableCell>

                    {/* Date Column */}
                    <TableCell align="left" padding="none">{row.transaction.txddate}</TableCell>

                    {/* Amount Column */}
                    <TableCell align="center">{row.transaction.amount}</TableCell>

                    {/* Fee Column */}
                    <TableCell align="left">{row.transaction.txdfee}</TableCell>

                    {/* Total Amount Column */}
                    <TableCell align="left" style={{color: parseFloat(row.transaction.totalamount) >= 0 ? 'green' : 'red'}}>
                        {row.transaction.totalamount}
                    </TableCell>

                    {/* Currency Column */}
                    <TableCell align="left">{row.currency.name}</TableCell>

                    <TableCell align="left">{row.converted_currency ? row.converted_currency.currency : 
                    (<p>Not Available</p>)}
                    </TableCell>

                    {/* Payment Method Column */}
                    <TableCell align="left">{row.transaction.payment_mode}</TableCell>

                    {/* Status Column */}
                    <TableCell align="left" style={{color: getStatusColor(row.transaction.txdstatus)}}>
                        {row.transaction.txdstatus}
                    </TableCell>

                    <TableCell align="left">
                      {/* Edit and Delete Icons */}
                        <Badge color="success" >
                        <Tooltip title="Edit">
                            <EditIcon color="" style={{color:'#0e3080'}} onClick={()=> handleUpdateTransactionID(row.transaction.id)} />
                        </Tooltip>

                        {/* <Tooltip title="Delete">
                            <DeleteIcon style={{color:'#b23344'}} />
                        </Tooltip> */}
                        </Badge>

                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* End Data table section */}

      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />

    </Box>

     <DepositTableEditModal open={open} handleClose={handleDepositEditClose} handleTransactionStatusUpdate={handleTransactionStatusUpdate} setStaus={setStaus} status={status} />
     </>
  );

 
}

