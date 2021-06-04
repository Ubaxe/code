import React from 'react';
import TextField from '@material-ui/core/TextField';

function Name() {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="name"
      label="Name"
      name="name"
      autoComplete="name"
      autoFocus
    />
  );
}
export default Name;
