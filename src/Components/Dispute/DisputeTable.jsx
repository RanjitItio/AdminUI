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
import { Row,Col, Card } from 'react-bootstrap';










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



export default function DisputeTable({headCells, rows, TableName}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  
  const [open, setOpen] = React.useState(false);


  const handleCryptoExchangeEdit = () => {
    setOpen(true);
  };

  // Close the Edit Modal
  const handleCryptoExchangeEditClose = () => {
    setOpen(false);
  };


  // Update the transaction id and send in API request
  const handleCryptoExchangeTransactionID = (transaction)=> {
      // updateTransactionID(transaction)
      handleCryptoExchangeEdit();
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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



  const [dateFormat, setDateFormt] = React.useState('')
  const [currency, setCurrency] = React.useState('');
  const [wStatus, setwStatus] = React.useState('')


  const handleDateFormatChange = (event)=> {
    setDateFormt(event.target.value)
  }

  const handleCurrencyChange = (event)=> {
    setCurrency(event.target.value)
  }

  const handleStausChange = (event)=> {
    setwStatus(event.target.value)
  }

  
  const getLastSevenDays = ()=> {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    const formatDate = `0${sevenDaysAgo.getMonth()}/0${sevenDaysAgo.getDate()}/${sevenDaysAgo.getFullYear()}`;
    return formatDate;
  }


  const WithdrawlStatus = [
    {value: 'All'},
    {value: 'Solved'},
    {value: 'Closed'},
  ]

  // const currencies = [
  //   {value: 'USD'},
  //   {value: 'CYN'},
  //   {value: 'INR'},
  //   {value: 'EUR'},
  // ]

  const dateFormats = [
    {label: 'Today', value: '01/02/2024'},
    {label: 'Yesterday', value: '03/04/2024'},
    {label: 'Last 7 Days', value: getLastSevenDays()},
    {label: 'Last 30 Days', value: '10/02/2024'},
    {label: 'This Month', value: '10/02/2024'},
    {label: 'Last month', value: '10/02/2024'},
  ]


  return (
    <>
    <Box sx={{ width: '100%' }}>

        <Paper sx={{ width: '100%', height: '90px', mb: 2 }} className='shadow rounded border border-primary'>
            <FormControl sx={{minWidth: 170, marginTop: '14px', marginLeft: '10px'}} >
                <InputLabel id="demo-simple-select-helper-label">Pick a date range</InputLabel>
                <Select  id="demo-simple-select" value={dateFormat} label="Pick a date range" onChange={handleDateFormatChange}>
                    {dateFormats.map((format, index)=> (
                        <MenuItem key={index} value={format.value}>{format.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* <FormControl sx={{minWidth: 120, marginTop: '14px', marginLeft: '10px'}} >
                <InputLabel id="demo-simple-select-helper-label">Currency</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={currency} label="Currency" onChange={handleCurrencyChange}>
                    {currencies.map((cur, index)=> (
                        <MenuItem key={index} value={cur.value}>{cur.value}</MenuItem>
                    ))}
                </Select>
            </FormControl> */}

            <FormControl sx={{minWidth: 120, marginTop: '14px', marginLeft: '10px'}} >
                <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={wStatus} label="wStatus" onChange={handleStausChange}>
                    {WithdrawlStatus.map((w, index)=> (
                        <MenuItem key={index} value={w.value}>{w.value}</MenuItem>
                    ))}
                </Select>
            </FormControl>  
 
            <TextField sx={{marginTop: '14px', marginLeft: '10px'}}  id="outlined-basic" label="Enter user name" variant="outlined" /> 

            <Button sx={{marginTop: '20px', marginRight: '10px', float: 'right'}} variant="contained">Filter</Button>
        </Paper>
        <Card sx={{ width: '100%', height: '90px', mb: 2 }} className='shadow rounded border border-primary my-4'>
          <Card.Body> {TableName}</Card.Body>
        </Card>
        <Card sx={{ width: '100%', height: '90px', mb: 2 }} className='shadow rounded border border-primary'>
          <Row  className ="d-flex justify-content-center px-5 py-2">
            <Col  sx={4}>
              <h6>Solved</h6>
            <hr/>
            <p className='d-flex'>
              <h1>1</h1>
              </p>
            </Col>
            <Col  sx={4}>
            <h6>Closed</h6>
            <hr/>
            <p className='d-flex'>
              <h1>1</h1>
              </p>
            </Col>
            
        
          </Row>
        </Card>
        

      <Paper sx={{ mb: 2, marginTop: '30px', transition: 'width 20px' }} className='shadow-lg rounded border border-primary' >
        <EnhancedTableToolbar numSelected={selected.length}  />

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
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
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
                        onClick={(event) => handleClick(event, row.id)}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.date}
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="normal">
                      {row.dispute_id}
                    </TableCell>
                    <TableCell align="left" padding="none">{row.title}</TableCell>
                    <TableCell align="left">{row.claimant}</TableCell>
                    <TableCell align="left">{row.defendant}</TableCell>
                    <TableCell align="left">{row.transaction_id}</TableCell>
                    <TableCell align="left" style={{color: row.status == 'Solved' ? 'green' : 'red'}}>
                        {row.status}
                    </TableCell>
                    {/* <TableCell align="left">{row.rate}</TableCell>
                    <TableCell align="left">{row.from}</TableCell>
                    <TableCell align="left">{row.to}</TableCell>
                    <TableCell align="left" style={{color: getStatusColor(row.status)}}>
                        {row.status}
                    </TableCell>
                    <TableCell align="left">
                        <Badge color="success" >
                        <Tooltip title="Edit">
                            <EditIcon color="" style={{color:'#0e3080'}} onClick={()=> handleCryptoExchangeTransactionID(row.id)} />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <DeleteIcon style={{color:'#b23344'}} />
                        </Tooltip>
                        </Badge>
                    </TableCell> */}
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
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
    {/* <CryptoExchangeTableEditModal open={open} handleClose={handleCryptoExchangeEditClose} handleTransactionStatusUpdate={handleTransactionStatusUpdate} setStaus={setStaus} status={status} /> */}
      </>
  );
}

