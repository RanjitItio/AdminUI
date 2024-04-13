import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';





function createData(Subject, User, Priority, Created_Date) {
  return { Subject, User, Priority, Created_Date };
}



const rows = [
  createData('New Tickets', 'Kyla Sarah', 'Normal', '01-09-2023 4:31 PM'),
  createData('New Tickets', 'Irish Watson', 'Normal', '03-09-2023 4:31 PM'),
  createData('Old Ticket', 'Kyla Jener', 'Normal', '03-09-2023 4:31 PM'),
];



export default function LatestTickets() {
  return (
    <Card style={{position: 'relative', marginTop: '2rem'}} >
    <CardContent>
    <h3>Latest Tickets</h3>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Subject</b></TableCell>
            <TableCell align="right"><b>User</b></TableCell>
            <TableCell align="right"><b>Priority</b></TableCell>
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
                {row.Subject}
              </TableCell>
              <TableCell align="right">{row.User}</TableCell>
              <TableCell align="right">{row.Priority}</TableCell>
              <TableCell align="right">{row.Created_Date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </CardContent>
</Card>

  );
}