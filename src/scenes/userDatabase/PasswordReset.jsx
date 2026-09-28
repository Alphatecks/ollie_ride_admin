import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Select } from 'antd';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

// Placeholder data - will be replaced with Firestore data when collection is available
const placeholderRequests = [
  { id: '1', customerName: 'Okoro Francis', email: 'okorofrancis@gmail.com', phoneNumber: '09074930890', requestDate: '21/11/2024', requestTime: '10:06AM', status: 'Pending', userId: '#8282202', method: 'SMS', ipAddress: '192.168.0.1.1234', location: '12, Ojike Street, Independence Layout, Enugu', device: 'Safari on macOS' },
  { id: '2', customerName: 'Todd Dulaney', email: 'Tiddeu77@gmail.com', phoneNumber: '090878577581', requestDate: '20/06', requestTime: '10:00AM', status: 'Pending', userId: '#8282203', method: 'Email', ipAddress: '192.168.0.1.1235', location: 'Lagos, Nigeria', device: 'Chrome on Windows' },
  { id: '3', customerName: 'Todd Dulaney', email: 'Tiddeu77@gmail.com', phoneNumber: '090878577581', requestDate: '20/06', requestTime: '10:00AM', status: 'Pending', userId: '#8282204', method: 'SMS', ipAddress: '192.168.0.1.1236', location: 'Abuja, Nigeria', device: 'Firefox on Linux' },
  { id: '4', customerName: 'Todd Dulaney', email: 'Tiddeu77@gmail.com', phoneNumber: '090878577581', requestDate: '20/06', requestTime: '10:00AM', status: 'Pending', userId: '#8282205', method: 'SMS', ipAddress: '192.168.0.1.1237', location: 'Port Harcourt, Nigeria', device: 'Safari on iOS' },
  { id: '5', customerName: 'Todd Dulaney', email: 'Tiddeu77@gmail.com', phoneNumber: '090878577581', requestDate: '20/06', requestTime: '10:00AM', status: 'Completed', userId: '#8282206', method: 'Email', ipAddress: '192.168.0.1.1238', location: 'Kano, Nigeria', device: 'Chrome on Android' },
  { id: '6', customerName: 'Todd Dulaney', email: 'Tiddeu77@gmail.com', phoneNumber: '090878577581', requestDate: '20/06', requestTime: '10:00AM', status: 'Pending', userId: '#8282207', method: 'SMS', ipAddress: '192.168.0.1.1239', location: 'Ibadan, Nigeria', device: 'Edge on Windows' },
  { id: '7', customerName: 'Todd Dulaney', email: 'Tiddeu77@gmail.com', phoneNumber: '090878577581', requestDate: '20/06', requestTime: '10:00AM', status: 'Pending', userId: '#8282208', method: 'SMS', ipAddress: '192.168.0.1.1240', location: 'Enugu, Nigeria', device: 'Safari on macOS' },
  { id: '8', customerName: 'Todd Dulaney', email: 'Tiddeu77@gmail.com', phoneNumber: '090878577581', requestDate: '20/06', requestTime: '10:00AM', status: 'Pending', userId: '#8282209', method: 'Email', ipAddress: '192.168.0.1.1241', location: 'Calabar, Nigeria', device: 'Chrome on macOS' },
  { id: '9', customerName: 'Todd Dulaney', email: 'Tiddeu77@gmail.com', phoneNumber: '090878577581', requestDate: '20/06', requestTime: '10:00AM', status: 'Pending', userId: '#8282210', method: 'SMS', ipAddress: '192.168.0.1.1242', location: 'Benin, Nigeria', device: 'Firefox on Windows' },
];

