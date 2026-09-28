import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Select } from 'antd';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Typography, Paper } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { format, startOfYear, eachMonthOfInterval } from 'date-fns';

function RevenueBreakdown() {
  const [monthFilter, setMonthFilter] = useState('Month');
  const [carTypeFilter, setCarTypeFilter] = useState('Car type');
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ suv: 0, sedan: 0, luxury: 0, total: 0 });

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        // Fetch rentals
        const rentalsRef = collection(db, 'rentals');
        const rentalsSnapshot = await getDocs(rentalsRef);
        
        // Fetch vehicles to get categories
        const vehiclesRef = collection(db, 'vehicles');
        const vehiclesSnapshot = await getDocs(vehiclesRef);
        
        const vehicleCategories = {};
        vehiclesSnapshot.forEach((doc) => {
          const data = doc.data();
          vehicleCategories[data.vehicleId || doc.id] = data.category || data.type || 'Sedan';
        });

        // Group rentals by month and category
        const now = new Date();
        const start = startOfYear(now);
        const months = eachMonthOfInterval({ start, end: now });
        
        const monthlyData = months.map(month => {
          const monthKey = format(month, 'MMM');
          const suv = { revenue: 0 };
          const sedan = { revenue: 0 };
          const luxury = { revenue: 0 };

          rentalsSnapshot.forEach((doc) => {
            const data = doc.data();
            let rentalDate = null;
            if (data.createdAt) {
              rentalDate = data.createdAt?.toDate ? data.createdAt.toDate() : (data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt));
            } else if (data.startDate) {
              rentalDate = data.startDate?.toDate ? data.startDate.toDate() : (data.startDate instanceof Date ? data.startDate : new Date(data.startDate));
            } else {
              return;
            }

            if (format(rentalDate, 'yyyy-MM') === format(month, 'yyyy-MM')) {
              const rateStr = data.rentalRate || '0';
              // Remove currency symbols and spaces, handle both comma and dot as thousand separators
              let numericValue = rateStr.replace(/[^0-9.,]/g, '').replace(/,/g, '');
              // If it has a dot, check if it's a decimal or thousand separator
              if (numericValue.includes('.')) {
                const parts = numericValue.split('.');
                // If last part is 3 digits, it's likely a thousand separator
                if (parts.length > 1 && parts[parts.length - 1].length === 3) {
                  numericValue = numericValue.replace(/\./g, '');
                }
              }
              const revenue = parseFloat(numericValue) || 0;
              const vehicleId = data.vehicleId || '';
              const category = vehicleCategories[vehicleId] || 'Sedan';
              const categoryLower = category.toLowerCase();

              if (categoryLower.includes('suv')) {
                suv.revenue += revenue;
              } else if (categoryLower.includes('luxury') || categoryLower.includes('premium')) {
                luxury.revenue += revenue;
              } else {
                sedan.revenue += revenue;
              }
            }
          });

          return {
            month: monthKey,
            suv: Math.round(suv.revenue),
            sedan: Math.round(sedan.revenue),
            luxury: Math.round(luxury.revenue)
          };
        });

        // Calculate totals
        const totals = monthlyData.reduce((acc, item) => {
          acc.suv += item.suv;
          acc.sedan += item.sedan;
          acc.luxury += item.luxury;
          acc.total = acc.suv + acc.sedan + acc.luxury;
          return acc;
        }, { suv: 0, sedan: 0, luxury: 0, total: 0 });

        setRevenueData(monthlyData);
        setTotals(totals);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, [monthFilter]);

  return (
    <Paper elevation={3} className="poppins-font" style={{ padding: "20px", borderRadius: "10px", flex: 1 }}>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '8px', fontFamily: 'Poppins, sans-serif' }}>
            Revenue Breakdown
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
            Detailed insights into revenue distribution across vehicle categories, rental durations, locations, and additional fees
          </Typography>
        </div>
        <div className='flex gap-2'>
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
          <Select
            value={carTypeFilter}
            onChange={setCarTypeFilter}
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
              { value: 'Car type', label: 'Car type' },
            ]}
          />
        </div>
      </div>

      {/* Multi-line Chart */}
      {loading ? (
        <div style={{ width: '100%', height: '300px', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>Loading...</Typography>
        </div>
      ) : (
        <>
          <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
            <ResponsiveContainer>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="month" 
                  style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}
                />
                <YAxis 
                  style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="suv" 
                  stroke="#DD1D1D" 
                  strokeWidth={2}
                  dot={{ fill: '#DD1D1D', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sedan" 
                  stroke="#0C3569" 
                  strokeWidth={2}
                  dot={{ fill: '#0C3569', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="luxury" 
                  stroke="#4CAF50" 
                  strokeWidth={2}
                  dot={{ fill: '#4CAF50', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className='flex flex-wrap gap-6 justify-center mt-4'>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 rounded-full bg-[#DD1D1D]'></span>
              <Typography variant="body2" style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
                SUV: ${totals.suv.toLocaleString('en-US')}
              </Typography>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 rounded-full bg-[#0C3569]'></span>
              <Typography variant="body2" style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
                Sedan: ${totals.sedan.toLocaleString('en-US')}
              </Typography>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 rounded-full bg-[#4CAF50]'></span>
              <Typography variant="body2" style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
                Luxury: ${totals.luxury.toLocaleString('en-US')}
              </Typography>
            </div>
          </div>

          {/* Total revenue generated */}
          <div className='text-center mt-4'>
            <Typography variant="body2" fontWeight="bold" style={{ fontSize: '14px', fontFamily: 'Poppins, sans-serif' }}>
              Total revenue generated: ${totals.total.toLocaleString('en-US')}
            </Typography>
          </div>
        </>
      )}
    </Paper>
  );
}

export default RevenueBreakdown;

