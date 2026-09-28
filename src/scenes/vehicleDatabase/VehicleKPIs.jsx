import React, { useState, useEffect } from 'react';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

function VehicleKPIs() {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    availableVehicles: 0,
    maintenanceVehicles: 0,
    bookedVehicles: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const vehiclesRef = collection(db, 'vehicles');
        const vehiclesSnapshot = await getDocs(vehiclesRef);
        
        let totalVehicles = 0;
        let availableVehicles = 0;
        let maintenanceVehicles = 0;
        let bookedVehicles = 0;

        vehiclesSnapshot.forEach((doc) => {
          const data = doc.data();
          totalVehicles++;
          const status = data.status?.toLowerCase() || '';
          if (status === 'available') {
            availableVehicles++;
          } else if (status === 'maintenance') {
            maintenanceVehicles++;
          } else if (status === 'booked') {
            bookedVehicles++;
          }
        });

        setStats({
          totalVehicles,
          availableVehicles,
          maintenanceVehicles,
          bookedVehicles,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching vehicle stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  return (
    <div className='flex justify-between gap-4 mb-6 poppins-font'>
      {/* Total Vehicles */}
      <div className='flex gap-4 bg-white pt-[13px] pb-[30px] pl-4 pr-4 rounded-[12px] flex-1'>
        <div className='bg-[#E3F2FD] rounded-full flex items-center w-12 h-12 justify-center'>
          <DirectionsCarFilledIcon style={{fontSize: 30, color: '#0C3569'}} />
        </div>
        <div>
          <p className='text-2xl font-medium'>{stats.loading ? '...' : stats.totalVehicles}</p>
          <p className='text-[12px]'>Total vehicles</p>
        </div>
      </div>

      {/* Available Vehicles */}
      <div className='flex gap-4 bg-white pt-[13px] pb-[30px] pl-4 pr-4 rounded-[12px] flex-1'>
        <div className='bg-[#E8F5E9] rounded-full flex items-center w-12 h-12 justify-center'>
          <DirectionsCarFilledIcon style={{fontSize: 30, color: '#4CAF50'}} />
        </div>
        <div>
          <p className='text-2xl font-medium'>{stats.loading ? '...' : stats.availableVehicles}</p>
          <p className='text-[12px]'>Available vehicles</p>
        </div>
      </div>

      {/* Vehicles in Maintenance */}
      <div className='flex gap-4 bg-white pt-[13px] pb-[30px] pl-4 pr-4 rounded-[12px] flex-1'>
        <div className='bg-[#FFEBEE] rounded-full flex items-center w-12 h-12 justify-center'>
          <DirectionsCarFilledIcon style={{fontSize: 30, color: '#DD1D1D'}} />
        </div>
        <div>
          <p className='text-2xl font-medium'>{stats.loading ? '...' : stats.maintenanceVehicles}</p>
          <p className='text-[12px]'>Vehicles in maintenance</p>
        </div>
      </div>

      {/* Rented Vehicles */}
      <div className='flex gap-4 bg-white pt-[13px] pb-[30px] pl-4 pr-4 rounded-[12px] flex-1'>
        <div className='bg-[#FFF9C4] rounded-full flex items-center w-12 h-12 justify-center'>
          <DirectionsCarFilledIcon style={{fontSize: 30, color: '#F57F17'}} />
        </div>
        <div>
          <p className='text-2xl font-medium'>{stats.loading ? '...' : stats.bookedVehicles}</p>
          <p className='text-[12px]'>Rented vehicles</p>
        </div>
      </div>
    </div>
  );
}

export default VehicleKPIs;

