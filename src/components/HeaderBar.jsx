import React from 'react';
import { AppBar, Toolbar, Typography, Box, Chip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { formatSeconds, computeTotals } from '../utils/logs';

export default function HeaderBar({ selectedBuild }) {
  const totals = selectedBuild ? computeTotals(selectedBuild) : null;

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        backgroundColor: '#c4122f',
        color: '#ffffff',
        borderBottom: '0.5em solid #ffcc00'
      }}
    >
      <Toolbar sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>WELLS FARGO |</Typography>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: 0.3 }}>
          Flash CI/CD Dashboard
        </Typography>
        {selectedBuild && (
          <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center' }}>
            <Chip
              label={`Build #${selectedBuild.id}`}
              sx={{
                fontWeight: 700,
                backgroundColor: 'rgba(255,255,255,0.12)',
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.4)'
              }}
              variant="outlined"
            />
            <Chip
              label={selectedBuild.type}
              color={selectedBuild.type?.toUpperCase().includes('AI') ? 'success' : 'primary'}
              sx={{ fontWeight: 700 }}
            />
            {totals && (
              <Chip
                label={`Total Time: ${formatSeconds(totals.totalSeconds)}`}
                sx={{
                  fontWeight: 700,
                  backgroundColor: '#2e7d32',
                  color: '#fff'
                }}
              />
            )}
          </Box>
        )}
      </Toolbar>
      
    </AppBar>
  );
}


