import React, { useState } from "react";
import AdminTicketTable from "./Help";
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function index() {
  const [open, setOpen] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [subject, setSubject] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTicketId('');
    setSubject('');
  };

  const handleAddTicket = () => {
    console.log('Add new ticket:', { ticketId, subject });
    // TODO: Implement add ticket logic
    handleClose();
  };

  return (
    <div className="px-8">
      <div className="flex justify-between items-center py-10">
        <h1 className="font-medium text-2xl">Help</h1>
        <button 
          onClick={handleOpen}
          className="py-[10px] px-[36px] bg-[#0C3569] rounded-[10px] text-white flex gap-4 items-center"
        >
          <AddIcon />
          Add new ticket
        </button>
      </div>
      <AdminTicketTable />

      {/* Add New Ticket Modal */}
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
          <Typography variant="h6" fontWeight="bold">Add new ticket</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ padding: '24px' }}>
          <div className="space-y-6">
            {/* Ticket ID Input */}
            <div>
              <Typography variant="body2" fontWeight="bold" style={{ marginBottom: '8px' }}>
                Ticket ID
              </Typography>
              <TextField
                fullWidth
                placeholder="#19118"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
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
            </div>

            {/* Subject Input */}
            <div>
              <Typography variant="body2" fontWeight="bold" style={{ marginBottom: '8px' }}>
                Subject
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Lorem ipsimrendo gsisk semrem upton"
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
            </div>

            {/* Add New Ticket Button */}
            <div className="flex justify-start pt-4">
              <Button
                onClick={handleAddTicket}
                variant="contained"
                style={{
                  backgroundColor: '#0C3569',
                  color: 'white',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  textTransform: 'none',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Add new ticket
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default index;

