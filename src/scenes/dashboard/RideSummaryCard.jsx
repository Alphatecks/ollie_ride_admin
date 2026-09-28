import React, { useState } from 'react';
import { Typography, Paper } from '@mui/material';
import { Select } from 'antd';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function RideSummaryCard() {
  const [dateFilter, setDateFilter] = useState('Today');

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
            Ride summary
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

      {/* Total Rides Section */}
      <div className='bg-[#E3F2FD] rounded-lg p-4 mb-6 flex justify-between items-center'>
        <Typography variant="h5" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif', color: '#0C3569' }}>
          130 Total rides
        </Typography>
        <button 
          className='bg-[#0C3569] text-white px-4 py-2 rounded-lg flex items-center gap-2'
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Manage ride <ArrowForwardIcon style={{ fontSize: 16 }} />
        </button>
      </div>

      {/* Progress Bars */}
      <div className='space-y-4'>
        {/* Total active rides */}
        <div>
          <div className='flex justify-between items-center mb-2'>
            <Typography variant="body2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
              Total active rides 60
            </Typography>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-3'>
            <div 
              className='bg-[#FFEB3B] h-3 rounded-full'
              style={{ width: '60%' }}
            ></div>
          </div>
        </div>

        {/* Total completed rides */}
        <div>
          <div className='flex justify-between items-center mb-2'>
            <Typography variant="body2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
              Total completed rides 30
            </Typography>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-3'>
            <div 
              className='bg-[#0C3569] h-3 rounded-full'
              style={{ width: '30%' }}
            ></div>
          </div>
        </div>

        {/* Total cancelled rides */}
        <div>
          <div className='flex justify-between items-center mb-2'>
            <Typography variant="body2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
              Total cancelled rides 40
            </Typography>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-3'>
            <div 
              className='bg-[#DD1D1D] h-3 rounded-full'
              style={{ width: '40%' }}
            ></div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default RideSummaryCard;

