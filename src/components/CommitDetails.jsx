import React from 'react';
import { Box, Chip, Paper, Stack, Typography, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

function formatDateToIST(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    // The timestamp is already in IST, so no conversion needed
    
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }) + ' IST';
  } catch (e) {
    return dateString;
  }
}

export default function CommitDetails({ build }) {
  if (!build) return null;
  const commit = build.commit || {};
  const changes = build.changes || {};
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderLeft: theme => `4px solid ${theme.palette.warning.main}`,
        background: theme => (theme.palette.mode === 'light' ? '#fffdf6' : 'rgba(255,193,7,0.06)')
      }}
    >
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <FontAwesomeIcon icon={faCodeBranch} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Commit</Typography>
        </Box>
        <Chip
          size="small"
          color="primary"
          variant="outlined"
          label={commit.hash?.slice(0, 7) || '—'}
          sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
        />
      </Stack>
      <Divider sx={{ mb: 1.5 }} />
      <Stack spacing={0.75}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 'fit-content' }}>
            Commit Message:
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {commit.message}
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {commit.author} • {formatDateToIST(commit.date)}
        </Typography>
        <Box sx={{ mt: 0.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>Files changed</Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {(changes.files || []).map((f, i) => (
              <Chip key={i} size="small" color="warning" variant="outlined" label={f} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}


