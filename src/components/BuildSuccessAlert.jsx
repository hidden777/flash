import React from 'react';
import { Alert, AlertTitle, Button, Stack, Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const BuildSuccessAlert = ({ open, onClose, buildType }) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop to block dashboard interaction */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1399,
          animation: 'fadeIn 0.3s ease-out'
        }}
      />
      
      {/* Alert positioned above backdrop */}
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1400,
          width: '90%',
          maxWidth: 500,
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        <Alert
          severity="success"
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            border: '2px solid',
            borderColor: 'success.main',
            '& .MuiAlert-icon': {
              display: 'none' // Hide the default MUI check icon
            },
            '& .MuiAlert-message': {
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }
          }}
        >
        <AlertTitle sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <FontAwesomeIcon icon={faCheckCircle} />
          {buildType} Completed Successfully!
        </AlertTitle>
        <Typography variant="body2" sx={{ mb: 2 }}>
          The logs have been added to the system. Click OK to continue navigating the dashboard.
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={onClose}
          sx={{
            fontWeight: 600,
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'success.dark'
            }
          }}
        >
          OK
        </Button>
        </Alert>
      </Box>
    </>
  );
};

export default BuildSuccessAlert;
