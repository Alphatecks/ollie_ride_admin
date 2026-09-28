import React, { useState } from 'react'
import FAQTable from './Faq'
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
} from '@mui/material';

function index() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuestion('');
    setAnswer('');
  };

  const handleAddFAQ = () => {
    console.log('Add FAQ:', { question, answer });
    // TODO: Implement add FAQ logic
    handleClose();
  };

  return (
    <div className='px-8'>
        <div className="flex justify-between items-center py-10 ">
        <h1 className="font-medium text-2xl">FAQs</h1>
        <button 
          onClick={handleOpen}
          className="py-[10px] px-[36px] bg-[#0C3569] rounded-[10px] text-white flex gap-4 items-center"
        >
          <AddIcon />
          Add FAQ
        </button>
      </div>
      <FAQTable/>

      {/* Add FAQ Modal */}
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
          padding: '24px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Typography variant="h6" fontWeight="bold">Add new FAQ</Typography>
        </DialogTitle>
        <DialogContent style={{ padding: '24px' }}>
          <div className="space-y-6">
            {/* Question Input */}
            <div>
              <Typography variant="body2" fontWeight="bold" style={{ marginBottom: '8px' }}>
                Question
              </Typography>
              <TextField
                fullWidth
                placeholder="Lorem ipsimrendo gsisk semrem upton"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
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

            {/* Answer Input */}
            <div>
              <Typography variant="body2" fontWeight="bold" style={{ marginBottom: '8px' }}>
                Answer
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Lorem ipsimrendo gsisk semrem upton"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
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

            {/* Add FAQ Button */}
            <div className="flex justify-start pt-4">
              <Button
                onClick={handleAddFAQ}
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
                Add FAQ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default index

