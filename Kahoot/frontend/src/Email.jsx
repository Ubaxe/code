import React from 'react';
import TextField from '@material-ui/core/TextField';

function Email() {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
    />
  );
}
export default Email;
