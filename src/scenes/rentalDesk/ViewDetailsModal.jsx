import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  IconButton,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { format, differenceInDays } from 'date-fns';

function ViewDetailsModal({ open, onClose, rental }) {
  if (!rental) return null;

  const formatDate = (dateValue) => {
    try {
      if (!dateValue) return 'N/A';
      if (dateValue && typeof dateValue.toDate === 'function') {
        return format(dateValue.toDate(), 'dd/MM/yyyy');
      }
      if (dateValue instanceof Date) {
        return format(dateValue, 'dd/MM/yyyy');
      }
      if (typeof dateValue === 'string') {
        return dateValue; // Already formatted string
      }
      return 'N/A';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };

  const calculateRemainingDays = () => {
    try {
      if (!rental.dueDate) return 'N/A';
      const due = rental.dueDate?.toDate ? rental.dueDate.toDate() : (rental.dueDate instanceof Date ? rental.dueDate : new Date(rental.dueDate));
      const today = new Date();
      const remaining = differenceInDays(due, today);
      if (remaining < 0) {
        return 'Overdue';
      }
      return `${remaining} days`;
    } catch (error) {
      return rental.remainingDays || 'N/A';
    }
  };

  const handleMarkAsReturned = () => {
    console.log('Mark as returned:', rental.rentalId);
    // TODO: Implement mark as returned logic
    onClose();
  };

  const handleExtendRental = () => {
    console.log('Extend rental:', rental.rentalId);
    // TODO: Implement extend rental logic
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: '12px',
          padding: '0',
          backgroundColor: 'white',
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
          View Details
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent style={{ padding: '24px' }}>
        {/* Rental ID */}
        <Typography 
          variant="body1" 
          style={{ 
            marginBottom: '24px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500
          }}
        >
          Rental ID: {rental.rentalId}
        </Typography>

        <div className="space-y-6">
          {/* Customer Information Section */}
          <div>
            <Typography 
              variant="subtitle1" 
              fontWeight="bold" 
              style={{ 
                marginBottom: '16px',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Customer Information
            </Typography>
            <div className="space-y-3">
              <div>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}
                >
                  Name:
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Poppins, sans-serif', marginTop: '4px' }}
                >
                  {rental.customerName}
                </Typography>
              </div>
              <div>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}
                >
                  Contact Details:
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Poppins, sans-serif', marginTop: '4px' }}
                >
                  {rental.contactDetails}
                </Typography>
              </div>
              <div>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}
                >
                  User ID:
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Poppins, sans-serif', marginTop: '4px' }}
                >
                  {rental.userId}
                </Typography>
              </div>
            </div>
          </div>

          {/* Vehicle Information Section */}
          <div>
            <Typography 
              variant="subtitle1" 
              fontWeight="bold" 
              style={{ 
                marginBottom: '16px',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Vehicle Information
            </Typography>
            <div className="space-y-3">
              <div>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}
                >
                  Model:
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Poppins, sans-serif', marginTop: '4px' }}
                >
                  {rental.vehicleName}
                </Typography>
              </div>
              <div>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}
                >
                  License Number:
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Poppins, sans-serif', marginTop: '4px' }}
                >
                  {rental.licenseNumber}
                </Typography>
              </div>
              <div>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}
                >
                  Vehicle ID:
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Poppins, sans-serif', marginTop: '4px' }}
                >
                  {rental.vehicleId}
                </Typography>
              </div>
            </div>
          </div>

          {/* Rental Details Section */}
          <div>
            <Typography 
              variant="subtitle1" 
              fontWeight="bold" 
              style={{ 
                marginBottom: '16px',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Rental Details
            </Typography>
            <div className="space-y-3">
              <div>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}
                >
                  Start Date:
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Poppins, sans-serif', marginTop: '4px' }}
                >
                  {formatDate(rental.startDate)}
                </Typography>
              </div>
              <div>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}
                >
                  Due Date:
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Poppins, sans-serif', marginTop: '4px' }}
                >
                  {formatDate(rental.dueDate)}
                </Typography>
              </div>
              <div>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}
                >
                  Remaining Days:
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Poppins, sans-serif', marginTop: '4px' }}
                >
                  {calculateRemainingDays()}
                </Typography>
              </div>
              <div>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}
                >
                  Status:
                </Typography>
                <div style={{ marginTop: '8px' }}>
                  <Chip
                    label={rental.status}
                    style={{
                      backgroundColor: rental.status === 'Overdue' ? '#DD1D1D' : '#FFC107',
                      color: rental.status === 'Overdue' ? 'white' : 'black',
                      borderRadius: '8px',
                      fontWeight: 'medium',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            variant="contained"
            onClick={handleMarkAsReturned}
            fullWidth
            style={{
              backgroundColor: '#0C3569',
              color: 'white',
              borderRadius: '8px',
              padding: '12px 24px',
              textTransform: 'none',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Mark as returned
          </Button>
          <Button
            variant="outlined"
            onClick={handleExtendRental}
            fullWidth
            style={{
              backgroundColor: 'white',
              color: '#0C3569',
              borderColor: '#0C3569',
              borderRadius: '8px',
              padding: '12px 24px',
              textTransform: 'none',
              fontFamily: 'Poppins, sans-serif',
              border: '1px solid #0C3569',
            }}
          >
            Extend rental
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewDetailsModal;

