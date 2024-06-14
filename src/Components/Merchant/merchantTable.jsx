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
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';
import { useState, useEffect, useRef } from 'react';
import Pagination from '@mui/material/Pagination';







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
  const [searchError, setSearchError]     = useState('');
  const [error, setError] = useState(false);


  const handleSearchChange = (event)=> {
    const input = event.target.value;

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }

    timeoutIdRef.current = setTimeout(() => {
      axiosInstance.get(`api/v2/admin/search/merchant/?query=${input}`).
        then((res)=> {
          console.log(res.data.data)
          props.updateMerchantData(res.data.data.reverse())
          setTriggerRender(true)
          setError(false)
          setSearchError('')

        }).catch((error)=> {
          console.log(error.response.data)

          if (error.response.data == 'Bad Request: Missing query parameter `query`') {
            setSearchError('Please type something in search box')
            setError(true)

          } else {
            setSearchError('')
            setError(false)
          }
          
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
        placeholder='Search users'
        variant="filled"
        size="small"
        onChange={handleSearchChange}
        error={error}
        helperText={searchError}
      />
        {/* <Tooltip title="Add New Merchant">
            <Fab color="primary" aria-label="add" style={{marginLeft: '20px'}}>
                <AddIcon onClick={()=> navigate('/admin/create-merchant/')} />
            </Fab>
        </Tooltip> */}
      </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};





export default function MerchantTable({headCells, TableName,rows, updateMerchantData, rerender, setRerender}) {

  const navigate = useNavigate();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);



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


  const handleChangePage = (event, value) => {
    //   console.log(value)
      // const offset = value
      // setOffset(offset)
      // fetchMerchantData()
      // setRerender(true)
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

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

  function getStatusColor(status) {
    switch (status) {
        case 'Moderation':
            return 'orange'
        case 'Approved':
            return 'green'
        case 'Cancelled':
            return 'red'
    }
  };

  const handleMerchantEdit = (merchant, user, group, currency)=> {
    const merchant_detail  = merchant
    const user_details     = user
    const group_details    = group
    const currency_details = currency

    navigate('/admin/merchant/details/', {state: {merchant: merchant_detail, user: user_details, group: group_details, currency: currency_details}})
  }

  // TO change the pagination of Table after page load
  useEffect(()=> {
    setTimeout(() => {
      setRowsPerPage(25);
      setPage(0);
      // console.log('Changed')

    }, 1000);

  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar 
             numSelected={selected.length} 
             TableName={TableName} 
             setRowsPerPage={setRowsPerPage}
             setPage={setPage}
             rowsPerPage={rowsPerPage}
             updateMerchantData={updateMerchantData}
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
                const isItemSelected = isSelected(row.merchant.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.merchant.id}
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
                        onClick={(event) => handleClick(event, row.merchant.id)}
                      />
                    </TableCell>

                    {/* Sl No */}
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.merchant.id}
                    </TableCell>

                     {/* User Full Name */}
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.user.full_name}
                    </TableCell>

                    {/* Merchant Name */}
                    <TableCell align="left">
                        {row.merchant.bsn_name}
                    </TableCell>

                    {/* Merchant ID */}
                    <TableCell align="left" style={{width: '10px'}} >
                        <small >{row.merchant.merchant_id}</small>
                    </TableCell>

                    {/* Created Date */}
                    <TableCell align="left">
                        {row.merchant.created_date}
                    </TableCell>

                    {/* Group Name */}
                    <TableCell align="left">
                        {row.group ? row.group.name : 'NA'}
                    </TableCell>

                    {/* Merchant URL */}
                    <TableCell align="left">
                        <a href={row.merchant.bsn_url}>{row.merchant.bsn_url}</a>
                    </TableCell>

                    {/* Merchant Logo */}
                    <TableCell align="left">
                        <img src={row.merchant.logo} alt="Merchant Logo" style={{maxWidth: '50px', maxHeight: '50px'}}/>
                    </TableCell>

                    {/* Merchant Status */}
                    <TableCell align="left" style={{color: getStatusColor(row.merchant.status)}}>
                        {row.merchant.status === 'Cancelled' ? 'Rejected': row.merchant.status}
                    </TableCell>

                    <TableCell align="right">
                        <Badge color="success" style={{float: 'left'}} >
                            <EditIcon 
                                style={{color:'#0e3080'}} 
                                onClick={(event)=> {handleMerchantEdit(row.merchant, row.user, row.group, row.currency)}} 
                                />
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
        {/* <Pagination 
             count={10} 
             color="primary" 
             style={{marginTop: '20px', float:'right'}}
             onChange={handleChangePage}
             /> */}
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

