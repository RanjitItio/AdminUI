import * as React from 'react';
// import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import CardContent from '@mui/material/CardContent';
import SimpleBarChart from './Charts/BarChart';




const ProfitData = [
    {label: 'Deposit Profit', value: 32},
    {label: 'Payout Profit', value: 100},
    {label: 'Transfer Profit', value: 50}
];


const progressBars = ProfitData.map((data, index) => (
    <div key={index} style={{display: 'flex', alignItems: 'center' }}>
        <h3 style={{ marginRight: '2rem' }}>{data.label}</h3>
        <progress id="file" value={data.value} max="100"> 32% </progress>
  </div>
));

export default function TotalProfit() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Card sx={{ minWidth: 10 }} style={{ marginTop: '2rem'}} >
        {/* <CardContent> */}
            <Box sx={{ maxWidth: '100%', typography: 'body1' }}>
              <SimpleBarChart />
                {/* <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Item One" value="1" />
                        <Tab label="Item Two" value="2" />
                        <Tab label="Item Three" value="3" />
                    </TabList>
                    </Box>
                    <TabPanel value="1">
                    <div >
                      <div style={{display: 'flex', alignItems: 'center' }}>
                        <h3 style={{ marginRight: '5rem' }}>Total Profit</h3>
                        <h4>10$</h4>
                      </div>

                      {progressBars}
                      
                    </div>

                    </TabPanel>
                    <TabPanel value="2">
                    <div >
                      <div style={{display: 'flex', alignItems: 'center' }}>
                        <h3 style={{ marginRight: '5rem' }}>Total Profit</h3>
                        <h4>0$</h4>
                      </div>

                      {progressBars}
                      
                    </div>
                    </TabPanel>
                    <TabPanel value="3">
                    <div >
                      <div style={{display: 'flex', alignItems: 'center' }}>
                        <h3 style={{ marginRight: '5rem' }}>Total Profit</h3>
                        <h4>0$</h4>
                      </div>

                      {progressBars}
                      
                    </div>
                    </TabPanel>
                </TabContext> */}
            </Box>
        {/* </CardContent> */}

    </Card>

    
    </>
  );
}