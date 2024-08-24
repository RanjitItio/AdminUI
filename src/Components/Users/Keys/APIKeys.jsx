import React from 'react';
import { Space, Table, Tag, Card } from 'antd';
import { useEffect, useState } from 'react';
import axiosInstance from '../../Authentication/axios';



const columns = [
  {
    title: 'Sl No.',
    dataIndex: 'id',
    key: 'Sl No',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Public Key',
    dataIndex: 'public_key',
    key: 'publicKey',
  },
  {
    title: 'Secret Key',
    dataIndex: 'secret_key',
    key: 'secretKey',
  },
  {
    title: 'Date Created',
    dataIndex: 'created_at',
    key: 'date',
    render: (date) => {
        if (!date) {
            return '';
        }
        
        const dateTime = new Date(date);

        const getMonthName = (month)=> {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            return monthNames[month].substring(0, 3)
        };

        const formatTime = (date)=> {
            const hours = date.getHours()
            const minutes = date.getMinutes()
            const seconds = date.getSeconds()
            const ampm = hours >= 12 ? 'PM' : 'AM';
            return `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
        };

        const formattedDateTime = `${dateTime.getDate()}-${getMonthName(dateTime.getMonth())}-${dateTime.getFullYear()} ${formatTime(dateTime)}`

        return formattedDateTime
    }
  },
  {
    title: 'Status',
    dataIndex: 'is_active',
    key: 'status',
    render: (isActive)=> (
        <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Active' : 'Inactive'}</Tag>
    )
  },
];



// Merchant Keys
export default function MerchantKeys() {
    const [merchantKeysData, updateMerchantKeysData] = useState([]);

    
    // Fetch API Keys of the merchant
    useEffect(() => {
        axiosInstance.get(`api/v4/admin/merchant/keys/?merchant_id=161`).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.success === true) {
                const adminMerchantKeys = Array.isArray(res.data.admin_merchant_keys) ? res.data.admin_merchant_keys : [res.data.admin_merchant_keys];
                const MerchantKeysDatawithKey = adminMerchantKeys.map((item, index) => ({...item, key: index }));
                updateMerchantKeysData(MerchantKeysDatawithKey);
            }

        }).catch((error)=> {
            console.log(error)

        })
    }, []);

    
    return (
        <>
        <Card
            style={{
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            padding: '2px',
            }}
        >
            <h5><b>Merchant Keys</b></h5>
            <Table 
                columns={columns} 
                dataSource={merchantKeysData} 
                scroll={{
                    x: 500
                }}
                />
        </Card>
        </>
    )
};
