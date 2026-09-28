import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Typography, Paper } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

function VehicleUtilizationChart() {
  const [monthFilter, setMonthFilter] = useState('Month');
  const [utilizationData, setUtilizationData] = useState({
    suv: { percentage: 0, count: 0 },
    sedan: { percentage: 0, count: 0 },
    luxury: { percentage: 0, count: 0 },
    total: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUtilization = async () => {
      try {
        // Fetch vehicles
        const vehiclesRef = collection(db, 'vehicles');
        const vehiclesSnapshot = await getDocs(vehiclesRef);
        
        // Fetch rentals
        const rentalsRef = collection(db, 'rentals');
        const rentalsSnapshot = await getDocs(rentalsRef);
        
        // Create a map of vehicle IDs to categories
        const vehicleCategoryMap = {};
        const vehicleCounts = { SUV: 0, Luxury: 0, Sedan: 0 };
        
        vehiclesSnapshot.forEach((doc) => {
          const vehicleData = doc.data();
          const vehicleId = vehicleData.vehicleId || doc.id;
          const category = vehicleData.category || vehicleData.type || 'Sedan';
          const categoryKey = category.includes('SUV') || category.includes('suv') ? 'SUV' :
                            category.includes('Luxury') || category.includes('luxury') || category.includes('Premium') ? 'Luxury' : 'Sedan';
          
          vehicleCategoryMap[vehicleId] = categoryKey;
          vehicleCounts[categoryKey] = (vehicleCounts[categoryKey] || 0) + 1;
        });
        
        // Count rented vehicles by category
        const rentedCounts = { SUV: 0, Luxury: 0, Sedan: 0 };
        const rentedVehicleIds = new Set();
        
        rentalsSnapshot.forEach((doc) => {
          const rentalData = doc.data();
          if (rentalData.status === 'Ongoing' && rentalData.vehicleId) {
            const vehicleId = rentalData.vehicleId;
            if (!rentedVehicleIds.has(vehicleId)) {
              rentedVehicleIds.add(vehicleId);
              const categoryKey = vehicleCategoryMap[vehicleId] || 'Sedan';
              rentedCounts[categoryKey] = (rentedCounts[categoryKey] || 0) + 1;
            }
          }
        });
        
        vehiclesSnapshot.forEach((doc) => {
          const vehicleData = doc.data();
          const vehicleId = vehicleData.vehicleId || doc.id;
          if (vehicleData.status === 'Booked' && !rentedVehicleIds.has(vehicleId)) {
            rentedVehicleIds.add(vehicleId);
            const categoryKey = vehicleCategoryMap[vehicleId] || 'Sedan';
            rentedCounts[categoryKey] = (rentedCounts[categoryKey] || 0) + 1;
          }
        });
        
        // Calculate percentages and prepare data
        const totalVehicles = vehicleCounts.SUV + vehicleCounts.Luxury + vehicleCounts.Sedan;
        const suvPercentage = vehicleCounts.SUV > 0 ? Math.round((rentedCounts.SUV / vehicleCounts.SUV) * 100) : 0;
        const sedanPercentage = vehicleCounts.Sedan > 0 ? Math.round((rentedCounts.Sedan / vehicleCounts.Sedan) * 100) : 0;
        const luxuryPercentage = vehicleCounts.Luxury > 0 ? Math.round((rentedCounts.Luxury / vehicleCounts.Luxury) * 100) : 0;
        
        setUtilizationData({
          suv: { percentage: suvPercentage, count: vehicleCounts.SUV },
          sedan: { percentage: sedanPercentage, count: vehicleCounts.Sedan },
          luxury: { percentage: luxuryPercentage, count: vehicleCounts.Luxury },
          total: totalVehicles
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicle utilization:', error);
        setLoading(false);
      }
    };

    fetchUtilization();
  }, [monthFilter]);

  return (
    <Paper elevation={3} className="poppins-font" style={{ padding: "20px", borderRadius: "10px", flex: 1 }}>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '8px', fontFamily: 'Poppins, sans-serif' }}>
            Vehicle Utilization Rate
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
            The percentage of a fleet's vehicles that are actively rented out or in use, compared to the total number of available vehicles.
          </Typography>
        </div>
        <Select
          value={monthFilter}
          onChange={setMonthFilter}
          style={{
            width: "100px",
            height: "36px",
          }}
          suffixIcon={
            <ExpandMoreOutlinedIcon
              className="w-3 h-3"
              style={{ fontSize: 17 }}
            />
          }
          options={[
            { value: 'Month', label: 'Month' },
            { value: 'Week', label: 'Week' },
            { value: 'Year', label: 'Year' },
          ]}
        />
      </div>

      {loading ? (
        <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>Loading...</Typography>
        </div>
      ) : (
        <>
          {/* Hexagonal Chart Visualization */}
          <div className='flex justify-center items-center my-8' style={{ minHeight: '300px', position: 'relative' }}>
            <div style={{ position: 'relative', width: '450px', height: '350px' }}>
              {/* Large red hexagon (center) - SUV */}
              <div
                style={{
                  position: 'absolute',
                  left: '40%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '220px',
                  height: '220px',
                  backgroundColor: '#DD1D1D',
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              >
                <Typography style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Poppins, sans-serif' }}>
                  {utilizationData.suv.percentage}% SUV
                </Typography>
              </div>

              {/* Blue hexagon (top right overlap) - Sedan */}
              <div
                style={{
                  position: 'absolute',
                  left: '65%',
                  top: '35%',
                  transform: 'translate(-50%, -50%)',
                  width: '180px',
                  height: '180px',
                  backgroundColor: '#0C3569',
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}
              >
                <Typography style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Poppins, sans-serif' }}>
                  {utilizationData.sedan.percentage}% Sedan
                </Typography>
              </div>

              {/* Dark blue hexagon (bottom right overlap) - Luxury */}
              <div
                style={{
                  position: 'absolute',
                  left: '70%',
                  top: '70%',
                  transform: 'translate(-50%, -50%)',
                  width: '160px',
                  height: '160px',
                  backgroundColor: '#1a237e',
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 3,
                }}
              >
                <Typography style={{ color: 'white', fontWeight: 'bold', fontSize: '16px', fontFamily: 'Poppins, sans-serif' }}>
                  {utilizationData.luxury.percentage}% Luxury
                </Typography>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className='flex flex-wrap gap-6 justify-center mt-8'>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 rounded-full bg-[#DD1D1D]'></span>
              <Typography variant="body2" style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
                SUV {utilizationData.suv.count}
              </Typography>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 rounded-full bg-[#0C3569]'></span>
              <Typography variant="body2" style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
                Sedan {utilizationData.sedan.count}
              </Typography>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 rounded-full' style={{ backgroundColor: '#1a237e' }}></span>
              <Typography variant="body2" style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
                Luxury {utilizationData.luxury.count}
              </Typography>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 rounded-full bg-[#4CAF50]'></span>
              <Typography variant="body2" style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
                Total available of vehicles {utilizationData.total}
              </Typography>
            </div>
          </div>
        </>
      )}
    </Paper>
  );
}

export default VehicleUtilizationChart;

