import React, { useState, useEffect } from 'react';
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase';
import { format } from 'date-fns';

const RideCard = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        // Fetch rides from Firestore, ordered by date (most recent first)
        const ridesQuery = query(
          collection(db, "rides"),
          orderBy("date", "desc") // Assuming 'date' field exists, or use 'createdAt'
        );
        const ridesSnapshot = await getDocs(ridesQuery);
        
        const ridesData = ridesSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            date: data.date || data.createdAt || new Date(),
            from: data.from || data.pickupLocation || data.pickup || 'N/A',
            to: data.to || data.dropoffLocation || data.dropoff || 'N/A',
            rating: data.rating || data.rideRating || 0,
            startTime: data.startTime || data.timeStarted || 'N/A',
            endTime: data.endTime || data.timeCompleted || data.timeEnded || 'N/A',
            driverName: data.driverName || data.driver?.name || 'N/A',
            driverID: data.driverID || data.driver?.id || data.driverId || 'N/A',
            driverRating: data.driverRating || data.driver?.rating || 0,
            totalAmount: data.totalAmount || data.amount || data.price || 0,
            status: data.status || 'Unknown',
          };
        });

        setRides(ridesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rides:", error);
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  // Format date to display format
  const formatDate = (dateValue) => {
    try {
      // If it's a Firestore Timestamp, convert it
      if (dateValue && typeof dateValue.toDate === 'function') {
        return format(dateValue.toDate(), 'EEE do MMMM, yyyy');
      }
      // If it's a string, try to parse it
      if (typeof dateValue === 'string') {
        return format(new Date(dateValue), 'EEE do MMMM, yyyy');
      }
      // If it's already a Date object
      if (dateValue instanceof Date) {
        return format(dateValue, 'EEE do MMMM, yyyy');
      }
      return 'N/A';
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'N/A';
    }
  };

  if (loading) {
    return (
      <div className="py-6 flex justify-center">
        <p className="text-gray-500">Loading rides...</p>
      </div>
    );
  }

  if (rides.length === 0) {
    return (
      <div className="py-6 flex justify-center">
        <p className="text-gray-500">No rides found</p>
      </div>
    );
  }

  return (
    <div className="py-6 flex gap-4 ">
      {/* Map through the ride data and render for each ride */}
      {rides.map((ride) => (
        <div key={ride.id} className="bg-white shadow-2xl rounded-[10px] py-6 pl-6 pr-20  mb-6 ">
          {/* Location Route (From and To) */}
          <div className='flex gap-2 items-center text-[#8095B2] leading-[12px]'>
            <CalendarMonthOutlinedIcon/>
            <p className='text-[8px]'>{formatDate(ride.date)}</p>
          </div>

          <div className="flex flex-col gap-2 mb-4 mt-4 ml-2">
            {/* From location */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
              <p className="text-gray-500 text-[8px]">{ride.from}</p>
            </div>

            {/* Line between locations */}
            <div className="flex items-center ml-1">
              <div className="w-px h-4 bg-blue-200 border border-dotted"></div>
            </div>

            {/* To location */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-900 rounded-full"></div>
              <p className="text-gray-500 text-[8px]">{ride.to}</p>
            </div>
          </div>

          {/* Ride Rating */}
          <div className="flex items-center gap-4  mb-4 mt-8">
            {Array(5).fill().map((_, i) => (
              <span key={i} className={`text-lg ${i < ride.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
            ))}
            <span className="ml-2 text-gray-600 text-[8px]">Ride rating {ride.rating} out of 5</span>
          </div>

          {/* Ride Info */}
          <div className="text-sm text-gray-700 mb-4 mt-4 pl-8 flex flex-col gap-4">
            <p className='flex  text-left gap-14 text-[8px]'>Time Started:<strong>{ride.startTime}</strong> </p>
            <p className='flex gap-10  items-start text-left text-[8px]'>Time Completed:<strong className='flex items-start justify-start text-left'>{ride.endTime}</strong></p>
            <p className='flex gap-14 items-start text-left text-[8px]'>Driver Name: <strong>{ride.driverName}</strong></p>
            <p className='flex gap-[76px] items-start text-left text-[8px]'>Driver ID: <strong>{ride.driverID}</strong></p>
            <p className='flex gap-16  items-start text-left text-[8px]'>Driver Rating: <strong>{ride.driverRating}</strong></p>
          </div>

          {/* Total Amount */}
          <div className="mb-4 bg-[#0C3569] text-white py-2 pl-4 rounded-[9px] w-[138px]">
            <p className="text-[8px]">Total amount</p>
            <h3 className="text-xl font-medium">${ride.totalAmount}</h3>
          </div>

          {/* Status Button */}
          <button className="border border-[#E4C41D] text-[#E4C41D] rounded-full py-2 px-4 transition text-[8px]">
            {ride.status}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RideCard;

