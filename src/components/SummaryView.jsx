import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
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
      <Box
        sx={{
          display: 'block',
          background: '#fffdf6',
          border: '1px solid #e0e0e0',
          borderLeft: '6px solid #ffcd41',
          borderRadius: 1,
          px: 1.5,
          py: 1,
          mb: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FontAwesomeIcon icon={faChartLine} />
          <Typography
            variant="h5"
            sx={{
              m: 0.5,
              p: 1,
              fontWeight: 600,
              letterSpacing: 0.2,
              color: '#000'
            }}
          >
            Overall Summary
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
        {cards.map((c) => (
          <Paper
            key={c.label}
            variant="outlined"
            sx={{
              p: 2.5,
              textAlign: 'center',
              borderLeft: theme => `4px solid ${theme.palette.warning.main}`,
              background: '#fffdf6',
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


