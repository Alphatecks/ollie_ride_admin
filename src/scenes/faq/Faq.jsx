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
  IconButton,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Dummy data for the table
const faqData = [
  {
    question: "Lorem ipsum dolor sit amet pricing and consulting?",
    answer: "Yorem ipsum dolor sit amet consectetur price and ....",
    status: "Active",
  },
  {
    question: "Lorem ipsum dolor sit amet pricing and consulting?",
    answer: "Yorem ipsum dolor sit amet consectetur price and ....",
    status: "Active",
  },
  {
    question: "Lorem ipsum dolor sit amet pricing and consulting?",
    answer: "Yorem ipsum dolor sit amet consectetur price and ....",
    status: "Deactive",
  },
  {
    question: "Lorem ipsum dolor sit amet pricing and consulting?",
    answer: "Yorem ipsum dolor sit amet consectetur price and ....",
    status: "Active",
  },
  {
    question: "Lorem ipsum dolor sit amet pricing and consulting?",
    answer: "Yorem ipsum dolor sit amet consectetur price and ....",
    status: "Active",
  },
];

const FAQTable = () => {
  return (
    <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
      <TableContainer>
        <Table sx={{ border: "none" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Question
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Answer
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Status
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faqData.map((faq, index) => (
              <TableRow key={index} sx={{ borderBottom: "none" }}>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{faq.question}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{faq.answer}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Chip
                    label={faq.status}
                    color={faq.status === "Active" ? "primary" : "error"}
                    variant="outlined"
                    style={{ borderRadius: "10px" }}
                  />
                </TableCell>
                <TableCell align="right" sx={{ borderBottom: "none" }}>
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

export default FAQTable;
