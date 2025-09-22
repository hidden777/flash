import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function LogsViewer({ text }) {
  if (!text) return null;
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>Terminal Logs</Typography>
      <Paper variant="outlined" sx={{ p: 1, maxHeight: 240, overflowY: 'auto', background: '#0b1020', color: '#e0e0e0', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', fontSize: 12 }}>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{text}</pre>
      </Paper>
    </Box>
  );
}


