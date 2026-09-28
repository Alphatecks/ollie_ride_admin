import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select } from 'antd';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Typography, Paper } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { format, startOfYear, eachMonthOfInterval } from 'date-fns';

function RevenueTrendsChart() {
  const [monthFilter, setMonthFilter] = useState('Month');
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueTrends = async () => {
      try {
        const rentalsRef = collection(db, 'rentals');
        const rentalsSnapshot = await getDocs(rentalsRef);
        
        const rentals = [];
        rentalsSnapshot.forEach((doc) => {
          const data = doc.data();
          let date = null;
          if (data.createdAt) {
            date = data.createdAt?.toDate ? data.createdAt.toDate() : (data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt));
          } else if (data.startDate) {
            date = data.startDate?.toDate ? data.startDate.toDate() : (data.startDate instanceof Date ? data.startDate : new Date(data.startDate));
          } else {
            date = new Date();
          }
          
          const rateStr = data.rentalRate || '0';
          let numericValue = rateStr.replace(/[^0-9.,]/g, '').replace(/,/g, '');
          if (numericValue.includes('.')) {
            const parts = numericValue.split('.');
            if (parts.length > 1 && parts[parts.length - 1].length === 3) {
              numericValue = numericValue.replace(/\./g, '');
            }
          }
          const revenue = parseFloat(numericValue) || 0;
          
          rentals.push({ date, revenue });
        });

        // Group by month
        const now = new Date();
        const start = startOfYear(now);
        const months = eachMonthOfInterval({ start, end: now });
        
        const monthlyData = months.map(month => {
          const monthKey = format(month, 'MMM');
          const revenue = rentals
            .filter(rental => format(rental.date, 'yyyy-MM') === format(month, 'yyyy-MM'))
            .reduce((sum, rental) => sum + rental.revenue, 0);

          return {
            month: monthKey,
            revenue: Math.round(revenue)
          };
        });

        setRevenueData(monthlyData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching revenue trends:', error);
        setLoading(false);
      }
    };

    fetchRevenueTrends();
  }, [monthFilter]);

  return (
    <Paper elevation={3} className="poppins-font" style={{ padding: "20px", borderRadius: "10px", flex: 1 }}>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '8px', fontFamily: 'Poppins, sans-serif' }}>
            Revenue Trends
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
            Track revenue trends over time to monitor business performance and identify growth patterns
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

      {/* Line Chart */}
      {loading ? (
        <div style={{ width: '100%', height: '300px', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>Loading...</Typography>
        </div>
      ) : (
        <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
          <ResponsiveContainer>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="month" 
                style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}
              />
              <YAxis 
                tickFormatter={(value) => value.toLocaleString()}
                style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}
              />
              <Tooltip 
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#0C3569" 
                strokeWidth={2}
                dot={{ fill: '#0C3569', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Paper>
  );
}

export default RevenueTrendsChart;

