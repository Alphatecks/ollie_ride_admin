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
  Grid,
  Typography,
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Question
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Answer
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
            {faqData.map((faq, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography>{faq.question}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{faq.answer}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={faq.status}
                    color={faq.status === "Active" ? "primary" : "error"}
                    variant="outlined"
                    style={{ borderRadius: "10px" }}
                  />
                </TableCell>
                <TableCell align="right">
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

