import React, { useState, useEffect } from 'react';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { differenceInDays } from 'date-fns';

function RentalKPIs() {
  const [stats, setStats] = useState({
    totalRentals: 0,
    activeRentals: 0,
    lateReturns: 0,
    totalRevenue: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const rentalsRef = collection(db, 'rentals');
        const rentalsSnapshot = await getDocs(rentalsRef);
        
        let totalRentals = rentalsSnapshot.size;
        let activeRentals = 0;
        let lateReturns = 0;
        let totalRevenue = 0;
        
        rentalsSnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Calculate revenue
          const rateStr = data.rentalRate || '0';
          let numericValue = rateStr.replace(/[^0-9.,]/g, '').replace(/,/g, '');
          if (numericValue.includes('.')) {
            const parts = numericValue.split('.');
            if (parts.length > 1 && parts[parts.length - 1].length === 3) {
              numericValue = numericValue.replace(/\./g, '');
            }
          }
          totalRevenue += parseFloat(numericValue) || 0;
          
          // Count active rentals
          if (data.status === 'Ongoing') {
            activeRentals++;
          }
          
          // Count late returns (overdue rentals)
          if (data.status === 'Overdue') {
            lateReturns++;
          } else if (data.status === 'Ongoing' && data.dueDate) {
            try {
              const due = data.dueDate?.toDate ? data.dueDate.toDate() : (data.dueDate instanceof Date ? data.dueDate : new Date(data.dueDate));
              const today = new Date();
              if (differenceInDays(due, today) < 0) {
                lateReturns++;
              }
            } catch (error) {
              // Ignore date parsing errors
            }
          }
        });

        setStats({
          totalRentals,
          activeRentals,
          lateReturns,
          totalRevenue,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching rental KPIs:', error);
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

      {/* Total active rentals */}
      <div className='flex gap-4 bg-white pt-[13px] pb-[30px] pl-4 pr-4 rounded-[12px] flex-1'>
        <div className='bg-[#E8F5E9] rounded-full flex items-center w-12 h-12 justify-center'>
          <DirectionsCarFilledIcon style={{fontSize: 30, color: '#4CAF50'}} />
        </div>
        <div>
          <p className='text-2xl font-medium'>{stats.loading ? '...' : stats.activeRentals}</p>
          <p className='text-[12px]'>Total active rentals</p>
        </div>
      </div>

      {/* Total late returns */}
      <div className='flex gap-4 bg-white pt-[13px] pb-[30px] pl-4 pr-4 rounded-[12px] flex-1'>
        <div className='bg-[#FFEBEE] rounded-full flex items-center w-12 h-12 justify-center'>
          <DirectionsCarFilledIcon style={{fontSize: 30, color: '#DD1D1D'}} />
        </div>
        <div>
          <p className='text-2xl font-medium'>{stats.loading ? '...' : stats.lateReturns}</p>
          <p className='text-[12px]'>Total late returns</p>
        </div>
      </div>

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
    </div>
  );
}

export default RentalKPIs;

