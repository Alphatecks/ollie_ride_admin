import React, { useState } from "react";
import GeneralM from "./GneralM";
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { Select } from 'antd';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function index() {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [messageType, setMessageType] = useState('Email');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSubject('');
    setMessage('');
    setStartDate('');
    setEndDate('');
    setMessageType('Email');
  };

  const handleSave = () => {
    console.log('Save message:', { subject, message, startDate, endDate, messageType });
    // TODO: Implement save logic
    handleClose();
  };

  return (
    <div className="px-10">
      <div className="flex justify-between items-center py-10">
        <h1 className="font-medium text-2xl">General Message</h1>
        <button 
          onClick={handleOpen}
          className="py-[10px] px-[36px] bg-[#0C3569] rounded-[10px] text-white flex gap-4 items-center"
        >
          <AddIcon />
          Add message
        </button>
      </div>
      <GeneralM />

      {/* Add Message Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '12px',
            padding: '0',
          }
        }}
      >
        <DialogTitle style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '24px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Typography variant="h6" fontWeight="bold">General message and notification</Typography>
          <Button
            onClick={handleSave}
            variant="contained"
            style={{
              backgroundColor: '#0C3569',
              color: 'white',
              borderRadius: '8px',
              padding: '8px 24px',
              textTransform: 'none',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Save
          </Button>
        </DialogTitle>
        <DialogContent style={{ padding: '24px' }}>
          <div className="bg-gray-100 rounded-lg p-6 space-y-6">
            {/* Subject Input */}
            <TextField
              fullWidth
              placeholder="Add Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              variant="outlined"
              style={{
                backgroundColor: '#F5F5F5',
              }}
              InputProps={{
                style: {
                  borderRadius: '8px',
                  backgroundColor: '#F5F5F5',
                }
              }}
            />

            {/* Message Composition Area */}
            <TextField
              fullWidth
              multiline
              rows={6}
              placeholder="Compose message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
              style={{
                backgroundColor: '#F5F5F5',
              }}
              InputProps={{
                style: {
                  borderRadius: '8px',
                  backgroundColor: '#F5F5F5',
                }
              }}
            />

            {/* Date Pickers */}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white" style={{ cursor: 'pointer' }}>
                  <CalendarTodayIcon style={{ fontSize: 18, color: '#666' }} />
                  <Select
                    value={startDate}
                    onChange={setStartDate}
                    style={{
                      width: "100%",
                      border: 'none',
                    }}
                    bordered={false}
                    placeholder="Start Date"
                    suffixIcon={
                      <ExpandMoreOutlinedIcon
                        className="w-3 h-3"
                        style={{ fontSize: 17 }}
                      />
                    }
                    options={[]}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white" style={{ cursor: 'pointer' }}>
                  <CalendarTodayIcon style={{ fontSize: 18, color: '#666' }} />
                  <Select
                    value={endDate}
                    onChange={setEndDate}
                    style={{
                      width: "100%",
                      border: 'none',
                    }}
                    bordered={false}
                    placeholder="End Date"
                    suffixIcon={
                      <ExpandMoreOutlinedIcon
                        className="w-3 h-3"
                        style={{ fontSize: 17 }}
                      />
                    }
                    options={[]}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                variant={messageType === 'Email' ? 'contained' : 'outlined'}
                onClick={() => setMessageType('Email')}
                style={{
                  backgroundColor: messageType === 'Email' ? '#0C3569' : 'white',
                  color: messageType === 'Email' ? 'white' : '#0C3569',
                  borderColor: '#0C3569',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  textTransform: 'none',
                  flex: 1,
                  border: messageType === 'Email' ? 'none' : '1px solid #0C3569',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Email
              </Button>
              <Button
                variant={messageType === 'Text Message' ? 'contained' : 'outlined'}
                onClick={() => setMessageType('Text Message')}
                style={{
                  backgroundColor: messageType === 'Text Message' ? '#0C3569' : 'white',
                  color: messageType === 'Text Message' ? 'white' : '#0C3569',
                  borderColor: '#0C3569',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  textTransform: 'none',
                  flex: 1,
                  border: messageType === 'Text Message' ? 'none' : '1px solid #0C3569',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Text Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default index;

