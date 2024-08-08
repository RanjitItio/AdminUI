import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';





function createData(Dispute, Claimant, Created_Date) {
  return { Dispute, Claimant, Created_Date };
}


const rows = [
  createData('New Tickets', 'Kyla Sarah',  '01-09-2023 4:31 PM'),
  createData('New Tickets', 'Irish Watson',  '03-09-2023 4:31 PM'),
  createData('Old Ticket', 'Kyla Jener', '03-09-2023 4:31 PM'),
];



export default function LatestDispute() {
  return (
    <Card style={{ marginTop: '2rem', position: 'relative'}} >
    <CardContent>
    <h3>Latest Disputes</h3>
    <TableContainer component={Paper} >
    <div style={{ overflowX: 'auto' }}>
      <Table  aria-label="simple table" sx={{minWidth: 100}}>
        <TableHead>
          <TableRow>
            <TableCell><b>Dispute</b></TableCell>
            <TableCell align="right"><b>Claimant</b></TableCell>
            <TableCell align="right"><b>Created Date</b></TableCell>
           
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Dispute}
              </TableCell>
              <TableCell align="right">{row.Claimant}</TableCell>
              <TableCell align="right">{row.Created_Date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </TableContainer>
    
    </CardContent>
 </Card>

  );
}