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
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import KYCDeleteModal from './Users/Kyceditmodal';
import { useEffect } from 'react';
import axiosInstance from './Authentication/axios';







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
  const { numSelected } = props;
  const navigate = useNavigate()

  // const handleUserSearch = () => {
  //   axiosInstance.get()
  // }

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
        placeholder='Search users'
        variant="filled"
        size="small"
        // onClick={}
      />
        <Tooltip title="Add New User">
            <Fab color="primary" aria-label="add" style={{marginLeft: '20px'}} >
              <div >
                <AddIcon onClick={()=> (navigate('/admin/create-user/'))}/>
              </div>
            </Fab>
        </Tooltip>
      </>
      )}
    </Toolbar>
  );
}


EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};



export default function DataTable({headCells, rows, TableName, status, setStaus, updateKycData, updateKycID}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const navigate = useNavigate()

  const [open, setOpen] = React.useState(false);
  const [deleteUserID, updateDeleteUserID] = React.useState(0)
  
  // Open the edit modal
  const handleKYCDelete = (event, id) => {
      setOpen(true);
      updateDeleteUserID(id)
  };

  // Close the Edit Modal
  const handleKYCEditClose = () => {
      setOpen(false);
      
  };

  // Open the edit modal and update the kyc ID
  const handleUpdateKYCID = (kyc, user) => {
      navigate('/admin/users/details/', {state: {kycID: kyc, userID: user}})
  }


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    // console.log(property)
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
    
    axiosInstance.get(`api/v1/user/kyc/?limit=${limit}&offset=${offset}`, {
    }).then((res) => {
      // console.log(res.data)

      if (res.status === 200) {
        // const sortedData = res.data.all_Kyc.reverse()
        updateKycData(res.data.all_Kyc)
        // console.log(sortedData)
      }

    }).catch((error)=> {
      console.log(error.response)

    })
  };


  // TO change the pagination of Table after page load
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


  function getStatusColor(status) {
    switch(status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'danger';
      case 'Pending':
        return 'warning';
    }
  }

  return (
    <>
    <Box sx={{ width: '100%' }}>
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

            {/* {visibleRows.length == 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <b>No data available</b>
                </TableCell>
              </TableRow>
            ) : ( */}

              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.user_kyc_details.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.user_kyc_details.id}
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
                      onClick={(event) => handleClick(event, row.user_kyc_details.id)}
                      />
                    </TableCell>

                    {/* ID Column */}
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <b>{row.user_kyc_details.id}</b>
                    </TableCell>

                    {/* First Name Column */}
                    <TableCell align="left" style={{fontFamily: 'Platypi', fontSize: '15px'}}><b>{row.user_kyc_details.firstname}</b></TableCell>

                    {/* Last Name Column */}
                    <TableCell align="left" style={{fontFamily: 'Platypi', fontSize: '15px'}}><b>{row.user_kyc_details.lastname}</b></TableCell>

                    {/* Phone Number Column */}
                    <TableCell align="left" style={{fontFamily: 'sedan', fontSize: '15px'}}><b>{row.user_kyc_details.phoneno}</b></TableCell>

                    {/* Email Column */}
                    <TableCell align="left" style={{fontFamily: 'sedan', fontSize: '15px'}}><b>{row.user_kyc_details.email}</b></TableCell>

                    {/* Group Column */}
                    <TableCell align="left" style={{fontFamily: 'sedan', fontSize: '15px'}}>
                      <b>{
                          row.user.merchant ? ('Merchant') : row.user.admin ? ('Admin') : ('User')
                          }
                       </b>
                    </TableCell>

                    {/* Last Login Column */}
                    <TableCell align="left" style={{fontFamily: 'sedan', fontSize: '15px'}}>
                      <b>{row.user.lastlogin ? new Date(row.user.lastlogin).toLocaleTimeString() : '0:00:00'}</b>
                      </TableCell>

                    {/* IP Address Column */}
                    <TableCell align="left" style={{fontFamily: 'sedan', fontSize: '15px'}}>
                      <b>{row.user.ip_address ? row.user.ip_address : '0.0.0.0'}</b>
                    </TableCell>

                    {/* Status Column */}
                    <TableCell align="left">
                      <button type="button" className={`btn btn-outline-${getStatusColor(row.user.verified ? 'Active' : "Inactive")} my-2`}>
                        <b>{row.user.verified ? 'Active' : 'Inactive'}</b>
                      </button>
                    </TableCell>

                    {/* Edit and Delete Icon */}
                    <TableCell align="left">
                        <Badge color="success" >
                            <EditIcon color="" style={{color:'#0e3080'}} onClick={()=> handleUpdateKYCID(row.user_kyc_details, row.user)}  />
                
                            <DeleteIcon style={{color:'#b23344'}} onClick={(event) => handleKYCDelete(event, row.user_kyc_details.user_id)} />
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

<KYCDeleteModal open={open} handleClose={handleKYCEditClose} setStaus={setStaus} status={status} deleteUserID={deleteUserID} />

</>
  );
}

