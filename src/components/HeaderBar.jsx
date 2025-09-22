import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function HeaderBar() {
  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        backgroundColor: '#d71e28',
        color: '#ffffff',
        borderBottom: '5px solid #ffcd41'
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>WELLS FARGO | </Typography>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: 0.3 }}>
          Flash CI/CD Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}


