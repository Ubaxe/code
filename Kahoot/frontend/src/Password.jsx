import React from 'react';
import TextField from '@material-ui/core/TextField';

function Password() {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="password"
      label="Password"
      name="password"
      type="password"
      autoComplete="password"
      autoFocus
    />
  );
}
export default Password;
