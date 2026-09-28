import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select } from 'antd';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Typography, Paper } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { format, startOfYear, eachMonthOfInterval } from 'date-fns';

function CustomerTrends() {
  const [monthFilter, setMonthFilter] = useState('Month');
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerTrends = async () => {
      try {
        // Fetch users
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        
        const users = [];
        usersSnapshot.forEach((doc) => {
          const data = doc.data();
          let date = null;
          if (data.registrationDate) {
            date = data.registrationDate?.toDate ? data.registrationDate.toDate() : (data.registrationDate instanceof Date ? data.registrationDate : new Date(data.registrationDate));
          } else if (data.createdAt) {
            date = data.createdAt?.toDate ? data.createdAt.toDate() : (data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt));
          } else {
            date = new Date();
          }
          users.push({ date });
        });

        // Group by month
        const now = new Date();
        const start = startOfYear(now);
        const months = eachMonthOfInterval({ start, end: now });
        
        const monthlyData = months.map((month, index) => {
          const count = users.filter(user => {
            const userDate = user.date;
            return format(userDate, 'yyyy-MM') === format(month, 'yyyy-MM');
          }).length;

          return {
            period: String(index + 1),
            value: count
          };
        });

        setCustomerData(monthlyData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer trends:', error);
        setLoading(false);
      }
    };

    fetchCustomerTrends();
  }, [monthFilter]);

  return (
    <Paper elevation={3} className="poppins-font" style={{ padding: "20px", borderRadius: "10px", flex: 1 }}>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '8px', fontFamily: 'Poppins, sans-serif' }}>
            Customer Trends
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
            Analyze customer trends, including growth rates, repeat bookings, and new registrations, to better understand customer behavior and improve retention strategies
          </Typography>
        </div>
        <Select
          value={monthFilter}
          onChange={setMonthFilter}
          style={{
            width: "100px",
            height: "36px",
          }}
          suffixIcon={
            <ExpandMoreOutlinedIcon
              className="w-3 h-3"
              style={{ fontSize: 17 }}
            />
          }
          options={[
            { value: 'Month', label: 'Month' },
            { value: 'Week', label: 'Week' },
            { value: 'Year', label: 'Year' },
          ]}
        />
      </div>

      {/* Bar Chart */}
      {loading ? (
        <div style={{ width: '100%', height: '300px', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>Loading...</Typography>
        </div>
      ) : (
        <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
          <ResponsiveContainer>
            <BarChart data={customerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={true} />
              <XAxis 
                dataKey="period" 
                style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}
                tick={false}
              />
              <YAxis 
                style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}
              />
              <Tooltip />
              <Bar 
                dataKey="value" 
                fill="#9C27B0" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Paper>
  );
}

export default CustomerTrends;

