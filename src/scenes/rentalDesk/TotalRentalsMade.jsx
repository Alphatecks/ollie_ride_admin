import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Typography, Paper } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, startOfWeek, startOfYear, eachMonthOfInterval, eachYearOfInterval } from 'date-fns';

function TotalRentalsMade() {
  const [monthFilter, setMonthFilter] = useState('Month');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
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
          rentals.push({ date });
        });

        // Group rentals by period based on filter
        const now = new Date();
        let periods = [];
        let periodFormat = '';

        if (monthFilter === 'Month') {
          const start = startOfYear(now);
          periods = eachMonthOfInterval({ start, end: now });
          periodFormat = 'MMM';
        } else if (monthFilter === 'Week') {
          // For weeks, use last 12 weeks
          const weeks = [];
          for (let i = 11; i >= 0; i--) {
            const weekDate = new Date(now);
            weekDate.setDate(weekDate.getDate() - (i * 7));
            weeks.push(startOfWeek(weekDate));
          }
          periods = weeks;
          periodFormat = 'w';
        } else {
          const start = startOfYear(now);
          const end = new Date(now.getFullYear() + 1, 0, 1);
          periods = eachYearOfInterval({ start, end });
          periodFormat = 'yyyy';
        }

        const groupedData = periods.map((period, index) => {
          const count = rentals.filter(rental => {
            const rentalDate = rental.date;
            if (monthFilter === 'Month') {
              return format(rentalDate, 'yyyy-MM') === format(period, 'yyyy-MM');
            } else if (monthFilter === 'Week') {
              // Compare by week number
              const rentalWeek = format(rentalDate, 'yyyy-ww');
              const periodWeek = format(period, 'yyyy-ww');
              return rentalWeek === periodWeek;
            } else {
              return format(rentalDate, 'yyyy') === format(period, 'yyyy');
            }
          }).length;

          return {
            period: monthFilter === 'Week' ? String(index + 1) : format(period, periodFormat),
            count
          };
        });

        setChartData(groupedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rentals for chart:', error);
        setLoading(false);
      }
    };

    fetchRentals();
  }, [monthFilter]);

  return (
    <Paper elevation={3} className="poppins-font" style={{ padding: "20px", borderRadius: "10px", flex: 1 }}>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '8px', fontFamily: 'Poppins, sans-serif' }}>
            Total Rentals Made
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
            Track the total number of rentals made, to monitor operational performance and trends
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

      {/* Chart */}
      {loading ? (
        <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>Loading...</Typography>
        </div>
      ) : (
        <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="period" 
                style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}
              />
              <YAxis 
                style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="count" 
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

export default TotalRentalsMade;

