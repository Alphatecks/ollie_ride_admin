import React, { useState, useEffect } from 'react';
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
  Checkbox,
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
import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import { format } from 'date-fns';
import passportImage from '../../assets/images/passport.png';

function RegistrationRequest() {
  const [requests, setRequests] = useState([]);
  const [dateFilter, setDateFilter] = useState('All');
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(requests.map(request => request.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id, event) => {
    event.stopPropagation(); // Prevent row click when clicking checkbox
    setSelectedRows(prev => {
      if (prev.includes(id)) {
        return prev.filter(rowId => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleRowClick = (request) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRequest(null);
  };

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const driversRef = collection(db, 'drivers');
        const driversSnapshot = await getDocs(driversRef);
        
        const driversData = driversSnapshot.docs.map((docSnapshot) => {
          const data = docSnapshot.data();
          
          // Map isApproved to status
          let status = 'Pending';
          if (data.isApproved === true) {
            status = 'Approved';
          } else if (data.isApproved === false) {
            status = 'Rejected';
          }
          
          // Format registration date
          let registrationDate = 'N/A';
          if (data.registrationDate) {
            try {
              const date = data.registrationDate?.toDate ? data.registrationDate.toDate() : (data.registrationDate instanceof Date ? data.registrationDate : new Date(data.registrationDate));
              registrationDate = format(date, 'dd MMM, yyyy');
            } catch (error) {
              registrationDate = data.registrationDate || 'N/A';
            }
          } else if (data.createdAt) {
            try {
              const date = data.createdAt?.toDate ? data.createdAt.toDate() : (data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt));
              registrationDate = format(date, 'dd MMM, yyyy');
            } catch (error) {
              registrationDate = 'N/A';
            }
          }
          
          return {
            id: docSnapshot.id,
            name: data.name || data.fullName || 'N/A',
            phone: data.phone || data.phoneNumber || 'N/A',
            email: data.email || 'N/A',
            address: data.address || data.homeAddress || 'N/A',
            registrationDate: registrationDate,
            status: status,
            isApproved: data.isApproved,
            documents: data.documents || data.documentUrls || [],
            // Include any other fields that might be in the drivers collection
            ...data
          };
        });
        
        setRequests(driversData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching drivers:', error);
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleApprove = async () => {
    if (!selectedRequest) return;
    
    try {
      const driverRef = doc(db, 'drivers', selectedRequest.id);
      await updateDoc(driverRef, {
        isApproved: true,
        updatedAt: serverTimestamp(),
        reviewedAt: serverTimestamp()
      });
      
      // Update local state
      setRequests(prevRequests =>
        prevRequests.map(req =>
          req.id === selectedRequest.id
            ? { ...req, isApproved: true, status: 'Approved' }
            : req
        )
      );
      
      handleClose();
    } catch (error) {
      console.error('Error approving driver:', error);
      alert('Failed to approve driver. Please try again.');
    }
  };

  const handleReject = async () => {
    if (!selectedRequest) return;
    
    try {
      const driverRef = doc(db, 'drivers', selectedRequest.id);
      await updateDoc(driverRef, {
        isApproved: false,
        updatedAt: serverTimestamp(),
        reviewedAt: serverTimestamp()
      });
      
      // Update local state
      setRequests(prevRequests =>
        prevRequests.map(req =>
          req.id === selectedRequest.id
            ? { ...req, isApproved: false, status: 'Rejected' }
            : req
        )
      );
      
      handleClose();
    } catch (error) {
      console.error('Error rejecting driver:', error);
      alert('Failed to reject driver. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower === 'approved') {
      return { bg: '#4CAF50', color: '#4CAF50', textColor: '#4CAF50' };
    } else if (statusLower === 'rejected') {
      return { bg: '#DD1D1D', color: '#DD1D1D', textColor: '#DD1D1D' };
    } else if (statusLower === 'pending') {
      return { bg: '#FFC107', color: '#FFC107', textColor: '#FFC107' };
    }
    return { bg: '#FFC107', color: '#FFC107', textColor: '#FFC107' };
  };

  const filteredRequests = dateFilter === 'All' 
    ? requests 
    : requests.filter(request => {
        // Filter logic based on dateFilter
        // For now, return all if dateFilter is not 'All'
        return true;
      });

  const isAllSelected = selectedRows.length === filteredRequests.length && filteredRequests.length > 0;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < filteredRequests.length;

  return (
    <div className='bg-[#F9F9F9] px-8 pt-8 pb-8 min-h-screen'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='font-medium text-2xl'>Drivers Registration Request</h1>
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
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={isIndeterminate}
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Phone No
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Email Address
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Registration Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Status
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Loading driver requests...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      No driver registration requests found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequests.map((request) => {
                  const statusColor = getStatusColor(request.status);
                  const isSelected = selectedRows.includes(request.id);
                  return (
                    <TableRow 
                      key={request.id}
                      onClick={() => handleRowClick(request)}
                      style={{ cursor: 'pointer' }}
                      hover
                    >
                      <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(request.id, e)}
                          color="primary"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {request.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {request.phone}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {request.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {request.registrationDate}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={request.status}
                          style={{
                            backgroundColor: 'transparent',
                            color: statusColor.textColor,
                            borderRadius: "10px",
                            fontWeight: 'bold',
                            border: `1px solid ${statusColor.color}`,
                            fontFamily: 'Poppins, sans-serif',
                          }}
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* View Request Modal */}
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
          <Typography variant="h6" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            View Request
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ padding: '24px' }}>
          {selectedRequest && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div>
                <Typography variant="subtitle1" fontWeight="bold" style={{ marginBottom: '16px', fontFamily: 'Poppins, sans-serif' }}>
                  Driver Information
                </Typography>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Typography variant="body2" style={{ fontWeight: 'bold', width: '140px', fontFamily: 'Poppins, sans-serif' }}>
                      Name:
                    </Typography>
                    <Typography variant="body2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {selectedRequest.name}
                    </Typography>
                  </div>
                  <div className="flex items-start">
                    <Typography variant="body2" style={{ fontWeight: 'bold', width: '140px', fontFamily: 'Poppins, sans-serif' }}>
                      Email:
                    </Typography>
                    <Typography variant="body2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {selectedRequest.email}
                    </Typography>
                  </div>
                  <div className="flex items-start">
                    <Typography variant="body2" style={{ fontWeight: 'bold', width: '140px', fontFamily: 'Poppins, sans-serif' }}>
                      Contact Details:
                    </Typography>
                    <Typography variant="body2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {selectedRequest.phone}
                    </Typography>
                  </div>
                  <div className="flex items-start">
                    <Typography variant="body2" style={{ fontWeight: 'bold', width: '140px', fontFamily: 'Poppins, sans-serif' }}>
                      Address:
                    </Typography>
                    <Typography variant="body2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {selectedRequest.address || 'N/A'}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid #e0e0e0', margin: '16px 0' }}></div>

              {/* Uploaded Documents */}
              <div>
                <Typography variant="subtitle1" fontWeight="bold" style={{ marginBottom: '16px', fontFamily: 'Poppins, sans-serif' }}>
                  Uploaded Documents
                </Typography>
                {selectedRequest.documents && selectedRequest.documents.length > 0 ? (
                  <div className="flex gap-4 flex-wrap">
                    {selectedRequest.documents.map((docUrl, index) => (
                      <img 
                        key={index}
                        src={docUrl} 
                        alt={`Document ${index + 1}`}
                        style={{ 
                          width: '150px', 
                          height: '100px', 
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid #e0e0e0',
                          cursor: 'pointer'
                        }}
                        onClick={() => window.open(docUrl, '_blank')}
                        onError={(e) => {
                          e.target.src = passportImage;
                          e.target.style.filter = 'blur(3px)';
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <img 
                      src={passportImage} 
                      alt="No documents uploaded" 
                      style={{ 
                        width: '150px', 
                        height: '100px', 
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0',
                        filter: 'blur(3px)'
                      }} 
                    />
                    <Typography variant="body2" style={{ fontFamily: 'Poppins, sans-serif', color: '#666', alignSelf: 'center' }}>
                      No documents uploaded
                    </Typography>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4" style={{ borderTop: '1px solid #e0e0e0' }}>
                <Button
                  variant="contained"
                  onClick={handleApprove}
                  disabled={selectedRequest.status === 'Approved'}
                  style={{
                    backgroundColor: selectedRequest.status === 'Approved' ? '#ccc' : '#0C3569',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '10px 24px',
                    textTransform: 'none',
                    flex: 1,
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {selectedRequest.status === 'Approved' ? 'Already Approved' : 'Approve request'}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleReject}
                  disabled={selectedRequest.status === 'Rejected'}
                  style={{
                    backgroundColor: selectedRequest.status === 'Rejected' ? '#ccc' : '#DD1D1D',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '10px 24px',
                    textTransform: 'none',
                    flex: 1,
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {selectedRequest.status === 'Rejected' ? 'Already Rejected' : 'Reject request'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RegistrationRequest;
