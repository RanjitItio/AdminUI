import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const dData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const tData = [6400, 9398, 9800, 5908, 1800, 8800, 4300];
const tlData = [2000, 1198, 9000, 1908, 3800, 2700, 3400];

const xLabels = [
  'Item One',
  'Item Two',
  'Item Three',
  'Item Four',
  'Item Five',
];

export default function SimpleBarChart() {
  return (
    <BarChart
      height={300}
      series={[
        { data: dData, label: 'Deposit Profit', id: 'deposit' },
        { data: tData, label: 'Transfer Profit', id: 'transfer' },
        { data: pData, label: 'Payout Profit', id: 'payout' },
        { data: tlData, label: 'Total Profit', id: 'total' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}