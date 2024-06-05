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
import 'bootstrap/dist/css/bootstrap.min.css';
import TransferTableEditModal from './TransferEditModal';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import axiosInstance from '../Authentication/axios';
import { useState } from 'react';
import { addDays, subDays, startOfMonth, endOfMonth, subMonths, format } from 'date-fns';









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
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
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
  const timeoutIdRef = useRef(null);
  const [triggerRender, setTriggerRender] = useState(false)
  
  
  const handleSearchChange = (event) => {
    const input = event.target.value;

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }
    

    timeoutIdRef.current = setTimeout(() => {
      axiosInstance.get(`/api/v1/search/transfer/transactions/?search=${input}`).
        then((res)=> {
          // console.log(res.data.data)
          props.updateTransferData(res.data.data)
          props.rows == props.transferData
          setTriggerRender(true)
          
          // console.log(props.rows)

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

    }, 3000);
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
        placeholder='Search...'
        variant="filled"
        size="small"
        onChange={handleSearchChange}
        // onKeyDown={handleSearchChange}
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



export default function TransferTable({headCells, rows, TableName, handleTransactionStatusUpdate, updateTransferData, status, setStaus, transferData}) {
  
  const navigate = useNavigate()

  const initialFormData = {
    from_date: '',
    to_date: '',
    currency: '',
    status: '',
    user_name: ''
  }

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [error, setError] = useState('')

  // Filter Form Data
  const [formData, updateFormDate] = useState(initialFormData)

  // State to opon dialogue box for edit button
  const [open, setOpen] = React.useState(false);

  // Open the edit modal
  const handleTransfertEdit = () => {
    setOpen(true);
  };

  // Close the Edit Modal
  const handleTransferEditClose = () => {
    setOpen(false);
  };


  const handleUpdateTransferID = (transfertransaction) => {
    // handleTransfertEdit();
    navigate('/admin/transfers/details/', {state: {transaction_id: transfertransaction}})
    // updateTransferID(transfertransaction);
  }

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
    // const newOffset = newPage + 1
    // setPage(newOffset)

    // axiosInstance.get(`api/v1/transfer/transactions/offset=${offset}`).then((res)=> {

    //   if(res.data && res.data.data) {
    //     updateAllTransactionData(res.data.data)
    //   }

    //   if (res.data && res.data.data.length > 0) {

    //   }
    //   // console.log(res.data.data)
    // }).catch((error)=> {
    //   console.log(error.response)
    // })

  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Show data when page loads
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



  const [dateFormat, setDateFormat]             = useState('')
  const [currencies, setCurrencies]             = useState([]);
  const [wStatus, setwStatus]                   = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [filterRerender, setFilterRerender]     = useState(false)



  // Set Currency Value
  const handleCurrencyChange = (event)=> {
    setSelectedCurrency(event.target.value)
  }

  const handleStausChange = (event)=> {
    setwStatus(event.target.value)
  };


  // Call API to get all the Available currency on DropDown

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

  const TransferStatus = [
    {value: 'All'},
    {value: 'Success'},
    {value: 'Pending'},
    {value: 'Cancelled'},
  ]

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
        updateFormDate({from_date: getCurrentDate(), to_date: getCurrentDate()})
        break;

      case 'Yesterday':
        updateFormDate({from_date: getYesterDay(), to_date: getCurrentDate()})
        break;

      case 'Last 7 Days':
        updateFormDate(getLastSevenDays())
        break;

      case 'Last 30 Days':
        updateFormDate(getLastThirtyDays())
        break;

      case 'This Month':
        updateFormDate(getThisMonth())
        break;

      case 'Last month':
        updateFormDate(getLastMonth())
        break;
    }
  }

  // console.log(formData)
  
  const handleFilterChange = (event) => {
    updateFormDate({...formData,
      [event.target.name]: event.target.value
    })
  };

  const handleFilterSubmit = ()=> {
    if (formData.currency === '') {
      setError('Please select currency')

    } else if(formData.status === '') {
      setError('Please select The status')
    } else {
      setError('')

      axiosInstance.post(`api/v1/filter/transfer/transactions/`, {
        from_date: formData.from_date,
        to_date: formData.to_date,
        currency: formData.currency,
        status: formData.status,
        user_name: formData.user_name
      }).then((res)=> {

        console.log(res.data.data)
        updateTransferData(res.data.data)
        setFilterRerender(true)

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

  const dateFormats = [
    {label: 'Today', value: 'Today'},
    {label: 'Yesterday', value: 'Yesterday'},
    {label: 'Last 7 Days', value: 'Last 7 Days'},
    {label: 'Last 30 Days', value: 'Last 30 Days'},
    {label: 'This Month', value: 'This Month'},
    {label: 'Last month', value: 'Last month'},
  ]


  return (
    <>
    <Box sx={{ width: '100%' }}>

        <Paper sx={{ width: '100%', height: '90px', mb: 2 }} className='shadow rounded border border-primary'>
            <FormControl sx={{minWidth: 170, marginTop: '14px', marginLeft: '10px'}} >
                <InputLabel id="demo-simple-select-helper-label">Pick a date range</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={dateFormat} label="DateFormat" onChange={(event)=> {handleDateFormatChange(event);}}>
                    {dateFormats.map((format, index)=> (
                        <MenuItem key={index} value={format.value}>{format.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{minWidth: 120, marginTop: '14px', marginLeft: '10px'}} >
                <InputLabel id="demo-simple-select-helper-label">Currency</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" name='currency' value={selectedCurrency} label="Currency" onChange={(event)=>{handleCurrencyChange(event); handleFilterChange(event);}}>
                    {currencies.map((cur, index)=> (
                        <MenuItem key={index} value={cur.name}>{cur.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{minWidth: 120, marginTop: '14px', marginLeft: '10px'}} >
                <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" name='status' value={wStatus} label="wStatus" onChange={(event)=> {handleStausChange(event); handleFilterChange(event);}}>
                    {TransferStatus.map((w, index)=> (
                        <MenuItem key={index} value={w.value}>{w.value}</MenuItem>
                    ))}
                </Select>
            </FormControl> 

            <TextField sx={{marginTop: '14px', marginLeft: '10px'}}  id="outlined-basic" name='user_name' label="Enter user name" variant="outlined" onChange={handleFilterChange} />

            <Button sx={{marginTop: '20px', marginRight: '10px', float: 'right'}} variant="contained" onClick={handleFilterSubmit}>Filter</Button>
        </Paper>
        

      <Paper sx={{ mb: 2, marginTop: '30px', transition: 'width 20px' }} className='shadow-lg rounded border border-primary' >
        <EnhancedTableToolbar 
             numSelected={selected.length} 
             TableName={TableName} 
             updateTransferData={updateTransferData} 
             setRowsPerPage={setRowsPerPage}
             setPage={setPage}
             rows={rows}
             transferData={transferData}
             rowsPerPage={rowsPerPage}
             page={page}
             />

<TableContainer component={Paper} >
          <Table
            sx={{ minWidth: 200}}
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
                    // onClick={(event) => handleClick(event, row.id)}
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
                      {row.transaction.id}
                    </TableCell>

                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.transaction.txdid}
                    </TableCell>

                    {/* User Column */}
                    <TableCell component="th" id={labelId} scope="row" padding="normal">
                      {row.user.first_name} {row.user.lastname}
                    </TableCell>

                    {/* Transaction Date Column */}
                    <TableCell align="left" padding="none">{row.transaction.txddate}</TableCell>

                    {/* Transaction Amount Column */}
                    <TableCell align="center">{row.transaction.amount}</TableCell>

                    {/* Transaction Fees Column */}
                    <TableCell align="left">{row.transaction.txdfee}</TableCell>

                    {/* Transaction Total Amount Column */}
                    <TableCell align="left" style={{color: parseFloat(row.transaction.totalamount) >= 0 ? 'green' : 'red'}}>
                        {row.transaction.totalamount}
                    </TableCell>

                    {/* Transaction Currency Column */}
                    <TableCell align="left">{row.sender_currency.name}</TableCell>

                    {/* Transactiion Receiver Column */}
                    {/* <TableCell align="left">{row.receiver ? row.receiver.first_name : 'NA'} {row.receiver ? row.receiver.lastname : ''}</TableCell> */}

                    {/* Transaction Status Column */}
                    <TableCell align="left" style={{color: getStatusColor(row.transaction.txdstatus)}}>
                        {row.transaction.txdstatus}
                    </TableCell>

                    {/* Edit and Delete Icons */}
                    <TableCell align="left">
                        <Badge color="success" >
                        <Tooltip title="Edit">
                            <EditIcon color="" style={{color:'#0e3080'}} onClick={()=> handleUpdateTransferID(row.transaction.id)} />
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
          rowsPerPageOptions={[5, 10, 25]}
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

    <TransferTableEditModal open={open} handleClose={handleTransferEditClose} handleTransactionStatusUpdate={handleTransactionStatusUpdate} setStaus={setStaus} status={status} />
    </>
  );
}

