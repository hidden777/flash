import React, { useState } from 'react';
import { Box, Button, Snackbar, Alert, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faPlay } from '@fortawesome/free-solid-svg-icons';

export default function Controls() {
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'info' });

  const trigger = async (type) => {
    await fetch(`http://localhost:3001/api/run-${type === 'AI Build' ? 'ai' : 'normal'}`), { method: 'POST' }
    setSnack({ open: true, message: `${type} triggered`, severity: 'success' });
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
        borderLeft: theme => `4px solid ${theme.palette.warning.main}`,
        background: theme => (theme.palette.mode === 'light' ? '#fffdf6' : 'rgba(255,193,7,0.06)')
      }}
    >
      <Box sx={{ display: 'flex', gap: 1.25 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => trigger('Normal Build')}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 1.5,
            boxShadow: 2,
            '&:hover': { boxShadow: 3 }
          }}
          startIcon={<FontAwesomeIcon icon={faPlay} />}
        >
          Normal Build
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="success"
          onClick={() => trigger('AI Build')}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 1.5,
            boxShadow: 2,
            '&:hover': { boxShadow: 3 }
          }}
          startIcon={<FontAwesomeIcon icon={faRobot} />}
        >
          AI Build
        </Button>
      </Box>
      <Snackbar open={snack.open} autoHideDuration={2500} onClose={() => setSnack(s => ({ ...s, open: false }))}>
        <Alert severity={snack.severity} sx={{ width: '100%' }}>{snack.message}</Alert>
      </Snackbar>
    </Paper>
  );
}


