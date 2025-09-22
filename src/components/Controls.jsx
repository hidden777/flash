import React, { useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faPlay } from '@fortawesome/free-solid-svg-icons';

export default function Controls({ onBuildStart, onBuildComplete }) {
  const [isBuilding, setIsBuilding] = useState(false);

  const trigger = async (type) => {
    setIsBuilding(true);
    onBuildStart(type);
     
    try {
      // Make actual API call to trigger build
      await fetch(`http://localhost:3001/api/run-${type === 'AI Build' ? 'ai' : 'normal'}`, { 
        method: 'POST' 
      });
      
      // Build completed successfully
      setIsBuilding(false);
      onBuildComplete(type);
    } catch (error) {
      // Handle error case
      console.error('Build failed:', error);
      setIsBuilding(false);
      onBuildComplete(type);
    }
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
          disabled={isBuilding}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 1.5,
            boxShadow: 2,
            '&:hover': { boxShadow: 3 },
            '&:disabled': { opacity: 0.6 }
          }}
          startIcon={<FontAwesomeIcon icon={faPlay} />}
        >
          {isBuilding ? 'Building...' : 'Normal Build'}
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="success"
          onClick={() => trigger('AI Build')}
          disabled={isBuilding}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 1.5,
            boxShadow: 2,
            '&:hover': { boxShadow: 3 },
            '&:disabled': { opacity: 0.6 }
          }}
          startIcon={<FontAwesomeIcon icon={faRobot} />}
        >
          {isBuilding ? 'Building...' : 'AI Build'}
        </Button>
      </Box>
    </Paper>
  );
}


