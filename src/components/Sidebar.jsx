import React, { useMemo } from 'react';
import { Box, Chip, Divider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Controls from './Controls';
import BuildCard from './cards/BuildCard';

export default function Sidebar({ builds, selectedId, onSelect, filter, onFilterChange, onBuildStart, onBuildComplete }) {
  const filtered = useMemo(() => {
    let result;
    if (filter === 'ALL') result = builds;
    else if (filter === 'AI') result = builds.filter(b => (b.type || '').toUpperCase().includes('AI'));
    else if (filter === 'NORMAL') result = builds.filter(b => !(b.type || '').toUpperCase().includes('AI'));
    else result = builds;
    
    // Reverse the order so newest builds appear at the top
    return result.slice().reverse();
  }, [builds, filter]);

  return (
    <Box sx={{ width: 380, borderRight: '1px solid #eee', height: '100%', overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controls onBuildStart={onBuildStart} onBuildComplete={onBuildComplete} />
      <Typography variant="subtitle1" sx={{ mt: 0 }}>Builds</Typography>
      <ToggleButtonGroup
        color="primary"
        exclusive
        size="small"
        value={filter}
        onChange={(e, v) => onFilterChange(v || 'ALL')}
        sx={{
          mb: 1.5,
          display: 'flex',
          gap: 1,
          '& .MuiToggleButton-root': {
            flex: 1,
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 1,
            borderColor: 'divider'
          },
          '& .MuiToggleButton-root.Mui-selected': {
            backgroundColor: 'warning.light',
            color: 'warning.contrastText',
            borderColor: 'warning.main'
          },
          '& .MuiToggleButton-root:hover': {
            backgroundColor: 'action.hover'
          }
        }}
      >
        <ToggleButton value="ALL">All</ToggleButton>
        <ToggleButton value="AI">AI</ToggleButton>
        <ToggleButton value="NORMAL">Normal</ToggleButton>
      </ToggleButtonGroup>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {filtered.map(b => (
          <BuildCard key={b.id} build={b} selected={selectedId === b.id} onClick={() => onSelect(b.id)} />
        ))}
        {!filtered.length && (
          <Chip label="No builds" />
        )}
      </Box>
    </Box>
  );
}


