import React, { useState } from 'react';
import {
  Box, Typography, Chip, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import DownloadIcon from '@mui/icons-material/Download';
import dataDictionary from '../data/dataDictionary.json';
import suffixDictionary from '../data/suffixDictionary.json';


// ✅ Data Dictionary Columns (Added "Standard" column)
const dictionaryColumns = [
  { field: 'term', headerName: 'Term', flex: 1, sortable: true, filterable: true },
  { field: 'definition', headerName: 'Definition', flex: 2, sortable: true, filterable: true },
  { 
    field: 'appearsInModel', 
    headerName: 'Appears in Model', 
    flex: 1, 
    sortable: true, 
    filterable: true,
    renderCell: (params) => params.value ? '✅' : '❌'
  },
  { 
    field: 'domain', 
    headerName: 'Domain', 
    flex: 1.5, 
    sortable: true, 
    filterable: true,
    renderCell: (params) => (
      params.value.map((d, index) => (
        <Chip key={index} label={d} sx={{ margin: '2px' }} />
      ))
    )
  },
  { 
    field: 'standard', 
    headerName: 'Standard', 
    flex: 1.5, 
    sortable: true, 
    filterable: true,
    renderCell: (params) => params.value || 'N/A' // Show 'N/A' if no standard is assigned
  }
];

const DataDictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDictionaryRows, setSelectedDictionaryRows] = useState(new Set());

  // ✅ Prepare Data for the DataGrid (Added "Standard" field)
  const dictionaryRows = dataDictionary.map((entry, index) => ({
    id: `dict-${index}`,
    ...entry,
    standard: entry.standard || 'N/A' // Provide fallback value
  })).filter(({ term, definition, domain, standard }) => 
    term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    domain.some(d => d.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (standard && standard.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // ✅ Handle Selection Persistence
  const handleSelectionChange = (newSelection) => {
    setSelectedDictionaryRows((prevSelected) => {
      const updatedSelection = new Set(prevSelected);

      // ✅ Add newly selected items
      newSelection.forEach((id) => {
        updatedSelection.add(id);
      });

      // ✅ Remove only explicitly deselected items
      const currentFilteredRows = dictionaryRows.map(row => row.id);
      prevSelected.forEach((id) => {
        if (!newSelection.includes(id) && currentFilteredRows.includes(id)) {
          updatedSelection.delete(id);
        }
      });

      return updatedSelection;
    });
  };

  // ✅ Export Selected Rows to Excel
  const handleDownloadExcel = () => {
    const selectedDictionaryData = dictionaryRows
      .filter(row => selectedDictionaryRows.has(row.id))
      .map(({ term, definition, appearsInModel, domain, standard }) => ({
        Term: term,
        Definition: definition,
        "Appears in Model": appearsInModel ? '✅' : '❌',
        Domain: domain.join(', '),
        Standard: standard
      }));

    const worksheet = XLSX.utils.json_to_sheet(selectedDictionaryData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataDictionary");

    XLSX.writeFile(workbook, "Data_Dictionary.xlsx");
  };

  return (
    <Box sx={{ maxWidth: '1000px', margin: 'auto', padding: '40px' }}>
      <Typography variant="h3" fontWeight="bold" sx={{ textAlign: 'center', marginBottom: '20px' }}>
        Data Dictionary 📖
      </Typography>

      {/* 🔍 Centered Search Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          fullWidth
          label="Search Terms, Definitions, Domains, or Standards..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            maxWidth: '600px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
            },
          }}
        />
      </Box>

      {/* 📜 Data Dictionary Table with Export Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <Typography variant="h5" fontWeight="bold">Data Terms & Definitions</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadExcel}
          disabled={selectedDictionaryRows.size === 0}
        >
          Export
        </Button>
      </Box>

      <Paper sx={{ height: 500, width: '100%', marginBottom: '30px' }}>
        <DataGrid
          rows={dictionaryRows}
          columns={dictionaryColumns}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
          pagination
          paginationMode="client"
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 }
            }
          }}
          rowSelectionModel={[...selectedDictionaryRows]} // ✅ Keep selections
          onRowSelectionModelChange={handleSelectionChange}
        />
      </Paper>

      {/* 🏷 Suffix Dictionary Table (Normal Table) */}
      <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: '10px' }}>
        Suffix Dictionary
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Suffix</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Meaning</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suffixDictionary.map(({ suffix, meaning }) => (
              <TableRow key={suffix}>
                <TableCell sx={{ fontWeight: 'bold' }}>{suffix}</TableCell>
                <TableCell>{meaning}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataDictionary;
