import React, { useState } from 'react';
import { Typography, Paper } from '@mui/material';
import { Select } from 'antd';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function TotalIncomeCard() {
  const [dateFilter, setDateFilter] = useState('Today');

  // Monthly earnings data
  const monthlyData = [
    { month: 'Jan', earnings: 300 },
    { month: 'Feb', earnings: 600 },
    { month: 'Mar', earnings: 700 },
    { month: 'Apr', earnings: 400 },
    { month: 'May', earnings: 750 },
    { month: 'Jun', earnings: 800 },
    { month: 'Jul', earnings: 750 },
    { month: 'Aug', earnings: 500 },
    { month: 'Sep', earnings: 450 },
    { month: 'Oct', earnings: 800 },
    { month: 'Nov', earnings: 750 },
    { month: 'Dec', earnings: 800 },
  ];

  return (
    <Paper 
      elevation={3} 
      className="poppins-font" 
      style={{ 
        padding: "20px", 
        borderRadius: "10px",
        flex: 1
      }}
    >
      <div className='flex justify-between items-start mb-4'>
        <div>
          <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '8px', fontFamily: 'Poppins, sans-serif' }}>
            Total income genrated
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
            Sorem ipsum dolor sit amet consectetur
          </Typography>
        </div>
        <Select
          value={dateFilter}
          onChange={setDateFilter}
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
            { value: 'Today', label: 'Today' },
            { value: 'Week', label: 'Week' },
            { value: 'Month', label: 'Month' },
          ]}
        />
      </div>

      {/* Key Metrics */}
      <div className='mb-6 space-y-2'>
        <Typography variant="h6" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif', color: '#0C3569' }}>
          $10,500 Earning this month
        </Typography>
        <Typography variant="body1" style={{ fontFamily: 'Poppins, sans-serif', color: '#666' }}>
          $140,500 Total earnings
        </Typography>
      </div>

      {/* Bar Chart */}
      <div style={{ width: '100%', height: '250px', marginTop: '20px' }}>
        <ResponsiveContainer>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="month" 
              style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}
            />
            <YAxis 
              domain={[0, 800]}
              ticks={[200, 400, 600, 800]}
              tickFormatter={(value) => `$${value}`}
              style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}
            />
            <Tooltip />
            <Bar 
              dataKey="earnings" 
              fill="#0C3569" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
}

export default TotalIncomeCard;

