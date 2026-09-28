import React, { useState } from 'react';
import VehicleKPIs from './VehicleKPIs';
import VehicleTable from './VehicleTable';
import { Select } from 'antd';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

function VehicleDatabase() {
  const [dateFilter, setDateFilter] = useState('25 Dec 2024');

  return (
    <div className='bg-[#F9F9F9] px-8 pt-8 pb-8 min-h-screen poppins-font'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='font-medium text-2xl'>Vehicle Database</h1>
        <div className='flex items-center gap-2 border rounded-lg px-3 py-2 bg-white' style={{ cursor: 'pointer' }}>
          <CalendarTodayIcon style={{ fontSize: 18, color: '#666' }} />
          <span className='text-sm text-gray-600' style={{ fontFamily: 'Poppins, sans-serif' }}>Filter by date</span>
          <Select
            value={dateFilter}
            onChange={setDateFilter}
            style={{
              width: "120px",
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

      {/* KPI Cards */}
      <VehicleKPIs />

      {/* Vehicle Table */}
      <VehicleTable />
    </div>
  );
}

export default VehicleDatabase;

