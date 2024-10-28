import React from 'react';
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const RideCard = () => {
  // Ride data inside the component
  const rides = [
    {
      date: 'Mon 30th January, 2024',
      from: 'Kunle Remi Close, Ajani Avenue',
      to: 'Very Dark Close, Ednut Avenue',
      rating: 4,
      startTime: '12:30PM',
      endTime: '1:30PM',
      driverName: 'Johnson Nweke',
      driverID: '0035271',
      driverRating: 4.0,
      totalAmount: 30,
      status: 'Enroute',
    },
    {
      date: 'Tue 31st January, 2024',
      from: 'Main Street, Downtown',
      to: 'Broadway Avenue, Uptown',
      rating: 4,
      startTime: '2:00PM',
      endTime: '2:45PM',
      driverName: 'Chris Johnson',
      driverID: '0035278',
      driverRating: 5.0,
      totalAmount: 45,
      status: 'Completed',
    },
    {
      date: 'Tue 31st January, 2024',
      from: 'Main Street, Downtown',
      to: 'Broadway Avenue, Uptown',
      rating: 4,
      startTime: '2:00PM',
      endTime: '2:45PM',
      driverName: 'Chris Johnson',
      driverID: '0035278',
      driverRating: 5.0,
      totalAmount: 45,
      status: 'Completed',
    },
    // Add more ride data as needed
  ];

  return (
    <div className="py-6 flex gap-4 ">
      {/* Map through the ride data and render for each ride */}
      {rides.map((ride, index) => (
        <div key={index} className="bg-white shadow-2xl rounded-[10px] py-6 pl-6 pr-20  mb-6 ">
          {/* Location Route (From and To) */}
          <div className='flex gap-2 items-center text-[#8095B2] leading-[12px]'>
            <CalendarMonthOutlinedIcon/>
            <p className='text-[8px]'>Mon 30th January, 2024</p>
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
