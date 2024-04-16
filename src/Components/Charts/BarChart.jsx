import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';



const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const tData = [2000, 1458, 6000, 9000, 5670, 8790, 2340];

const xLabels = [
  'Item One',
  'Item Two',
  'Item Three',
  'Item Four',
//   'Page E',
//   'Page F',
//   'Page G',
];


export default function SimpleBarChart() {
  return (
    <BarChart
      height={300}
      series={[
        { data: pData, label: 'Deposit Profit', id: 'pvId' },
        { data: uData, label: 'Payout Profit', id: 'uvId' },
        { data: tData, label: 'Transfer Profit', id: 'tvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    //   colors={['orange', 'green', 'blue']}
    />
  );
}