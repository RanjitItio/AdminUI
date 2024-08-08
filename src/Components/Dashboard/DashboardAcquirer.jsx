import {Paper, Box } from '@mui/material';
import { Progress, Typography } from 'antd';



const { Text, Link } = Typography;
const { Title } = Typography;





export default function DashboardAcquirer() {
    return (
        <Paper elevation={8} sx={{mt:3, p:2, borderRadius: '10px', height: '24rem'}}>
            <Title level={4}>Acquirer Transactions</Title>

            <Box p={1}>
                <Progress
                    percent={60}
                    percentPosition={{
                        align: 'end',
                        type: 'inner',
                    }}
                    size={['100%', 20]}
                    strokeColor="#bb3bb0"
                    />
                <Text disabled>Mastercard</Text>

                <Progress
                    percent={40}
                    percentPosition={{
                        align: 'end',
                        type: 'inner',
                    }}
                    size={['100%', 20]}
                    strokeColor="#00c9a7"
                    style={{marginTop:'20px'}}
                    />
                <Text disabled>Phonepe</Text>

                <Progress
                    percent={80}
                    percentPosition={{
                        align: 'end',
                        type: 'inner',
                    }}
                    size={['100%', 20]}
                    strokeColor="#4ffbdf"
                    status='active'
                    style={{marginTop:'20px'}}
                    />
                <Text disabled>Gpay</Text>

                <Progress
                    percent={50}
                    percentPosition={{
                        align: 'end',
                        type: 'inner',
                    }}
                    size={['100%', 20]}
                    strokeColor="#845ec2"
                    style={{marginTop:'20px'}}
                    />
                <Text disabled>Razorpay</Text>
            </Box>
        </Paper>
    );
};