import React from 'react';
import TextField from '@mui/material/TextField';
import Search from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const SearchField: React.FC<{ handleSearch: (value: string) => void }> = ({ handleSearch }) => {
  return (
    <TextField
      sx={{ background: 'white' }}
      placeholder="Search Menu Items"
      fullWidth
      onChange={(e) => handleSearch(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }
      }} />
  );
}

export default SearchField;