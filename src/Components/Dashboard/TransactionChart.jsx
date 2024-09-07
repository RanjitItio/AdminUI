import { Paper, CardContent, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {useState, useEffect} from 'react';
import axiosInstance from '../Authentication/axios';


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);






const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Transaction Overview',
    },
  },
};



export default function TransactionChart() {
    const [transactionChartData, UpdateTransactionChartData] = useState([]);
    const [withdrawalChartData, UpdateWithdrawalChartData] = useState([]);


    // Fetch all the transaction data
    useEffect(() => {
      axiosInstance.get(`api/v6/admin/dash/income/stats/`).then((res)=> {
        console.log(res.data)
        if (res.status === 200 && res.data.success === true) {
            UpdateTransactionChartData(res.data.success_transactions_by_day)
            UpdateWithdrawalChartData(res.data.withdrawal_transactions_by_day)
        }

      }).catch((error)=> {
        console.log(error)

      })
    }, []);

    // Define the chart data and options
    const data = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
        {
            label: 'Income',
            data: [transactionChartData?.Sunday || 0, transactionChartData?.Monday || 0, transactionChartData?.Tuesday || 0, transactionChartData?.Wednesday, transactionChartData?.Thursday || 0, transactionChartData?.Friday || 0, transactionChartData?.Saturday || 0],
            backgroundColor: '#4285F4',
        },
        {
            label: 'Outcome',
            data: [withdrawalChartData?.Sunday || 0, withdrawalChartData?.Monday || 0, withdrawalChartData?.Tuesday || 0, withdrawalChartData?.Wednesday, withdrawalChartData?.Thursday || 0, withdrawalChartData?.Friday || 0, withdrawalChartData?.Saturday || 0],
            backgroundColor: '#FF9900',
        },
        ],
    };

    
  return (
    <Paper elevation={8} sx={{ borderRadius: '10px', mt: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
            Transaction Overview
        </Typography>
        <Bar data={data} options={options} height={150} />
      </CardContent>
    </Paper>
  );
}

