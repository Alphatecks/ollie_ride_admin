import React from 'react'
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import PersonIcon from "@mui/icons-material/Person";
import DatabaseIcon from '../../assets/icons/database'

function RideSummary() {
  return (
    <div className='flex justify-between mt-8 pr-8'>

      <div className='flex gap-4 bg-white pt-[13px] pb-[30px] pl-4 rounded-[12px]'>
        <div className='bg-secondary rounded-full flex items-center w-12 h-12 justify-center'>
        <DirectionsCarFilledIcon style={{fontSize: 30, color: '#0C3569'}} className='text-primary'/>
        </div>
      <div className='pr-[113px]'>
      <p className='text-2xl font-medium'>332</p>
      <p className='text-[12px]'>Total rides</p>
      </div>
      </div>

      <div className='flex flex-col gap-4 bg-white pt-[13px] pb-[30px] pl-4 rounded-[12px]'>
        <div className='flex gap-4'>
        <div className='bg-secondary rounded-full flex items-center w-12 h-12 justify-center'>
        <PersonIcon style={{fontSize: 30, color: '#0C3569'}} className='text-primary'/>
        </div>
      <div className='pr-[113px]'>
      <p className='text-2xl font-medium'>3,132</p>
      <p className='text-[12px]'>Total users</p>
      </div>
        </div>
      <div className='flex gap-4'>
        <p className='text-[9px] flex items-center gap-2'><span className='w-2 h-2 rounded-full bg-[#0C3569]'></span>Active 2,100</p>
        <p className='text-[9px] flex items-center gap-2'><span className='w-2 h-2 rounded-full bg-[#DD1D1D]'></span>Inactive 2,100</p>
      </div>
      </div>
      
      <div className='flex gap-4 bg-white pt-[13px] pb-[40px] pl-4 rounded-12px'>
        <div className='bg-secondary rounded-full flex items-center w-12 h-12 justify-center'>
        <DatabaseIcon style={{fontSize: 30, color: '#0C3569'}} className='text-primary'/>
        </div>
      <div className='pr-[113px]'>
      <p className='text-2xl font-medium'>$332</p>
      <p className='text-[12px]'>Total income</p>
      </div>
      </div>
    </div>
  )
}

export default RideSummary
