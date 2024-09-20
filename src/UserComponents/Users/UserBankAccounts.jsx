import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FetchBankAccounts } from './fetchData';
import { Space, Table, Tag, Card, Button } from 'antd';
import { EditFilled } from '@ant-design/icons';






// Specific merchant bank account details
export default function UserBankAccountsTable({userID}) {
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






