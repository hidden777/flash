import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { computeMeans, formatSeconds } from '../utils/logs';

export default function SummaryView({ builds }) {
  const means = computeMeans(builds);
  const cards = [
    { label: 'Mean Build', value: formatSeconds(means.build) },
    { label: 'Mean Test', value: formatSeconds(means.test) },
    { label: 'Mean LLM', value: formatSeconds(means.llm) },
    { label: 'Mean Total', value: formatSeconds(means.total) },
  ];

  const stripeColors = {
    'Mean Build': '#1976d2',
    'Mean Test': '#2e7d32',
    'Mean LLM': '#ed6c02',
    'Mean Total': '#6a1b9a'
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Overall Summary</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
        {cards.map((c) => (
          <Paper
            key={c.label}
            variant="outlined"
            sx={{
              p: 2.5,
              textAlign: 'center',
              borderLeft: theme => `4px solid ${theme.palette.warning.main}`,
              background: theme => (theme.palette.mode === 'light' ? '#fffdf6' : 'rgba(255,193,7,0.06)'),
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: stripeColors[c.label] }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1 }}>{c.label}</Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>{c.value}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}


