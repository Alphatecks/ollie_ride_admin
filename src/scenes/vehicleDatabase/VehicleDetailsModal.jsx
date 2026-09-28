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
import { format } from 'date-fns';
import carFront from '../../assets/images/car-front.png';
import carSide from '../../assets/images/car-side.png';

function VehicleDetailsModal({ open, onClose, vehicle }) {
  if (!vehicle) return null;

  const formatDate = (dateValue) => {
    try {
      if (!dateValue) return 'N/A';
      if (dateValue && typeof dateValue.toDate === 'function') {
        return format(dateValue.toDate(), 'dd/MM/yyyy; hh:mm a');
      }
      if (dateValue instanceof Date) {
        return format(dateValue, 'dd/MM/yyyy; hh:mm a');
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

  const formatSimpleDate = (dateValue) => {
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
      return 'N/A';
    }
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'N0';
    const numAmount = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    return `N${numAmount.toLocaleString('en-US')}`;
  };

  const handleEditDetails = () => {
    console.log('Edit details:', vehicle.id);
    // TODO: Implement edit details logic
  };

  const handleRemove = () => {
    console.log('Remove vehicle:', vehicle.id);
    // TODO: Implement remove logic
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
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
          Vehicle Details
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
        <div className="space-y-6">
          {/* General Information Section */}
          <div>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              style={{ 
                marginBottom: '20px',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              General Information
            </Typography>
            <div className="flex gap-8">
              <div className="flex-1 space-y-4">
                <div>
                  <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', marginBottom: '4px' }}
                  >
                    Name:
                  </Typography>
                  <Typography 
                    variant="body1" 
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {vehicle.vehicleName}
                  </Typography>
                </div>
                <div>
                  <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', marginBottom: '4px' }}
                  >
                    License Plate:
                  </Typography>
                  <Typography 
                    variant="body1" 
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {vehicle.licensePlate}
                  </Typography>
                </div>
                <div>
                  <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', marginBottom: '4px' }}
                  >
                    ID:
                  </Typography>
                  <Typography 
                    variant="body1" 
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {vehicle.vehicleId}
                  </Typography>
                </div>
                <div>
                  <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', marginBottom: '4px' }}
                  >
                    Type:
                  </Typography>
                  <Typography 
                    variant="body1" 
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {vehicle.type}
                  </Typography>
                </div>
                <div>
                  <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', marginBottom: '4px' }}
                  >
                    Class:
                  </Typography>
                  <Typography 
                    variant="body1" 
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {vehicle.class}
                  </Typography>
                </div>
                <div>
                  <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', marginBottom: '4px' }}
                  >
                    Transmission:
                  </Typography>
                  <Typography 
                    variant="body1" 
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {vehicle.transmission}
                  </Typography>
                </div>
                <div>
                  <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', marginBottom: '4px' }}
                  >
                    Date of registration:
                  </Typography>
                  <Typography 
                    variant="body1" 
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {formatDate(vehicle.registrationDate)}
                  </Typography>
                </div>
              </div>
              {/* Vehicle Images */}
              <div className="flex gap-4">
                <div className="text-center">
                  <img 
                    src={vehicle.frontImageUrl || carFront} 
                    alt="Front View" 
                    style={{ 
                      width: '200px', 
                      height: '150px', 
                      objectFit: 'contain',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      padding: '10px'
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    style={{ 
                      marginTop: '8px',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '12px'
                    }}
                  >
                    Front View
                  </Typography>
                </div>
                <div className="text-center">
                  <img 
                    src={vehicle.sideImageUrl || carSide} 
                    alt="Side View" 
                    style={{ 
                      width: '200px', 
                      height: '150px', 
                      objectFit: 'contain',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      padding: '10px'
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    style={{ 
                      marginTop: '8px',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '12px'
                    }}
                  >
                    Side View
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #e0e0e0', margin: '24px 0' }}></div>

          {/* Availability Status Section */}
          <div>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              style={{ 
                marginBottom: '20px',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Availability Status
            </Typography>
            <div className="space-y-4">
              <div>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', marginBottom: '4px' }}
                >
                  Current status:
                </Typography>
                <Chip
                  label={vehicle.status}
                  style={{
                    backgroundColor: vehicle.status === 'Available' ? '#E8F5E9' : 
                                    vehicle.status === 'Maintenance' ? '#FFEBEE' : '#E3F2FD',
                    color: vehicle.status === 'Available' ? '#4CAF50' : 
                           vehicle.status === 'Maintenance' ? '#DD1D1D' : '#0C3569',
                    borderRadius: '8px',
                    fontWeight: 'medium',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                />
              </div>
              <div>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', marginBottom: '4px' }}
                >
                  Last rental date:
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {formatSimpleDate(vehicle.lastRentalDate)}
                </Typography>
              </div>
              <div>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', marginBottom: '4px' }}
                >
                  Next maintenance date:
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {formatSimpleDate(vehicle.nextMaintenanceDate)}
                </Typography>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #e0e0e0', margin: '24px 0' }}></div>

          {/* Rental & Usage History Section */}
          <div>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              style={{ 
                marginBottom: '20px',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Rental & Usage History
            </Typography>
            <div className="space-y-4">
              <div>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', marginBottom: '4px' }}
                >
                  Total rentals:
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {vehicle.totalRentals || 0}
                </Typography>
              </div>
              <div>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', marginBottom: '4px' }}
                >
                  Total earnings:
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {formatCurrency(vehicle.totalEarnings)}
                </Typography>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              variant="outlined"
              onClick={handleEditDetails}
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
              Edit details
            </Button>
            <Button
              variant="contained"
              onClick={handleRemove}
              fullWidth
              style={{
                backgroundColor: '#DD1D1D',
                color: 'white',
                borderRadius: '8px',
                padding: '12px 24px',
                textTransform: 'none',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default VehicleDetailsModal;

