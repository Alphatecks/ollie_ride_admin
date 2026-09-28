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
} from '@mui/material';
import { Select } from 'antd';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

function MostRentedVehicles() {
  const [dateFilter, setDateFilter] = useState('25 Dec 2024');
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMostRentedVehicles = async () => {
      try {
        // Fetch rentals
        const rentalsRef = collection(db, 'rentals');
        const rentalsSnapshot = await getDocs(rentalsRef);
        
        // Fetch vehicles to get vehicle details
        const vehiclesRef = collection(db, 'vehicles');
        const vehiclesSnapshot = await getDocs(vehiclesRef);
        
        const vehicleMap = {};
        vehiclesSnapshot.forEach((doc) => {
          const data = doc.data();
          const vehicleId = data.vehicleId || doc.id;
          vehicleMap[vehicleId] = {
            vehicleName: data.vehicleName || 'N/A',
            category: data.category || data.type || 'N/A',
            vehicleId: vehicleId
          };
        });
        
        // Count rentals and revenue per vehicle
        const vehicleStats = {};
        rentalsSnapshot.forEach((doc) => {
          const data = doc.data();
          const vehicleId = data.vehicleId || 'unknown';
          const vehicleInfo = vehicleMap[vehicleId] || {
            vehicleName: data.vehicleName || 'N/A',
            category: 'N/A',
            vehicleId: vehicleId
          };
          
          if (!vehicleStats[vehicleId]) {
            vehicleStats[vehicleId] = {
              vehicleName: vehicleInfo.vehicleName,
              id: vehicleInfo.vehicleId,
              category: vehicleInfo.category,
              count: 0,
              revenue: 0
            };
          }
          
          vehicleStats[vehicleId].count++;
          
          // Calculate revenue
          const rateStr = data.rentalRate || '0';
          let numericValue = rateStr.replace(/[^0-9.,]/g, '').replace(/,/g, '');
          if (numericValue.includes('.')) {
            const parts = numericValue.split('.');
            if (parts.length > 1 && parts[parts.length - 1].length === 3) {
              numericValue = numericValue.replace(/\./g, '');
            }
          }
          vehicleStats[vehicleId].revenue += parseFloat(numericValue) || 0;
        });
        
        // Convert to array and sort by count (most rented first)
        const sortedVehicles = Object.values(vehicleStats)
          .sort((a, b) => b.count - a.count)
          .slice(0, 10) // Top 10 most rented
          .map((vehicle, index) => ({
            sn: index + 1,
            vehicleName: vehicle.vehicleName,
            id: vehicle.id,
            category: vehicle.category,
            revenue: `N${vehicle.revenue.toLocaleString('en-US')}`,
            count: vehicle.count
          }));
        
        setVehicleData(sortedVehicles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching most rented vehicles:', error);
        setLoading(false);
      }
    };

    fetchMostRentedVehicles();
  }, [dateFilter]);

  return (
    <Paper elevation={3} className="poppins-font" style={{ padding: "20px", borderRadius: "10px" }}>
      <div className='flex justify-between items-center mb-4'>
        <Typography variant="h6" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Most Rented Vehicles
        </Typography>
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
              { value: '25 Dec 2024', label: '25 Dec 2024' },
            ]}
          />
        </div>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  S/N
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Vehicle Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Category
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Revenue Generated
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Count
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Loading most rented vehicles...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : vehicleData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                    No rental data found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              vehicleData.map((vehicle) => (
                <TableRow key={vehicle.sn}>
                  <TableCell>
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {vehicle.sn}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {vehicle.vehicleName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {vehicle.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {vehicle.category}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {vehicle.revenue}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {vehicle.count}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default MostRentedVehicles;

