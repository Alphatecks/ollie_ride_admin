import React, { useState, useEffect } from 'react'
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import PersonIcon from "@mui/icons-material/Person";
import DatabaseIcon from '../../assets/icons/database'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';

function RideSummary() {
  const [stats, setStats] = useState({
    totalRides: 0,
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    totalIncome: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total rides
        const ridesQuery = query(collection(db, "rides"));
        const ridesSnapshot = await getDocs(ridesQuery);
        const totalRides = ridesSnapshot.size;
        
        // Calculate total income from rides
        let totalIncome = 0;
        ridesSnapshot.forEach((doc) => {
          const rideData = doc.data();
          // Assuming rides have an 'amount' or 'totalAmount' field
          const amount = rideData.amount || rideData.totalAmount || 0;
          totalIncome += typeof amount === 'number' ? amount : parseFloat(amount) || 0;
        });

        // Fetch total users
        const usersQuery = query(collection(db, "users"));
        const usersSnapshot = await getDocs(usersQuery);
        const totalUsers = usersSnapshot.size;

        // Count active/inactive users (assuming there's a 'status' or 'isActive' field)
        let activeUsers = 0;
        let inactiveUsers = 0;
        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          const isActive = userData.status === 'active' || userData.isActive === true || userData.isActive === 'true';
          if (isActive) {
            activeUsers++;
          } else {
            inactiveUsers++;
          }
        });

        // If no status field exists, set all users as active for now
        if (activeUsers === 0 && inactiveUsers === 0 && totalUsers > 0) {
          activeUsers = totalUsers;
        }

        setStats({
          totalRides,
          totalUsers,
          activeUsers,
          inactiveUsers,
          totalIncome,
          loading: false
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  // Format number with commas
  const formatNumber = (num) => {
    return num?.toLocaleString('en-US') || '0';
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `$${formatNumber(Math.round(amount))}`;
  };

  return (
    <div className='flex justify-between mt-8 pr-8'>

      <div className='flex gap-4 bg-white pt-[13px] pb-[30px] pl-4 rounded-[12px]'>
        <div className='bg-secondary rounded-full flex items-center w-12 h-12 justify-center'>
        <DirectionsCarFilledIcon style={{fontSize: 30, color: '#0C3569'}} className='text-primary'/>
        </div>
      <div className='pr-[113px]'>
      <p className='text-2xl font-medium'>{stats.loading ? '...' : formatNumber(stats.totalRides)}</p>
      <p className='text-[12px]'>Total rides</p>
      </div>
      </div>

      <div className='flex flex-col gap-4 bg-white pt-[13px] pb-[30px] pl-4 rounded-[12px]'>
        <div className='flex gap-4'>
        <div className='bg-secondary rounded-full flex items-center w-12 h-12 justify-center'>
        <PersonIcon style={{fontSize: 30, color: '#0C3569'}} className='text-primary'/>
        </div>
      <div className='pr-[113px]'>
      <p className='text-2xl font-medium'>{stats.loading ? '...' : formatNumber(stats.totalUsers)}</p>
      <p className='text-[12px]'>Total users</p>
      </div>
        </div>
      <div className='flex gap-4'>
        <p className='text-[9px] flex items-center gap-2'><span className='w-2 h-2 rounded-full bg-[#0C3569]'></span>Active {stats.loading ? '...' : formatNumber(stats.activeUsers)}</p>
        <p className='text-[9px] flex items-center gap-2'><span className='w-2 h-2 rounded-full bg-[#DD1D1D]'></span>Inactive {stats.loading ? '...' : formatNumber(stats.inactiveUsers)}</p>
      </div>
      </div>
      
      <div className='flex gap-4 bg-white pt-[13px] pb-[40px] pl-4 rounded-12px'>
        <div className='bg-secondary rounded-full flex items-center w-12 h-12 justify-center'>
        <DatabaseIcon style={{fontSize: 30, color: '#0C3569'}} className='text-primary'/>
        </div>
      <div className='pr-[113px]'>
      <p className='text-2xl font-medium'>{stats.loading ? '...' : formatCurrency(stats.totalIncome)}</p>
      <p className='text-[12px]'>Total income</p>
      </div>
      </div>
    </div>
  )
}

export default RideSummary
