import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { computeTotals, formatSeconds } from '../utils/logs';

export default function TimeCards({ build }) {
  if (!build) return null;
  const totals = computeTotals(build);
  
  const timeCards = [
    { label: 'Build Time', value: formatSeconds(totals.buildSeconds), color: '#1976d2' },
    { label: 'Test Time', value: formatSeconds(totals.testSeconds), color: '#2e7d32' },
    { label: 'LLM Time', value: formatSeconds(totals.llmSeconds), color: '#ed6c02' },
    { label: 'Total Time', value: formatSeconds(totals.totalSeconds), color: '#6a1b9a' }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {timeCards.map((card, index) => (
        <Paper
          key={card.label}
          variant="outlined"
          sx={{
            p: 1.5,
            textAlign: 'center',
            borderLeft: `4px solid ${card.color}`,
            background: '#fffdf6',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-2px)' }
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {card.label}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: card.color }}>
            {card.value}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
