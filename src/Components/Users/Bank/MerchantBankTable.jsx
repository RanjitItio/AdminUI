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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
// import KYCDeleteModal from './Users/Kyceditmodal';
import { useEffect, useState, useRef, useMemo } from 'react';
import { FetchBankAccounts } from './fetchData';








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
          <TableCell key={headCell.id} align={headCell.numeric ? 'left' : 'left'} padding={headCell.disablePadding ? 'none' : 'normal'} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)}>
              <b className='text-muted'>{headCell.label}</b>
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
  const navigate = useNavigate()
  const { numSelected } = props;
  const [triggerRender, setTriggerRender] = useState(false)
  const timeoutIdRef = useRef(null);

  const handleSearchChange = (event) => {
    const input = event.target.value;

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    };
    

    timeoutIdRef.current = setTimeout(() => {
    //   axiosInstance.get(`api/v1/admin/user/search/?query=${input}`).
    //     then((res)=> {
    //       // console.log(res.data.all_Kyc)
    //       props.updateKycData(res.data.all_Kyc.reverse())
    //       setTriggerRender(true)

    //     }).catch((error)=> {
    //       console.log(error.response)
          
    //     })
    }, 2000);
};



// useEffect(() => {

//   if(triggerRender) {

//     setTimeout(() => {
//       if(props.rowsPerPage === 10) {
//         props.setRowsPerPage(25)
//         props.setPage(0)
//       } else if (props.rowsPerPage === 25) {
//         props.setRowsPerPage(10)
//         props.setPage(0)
//       } else {
//         props.setRowsPerPage(25)
//         props.setPage(0)
//       }
        
//         console.log('Page Changed')
//         setTriggerRender(false)

//     }, 1000);
//   }

// }, [triggerRender])



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
          placeholder='Search Accounts'
          variant="filled"
          size="small"
          onChange={handleSearchChange}
        />
      </>
      )}
    </Toolbar>
  );
}


EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};



export default function MerchantBankAccountsTable({headCells, TableName, userID}) {
  const navigate = useNavigate()

  const [order, setOrder]             = useState('asc');
  const [orderBy, setOrderBy]         = useState('id');
  const [selected, setSelected]       = useState([]);
  const [page, setPage]               = useState(0);
  const [dense, setDense]             = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  

  
  // States to show data on Table
  const [bankAccounts, updateBankAccounts] = useState([]);   //Bank account Data state

  // Update the value of row to map in Table
  const rows = bankAccounts;


  const handleEditButtonClicked = (accountId)=> {
    const account = bankAccounts.find(account => account.account.id === accountId)
     
      navigate('/admin/merchant/payment/detail/', {state: {accountDetails: account}})
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
  };

  const handleChangeRowsPerPage = (event) => {
    const rowsPerPage = parseInt(event.target.value, 10)
    setRowsPerPage(rowsPerPage);
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );


  function getStatusColor(status) {
    switch(status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'danger';
      case 'Pending':
        return 'warning';
    }
  };


  // Fetch The Bank Accounts when page loads
  useEffect(() => {
    if (userID) {
      FetchBankAccounts(userID, updateBankAccounts);
    }
    
  }, [userID])

  // TO change the pagination of Table after page load
  useEffect(()=> {
    setTimeout(() => {
      setRowsPerPage(25);
      setPage(0);

    }, 1000);

  }, [])



  if (visibleRows.length === 0) {
      return (
        <>
        
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px'}}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <DeleteOutlineIcon sx={{ fontSize: '100px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <small>Nothing to show</small>
            </div>
          </div>
      
        </>
      )
  };
  

  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar 
            numSelected={selected.length} 
            TableName={TableName} 
            setRowsPerPage={setRowsPerPage}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            page={page}
        
            />


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
                  const isItemSelected = isSelected(row.account ? row.account.id : row.account.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                    
                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.account ? row.account.id : row.account.id}
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
                        onClick={(event) => handleClick(event, row.account ? row.account.id : row.account.id)}
                        />
                      </TableCell>
  
                      {/* ID Column */}
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                          <b>{row.account ? row.account.id : 'NA' }</b>
                      </TableCell>
  
                      {/* User Name Column */}
                      <TableCell 
                           align="left" 
                           style={{fontFamily: 'Platypi', fontSize: '15px'}}>
                            <b>{row.user ? row.user.user_name : 'NA'}</b>
                      </TableCell>
  
                      {/* Email Column */}
                      <TableCell 
                            align="left" 
                            style={{fontFamily: 'Platypi', fontSize: '15px'}}>
                              <b>{row.user ? row.user.user_email : 'NA'}</b>
                        </TableCell>
  
                      {/* Account Holder Name Column */}
                      <TableCell 
                           align="left" 
                           style={{fontFamily: 'sedan', fontSize: '15px'}}>
                            <b>{row.account.acc_holder_name}</b>
                      </TableCell>
  
                      {/* Status Column */}
                      <TableCell align="left">
                        <button type="button" className={`btn btn-outline-${getStatusColor(row.account.is_active ? 'Active' : "Inactive")} my-2`}>
                          <b>{row.account.is_active ? 'Active' : 'Inactive'}</b>
                        </button>
                      </TableCell>
  
                      {/* Edit and Delete Icon */}
                      <TableCell align="left">
                          <Badge color="success" >
                              <EditIcon color="" style={{color:'#0e3080'}} onClick={()=> {handleEditButtonClicked(row.account.id)}}  />
                  
                              {/* <DeleteIcon style={{color:'#b23344'}} /> */}
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
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>

{/* <KYCDeleteModal open={open} handleClose={handleKYCEditClose} deleteUserID={deleteUserID} /> */}

</>
  );
}

