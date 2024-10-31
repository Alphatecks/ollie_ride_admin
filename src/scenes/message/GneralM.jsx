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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const eventData = [
  {
    id: "#1910",
    title: "GTB Fashion Week",
    startDate: "10 Jan, 2024",
    endDate: "10 Jan, 2024",
    status: "Active",
  },
  {
    id: "#1910",
    title: "GTB Fashion Week",
    startDate: "10 Jan, 2024",
    endDate: "10 Jan, 2024",
    status: "Active",
  },
  {
    id: "#1910",
    title: "GTB Fashion Week",
    startDate: "10 Jan, 2024",
    endDate: "10 Jan, 2024",
    status: "Active",
  },
  {
    id: "#1910",
    title: "GTB Fashion Week",
    startDate: "10 Jan, 2024",
    endDate: "10 Jan, 2024",
    status: "Inactive",
  },
  {
    id: "#1910",
    title: "GTB Fashion Week",
    startDate: "10 Jan, 2024",
    endDate: "10 Jan, 2024",
    status: "Active",
  },
  {
    id: "#1910",
    title: "GTB Fashion Week",
    startDate: "10 Jan, 2024",
    endDate: "10 Jan, 2024",
    status: "Active",
  },
  {
    id: "#1910",
    title: "GTB Fashion Week",
    startDate: "10 Jan, 2024",
    endDate: "10 Jan, 2024",
    status: "Inactive",
  },
];

const EventTable = () => {
  return (
    <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
      <TableContainer>
        <Table sx={{ border: "none" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight={500}>
                  ID
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight={500}>
                  Title
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight={500}>
                  Start Date
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight={500}>
                  End Date
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight={500}>
                  Status
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventData.map((event, index) => (
              <TableRow key={index} sx={{ borderBottom: "none" }}>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{event.id}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{event.title}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{event.startDate}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{event.endDate}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Chip
                    label={event.status}
                    color={event.status === "Active" ? "primary" : "error"}
                    variant="outlined"
                    style={{
                      borderRadius: "10px",
                      width: "70px",
                      textAlign: "center",
                    }}
                  />
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
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
