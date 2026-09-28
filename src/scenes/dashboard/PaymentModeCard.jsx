import React, { useState } from 'react';
import { Typography, Paper } from '@mui/material';
import { Select } from 'antd';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

function PaymentModeCard() {
  const [dateFilter, setDateFilter] = useState('Month');

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
            Most used mode of payment
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
            { value: 'Month', label: 'Month' },
            { value: 'Week', label: 'Week' },
            { value: 'Year', label: 'Year' },
          ]}
        />
      </div>

      {/* Payment Mode Visualization */}
      <div className='flex justify-center items-center my-8' style={{ minHeight: '300px', position: 'relative' }}>
        <div style={{ position: 'relative', width: '450px', height: '350px' }}>
          {/* Large red circle (center) - 50% Debit Card */}
          <div
            style={{
              position: 'absolute',
              left: '40%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '220px',
              height: '220px',
              backgroundColor: '#DD1D1D',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            <Typography style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Poppins, sans-serif' }}>
              50% Debit Card
            </Typography>
          </div>

          {/* Blue hexagon (top right overlap) - 30% Bank Transfer */}
          <div
            style={{
              position: 'absolute',
              left: '65%',
              top: '35%',
              transform: 'translate(-50%, -50%)',
              width: '180px',
              height: '180px',
              backgroundColor: '#2196F3',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            <Typography style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Poppins, sans-serif' }}>
              30% Bank Transfer
            </Typography>
          </div>

          {/* Dark blue hexagon (bottom right overlap) - 20% Cash */}
          <div
            style={{
              position: 'absolute',
              left: '70%',
              top: '70%',
              transform: 'translate(-50%, -50%)',
              width: '150px',
              height: '150px',
              backgroundColor: '#0C3569',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
            }}
          >
            <Typography style={{ color: 'white', fontWeight: 'bold', fontSize: '16px', fontFamily: 'Poppins, sans-serif' }}>
              20% Cash
            </Typography>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className='flex flex-col gap-3 mt-8'>
        <div className='flex items-center gap-2'>
          <span className='w-3 h-3 rounded-full bg-[#DD1D1D]'></span>
          <Typography variant="body2" style={{ fontSize: '14px', fontFamily: 'Poppins, sans-serif' }}>
            Debit card $4,070
          </Typography>
        </div>
        <div className='flex items-center gap-2'>
          <span className='w-3 h-3 rounded-full bg-[#2196F3]'></span>
          <Typography variant="body2" style={{ fontSize: '14px', fontFamily: 'Poppins, sans-serif' }}>
            Bank transfer $2,680
          </Typography>
        </div>
        <div className='flex items-center gap-2'>
          <span className='w-3 h-3 rounded-full bg-[#0C3569]'></span>
          <Typography variant="body2" style={{ fontSize: '14px', fontFamily: 'Poppins, sans-serif' }}>
            Cash $2,470
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

export default PaymentModeCard;

