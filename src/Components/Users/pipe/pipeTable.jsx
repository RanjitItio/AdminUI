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
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AssignMerchantPipe from './assignPipe';
import { useEffect } from 'react';
import axiosInstance from '../../Authentication/axios';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import UpdateMerchantPipe from './updatePipe';










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
        {props.headCells.map((headCell) => (
          <TableCell sx={{p:1, mx:5}} key={headCell.id} align={headCell.numeric ? 'right' : 'left'} padding={headCell.disablePadding ? 'none' : 'normal'} sortDirection={orderBy === headCell.id ? order : false}>
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
  const [openAssignPipe, setOpenAssignPipe] = React.useState(false);

  // Open Add pipe popup
  const handleOpenAssignPipe = ()=> {
    setOpenAssignPipe(true)
  };
  

  return (
    <>
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

        <Tooltip title="Assign pipe to merchant">
            <Fab color="primary" aria-label="add" onClick={handleOpenAssignPipe}>
                <AddIcon />
            </Fab>       
        </Tooltip>
      )}
    </Toolbar>

    <AssignMerchantPipe open={openAssignPipe}  setOpen={setOpenAssignPipe} userID={props.userID} />
    </>
  );
}


EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};




export default function UserPipeTable({headCells, TableName, userID  }) {
  const [order, setOrder]             = useState('asc');
  const [orderBy, setOrderBy]         = useState('calories');
  const [selected, setSelected]       = useState([]);
  const [page, setPage]               = useState(0);
  const [dense, setDense]             = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const [merchantPipes, updateMerchantPipe]  = useState([]);     // All merchant pipe state
  const [error, setError]                    = useState('');     // Error state
  const [noData, setNoData]                  = useState(false);  // If no pipes assigned to merchant
  const [openUpdatePipe, setOpenUpdatePipe]  = useState(false);  // Open dialoge box state
  const [merchantpipeUpdateData, updateMerchantpipeUpdateData] = useState([]);

  let rows = []  // Table row data

  // Update table row data
  if (merchantPipes) {
    rows = merchantPipes
  };


  // Open Edit dialogue box
  const handleEditButtonClicked = (merchantPipeData)=> {
      setOpenUpdatePipe(true)
      updateMerchantpipeUpdateData(merchantPipeData)
  };



  React.useEffect(()=> {
    setTimeout(() => {
      setRowsPerPage(10);
      setPage(0);
      // console.log('Changed')

    }, 1000);

  }, []);


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


  // Fetch all the pipes related to a merchant while page loads
  useEffect(() => {
      axiosInstance.get(`api/admin/merchant/pipe/${userID}/`).then((res)=> {
        // console.log(res.data.merchant_pipes)
        if (res.status === 200 && res.data.merchant_pipes) {
              const sortedPipes = res.data.merchant_pipes.sort((a, b) => {
                if (a.pipe_id < b.pipe_id) return 1;
                if (a.pipe_id > b.pipe_id) return -1;
                return 0;
            });
            updateMerchantPipe(sortedPipes)
        }

      }).catch((error)=> {
          console.log(error.response)

          if (error.response.data.msg === 'Merchant pipe does not exists') {
              setError('Merchant pipes does not exists')
              setNoData(true)
          };
      })
  }, []);

  
  // If No pipe assigned to the user
  if (noData) {
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar 
                  numSelected={selected.length} 
                  TableName={TableName} 
                  userID={userID}
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
                </Table>
                </TableContainer>

                <div style={{display:'flex', justifyContent: 'center', alignContent: 'center'}}>
                  <DeleteForeverIcon sx={{fontSize: '80px'}}/> <br />
                </div>
                <p style={{display:'flex', justifyContent: 'center', alignContent: 'center'}}>
                  Nothing to show
                </p>
        </Paper>
      </Box>
    );
};




return (
    <>
    <Box sx={{ width: '100%' }}>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar 
               numSelected={selected.length} 
               TableName={TableName} 
               userID={userID}
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
                const isItemSelected = isSelected(row.pipe_id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    
                    {/* Gateway ID Column */}
                    <TableCell component="th" id={labelId} scope="row" sx={{p:1, ml:5}}>
                      {row.pipe_id}
                    </TableCell>

                    {/* Pipe name column */}
                    <TableCell align='left'>
                      {row.merchant_name}
                    </TableCell>

                    {/* Pipe name column */}
                    <TableCell align='left'>
                      {row.pipe_name}
                    </TableCell>

                    {/* Date Created Column */}
                    <TableCell align="left" >{row.date_assigned}</TableCell>

                    {/* Processing mode column */}
                    <TableCell align="left">{row.process_mode}</TableCell>

                    {/* Cooling Period column */}
                    <TableCell align="left">{row.settlement_period}</TableCell>

                    {/* Currency mode column */}
                    <TableCell align="left">{row.currency}</TableCell>

                    {/* Fee Column */}
                    <TableCell align="left">{row.fee}%</TableCell>

                    {/* Status Column */}
                    <TableCell align="left">
                          {row.status === true ? 
                        <p className="text-success">Active</p> : row.status === false ? 
                        <p className="text-danger">Inactive</p> : 'NA'}
                    </TableCell>

                    {/* Action column  */}
                    <TableCell align="left">

                        <Tooltip title="Update">
                          <IconButton sx={{color: '#0081CF'}} onClick={()=> {handleEditButtonClicked(row)}}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
          
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
    </Box>

    <UpdateMerchantPipe open={openUpdatePipe} setOpen={setOpenUpdatePipe} merchantpipeUpdateData={merchantpipeUpdateData} />

    </>
  );
}

