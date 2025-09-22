import React from 'react';
import { Alert, AlertTitle, Box, Typography, CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const BuildStatusNotification = ({ open, buildType }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 64, // Right below the navbar (assuming 64px height)
        left: 0,
        right: 0,
        zIndex: 1200, // Below navbar but above content
        width: '100%',
        animation: 'slideDown 0.3s ease-out',
        px: 0,
        py: 1
      }}
    >
      <Alert
        severity="info"
        sx={{
          borderRadius: 0, // No border radius for full width
          boxShadow: 2,
          border: 'none',
          borderBottom: '2px solid',
          borderBottomColor: buildType === 'AI' ? 'success.main' : 'primary.main',
          backgroundColor: buildType === 'AI' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(33, 150, 243, 0.1)',
          '& .MuiAlert-icon': {
            fontSize: '1.5rem'
          },
          '& .MuiAlert-message': {
            width: '100%'
          }
        }}
        icon={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FontAwesomeIcon 
              icon={faCog} 
              spin 
              size="lg" 
              color={buildType === 'AI' ? '#4caf50' : '#2196f3'} 
            />
          </Box>
        }
      >
        <AlertTitle sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          {buildType} Build Running
        </AlertTitle>
        <Typography variant="body2">
          Your {buildType} build is in progress. You can continue using the dashboard while it runs.
        </Typography>
      </Alert>
    </Box>
  );
};

export default BuildStatusNotification;
