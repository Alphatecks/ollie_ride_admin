import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
} from "@mui/material";
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../../firebase';

const DriverTable = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        // Fetch all users from Firestore
        const usersQuery = query(collection(db, "users"));
        const usersSnapshot = await getDocs(usersQuery);
        
        // Filter for drivers only (clientside filter)
        const driversData = usersSnapshot.docs
          .map((doc) => {
            const data = doc.data();
            const role = data.role?.toLowerCase() || '';
            return {
              id: doc.id,
              name: data.name || 'N/A',
              email: data.email || 'N/A',
              phone: data.phone || data.phoneNumber || 'N/A',
              license: data.driverLicense || data.licenseNumber || data.license || 'N/A',
              idNo: data.idNo || data.idNumber || data.nationalId || 'N/A',
              address: data.address || data.houseAddress || data.homeAddress || 'N/A',
              bankDetails: data.bankDetails || data.bankAccount || data.accountNumber || 'N/A',
              avatarUrl: data.profilePicture || data.avatarUrl || data.photoURL || null,
              role: role,
            };
          })
          .filter((user) => {
            // Filter to show only drivers
            const role = user.role?.toLowerCase() || '';
            return role === 'driver';
          });

        setDrivers(driversData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  // Truncate address if too long
  const truncateAddress = (address) => {
    if (!address || address === 'N/A') return 'N/A';
    if (address.length > 20) {
      return address.substring(0, 20) + '...';
    }
    return address;
  };

  if (loading) {
    return (
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
        <Typography>Loading drivers...</Typography>
      </Paper>
    );
  }

  if (drivers.length === 0) {
    return (
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
        <Typography>No drivers found</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
      <TableContainer>
        <Table sx={{ border: "none" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Driver Name
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Phone No
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  License No
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  ID No
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  House Address
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Bank Details
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.id} sx={{ borderBottom: "none" }}>
                <TableCell sx={{ borderBottom: "none" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar 
                      src={driver.avatarUrl} 
                      alt={driver.name} 
                      style={{ marginRight: "10px" }}
                    >
                      {driver.name?.charAt(0) || 'D'}
                    </Avatar>
                    <div>
                      <Typography fontWeight="bold">{driver.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {driver.email}
                      </Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{driver.phone}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{driver.license}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{driver.idNo}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{truncateAddress(driver.address)}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{driver.bankDetails}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DriverTable;

