import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Checkbox,
} from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { format } from 'date-fns';
import VehicleDetailsModal from './VehicleDetailsModal';

function VehicleTable() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRowClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedVehicle(null);
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehiclesRef = collection(db, 'vehicles');
        const vehiclesSnapshot = await getDocs(vehiclesRef);
        
        const vehiclesData = vehiclesSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            vehicleName: data.vehicleName || 'N/A',
            licensePlate: data.licensePlate || 'N/A',
            category: data.category || 'N/A',
            currentMileage: data.currentMileage || 'N/A',
            rentalRate: data.rentalRate || 'N/A',
            status: data.status || 'Available',
            vehicleId: data.vehicleId || `#${doc.id.slice(0, 7)}`,
            type: data.type || 'N/A',
            class: data.class || 'N/A',
            transmission: data.transmission || 'N/A',
            registrationDate: data.registrationDate || null,
            lastRentalDate: data.lastRentalDate || null,
            nextMaintenanceDate: data.nextMaintenanceDate || null,
            totalRentals: data.totalRentals || 0,
            totalEarnings: data.totalEarnings || 0,
            frontImageUrl: data.frontImageUrl || null,
            sideImageUrl: data.sideImageUrl || null,
          };
        });
        
        setVehicles(vehiclesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const formatDate = (dateValue) => {
    try {
      if (!dateValue) return 'N/A';
      if (dateValue && typeof dateValue.toDate === 'function') {
        return format(dateValue.toDate(), 'dd/MM/yyyy; hh:mm a');
      }
      if (dateValue instanceof Date) {
        return format(dateValue, 'dd/MM/yyyy; hh:mm a');
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
      return 'N/A';
    } catch (error) {
      return 'N/A';
    }
  };

  const getStatusChipStyle = (status) => {
    switch (status) {
      case 'Available':
        return {
          backgroundColor: '#E8F5E9',
          color: '#4CAF50',
        };
      case 'Maintenance':
        return {
          backgroundColor: '#FFEBEE',
          color: '#DD1D1D',
        };
      case 'Booked':
        return {
          backgroundColor: '#E3F2FD',
          color: '#0C3569',
        };
      default:
        return {
          backgroundColor: '#F5F5F5',
          color: '#666',
        };
    }
  };

  return (
    <Paper 
      elevation={3} 
      className="poppins-font" 
      style={{ 
        padding: "20px", 
        borderRadius: "10px"
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Vehicle Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  License Plate
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Category
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Current Mileage
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Rental Rate
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Loading vehicles...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : vehicles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                    No vehicles found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              vehicles.map((vehicle) => {
                const statusStyle = getStatusChipStyle(vehicle.status);
                return (
                <TableRow 
                  key={vehicle.id}
                  onClick={() => handleRowClick(vehicle)}
                  style={{ 
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      color="primary"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {vehicle.vehicleName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {vehicle.licensePlate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {vehicle.category}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {vehicle.currentMileage}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {vehicle.rentalRate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={vehicle.status}
                      style={{
                        ...statusStyle,
                        borderRadius: '8px',
                        fontWeight: 'medium',
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Vehicle Details Modal */}
      <VehicleDetailsModal
        open={openModal}
        onClose={handleCloseModal}
        vehicle={selectedVehicle}
      />
    </Paper>
  );
}

export default VehicleTable;

