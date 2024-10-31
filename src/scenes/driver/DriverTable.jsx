import React from "react";
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

const driverData = [
  {
    name: "Patrick Schick",
    email: "pattpata3@gmail.com",
    phone: "+234704562233",
    license: "HH534KJA",
    idNo: "16663533",
    address: "4, Afiawo street, o...",
    bankDetails: "0011673838378",
    avatarUrl: "https://example.com/avatar.jpg", // Replace with actual avatar URL
  },
  {
    name: "Patrick Schick",
    email: "pattpata3@gmail.com",
    phone: "+234704562233",
    license: "HH534KJA",
    idNo: "16663533",
    address: "4, Afiawo street, o...",
    bankDetails: "0011673838378",
    avatarUrl: "https://example.com/avatar.jpg", // Replace with actual avatar URL
  },
  {
    name: "Patrick Schick",
    email: "pattpata3@gmail.com",
    phone: "+234704562233",
    license: "HH534KJA",
    idNo: "16663533",
    address: "4, Afiawo street, o...",
    bankDetails: "0011673838378",
    avatarUrl: "https://example.com/avatar.jpg", // Replace with actual avatar URL
  },
  {
    name: "Patrick Schick",
    email: "pattpata3@gmail.com",
    phone: "+234704562233",
    license: "HH534KJA",
    idNo: "16663533",
    address: "4, Afiawo street, o...",
    bankDetails: "0011673838378",
    avatarUrl: "https://example.com/avatar.jpg", // Replace with actual avatar URL
  },
  {
    name: "Patrick Schick",
    email: "pattpata3@gmail.com",
    phone: "+234704562233",
    license: "HH534KJA",
    idNo: "16663533",
    address: "4, Afiawo street, o...",
    bankDetails: "0011673838378",
    avatarUrl: "https://example.com/avatar.jpg", // Replace with actual avatar URL
  },
  {
    name: "Patrick Schick",
    email: "pattpata3@gmail.com",
    phone: "+234704562233",
    license: "HH534KJA",
    idNo: "16663533",
    address: "4, Afiawo street, o...",
    bankDetails: "0011673838378",
    avatarUrl: "https://example.com/avatar.jpg", // Replace with actual avatar URL
  },
  {
    name: "Patrick Schick",
    email: "pattpata3@gmail.com",
    phone: "+234704562233",
    license: "HH534KJA",
    idNo: "16663533",
    address: "4, Afiawo street, o...",
    bankDetails: "0011673838378",
    avatarUrl: "https://example.com/avatar.jpg", // Replace with actual avatar URL
  },
  {
    name: "Patrick Schick",
    email: "pattpata3@gmail.com",
    phone: "+234704562233",
    license: "HH534KJA",
    idNo: "16663533",
    address: "4, Afiawo street, o...",
    bankDetails: "0011673838378",
    avatarUrl: "https://example.com/avatar.jpg", // Replace with actual avatar URL
  },
  // Add more entries as needed
];
const DriverTable = () => {
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
            {driverData.map((driver, index) => (
              <TableRow key={index} sx={{ borderBottom: "none" }}>
                <TableCell sx={{ borderBottom: "none" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={driver.avatarUrl}
                      alt={driver.name}
                      style={{ marginRight: "10px" }}
                    />
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
                  <Typography>{driver.address}</Typography>
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
