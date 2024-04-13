import { LineChart } from '@mui/x-charts/LineChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';




export default function DashboardLineChart() {
  return (
    <Card sx={{ minWidth: 275 }} style={{ color: 'white', position: 'relative', marginTop: '2rem'}} >
    <CardContent>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
              label: 'Deposit'
            },
            {
              data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
              label: 'Payout'
            },
            {
              data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
              valueFormatter: (value) => (value == null ? '?' : value.toString()),
              label: 'Transfer'
            },
          ]}
          height={300}
          margin={{ top: 5, bottom: 20 }}
        />
    </CardContent>
    </Card>
  );
}