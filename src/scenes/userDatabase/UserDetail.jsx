import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Avatar, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Select } from "antd";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { format } from 'date-fns';

function UserDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rideHistory, setRideHistory] = useState([]);
  const [payments, setPayments] = useState([]);
  const [rideStats, setRideStats] = useState({
    completed: 0,
    cancelled: 0
  });
  const [rideSortBy, setRideSortBy] = useState('date');
  const [paymentSortBy, setPaymentSortBy] = useState('date');

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        // Fetch user details
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          
          // Fetch rides for this user
          let ridesQuery = query(collection(db, "rides"));
          const ridesSnapshot = await getDocs(ridesQuery);
          
          const allRides = [];
          let completed = 0;
          let cancelled = 0;
          
          ridesSnapshot.forEach((rideDoc) => {
            const rideData = rideDoc.data();
            const rideUserId = rideData.userId || rideData.user?.id || rideData.userId;
            const rideUserEmail = rideData.userEmail || rideData.user?.email || userData.email;
            
            // Match by userId or email
            if (rideUserId === userId || rideUserEmail === userData.email) {
              const status = rideData.status?.toLowerCase() || '';
              if (status === 'completed') {
                completed++;
              } else if (status === 'cancelled') {
                cancelled++;
              }
              
              allRides.push({
                id: rideDoc.id,
                rideId: `#${rideDoc.id.slice(0, 7)}`,
                driverName: rideData.driverName || rideData.driver?.name || 'N/A',
                rideType: rideData.rideType || rideData.type || 'Economy',
                fareAmount: rideData.totalAmount || rideData.amount || rideData.price || 0,
                status: rideData.status || 'Unknown',
                date: rideData.date || rideData.createdAt || new Date(),
              });
            }
          });

          // Sort rides by date
          allRides.sort((a, b) => {
            const dateA = a.date?.toDate ? a.date.toDate() : (a.date instanceof Date ? a.date : new Date(a.date));
            const dateB = b.date?.toDate ? b.date.toDate() : (b.date instanceof Date ? b.date : new Date(b.date));
            return dateB - dateA;
          });

          setRideHistory(allRides);
          setRideStats({ completed, cancelled });

          // Fetch payments - try both payments collection and from rides
          let allPayments = [];
          
          // Try payments collection first
          try {
            const paymentsQuery = query(collection(db, "payments"));
            const paymentsSnapshot = await getDocs(paymentsQuery);
            
            paymentsSnapshot.forEach((paymentDoc) => {
              const paymentData = paymentDoc.data();
              const paymentUserId = paymentData.userId || paymentData.user?.id;
              const paymentUserEmail = paymentData.userEmail || paymentData.user?.email;
              const paymentRideId = paymentData.rideId || paymentData.ride?.id;
              
              if (paymentUserId === userId || paymentUserEmail === userData.email || 
                  allRides.some(ride => ride.id === paymentRideId)) {
                allPayments.push({
                  id: paymentDoc.id,
                  paymentId: `#${paymentDoc.id.slice(0, 7)}`,
                  rideId: paymentData.rideId ? `#${paymentData.rideId.slice(0, 7)}` : paymentRideId || 'N/A',
                  paymentMethod: paymentData.paymentMethod || paymentData.method || 'Bank transfer',
                  amount: paymentData.amount || paymentData.totalAmount || 0,
                  dateTime: paymentData.dateTime || paymentData.createdAt || paymentData.date || new Date(),
                  status: paymentData.status || 'Completed',
                });
              }
            });
          } catch (error) {
            console.log("Payments collection not found, creating from rides");
          }

          // If no payments found, create from rides
          if (allPayments.length === 0) {
            allRides.forEach((ride) => {
              if (ride.status?.toLowerCase() === 'completed' || ride.status?.toLowerCase() === 'in progress') {
                allPayments.push({
                  id: ride.id,
                  paymentId: ride.rideId,
                  rideId: ride.rideId,
                  paymentMethod: 'Bank transfer',
                  amount: ride.fareAmount,
                  dateTime: ride.date,
                  status: ride.status === 'completed' ? 'Completed' : 'In Progress',
                });
              }
            });
          }

          // Sort payments by date
          allPayments.sort((a, b) => {
            const dateA = a.dateTime?.toDate ? a.dateTime.toDate() : (a.dateTime instanceof Date ? a.dateTime : new Date(a.dateTime));
            const dateB = b.dateTime?.toDate ? b.dateTime.toDate() : (b.dateTime instanceof Date ? b.dateTime : new Date(b.dateTime));
            return dateB - dateA;
          });

          setPayments(allPayments);

          setUser({
            id: userDocSnap.id,
            name: userData.name || 'N/A',
            email: userData.email || 'N/A',
            phone: userData.phone || userData.phoneNumber || 'N/A',
            password: userData.password || 'N/A',
            registrationDate: userData.registrationDate || userData.createdAt || null,
            status: determineStatus(userData),
            driverLicense: userData.driverLicense || userData.licenseNumber || 'N/A',
            vehiclePlate: userData.vehiclePlate || userData.licensePlate || userData.plateNumber || 'N/A',
            availabilityStatus: userData.availabilityStatus || (userData.isOnline ? 'Online' : 'Offline'),
            profilePicture: userData.profilePicture || userData.avatarUrl || userData.photoURL || null,
          });
        } else {
          console.error("User not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserDetail();
    }
  }, [userId]);

  const determineStatus = (userData) => {
    if (userData.status) {
      return userData.status;
    }
    if (userData.isSuspended === true || userData.isSuspended === 'true') {
      return 'Suspended';
    }
    if (userData.isActive === false || userData.isActive === 'false') {
      return 'Inactive';
    }
    return 'Active';
  };

  const formatDate = (dateValue) => {
    try {
      if (!dateValue) return 'N/A';
      if (dateValue && typeof dateValue.toDate === 'function') {
        return format(dateValue.toDate(), 'dd/MM/yyyy; hh:mm a');
      }
      if (typeof dateValue === 'string') {
        return format(new Date(dateValue), 'dd/MM/yyyy; hh:mm a');
      }
      if (dateValue instanceof Date) {
        return format(dateValue, 'dd/MM/yyyy; hh:mm a');
      }
      return 'N/A';
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'N/A';
    }
  };

  const formatDateTime = (dateValue) => {
    try {
      if (!dateValue) return 'N/A';
      let date;
      if (dateValue && typeof dateValue.toDate === 'function') {
        date = dateValue.toDate();
      } else if (dateValue instanceof Date) {
        date = dateValue;
      } else {
        date = new Date(dateValue);
      }
      return format(date, 'd/MM/yy; HH:mm:ss');
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'N/A';
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N0';
    const numAmount = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    return `N${numAmount.toLocaleString('en-US')}`;
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower === 'active' || statusLower === 'completed') {
      return { bg: '#4CAF50', color: 'white' };
    } else if (statusLower === 'suspended' || statusLower === 'cancelled') {
      return { bg: '#DD1D1D', color: 'white' };
    } else if (statusLower === 'inactive') {
      return { bg: '#808080', color: 'white' };
    } else if (statusLower === 'in progress') {
      return { bg: '#FFC107', color: 'white' };
    }
    return { bg: '#808080', color: 'white' };
  };

  const getRideStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower === 'completed') {
      return { bg: '#4CAF50', color: 'white' };
    } else if (statusLower === 'cancelled') {
      return { bg: '#DD1D1D', color: 'white' };
    } else if (statusLower === 'in progress') {
      return { bg: '#FFC107', color: 'white' };
    }
    return { bg: '#808080', color: 'white' };
  };

  if (loading) {
    return (
      <div className='bg-[#F9F9F9] px-8 pt-8 pb-8 h-screen flex items-center justify-center'>
        <p className="text-gray-500">Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='bg-[#F9F9F9] px-8 pt-8 pb-8 h-screen flex items-center justify-center'>
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  const statusColor = getStatusColor(user.status);

  return (
    <div className='bg-[#F9F9F9] px-8 pt-8 pb-8 min-h-screen'>
      {/* Header with title */}
      <div className='mb-6'>
        <h1 className='font-medium text-2xl'>User Database</h1>
      </div>

      {/* User Profile Card */}
      <div className='bg-white rounded-[12px] p-8 shadow-sm mb-6'>
        {/* Profile Picture */}
        <div className='flex justify-center mb-6'>
          <Avatar
            src={user.profilePicture}
            alt={user.name}
            sx={{ width: 120, height: 120 }}
          >
            {user.name?.charAt(0) || 'U'}
          </Avatar>
        </div>

        {/* User ID */}
        <div className='text-center mb-8'>
          <p className='text-gray-600 text-sm'>User ID: #{userId.slice(0, 8)}</p>
        </div>

        {/* User Details */}
        <div className='space-y-4 max-w-2xl mx-auto'>
          <div className='flex items-start'>
            <span className='font-semibold w-48'>Name:</span>
            <span>{user.name}</span>
          </div>

          <div className='flex items-start'>
            <span className='font-semibold w-48'>Email:</span>
            <span>{user.email}</span>
          </div>

          <div className='flex items-start'>
            <span className='font-semibold w-48'>Phone number:</span>
            <span>{user.phone}</span>
          </div>

          <div className='flex items-start'>
            <span className='font-semibold w-48'>Password:</span>
            <span>{user.password}</span>
          </div>

          <div className='flex items-start'>
            <span className='font-semibold w-48'>Date of account creation:</span>
            <span>{formatDate(user.registrationDate)}</span>
          </div>

          <div className='flex items-start'>
            <span className='font-semibold w-48'>Status:</span>
            <Chip
              label={user.status}
              style={{
                backgroundColor: statusColor.bg,
                color: statusColor.color,
                borderRadius: "10px",
                fontWeight: 'bold',
              }}
            />
          </div>

          <div className='flex items-start'>
            <span className='font-semibold w-48'>Availability Status:</span>
            <Chip
              label={user.availabilityStatus}
              style={{
                backgroundColor: user.availabilityStatus === 'Online' ? '#4CAF50' : '#808080',
                color: 'white',
                borderRadius: "10px",
                fontWeight: 'bold',
              }}
            />
          </div>

          <div className='flex items-start'>
            <span className='font-semibold w-48'>Ride count:</span>
            <span>{rideStats.completed} Completed, {rideStats.cancelled} Cancelled</span>
          </div>
        </div>
      </div>

      {/* Ride History Section */}
      <div className='bg-white rounded-[12px] p-6 shadow-sm mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='font-medium text-xl'>Ride History</h2>
          <Select
            value={rideSortBy}
            onChange={setRideSortBy}
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
              { value: 'date', label: 'Sort by date' },
            ]}
          />
        </div>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Ride ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Driver Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Ride Type
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Fare Amount
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
              {rideHistory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography>No ride history found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                rideHistory.map((ride) => {
                  const statusColor = getRideStatusColor(ride.status);
                  return (
                    <TableRow key={ride.id}>
                      <TableCell>
                        <Typography>{ride.rideId}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{ride.driverName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{ride.rideType}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{formatCurrency(ride.fareAmount)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={ride.status}
                          style={{
                            backgroundColor: statusColor.bg,
                            color: statusColor.color,
                            borderRadius: "10px",
                            fontWeight: 'bold',
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
      </div>

      {/* Payment Section */}
      <div className='bg-white rounded-[12px] p-6 shadow-sm'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='font-medium text-xl'>Payment</h2>
          <Select
            value={paymentSortBy}
            onChange={setPaymentSortBy}
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
              { value: 'date', label: 'Sort by date' },
            ]}
          />
        </div>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Payment ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Ride ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Payment Method
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Amount
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Date/Time
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
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography>No payment history found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => {
                  const statusColor = getRideStatusColor(payment.status);
                  return (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <Typography>{payment.paymentId}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{payment.rideId}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{payment.paymentMethod}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{formatCurrency(payment.amount)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{formatDateTime(payment.dateTime)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={payment.status}
                          style={{
                            backgroundColor: statusColor.bg,
                            color: statusColor.color,
                            borderRadius: "10px",
                            fontWeight: 'bold',
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
      </div>
    </div>
  );
}

export default UserDetail;
