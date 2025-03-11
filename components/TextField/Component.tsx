import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface Props {
  size?: 'small' | 'medium' ;
  label?: string;
  id?: string;
  multiline?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}


export default function Component({
  id='outlined-basic',
  size = 'medium',
  label='label',
  multiline=false,
  value,
  onChange
}:Props) {
  
  return (
    <Box
    component="form"
    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
    noValidate
    autoComplete="off"
  >
      <TextField  
      id={id} 
      label={label} 
      variant="outlined"
       size={size} 
       multiline={multiline}
       value={value}
       onChange={onChange}
       />
     
      </Box>
  );
}
