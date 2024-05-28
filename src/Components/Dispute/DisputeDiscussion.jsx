
import { Main, DrawerHeader } from '../Content';
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';






function DisputeDiscussion({ open }) {
  const [wStatus, setwStatus] = React.useState('')

  const WithdrawlStatus = [
    { value: 'All' },
    { value: 'Solved' },
    { value: 'Closed' },
  ]
  const handleStausChange = (event) => {
    setwStatus(event.target.value)
  }

  return (
    <>
      <Main open={open}>
        <DrawerHeader />
        <Card sx={{ width: '100%', height: '90px', mb: 2 }} className='shadow rounded border border-primary  p-2 m-3'>

          <div className='d-flex justify-content-between'>

            {/* <FormControl sx={{minWidth: 120, marginTop: '14px', marginLeft: '10px'}} >
                <InputLabel id="demo-simple-select-helper-label">Currency</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={currency} label="Currency" onChange={handleCurrencyChange}>
                    {currencies.map((cur, index)=> (
                        <MenuItem key={index} value={cur.value}>{cur.value}</MenuItem>
                    ))}
                </Select>
            </FormControl> */}
            <div>

              <h2>Dispute</h2>
            </div>
            <div>


              <FormControl sx={{ minWidth: 120, marginTop: '14px', marginLeft: '10px', float: 'left' }} >
                <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={wStatus} label="wStatus" onChange={handleStausChange}>
                  {WithdrawlStatus.map((w, index) => (
                    <MenuItem key={index} value={w.value}>{w.value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* <TextField sx={{marginTop: '14px', marginLeft: '10px'}}  id="outlined-basic" label="Enter user name" variant="outlined" />  */}
          </div>

        </Card>
        <Card sx={{ width: '100%', height: '90px', mb: 2 }} className='shadow rounded border border-primary  p-2 m-3'>
          <Row className="d-flex justify-content-center px-5 py-2">
            <Col xs={6}>
              <Row>
                <Col xs={6}>Title</Col>
                <Col xs={6} className=''>Description does not match with product</Col>
                <Col xs={6}>Transaction ID</Col>
                <Col xs={6}>9HNQSGQSIWL3Q</Col>
                <Col xs={6}>Status</Col>
                <Col xs={6}>Closed</Col>
                <Col xs={6}>Date</Col>
                <Col xs={6}>30-08-2023 1:31 PM</Col>
              </Row>
            </Col>
            <Col xs={6}>
              <Row>

                <Col xs={6}>Claimant</Col>
                <Col xs={6}>Kyla Sarah</Col>
                <Col xs={6}>Defendant</Col>
                <Col xs={6}>Irish Watson</Col>
              </Row>
            </Col>

          </Row>
        </Card>
        <Card sx={{ width: '100%', height: '90px', mb: 2 }} className='shadow rounded border border-primary  p-2 m-3'>
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
          />
          <Row>
            <Col xs={6}>
              <Form.Control type="file" />
            </Col>
            <Col xs={6}>
              <Button sx={{ marginTop: '20px', marginRight: '10px', float: 'right' }} variant="contained">Submit</Button>

            </Col>

          </Row>
        </Card>
        <Card sx={{ width: '100%', height: '90px', mb: 2 }} className='shadow rounded border border-primary  p-2 m-3' >
          <Card sx={{ width: '100%', height: '90px', mb: 2 }} className='shadow rounded border border-primary  p-2 d-inline-block'>
            {/* <div>A</div> */}
            <div>
              <blockquote className="blockquote mb-0">
                <p>
                  {' '}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                  posuere erat a ante.{' '}
                </p>
                <footer className="blockquote-footer">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </div>
          </Card>
        </Card>
      </Main>
    </>
  );
}


export default DisputeDiscussion;