function PasswordReset() {
  const [requests] = useState(placeholderRequests);
  const [dateFilter, setDateFilter] = useState('All');
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleRowClick = (request) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRequest(null);
  };

  const handleSendSMS = () => {
    console.log('Send link via SMS for:', selectedRequest);
    // TODO: Implement SMS sending logic
  };

  const handleSendEmail = () => {
    console.log('Send link via Email for:', selectedRequest);
    // TODO: Implement Email sending logic
  };

  const handleDeny = () => {
    console.log('Deny request for:', selectedRequest);
    // TODO: Implement deny logic
    handleClose();
  };


  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower === 'completed' || statusLower === 'complete') {
      return { bg: '#4CAF50', color: '#000' };
    } else if (statusLower === 'pending') {
      return { bg: '#FFC107', color: '#000' };
    }
    return { bg: '#FFC107', color: '#000' };
  };

  const filteredRequests = dateFilter === 'All' 
    ? requests 
    : requests.filter(request => {
        // Filter logic based on dateFilter
        // For now, return all if dateFilter is not 'All'
        return true;
      });

  return (
    <div className='bg-[#F9F9F9] px-8 pt-8 pb-8 min-h-screen'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='font-medium text-2xl'>Password Reset</h1>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-2 border rounded-lg px-3 py-2 bg-white' style={{ cursor: 'pointer' }}>
            <CalendarTodayIcon style={{ fontSize: 18, color: '#666' }} />
            <Select
              value={dateFilter}
              onChange={setDateFilter}
              style={{
                width: "140px",
                border: 'none',
              }}
              bordered={false}
              suffixIcon={
                <ExpandMoreOutlinedIcon
                  className="w-3 h-3"
                  style={{ fontSize: 17 }}
                />
              }
              options={[
                { value: 'All', label: 'Filter by date' },
                { value: 'Today', label: 'Today' },
                { value: 'This Week', label: 'This Week' },
                { value: 'This Month', label: 'This Month' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Customer Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    E-mail
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Phone Number
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Request Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Request Time
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Status
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.map((request) => {
                const statusColor = getStatusColor(request.status);
                return (
                  <TableRow 
                    key={request.id}
                    onClick={() => handleRowClick(request)}
                    style={{ cursor: 'pointer' }}
                    hover
                  >
                    <TableCell>
                      <Typography>{request.customerName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{request.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{request.phoneNumber}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{request.requestDate}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{request.requestTime}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={request.status}
                        style={{
                          backgroundColor: statusColor.bg,
                          color: statusColor.color,
                          borderRadius: "10px",
                          fontWeight: 'bold',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Password Reset Details Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '12px',
            padding: '0',
          }
        }}
      >
        <DialogTitle style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '24px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Typography variant="h6" fontWeight="bold">Password Reset</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ padding: '24px' }}>
          {selectedRequest && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div>
                <Typography variant="subtitle1" fontWeight="bold" style={{ marginBottom: '16px' }}>
                  Customer Information
                </Typography>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Typography variant="body2" style={{ fontWeight: 'bold', width: '120px' }}>Name:</Typography>
                    <Typography variant="body2">{selectedRequest.customerName}</Typography>
                  </div>
                  <div className="flex items-start">
                    <Typography variant="body2" style={{ fontWeight: 'bold', width: '120px' }}>Contact Details:</Typography>
                    <Typography variant="body2">{selectedRequest.phoneNumber}</Typography>
                  </div>
                  <div className="flex items-start">
                    <Typography variant="body2" style={{ fontWeight: 'bold', width: '120px' }}>User ID:</Typography>
                    <Typography variant="body2">{selectedRequest.userId || `#${selectedRequest.id}`}</Typography>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div>
                <Typography variant="subtitle1" fontWeight="bold" style={{ marginBottom: '16px' }}>
                  Request Details
                </Typography>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Typography variant="body2" style={{ fontWeight: 'bold', width: '120px' }}>Date and Time:</Typography>
                    <Typography variant="body2">{selectedRequest.requestDate}, {selectedRequest.requestTime}</Typography>
                  </div>
                  <div className="flex items-start">
                    <Typography variant="body2" style={{ fontWeight: 'bold', width: '120px' }}>Method:</Typography>
                    <Typography variant="body2">{selectedRequest.method || 'SMS'}</Typography>
                  </div>
                  <div className="flex items-start">
                    <Typography variant="body2" style={{ fontWeight: 'bold', width: '120px' }}>IP Address:</Typography>
                    <Typography variant="body2">{selectedRequest.ipAddress || 'N/A'}</Typography>
                  </div>
                  <div className="flex items-start">
                    <Typography variant="body2" style={{ fontWeight: 'bold', width: '120px' }}>Location:</Typography>
                    <Typography variant="body2">{selectedRequest.location || 'N/A'}</Typography>
                  </div>
                  <div className="flex items-start">
                    <Typography variant="body2" style={{ fontWeight: 'bold', width: '120px' }}>Device Used:</Typography>
                    <Typography variant="body2">{selectedRequest.device || 'N/A'}</Typography>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4" style={{ borderTop: '1px solid #e0e0e0' }}>
                <Button
                  variant="contained"
                  onClick={handleSendSMS}
                  style={{
                    backgroundColor: '#0C3569',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '10px 24px',
                    textTransform: 'none',
                    flex: 1,
                  }}
                >
                  Send link via SMS
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleSendEmail}
                  style={{
                    borderColor: '#0C3569',
                    color: '#0C3569',
                    borderRadius: '8px',
                    padding: '10px 24px',
                    textTransform: 'none',
                    flex: 1,
                  }}
                >
                  Send link via Email
                </Button>
                <Button
                  variant="contained"
                  onClick={handleDeny}
                  style={{
                    backgroundColor: '#DD1D1D',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '10px 24px',
                    textTransform: 'none',
                    flex: 1,
                  }}
                >
                  Deny request
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PasswordReset;
