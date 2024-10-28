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
  Typography,
  IconButton,
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const eventData = [
  { id: "#1910", title: "GTB Fashion Week", startDate: "10 Jan, 2024", endDate: "10 Jan, 2024", status: "Active" },
  { id: "#1910", title: "GTB Fashion Week", startDate: "10 Jan, 2024", endDate: "10 Jan, 2024", status: "Active" },
  { id: "#1910", title: "GTB Fashion Week", startDate: "10 Jan, 2024", endDate: "10 Jan, 2024", status: "Active" },
  { id: "#1910", title: "GTB Fashion Week", startDate: "10 Jan, 2024", endDate: "10 Jan, 2024", status: "Inactive" },
  { id: "#1910", title: "GTB Fashion Week", startDate: "10 Jan, 2024", endDate: "10 Jan, 2024", status: "Active" },
  { id: "#1910", title: "GTB Fashion Week", startDate: "10 Jan, 2024", endDate: "10 Jan, 2024", status: "Active" },
  { id: "#1910", title: "GTB Fashion Week", startDate: "10 Jan, 2024", endDate: "10 Jan, 2024", status: "Inactive" },
];

const EventTable = () => {
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
            {eventData.map((event, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography>{event.id}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{event.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{event.startDate}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{event.endDate}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={event.status}
                    color={event.status === "Active" ? "primary" : "error"}
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
