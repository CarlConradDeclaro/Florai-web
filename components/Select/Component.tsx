 'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CATEGORY } from '@/constant/list';

interface Props {
  label?: string;
  items?: string[];
  value?: string;
  onChange?: (event: SelectChangeEvent) => void;
}

export default function BasicSelect({ 
  label = 'Select', 
  items = CATEGORY, 
  value, 
  onChange 
}: Props) {
  const [selectedValue, setSelectedValue] = React.useState(value || '');

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value ;
    setSelectedValue(newValue);
    if(onChange)
      onChange(event); 
    
  };


  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}  
          onChange={handleChange}
          size="small"
        >
          {items.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
