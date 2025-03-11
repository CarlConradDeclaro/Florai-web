'use client'


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
 
  bottom: 0,
  left: 1,
  whiteSpace: 'nowrap',
  width: 1,
});


interface InputFileUploadProps {
  handleFileChange :(files:FileList | null ) => void
}

export default function InputFileUpload({handleFileChange}:InputFileUploadProps) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => handleFileChange(event.target.files)}
        multiple
      />
    </Button>
  );
}
