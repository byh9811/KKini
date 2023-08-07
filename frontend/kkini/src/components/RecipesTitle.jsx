import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function RecipesTitle() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="배 고프지 않니?"
        />
      </div>
    </Box>
  );
}