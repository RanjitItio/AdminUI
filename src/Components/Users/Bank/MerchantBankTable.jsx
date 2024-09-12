import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FetchBankAccounts } from './fetchData';
import { Space, Table, Tag, Card, Button } from 'antd';
import { EditFilled } from '@ant-design/icons';






// Specific merchant bank account details
export default function MerchantBankAccountsTable({userID}) {
  const navigate = useNavigate()
  
  const [bankAccounts, updateBankAccounts] = useState([]);    //Bank account Data state

  const handleEditButtonClicked = (accountId)=> {
    const account = bankAccounts.find(account => account.account.id === accountId)
     
    navigate('/admin/merchant/payment/detail/', {state: {accountDetails: account}})
  };

  
    const columns = [
      {
        title: 'Sl No.',
        dataIndex: ['account', 'id'],
        key: 'Sl_No',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Merchant',
        dataIndex: ['user', 'user_name'],
        key: 'merchant',
      }, 
      {
        title: 'Email',
        dataIndex: ['user', 'user_email'],
        key: 'email',
      },
      {
        title: 'Bank',
        dataIndex: ['account', 'bank_name'],
        key: 'date'
      },
      {
        title: 'Status',
        dataIndex: ['account', 'is_active'],
        key: 'status',
        render: (isActive)=> (
            <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Active' : 'Inactive'}</Tag>
        )
      },
      {
        title: 'Edit',
        key: 'status',
        render: (_, record)=> (
          <Button 
            type='link'
            icon={<EditFilled />}
            onClick={() => handleEditButtonClicked(record.account.id)}
          />
        )
      },
    ];


  // Fetch The Bank Accounts when page loads
  useEffect(() => {
    if (userID) {
      FetchBankAccounts(userID, updateBankAccounts);
    }
    
  }, [userID])
  

  return (
        <Card
            style={{
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            padding: '2px',
            }}
        >
          <h5><b>Merchant Bank Accounts</b></h5>
          <Table 
              columns={columns} 
              dataSource={bankAccounts}
              rowKey={(record) => record.account?.id || Math.random()} 
              scroll={{
                  x: 500
              }}
              />
        </Card>
  );
}






// <>
//     <Box sx={{ width: '100%' }}>
//       <Paper sx={{ width: '100%', mb: 2 }}>

//         <TableContainer>
//           <Table
//             sx={{ minWidth: 750 }}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//           >
          
//             <TableBody>
            
//                  {visibleRows.map((row, index) => {
//                   const isItemSelected = isSelected(row.account ? row.account.id : row.account.id);
//                   const labelId = `enhanced-table-checkbox-${index}`;
                    
//                   return (
//                     <TableRow
//                       hover
//                       // onClick={(event) => handleClick(event, row.id)}
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       tabIndex={-1}
//                       key={row.account ? row.account.id : row.account.id}
//                       selected={isItemSelected}
//                       sx={{ cursor: 'pointer' }}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           color="primary"
//                           checked={isItemSelected}
//                           inputProps={{
//                             'aria-labelledby': labelId,
//                           }}
//                         onClick={
//                             (event) => handleClick(event, row.account ? row.account.id : row.account.id)}
//                         />
//                       </TableCell>
  
//                       {/* ID Column */}
//                       <TableCell component="th" id={labelId} scope="row" padding="none">
//                           <b>{row.account ? row.account.id : 'NA' }</b>
//                       </TableCell>
  
//                       {/* User Name Column */}
//                       <TableCell 
//                            align="left" 
//                            style={{fontFamily: 'Platypi', fontSize: '15px'}}>
//                             <b>{row.user ? row.user.user_name : 'NA'}</b>
//                       </TableCell>
  
//                       {/* Email Column */}
//                       <TableCell 
//                             align="left" 
//                             style={{fontFamily: 'Platypi', fontSize: '15px'}}>
//                               <b>{row.user ? row.user.user_email : 'NA'}</b>
//                         </TableCell>
  
//                       {/* Account Holder Name Column */}
//                       <TableCell 
//                            align="left" 
//                            style={{fontFamily: 'sedan', fontSize: '15px'}}>
//                             <b>{row.account.acc_holder_name}</b>
//                       </TableCell>
  
//                       {/* Status Column */}
//                       <TableCell align="left">
//                         <button type="button" className={`btn btn-outline-${getStatusColor(row.account.is_active ? 'Active' : "Inactive")} my-2`}>
//                           <b>{row.account.is_active ? 'Active' : 'Inactive'}</b>
//                         </button>
//                       </TableCell>
  
//                       {/* Edit and Delete Icon */}
//                       <TableCell align="left">
//                           <Badge color="success" >
//                               <EditIcon color="" style={{color:'#0e3080'}} onClick={()=> {handleEditButtonClicked(row.account.id)}}  />
                  
//                               {/* <DeleteIcon style={{color:'#b23344'}} /> */}
//                           </Badge>
//                       </TableCell>
  
//                     </TableRow>
//                   );
//                 })}
              

//               {emptyRows > 0 && (
//                 <TableRow
//                   style={{
//                     height: (dense ? 33 : 53) * emptyRows,
//                   }}
//                 >
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

      
//       </Paper>
//       <FormControlLabel
//         control={<Switch 
//                     checked={dense} 
//                     // onChange={handleChangeDense} 
//                     />}
//         label="Dense padding"
//       />
//     </Box>

// </>

