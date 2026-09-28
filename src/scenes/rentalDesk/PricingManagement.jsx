import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Checkbox,
  IconButton,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';

function PricingManagement() {
  const [pricingData, setPricingData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingPricing, setEditingPricing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [farePerKm, setFarePerKm] = useState('');
  const [baseFee, setBaseFee] = useState('');
  const [category, setCategory] = useState('');
  const [seasonalPricing, setSeasonalPricing] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [adjustment, setAdjustment] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const pricingRef = collection(db, 'pricing');
        const pricingSnapshot = await getDocs(pricingRef);
        
        const pricingList = pricingSnapshot.docs.map((docSnapshot) => {
          const data = docSnapshot.data();
          return {
            id: docSnapshot.id,
            vehicleName: data.vehicleName || 'N/A',
            vehicleId: data.vehicleId || 'N/A',
            category: data.category || 'N/A',
            farePerKm: data.farePerKm || data.baseFee || '0',
            baseFee: data.baseFee || '0',
            seasonalPricing: data.seasonalPricing ? 'Active' : 'Inactive',
            isPublished: data.isPublished || false,
            ...data
          };
        });
        
        setPricingData(pricingList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pricing:', error);
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(pricingData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev => {
      if (prev.includes(id)) {
        return prev.filter(rowId => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      alert('Please select pricing records to delete');
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete ${selectedRows.length} pricing record(s)?`)) {
      return;
    }
    
    try {
      await Promise.all(selectedRows.map(id => deleteDoc(doc(db, 'pricing', id))));
      setPricingData(prev => prev.filter(item => !selectedRows.includes(item.id)));
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting pricing:', error);
      alert('Failed to delete pricing records. Please try again.');
    }
  };

  const handleEdit = () => {
    if (selectedRows.length !== 1) {
      alert('Please select exactly one pricing record to edit');
      return;
    }
    
    const pricingToEdit = pricingData.find(item => item.id === selectedRows[0]);
    if (pricingToEdit) {
      setEditingPricing(pricingToEdit);
      setFarePerKm(pricingToEdit.farePerKm || '');
      setBaseFee(pricingToEdit.baseFee || '');
      setCategory(pricingToEdit.category || '');
      setSeasonalPricing(pricingToEdit.seasonalPricing === 'Active');
      setStartDate(pricingToEdit.seasonalStartDate ? formatDateForInput(pricingToEdit.seasonalStartDate) : '');
      setEndDate(pricingToEdit.seasonalEndDate ? formatDateForInput(pricingToEdit.seasonalEndDate) : '');
      setAdjustment(pricingToEdit.seasonalAdjustment || '');
      setDescription(pricingToEdit.seasonalDescription || '');
      setIsPublished(pricingToEdit.isPublished || false);
      setOpenModal(true);
    }
  };

  const formatDateForInput = (dateValue) => {
    try {
      if (!dateValue) return '';
      const date = dateValue?.toDate ? dateValue.toDate() : (dateValue instanceof Date ? dateValue : new Date(dateValue));
      return date.toISOString().split('T')[0];
    } catch (error) {
      return '';
    }
  };

  const handleAddNew = () => {
    setEditingPricing(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingPricing(null);
    setSearchQuery('');
    setFarePerKm('');
    setBaseFee('');
    setCategory('');
    setSeasonalPricing(false);
    setStartDate('');
    setEndDate('');
    setAdjustment('');
    setDescription('');
    setIsPublished(false);
  };

  const handlePublish = async () => {
    if (!farePerKm || !category) {
      alert('Please fill in fare per km and category');
      return;
    }
    
    try {
      const pricingData = {
        category: category,
        farePerKm: parseFloat(farePerKm) || 0,
        baseFee: parseFloat(baseFee) || 0,
        seasonalPricing: seasonalPricing,
        isPublished: isPublished,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      if (seasonalPricing) {
        pricingData.seasonalStartDate = startDate ? new Date(startDate) : null;
        pricingData.seasonalEndDate = endDate ? new Date(endDate) : null;
        pricingData.seasonalAdjustment = adjustment || '';
        pricingData.seasonalDescription = description || '';
      }
      
      if (editingPricing) {
        // Update existing pricing
        await updateDoc(doc(db, 'pricing', editingPricing.id), {
          ...pricingData,
          updatedAt: serverTimestamp()
        });
        
        setPricingData(prev => prev.map(item => 
          item.id === editingPricing.id 
            ? { ...item, ...pricingData, seasonalPricing: seasonalPricing ? 'Active' : 'Inactive' }
            : item
        ));
      } else {
        // Create new pricing
        const docRef = await addDoc(collection(db, 'pricing'), pricingData);
        setPricingData(prev => [...prev, {
          id: docRef.id,
          ...pricingData,
          vehicleName: 'N/A',
          vehicleId: 'N/A',
          seasonalPricing: seasonalPricing ? 'Active' : 'Inactive'
        }]);
      }
      
      handleCloseModal();
    } catch (error) {
      console.error('Error saving pricing:', error);
      alert('Failed to save pricing. Please try again.');
    }
  };

  const isAllSelected = selectedRows.length === pricingData.length && pricingData.length > 0;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < pricingData.length;

  return (
    <div className='bg-[#F9F9F9] px-8 pt-8 pb-8 min-h-screen poppins-font'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='font-medium text-2xl'>Pricing Management</h1>
        <div className='flex items-center gap-4'>
          <IconButton
            onClick={handleDelete}
            sx={{ 
              color: '#DD1D1D',
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={handleEdit}
            sx={{ 
              color: '#0C3569',
            }}
          >
            <EditIcon />
          </IconButton>
          <Button
            onClick={handleAddNew}
            variant="contained"
            startIcon={<AddIcon />}
            style={{
              backgroundColor: '#0C3569',
              color: 'white',
              borderRadius: '8px',
              padding: '10px 24px',
              textTransform: 'none',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Add new pricing
          </Button>
        </div>
      </div>

      {/* Table */}
      <Paper elevation={3} className="poppins-font" style={{ padding: "20px", borderRadius: "10px" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={isIndeterminate}
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Vehicle Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Fare Per Km
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Category
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Base Fee
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Seasonal Pricing
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Status
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Loading pricing data...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : pricingData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                      No pricing records found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                pricingData.map((item) => {
                  const isSelected = selectedRows.includes(item.id);
                  const isActive = item.seasonalPricing === 'Active';
                  return (
                    <TableRow key={item.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleSelectRow(item.id)}
                          color="primary"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {item.vehicleName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {item.vehicleId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                          N{parseFloat(item.farePerKm || 0).toLocaleString('en-US')}/km
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {item.category}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>
                          N{parseFloat(item.baseFee || 0).toLocaleString('en-US')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.seasonalPricing}
                          style={{
                            backgroundColor: isActive ? '#0C3569' : '#E0E0E0',
                            color: isActive ? 'white' : '#666',
                            borderRadius: "10px",
                            fontWeight: 'bold',
                            fontFamily: 'Poppins, sans-serif',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.isPublished ? 'Published' : 'Draft'}
                          style={{
                            backgroundColor: item.isPublished ? '#4CAF50' : '#FFC107',
                            color: 'white',
                            borderRadius: "10px",
                            fontWeight: 'bold',
                            fontFamily: 'Poppins, sans-serif',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add New Pricing Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '12px',
            padding: '0',
            backgroundColor: 'white',
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
          <Typography variant="h6" fontWeight="bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {editingPricing ? 'Edit Pricing' : 'Add new pricing'}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ padding: '24px' }}>
          <div className="space-y-6">
            {/* Category Search Field */}
            <TextField
              fullWidth
              placeholder="Search by category (e.g., Economy, Standard, Premium)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              style={{
                backgroundColor: '#F5F5F5',
                borderRadius: '8px',
              }}
              InputProps={{
                style: {
                  borderRadius: '8px',
                  fontFamily: 'Poppins, sans-serif',
                }
              }}
            />

            {/* Base Pricing Configuration Section */}
            <div>
              <Typography variant="subtitle1" fontWeight="bold" className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Fare Per Km Configuration
              </Typography>
              <div className="space-y-4">
                <TextField
                  fullWidth
                  label="Category"
                  placeholder="e.g., Economy, Standard, Premium"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  variant="outlined"
                  required
                  style={{
                    backgroundColor: '#F5F5F5',
                    borderRadius: '8px',
                  }}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                      fontFamily: 'Poppins, sans-serif',
                    }
                  }}
                  InputLabelProps={{
                    style: { fontFamily: 'Poppins, sans-serif' }
                  }}
                />
                <TextField
                  fullWidth
                  label="Fare Per Km (N)"
                  placeholder="Enter fare per kilometer"
                  value={farePerKm}
                  onChange={(e) => setFarePerKm(e.target.value)}
                  variant="outlined"
                  type="number"
                  required
                  style={{
                    backgroundColor: '#F5F5F5',
                    borderRadius: '8px',
                  }}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                      fontFamily: 'Poppins, sans-serif',
                    }
                  }}
                  InputLabelProps={{
                    style: { fontFamily: 'Poppins, sans-serif' }
                  }}
                />
                <TextField
                  fullWidth
                  label="Base Fee (N)"
                  placeholder="Enter base fee"
                  value={baseFee}
                  onChange={(e) => setBaseFee(e.target.value)}
                  variant="outlined"
                  type="number"
                  style={{
                    backgroundColor: '#F5F5F5',
                    borderRadius: '8px',
                  }}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                      fontFamily: 'Poppins, sans-serif',
                    }
                  }}
                  InputLabelProps={{
                    style: { fontFamily: 'Poppins, sans-serif' }
                  }}
                />
              </div>
            </div>

            {/* Publish Checkbox */}
            <div className="flex items-center">
              <Checkbox
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                color="primary"
              />
              <Typography variant="body1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Publish this pricing
              </Typography>
            </div>

            {/* Seasonal Pricing Checkbox */}
            <div className="flex items-center">
              <Checkbox
                checked={seasonalPricing}
                onChange={(e) => setSeasonalPricing(e.target.checked)}
                color="primary"
              />
              <Typography variant="body1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Seasonal Pricing
              </Typography>
            </div>

            {/* Seasonal Pricing Additional Fields */}
            {seasonalPricing && (
              <div className="space-y-4 pt-2">
                {/* Date Inputs */}
                <div className="flex gap-4">
                  <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                      style: { fontFamily: 'Poppins, sans-serif' }
                    }}
                    style={{
                      backgroundColor: '#F5F5F5',
                      borderRadius: '8px',
                    }}
                    InputProps={{
                      style: {
                        borderRadius: '8px',
                        fontFamily: 'Poppins, sans-serif',
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    type="date"
                    label="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                      style: { fontFamily: 'Poppins, sans-serif' }
                    }}
                    style={{
                      backgroundColor: '#F5F5F5',
                      borderRadius: '8px',
                    }}
                    InputProps={{
                      style: {
                        borderRadius: '8px',
                        fontFamily: 'Poppins, sans-serif',
                      }
                    }}
                  />
                </div>

                {/* Adjustment Input */}
                <TextField
                  fullWidth
                  label="Adjustment (N or %)"
                  placeholder="Enter adjustment amount or percentage"
                  value={adjustment}
                  onChange={(e) => setAdjustment(e.target.value)}
                  variant="outlined"
                  style={{
                    backgroundColor: '#F5F5F5',
                    borderRadius: '8px',
                  }}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                      fontFamily: 'Poppins, sans-serif',
                    }
                  }}
                  InputLabelProps={{
                    style: { fontFamily: 'Poppins, sans-serif' }
                  }}
                />

                {/* Description (Optional) */}
                <TextField
                  fullWidth
                  label="Description (optional)"
                  placeholder="Enter description for seasonal pricing"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                  multiline
                  rows={4}
                  style={{
                    backgroundColor: '#F5F5F5',
                    borderRadius: '8px',
                  }}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                      fontFamily: 'Poppins, sans-serif',
                    }
                  }}
                  InputLabelProps={{
                    style: { fontFamily: 'Poppins, sans-serif' }
                  }}
                />
              </div>
            )}

            {/* Publish Button */}
            <Button
              variant="contained"
              onClick={handlePublish}
              fullWidth
              style={{
                backgroundColor: '#0C3569',
                color: 'white',
                borderRadius: '8px',
                padding: '12px 24px',
                textTransform: 'none',
                marginTop: '20px',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Publish
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PricingManagement;
