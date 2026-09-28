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
} from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { format, differenceInDays } from 'date-fns';
import ViewDetailsModal from './ViewDetailsModal';

function RentalTable() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRowClick = (rental) => {
    setSelectedRental(rental);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRental(null);
  };

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const rentalsRef = collection(db, 'rentals');
        const rentalsSnapshot = await getDocs(rentalsRef);
        
        const rentalsData = rentalsSnapshot.docs.map((doc) => {
          const data = doc.data();
          
          // Calculate rental duration and remaining days
          let rentalDuration = 'N/A';
          let remainingDays = 0;
          let startDate = null;
          let dueDate = null;
          
          if (data.startDate && data.dueDate) {
            try {
              const start = data.startDate?.toDate ? data.startDate.toDate() : (data.startDate instanceof Date ? data.startDate : new Date(data.startDate));
              const due = data.dueDate?.toDate ? data.dueDate.toDate() : (data.dueDate instanceof Date ? data.dueDate : new Date(data.dueDate));
              
              startDate = start;
              dueDate = due;
              
              const durationDays = differenceInDays(due, start);
              rentalDuration = `${durationDays} days`;
              
              const today = new Date();
              const remaining = differenceInDays(due, today);
              remainingDays = remaining;
            } catch (error) {
              console.error('Error calculating dates:', error);
            }
          }
          
          return {
            id: doc.id,
            rentalId: data.rentalId || `#${doc.id.slice(0, 7)}`,
            vehicleName: data.vehicleName || 'N/A',
            customerName: data.customerName || 'N/A',
            rentalDuration: data.rentalDuration || rentalDuration,
            rentalRate: data.rentalRate || 'N/A',
            status: data.status || 'Ongoing',
            contactDetails: data.contactDetails || 'N/A',
            userId: data.userId || 'N/A',
            licenseNumber: data.licenseNumber || 'N/A',
            vehicleId: data.vehicleId || 'N/A',
            startDate: data.startDate || null,
            dueDate: data.dueDate || null,
            remainingDays: remainingDays,
          };
        });
        
        setRentals(rentalsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rentals:', error);
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  return (
    <Paper 
      elevation={3} 
      className="poppins-font" 
      style={{ 
        padding: "20px", 
        borderRadius: "10px",
        marginTop: '24px'
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Rental ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Vehicle Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Customer Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Rental Duration
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
                <TableCell colSpan={6} align="center">
                  <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Loading rentals...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : rentals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                    No rentals found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rentals.map((rental) => {
                const isOverdue = rental.status === 'Overdue' || (rental.remainingDays < 0 && rental.status === 'Ongoing');
                return (
                  <TableRow 
                    key={rental.id}
                    onClick={() => handleRowClick(rental)}
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
                    <TableCell>
                      <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {rental.rentalId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {rental.vehicleName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {rental.customerName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {rental.rentalDuration}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {rental.rentalRate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={rental.status}
                        style={{
                          backgroundColor: isOverdue ? '#DD1D1D' : '#FFC107',
                          color: isOverdue ? 'white' : 'black',
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

      {/* View Details Modal */}
      <ViewDetailsModal
        open={openModal}
        onClose={handleCloseModal}
        rental={selectedRental}
      />
    </Paper>
  );
}

export default RentalTable;

