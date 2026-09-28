import React, { useState, useEffect } from 'react';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import GroupIcon from '@mui/icons-material/Group';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

function ReportKPIs() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalRentals: 0,
    vehiclesUtilized: 0,
    customersRegistered: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch rentals
        const rentalsRef = collection(db, 'rentals');
        const rentalsSnapshot = await getDocs(rentalsRef);
        
        let totalRevenue = 0;
        let totalRentals = rentalsSnapshot.size;
        
        rentalsSnapshot.forEach((doc) => {
          const data = doc.data();
          // Extract numeric value from rentalRate (e.g., "N67.000" or "N67,000" -> 67000)
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
          totalRevenue += parseFloat(numericValue) || 0;
        });

        // Fetch vehicles
        const vehiclesRef = collection(db, 'vehicles');
        const vehiclesSnapshot = await getDocs(vehiclesRef);
        const totalVehicles = vehiclesSnapshot.size;
        
        // Count vehicles that are currently rented
        // Use unique vehicle IDs from rentals with "Ongoing" status
        const rentedVehicleIds = new Set();
        rentalsSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.status === 'Ongoing' && data.vehicleId) {
            rentedVehicleIds.add(data.vehicleId);
          }
        });
        
        // Also count vehicles with "Booked" status
        vehiclesSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.status === 'Booked' && (data.vehicleId || doc.id)) {
            rentedVehicleIds.add(data.vehicleId || doc.id);
          }
        });
        
        const rentedVehicles = rentedVehicleIds.size;
        
        const vehiclesUtilized = totalVehicles > 0 
          ? Math.round((rentedVehicles / totalVehicles) * 100) 
          : 0;

        // Fetch users (customers)
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const customersRegistered = usersSnapshot.size;

        setStats({
          totalRevenue,
          totalRentals,
          vehiclesUtilized,
          customersRegistered,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching report stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString('en-US')}`;
  };

  return (
    <div className='flex justify-between gap-4 mb-6 poppins-font'>
      {/* Total revenue generated */}
      <div className='flex gap-4 bg-white pt-[13px] pb-[30px] pl-4 pr-4 rounded-[12px] flex-1'>
        <div className='bg-[#FFF9C4] rounded-full flex items-center w-12 h-12 justify-center'>
          <LocalAtmIcon style={{fontSize: 30, color: '#F57F17'}} />
        </div>
        <div>
          <p className='text-2xl font-medium'>{stats.loading ? '...' : formatCurrency(stats.totalRevenue)}</p>
          <p className='text-[12px]'>Total revenue generated</p>
        </div>
      </div>

      {/* Total rentals made */}
      <div className='flex gap-4 bg-white pt-[13px] pb-[30px] pl-4 pr-4 rounded-[12px] flex-1'>
        <div className='bg-[#E3F2FD] rounded-full flex items-center w-12 h-12 justify-center'>
          <DirectionsCarFilledIcon style={{fontSize: 30, color: '#0C3569'}} />
        </div>
        <div>
          <p className='text-2xl font-medium'>{stats.loading ? '...' : stats.totalRentals}</p>
          <p className='text-[12px]'>Total rentals made</p>
        </div>
      </div>

      {/* Vehicles utilized */}
      <div className='flex gap-4 bg-white pt-[13px] pb-[30px] pl-4 pr-4 rounded-[12px] flex-1'>
        <div className='bg-[#FFEBEE] rounded-full flex items-center w-12 h-12 justify-center'>
          <DirectionsCarFilledIcon style={{fontSize: 30, color: '#DD1D1D'}} />
        </div>
        <div>
          <p className='text-2xl font-medium'>{stats.loading ? '...' : `${stats.vehiclesUtilized}%`}</p>
          <p className='text-[12px]'>Vehicles utilized</p>
        </div>
      </div>

      {/* Customers registered */}
      <div className='flex gap-4 bg-white pt-[13px] pb-[30px] pl-4 pr-4 rounded-[12px] flex-1'>
        <div className='bg-[#E8F5E9] rounded-full flex items-center w-12 h-12 justify-center'>
          <GroupIcon style={{fontSize: 30, color: '#4CAF50'}} />
        </div>
        <div>
          <p className='text-2xl font-medium'>{stats.loading ? '...' : stats.customersRegistered}</p>
          <p className='text-[12px]'>Customers registered</p>
        </div>
      </div>
    </div>
  );
}

export default ReportKPIs;

