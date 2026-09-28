import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  IconButton,
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// Placeholder data - will be replaced with Firestore data when collection is available
const placeholderMessages = [
  { id: '1', messageId: '#1910', title: 'GTB Fashion Week', startDate: '10 Jan, 2024', endDate: '10 Jan, 2024', status: 'Active' },
  { id: '2', messageId: '#1910', title: 'GTB Fashion Week', startDate: '10 Jan, 2024', endDate: '10 Jan, 2024', status: 'Active' },
  { id: '3', messageId: '#1910', title: 'GTB Fashion Week', startDate: '10 Jan, 2024', endDate: '10 Jan, 2024', status: 'Active' },
  { id: '4', messageId: '#1910', title: 'GTB Fashion Week', startDate: '10 Jan, 2024', endDate: '10 Jan, 2024', status: 'Inactive' },
  { id: '5', messageId: '#1910', title: 'GTB Fashion Week', startDate: '10 Jan, 2024', endDate: '10 Jan, 2024', status: 'Active' },
  { id: '6', messageId: '#1910', title: 'GTB Fashion Week', startDate: '10 Jan, 2024', endDate: '10 Jan, 2024', status: 'Active' },
  { id: '7', messageId: '#1910', title: 'GTB Fashion Week', startDate: '10 Jan, 2024', endDate: '10 Jan, 2024', status: 'Inactive' },
];

const EventTable = () => {
  const [messages] = useState(placeholderMessages);

  return (
    <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Start Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  End Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Status
                </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>
                  <Typography>{message.messageId}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{message.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{message.startDate}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{message.endDate}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={message.status}
                    color={message.status === "Active" ? "primary" : "error"}
                    variant="outlined"
                    style={{ borderRadius: "10px", width: "70px", textAlign: "center" }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton>
                    <MoreHorizIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default EventTable;

