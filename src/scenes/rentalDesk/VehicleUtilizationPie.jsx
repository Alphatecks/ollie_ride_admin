import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Select } from 'antd';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Typography, Paper } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

function VehicleUtilizationPie() {
  const [monthFilter, setMonthFilter] = useState('Month');
  const [data, setData] = useState([]);
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
        
        // Count from rentals with "Ongoing" status
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
        
        // Also count vehicles with "Booked" status
        vehiclesSnapshot.forEach((doc) => {
          const vehicleData = doc.data();
          const vehicleId = vehicleData.vehicleId || doc.id;
          if (vehicleData.status === 'Booked' && !rentedVehicleIds.has(vehicleId)) {
            rentedVehicleIds.add(vehicleId);
            const categoryKey = vehicleCategoryMap[vehicleId] || 'Sedan';
            rentedCounts[categoryKey] = (rentedCounts[categoryKey] || 0) + 1;
          }
        });
        
        // Calculate utilization percentages
        const utilizationData = [];
        ['SUV', 'Luxury', 'Sedan'].forEach(category => {
          const total = vehicleCounts[category] || 1;
          const rented = rentedCounts[category] || 0;
          const percentage = Math.round((rented / total) * 100);
          
          let color = '#1976D2'; // Default dark blue
          if (category === 'SUV') color = '#FF9800'; // Orange
          else if (category === 'Luxury') color = '#64B5F6'; // Light blue
          
          utilizationData.push({
            name: category,
            value: percentage,
            color: color
          });
        });
        
        setData(utilizationData);
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

      {/* Pie Chart */}
      {loading ? (
        <div style={{ width: '100%', height: '300px', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>Loading...</Typography>
        </div>
      ) : (
        <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Paper>
  );
}

export default VehicleUtilizationPie;

