import React from 'react'
import RealTimeMap from '../dashboard/RealTimeMap'
import RideCard from './RideCard'

function RideHistory() {
  return (
    <div className='bg-[#F9F9F9] px-8 pt-8'>
      <div className='flex justify-between items-center '>
        <h1 className='font-medium text-2xl'>Ride Details </h1>
        <button className='py-[10px] px-[36px] bg-[#0C3569] rounded-[10px] text-white'>View Drivers</button>
      </div>
      <div className='bg-white'>
      <RealTimeMap/>
      <RideCard />
      </div>
    </div>

  )
}

export default RideHistory
