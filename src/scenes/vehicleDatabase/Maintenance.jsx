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
  Chip,
  Checkbox,
} from '@mui/material';
import { Select } from 'antd';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { format } from 'date-fns';

function Maintenance() {
  const [dateFilter, setDateFilter] = useState('25 Dec 2024');
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const maintenanceRef = collection(db, 'maintenance');
        const maintenanceSnapshot = await getDocs(maintenanceRef);
        
        const maintenanceRecords = maintenanceSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            vehicleName: data.vehicleName || 'N/A',
            licensePlate: data.licensePlate || 'N/A',
            vehicleId: data.vehicleId || `#${doc.id.slice(0, 7)}`,
            maintenanceType: data.maintenanceType || 'N/A',
            scheduledDate: data.scheduledDate || null,
            status: data.status || 'Scheduled',
          };
        });
        
        setMaintenanceData(maintenanceRecords);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching maintenance records:', error);
        setLoading(false);
      }
    };

    fetchMaintenance();
  }, []);

  const formatDate = (dateValue) => {
    try {
      if (!dateValue) return 'N/A';
      if (dateValue && typeof dateValue.toDate === 'function') {
        return format(dateValue.toDate(), 'dd/MM');
      }
      if (dateValue instanceof Date) {
        return format(dateValue, 'dd/MM');
      }
      return 'N/A';
    } catch (error) {
      return 'N/A';
    }
  };

  const getStatusChipStyle = (status) => {
    switch (status) {
      case 'In Progress':
        return {
          backgroundColor: '#FFEB3B',
          color: 'black',
        };
      case 'Completed':
        return {
          backgroundColor: '#E8F5E9',
          color: 'black',
        };
      case 'Scheduled':
        return {
          backgroundColor: '#BBDEFB',
          color: 'black',
        };
      case 'Overdue':
        return {
          backgroundColor: '#EF5350',
          color: 'white',
        };
      default:
        return {
          backgroundColor: '#F5F5F5',
          color: '#666',
        };
    }
  };

  return (
    <div className='bg-[#F9F9F9] px-8 pt-8 pb-8 min-h-screen poppins-font'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='font-medium text-2xl'>Vehicle Maintenance</h1>
        <div className='flex flex-col items-end gap-1 border rounded-lg px-3 py-2 bg-white' style={{ cursor: 'pointer' }}>
          <div className='flex items-center gap-2'>
            <CalendarTodayIcon style={{ fontSize: 18, color: '#666' }} />
            <span className='text-xs text-gray-600' style={{ fontFamily: 'Poppins, sans-serif' }}>Filter by date</span>
          </div>
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

      {/* Maintenance Table */}
      <Paper 
        elevation={3} 
        className="poppins-font" 
        style={{ 
          padding: "20px", 
          borderRadius: "12px",
          backgroundColor: 'white'
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Vehicle Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    License Plate
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Maintenance Type
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Scheduled Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Status
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Loading maintenance records...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : maintenanceData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      No maintenance records found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                maintenanceData.map((record) => {
                  const statusStyle = getStatusChipStyle(record.status);
                  return (
                    <TableRow key={record.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {record.vehicleName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {record.licensePlate}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {record.vehicleId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {record.maintenanceType}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {formatDate(record.scheduledDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={record.status}
                          style={{
                            ...statusStyle,
                            borderRadius: '8px',
                            fontWeight: 'medium',
                            fontFamily: 'Poppins, sans-serif',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default Maintenance;

