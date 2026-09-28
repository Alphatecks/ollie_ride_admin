import React, { useState, useEffect } from 'react';
import PersonIcon from "@mui/icons-material/Person";
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../../firebase';
import UserTable from './UserTable';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Select } from "antd";

function UserDatabase() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    pendingVerification: 0,
    suspendedUsers: 0,
    loading: true
  });
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch all users from Firestore
        const usersQuery = query(collection(db, "users"));
        const usersSnapshot = await getDocs(usersQuery);
        
        // Fetch all users (both riders and drivers)
        const usersData = usersSnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name || 'N/A',
              phone: data.phone || data.phoneNumber || 'N/A',
              email: data.email || 'N/A',
              registrationDate: data.registrationDate || data.createdAt || null,
              role: data.role || 'Rider',
              status: determineStatus(data),
            };
          });

        // Calculate statistics
        let totalUsers = usersData.length;
        let activeUsers = 0;
        let inactiveUsers = 0;
        let pendingVerification = 0;
        let suspendedUsers = 0;

        usersData.forEach((user) => {
          const status = user.status?.toLowerCase() || '';
          if (status === 'active') {
            activeUsers++;
          } else if (status === 'inactive') {
            inactiveUsers++;
          } else if (status === 'pending' || status === 'pending verification') {
            pendingVerification++;
          } else if (status === 'suspended') {
            suspendedUsers++;
          }
        });

        // If no status field exists, default all to active
        if (activeUsers === 0 && inactiveUsers === 0 && pendingVerification === 0 && suspendedUsers === 0 && totalUsers > 0) {
          activeUsers = totalUsers;
        }

        setUsers(usersData);
        setStats({
          totalUsers,
          activeUsers,
          inactiveUsers,
          pendingVerification,
          suspendedUsers,
          loading: false
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchUsers();
  }, []);

  // Determine user status from various fields
  const determineStatus = (userData) => {
    // Check explicit status field first
    if (userData.status) {
      return userData.status;
    }
    
    // Check boolean flags
    if (userData.isSuspended === true || userData.isSuspended === 'true') {
      return 'Suspended';
    }
    if (userData.isPendingVerification === true || userData.pendingVerification === true || userData.isPendingVerification === 'true') {
      return 'Pending Verification';
    }
    if (userData.isActive === false || userData.isActive === 'false') {
      return 'Inactive';
    }
    if (userData.isActive === true || userData.isActive === 'true') {
      return 'Active';
    }
    
    // Default to Active if no status info
    return 'Active';
  };

  // Filter users based on selected filter
  const filteredUsers = filter === 'All' 
    ? users 
    : users.filter(user => {
        const status = user.status?.toLowerCase() || '';
        if (filter === 'Active') return status === 'active';
        if (filter === 'Inactive') return status === 'inactive';
        if (filter === 'Pending Verification') return status === 'pending' || status === 'pending verification';
        if (filter === 'Suspended') return status === 'suspended';
        return true;
      });

  // Format number with commas
  const formatNumber = (num) => {
    return num?.toLocaleString('en-US') || '0';
  };

  return (
    <div className='bg-[#F9F9F9] px-8 pt-8 pb-8'>
      {/* Title */}
      <h1 className='font-medium text-2xl mb-6'>User Database</h1>

      {/* Summary Cards */}
      <div className='flex justify-between gap-4 mb-6'>
        {/* Total Users Card */}
        <div className='flex flex-col gap-2 bg-white pt-[13px] pb-[30px] pl-4 pr-4 rounded-[12px] flex-1'>
          <div className='flex gap-4'>
            <div className='bg-[#E3F2FD] rounded-full flex items-center w-12 h-12 justify-center'>
              <PersonIcon style={{fontSize: 30, color: '#0C3569'}} className='text-primary'/>
            </div>
            <div>
              <p className='text-2xl font-medium'>{stats.loading ? '...' : formatNumber(stats.totalUsers)}</p>
              <p className='text-[12px]'>Total users</p>
            </div>
          </div>
          <div className='flex gap-4 ml-16'>
            <p className='text-[9px] flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-[#0C3569]'></span>
              Active {stats.loading ? '...' : formatNumber(stats.activeUsers)}
            </p>
            <p className='text-[9px] flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-[#DD1D1D]'></span>
              Inactive {stats.loading ? '...' : formatNumber(stats.inactiveUsers)}
            </p>
          </div>
        </div>

        {/* Pending Verification Card */}
        <div className='flex gap-4 bg-white pt-[13px] pb-[30px] pl-4 pr-4 rounded-[12px] flex-1'>
          <div className='bg-[#FFF9C4] rounded-full flex items-center w-12 h-12 justify-center'>
            <PersonIcon style={{fontSize: 30, color: '#F57F17'}}/>
          </div>
          <div>
            <p className='text-2xl font-medium'>{stats.loading ? '...' : formatNumber(stats.pendingVerification)}</p>
            <p className='text-[12px]'>Pending verification</p>
          </div>
        </div>

        {/* Suspended Users Card */}
        <div className='flex gap-4 bg-white pt-[13px] pb-[30px] pl-4 pr-4 rounded-[12px] flex-1'>
          <div className='bg-[#FFEBEE] rounded-full flex items-center w-12 h-12 justify-center'>
            <PersonIcon style={{fontSize: 30, color: '#DD1D1D'}}/>
          </div>
          <div>
            <p className='text-2xl font-medium'>{stats.loading ? '...' : formatNumber(stats.suspendedUsers)}</p>
            <p className='text-[12px]'>Suspended users</p>
          </div>
        </div>
      </div>

      {/* Filter Dropdown */}
      <div className='mb-4'>
        <Select
          value={filter}
          onChange={setFilter}
          style={{
            width: "140px",
            height: "36px",
          }}
          suffixIcon={
            <ExpandMoreOutlinedIcon
              className="w-3 h-3"
              style={{ fontSize: 17 }}
            />
          }
          options={[
            { value: 'All', label: 'All' },
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' },
            { value: 'Pending Verification', label: 'Pending Verification' },
            { value: 'Suspended', label: 'Suspended' },
          ]}
        />
      </div>

      {/* User Table */}
      <UserTable users={filteredUsers} loading={loading} />
    </div>
  );
}

export default UserDatabase;

