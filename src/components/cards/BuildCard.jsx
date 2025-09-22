import React from 'react';
import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';
import { computeTotals, formatSeconds, chipColorForBuild } from '../../utils/logs';

export default function BuildCard({ build, selected, onClick }) {
  const totals = computeTotals(build);
  const isAi = (build.type || '').toUpperCase().includes('AI');
  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: selected ? 'warning.main' : 'divider',
        backgroundColor: selected ? (theme => (theme.palette.mode === 'light' ? '#fff8e1' : 'rgba(255,193,7,0.08)')) : 'background.paper',
        boxShadow: selected ? 3 : 0,
        transition: 'box-shadow 120ms, background-color 120ms, border-color 120ms'
      }}
    >
      <CardActionArea onClick={onClick} sx={{ '&:hover': { opacity: 0.95 } }}>
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">#{build.id}</Typography>
            <Chip size="small" color={chipColorForBuild(build)} label={build.type} />
          </Stack>
          <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
            Total: {formatSeconds(totals.totalSeconds)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


