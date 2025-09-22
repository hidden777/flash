import React from 'react';
import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { computeTotals, formatSeconds, chipColorForBuild, formatBuildStartTime } from '../utils/logs';

export default function BuildSummary({ build }) {
  if (!build) return null;
  const totals = computeTotals(build);
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        background: theme => (theme.palette.mode === 'light' ? '#fffdf6' : 'rgba(255,193,7,0.06)'),
        border: '1px solid #e0e0e0',
        borderLeft: '6px solid #ffcd41',
        borderRadius: 1,
        mb: 2
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <FontAwesomeIcon icon={faChartLine} />
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#000' }}>
            Build Summary
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip size="small" label={`#${build.id}`} />
          <Chip size="small" color={chipColorForBuild(build)} label={build.type} sx={{ fontWeight: 700 }} />
          <Chip size="small" label={formatBuildStartTime(build)} sx={{ fontWeight: 700, color: '#6a1b9a', backgroundColor: 'rgba(106, 27, 154, 0.1)' }} />
        </Box>
      </Stack>
    </Paper>
  );
}


