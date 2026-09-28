import React from "react";
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Chip,
  Typography,
} from "@mui/material";
import { format } from 'date-fns';

const UserTable = ({ users, loading }) => {
  const navigate = useNavigate();
  // Format date function
  const formatDate = (dateValue) => {
    try {
      if (!dateValue) return 'N/A';
      // If it's a Firestore Timestamp, convert it
      if (dateValue && typeof dateValue.toDate === 'function') {
        return format(dateValue.toDate(), 'dd MMM, yyyy');
      }
      // If it's a string, try to parse it
      if (typeof dateValue === 'string') {
        return format(new Date(dateValue), 'dd MMM, yyyy');
      }
      // If it's already a Date object
      if (dateValue instanceof Date) {
        return format(dateValue, 'dd MMM, yyyy');
      }
      return 'N/A';
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'N/A';
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower === 'active') {
      return { bg: '#0C3569', color: 'white' };
    } else if (statusLower === 'suspended') {
      return { bg: '#DD1D1D', color: 'white' };
    } else if (statusLower === 'inactive') {
      return { bg: '#808080', color: 'white' };
    }
    return { bg: '#808080', color: 'white' };
  };

  if (loading) {
    return (
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
        <Typography>Loading users...</Typography>
      </Paper>
    );
  }

  if (users.length === 0) {
    return (
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
        <Typography>No users found</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Phone No
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Email Address
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Registration Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Role
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
            {users.map((user) => {
              const statusColor = getStatusColor(user.status);
              return (
                <TableRow 
                  key={user.id}
                  onClick={() => navigate(`/dashboard/user-database/${user.id}`)}
                  style={{ cursor: 'pointer' }}
                  hover
                >
                  <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell>
                    <Typography>{user.name || 'N/A'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{user.phone || user.phoneNumber || 'N/A'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{user.email || 'N/A'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{formatDate(user.registrationDate || user.createdAt)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{user.role || 'N/A'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status || 'Unknown'}
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
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserTable;

