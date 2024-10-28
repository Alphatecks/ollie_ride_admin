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
  Grid,
  Typography,
} from "@mui/material";

// Dummy data for the table
const ticketData = [
  { id: "#1910", subject: "Facing a problem with ....", status: "Active", lastUpdate: "10 Jan, 2024", support: "Mike Rome" },
  { id: "#1910", subject: "Facing a problem with ....", status: "Active", lastUpdate: "10 Jan, 2024", support: "Mike Rome" },
  { id: "#1910", subject: "Facing a problem with ....", status: "Active", lastUpdate: "10 Jan, 2024", support: "Mike Rome" },
  { id: "#1910", subject: "Facing a problem with ....", status: "Solved", lastUpdate: "10 Jan, 2024", support: "Mike Rome" },
  { id: "#1910", subject: "Facing a problem with ....", status: "Active", lastUpdate: "10 Jan, 2024", support: "Mike Rome" },
  { id: "#1910", subject: "Facing a problem with ....", status: "Active", lastUpdate: "10 Jan, 2024", support: "Mike Rome" },
  { id: "#1910", subject: "Facing a problem with ....", status: "Active", lastUpdate: "10 Jan, 2024", support: "Mike Rome" },
];

const AdminTicketTable = () => {
  return (
    // <Grid container justifyContent="center">
    //   <Grid item xs={12} sm={10} md={8}>
        <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }} >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Ticket ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Subject
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Last Update
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Support
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ticketData.map((ticket, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" />
                    </TableCell>
                    <TableCell>
                      <Typography>{ticket.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{ticket.subject}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={ticket.status}
                        color={ticket.status === "Solved" ? "success" : "primary"}
                        variant="outlined"
                        style={{ borderRadius: "10px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography>{ticket.lastUpdate}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{ticket.support}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
    //   </Grid>
    // </Grid>
  );
};

export default AdminTicketTable;
