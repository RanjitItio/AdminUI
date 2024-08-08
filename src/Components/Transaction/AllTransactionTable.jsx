import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {Box, Grid} from '@mui/material';
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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useState, useEffect } from 'react';
import AllTransactionTableEditModal from './AllTransactionEditModal';
import axiosInstance from '../Authentication/axios';
import { useNavigate } from 'react-router-dom';
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



function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        {props.headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'} padding={headCell.disablePadding ? 'none' : 'normal'} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)}>
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};



function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  const [triggerRender, setTriggerRender] = useState(false)
  const timeoutIdRef = React.useRef(null);


  const handleSearchChange = (event) => {
    const input = event.target.value;

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    };
    

    timeoutIdRef.current = setTimeout(() => {
      axiosInstance.get(`/api/v4/admin/transaction/search/?query=${input}`).
        then((res)=> {
          // console.log(res.data.data)
          props.updateAllTransactionData(res.data.data.reverse())
          setTriggerRender(true)

        }).catch((error)=> {
          console.log(error.response)
          
        })
    }, 2000);
};


useEffect(() => {

  if(triggerRender) {

    setTimeout(() => {
      if(props.rowsPerPage === 10) {
        props.setRowsPerPage(25)
        props.setPage(0)
      } else if (props.rowsPerPage === 25) {
        props.setRowsPerPage(10)
        props.setPage(0)
      } else {
        props.setRowsPerPage(25)
        props.setPage(0)
      }
        
        // console.log('Page Changed')
        setTriggerRender(false)

    }, 1000);
  }

}, [triggerRender])


  return (
    <Toolbar
      sx={{
        pl: { sm: 3 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <b>{props.TableName}</b>
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
        <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        placeholder='Search Transaction'
        variant="filled"
        size="small"
        name='search'
        onChange={handleSearchChange}
      />

    <Tooltip title="Download as CSV">
        <Button variant="contained" startIcon={<FileDownloadIcon />} style={{marginLeft: '5px'}}>
            CSV
        </Button>        
    </Tooltip>

    <Tooltip title="Download as PDF">
        <Button variant="contained" startIcon={<FileDownloadIcon />} style={{marginLeft: '5px'}}>
            PDF
        </Button>        
    </Tooltip>
      </>
      )}
    </Toolbar>
  );
}


EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
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


