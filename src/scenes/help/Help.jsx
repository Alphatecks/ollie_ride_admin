import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Checkbox,
  Typography,
} from "@mui/material";

// Dummy data for the table
const ticketData = [
  {
    id: "#1910",
    subject: "Facing a problem with ....",
    status: "Active",
    lastUpdate: "10 Jan, 2024",
    support: "Mike Rome",
  },
  {
    id: "#1910",
    subject: "Facing a problem with ....",
    status: "Active",
    lastUpdate: "10 Jan, 2024",
    support: "Mike Rome",
  },
  {
    id: "#1910",
    subject: "Facing a problem with ....",
    status: "Active",
    lastUpdate: "10 Jan, 2024",
    support: "Mike Rome",
  },
  {
    id: "#1910",
    subject: "Facing a problem with ....",
    status: "Solved",
    lastUpdate: "10 Jan, 2024",
    support: "Mike Rome",
  },
  {
    id: "#1910",
    subject: "Facing a problem with ....",
    status: "Active",
    lastUpdate: "10 Jan, 2024",
    support: "Mike Rome",
  },
  {
    id: "#1910",
    subject: "Facing a problem with ....",
    status: "Active",
    lastUpdate: "10 Jan, 2024",
    support: "Mike Rome",
  },
  {
    id: "#1910",
    subject: "Facing a problem with ....",
    status: "Active",
    lastUpdate: "10 Jan, 2024",
    support: "Mike Rome",
  },
];

const AdminTicketTable = () => {
  return (
    <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
      <TableContainer>
        <Table sx={{ border: "none" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}></TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Ticket ID
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Subject
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Status
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Last Update
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Support
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ticketData.map((ticket, index) => (
              <TableRow key={index} sx={{ borderBottom: "none" }}>
                <TableCell padding="checkbox" sx={{ borderBottom: "none" }}>
                  <Checkbox color="primary" />
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{ticket.id}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{ticket.subject}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Chip
                    label={ticket.status}
                    color={ticket.status === "Solved" ? "success" : "primary"}
                    variant="outlined"
                    style={{ borderRadius: "10px" }}
                  />
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{ticket.lastUpdate}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{ticket.support}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AdminTicketTable;
