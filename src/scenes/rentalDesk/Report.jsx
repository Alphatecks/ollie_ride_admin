import React from 'react';
import ReportKPIs from './ReportKPIs';
import TotalRentalsMade from './TotalRentalsMade';
import RevenueBreakdown from './RevenueBreakdown';
import VehicleUtilizationPie from './VehicleUtilizationPie';
import CustomerTrends from './CustomerTrends';
import RentalTable from './RentalTable';

function Report() {
  return (
    <div className='bg-[#F9F9F9] px-8 pt-8 pb-8 min-h-screen poppins-font'>
      {/* Header */}
      <h1 className='font-medium text-2xl mb-6'>Report</h1>

      {/* KPI Cards */}
      <ReportKPIs />

      {/* Middle Row Charts */}
      <div className='flex gap-4 mb-6'>
        <TotalRentalsMade />
        <RevenueBreakdown />
      </div>

      {/* Bottom Row Charts */}
      <div className='flex gap-4 mb-6'>
        <VehicleUtilizationPie />
        <CustomerTrends />
      </div>

      {/* Rental Table */}
      <RentalTable />
    </div>
  );
}

export default Report;