export default function AllTransactionTable({headCells, rows, TableName , handleTransactionStatusUpdate, setStaus, status, updateAllTransactionData}) {

  const initialFormData = {
    from_date: '',
    to_date: '',
    currency: '',
    status: '',
    user_name: '',
    payment_mode: ''
  }

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [error, setError] = useState('')

  const navigate = useNavigate()
  // To show when there is no data in API response
  const [loading, setLoading] = useState(true);

  const [open, setOpen]            = useState(false);
  
  

  // Filter values
  const [currencies, setCurrencies]             = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [filterFormData, updateFilterFormData]  = useState(initialFormData);
  const [dateFormat, setDateFormat]             = useState('');
  const [filterRerender, setFilterRerender]     = useState(false);
  const [wStatus, setwStatus]                   = useState('');
  const [payMethod, setPaymethod]               = useState('');



  // Close the Edit Modal
  const handleAllTransectionEditClose = () => {
    setOpen(false);
  };


  // Update the transaction id and send in API request
  const handleEditButtonClick = (transaction)=> {
    // console.log(transaction)
      // updateTransactionID(transaction)
      // handleAllTransectionEdit();
      navigate('/admin/all-transaction/detial/', {state: {transactionID: transaction}})
   };


  useEffect(() => {
    if (rows && rows.length > 0) {
      setLoading(false);
    }
  }, [rows]);


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
    const rowsPerPage = parseInt(event.target.value, 10)
    setRowsPerPage(rowsPerPage);
    setPage(0);

    let limit = rowsPerPage
    let offset = 0

    axiosInstance.get(`api/v4/transactions/?limit=${limit}&offset=${offset}`).then((res)=> {

      if(res.data && res.data.data) {
        // const SortedData = res.data.data.reverse()
        // console.log('Pagination Data',SortedData)
        updateAllTransactionData(res.data.data)
      }
      // console.log(res.data.data)
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



  const PaymentMethods = [
    {value: 'Bank'},
    {value: 'Crypto'},
    {value: 'Wallet'},
    {value: 'Stripe'},
    {value: 'Paypal'},
    {value: 'UPI'},
  ]

  const AllTransactionStatus = [
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


  const handleStausChange = (event)=> {
    setwStatus(event.target.value)
  };

  const handelPaymentMethodChange = (event)=> {
    setPaymethod(event.target.value)
  };


  // // Filter Methods //?\\
  ////////////////////////////
  const handleCurrencyChange = (event)=> {
    setSelectedCurrency(event.target.value)
  }


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

  // console.log(filterFormData.payment_mode)
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

      axiosInstance.post(`api/v4/admin/filter/transaction/`, {
        from_date: filterFormData.from_date,
        to_date: filterFormData.to_date,
        currency: filterFormData.currency,
        status: filterFormData.status,
        user_name: filterFormData.user_name,
        pay_mode: filterFormData.payment_mode

      }).then((res)=> {

        // console.log(res.data.data)
        if (res.data.data) {
          updateAllTransactionData(res.data.data)
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
        <Paper sx={{ width: '100%', height: 'auto', mb: 2, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Pick a date range</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dateFormat}
                  label="DateFormat"
                  onChange={handleDateFormatChange}
                >
                  {dateFormats.map((format, index) => (
                    <MenuItem key={index} value={format.value}>
                      {format.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2} lg={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Currency</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="currency"
                  value={selectedCurrency}
                  label="Currency"
                  onChange={(event) => {
                    handleCurrencyChange(event);
                    handleFilterChange(event);
                  }}
                >
                  {currencies.map((cur, index) => (
                    <MenuItem key={index} value={cur.name}>
                      {cur.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2} lg={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-status-select"
                  name="status"
                  value={wStatus}
                  label="wStatus"
                  onChange={(event) => {
                    handleStausChange(event);
                    handleFilterChange(event);
                  }}
                >
                  {AllTransactionStatus.map((w, index) => (
                    <MenuItem key={index} value={w.value}>
                      {w.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2} lg={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Payment Method</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-payment-mode-select"
                  name="payment_mode"
                  value={payMethod}
                  label="Payment Method"
                  onChange={(event) => {
                    handelPaymentMethodChange(event);
                    handleFilterChange(event);
                  }}
                >
                  {PaymentMethods.map((pm, index) => (
                    <MenuItem key={index} value={pm.value}>
                      {pm.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2} lg={2}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter user name"
                variant="outlined"
                name="user_name"
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2} textAlign="center" mt={1}>
              <Button variant="contained" onClick={handleFilterSubmit}>
                Filter
              </Button>
            </Grid>
          </Grid>
      </Paper>

     <Paper sx={{ width: '100%', mb: 2, overflowX:'auto' }}>
        {/* <EnhancedTableToolbar 
            numSelected={selected.length} 
            TableName={TableName} 
            setRowsPerPage={setRowsPerPage}
            setPage={setPage}
            rows={rows}
            rowsPerPage={rowsPerPage}
            page={page}
            updateAllTransactionData={updateAllTransactionData}
            /> */}

        
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
             
             {/* Contain all te Column names */}
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
                    // onClick={(event) => handleClick(event, row.id)}
                    // role="checkbox"
                    // aria-checked={isItemSelected}
                    // tabIndex={-1}
                    key={row.transaction.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      {/* <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        onClick={(event) => handleClick(event, row.id)}
                      /> */}
                    </TableCell>

                     {/* Sl No. */}
                    <TableCell align="left" >
                      <small>{row.transaction.id}</small>
                    </TableCell>

                    {/* ID Column */}
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <small>{row.transaction.txdid}</small>
                    </TableCell>

                    {/* User Column */}
                    <>
                    <TableCell component="th" id={labelId} scope="row" padding="normal">
                      {row.user.first_name} {row.user.lastname}
                    </TableCell>

                    {/* Date Column */}
                    {/* <TableCell align="left" padding="none">{new Date(row.transaction.txddate).toLocaleDateString()}</TableCell> */}
                    <TableCell align="left" padding="none">{row.transaction.txddate}</TableCell>

                    {/* Transaction Type Column */}
                    <TableCell align="left">{row.transaction.txdtype}</TableCell>

                    {/* Transaction Amount Column */}
                    <TableCell align="left">{row.transaction.amount}</TableCell>

                    {/* Transaction Fees Column */}
                    <TableCell align="left">{row.transaction.txdfee}</TableCell>

                    {/* Total amount of Transaction Column */}
                    <TableCell align="left" style={{color: parseFloat(row.transaction.totalamount ? row.transaction.totalamount : '0.00') >= 0 ? 'green' : 'red'}}>
                      {parseFloat(row.transaction.totalamount ? row.transaction.totalamount : '0.00').toFixed(2)}
                        {/* {row.transaction.totalamount} */}
                    </TableCell>

                    {/* Currency Column */}
                    <TableCell align="left">{row.currency.name}</TableCell>

                    {/* Receiver Column */}
                    <TableCell align="left">{row.receiver ? `${row.receiver.first_name} ${row.receiver.lastname}`: 'NA'}</TableCell>

                    {/* Transaction Status Column */}
                    <TableCell align="left" style={{color: getStatusColor(row.transaction.txdstatus)}}>
                        {row.transaction.txdstatus}
                    </TableCell>
                    </>
              
                    {/* Edit and Delete Icons */}
                    <TableCell align="left">
                        <Badge color="success" >
                        <Tooltip title="Edit">
                        <EditIcon color="" style={{color:'#0e3080'}} onClick={()=> handleEditButtonClick(row.transaction.id)} />
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
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>

    <AllTransactionTableEditModal open={open} handleClose={handleAllTransectionEditClose} handleTransactionStatusUpdate={handleTransactionStatusUpdate} setStaus={setStaus} status={status} />

    </>
  );
}

