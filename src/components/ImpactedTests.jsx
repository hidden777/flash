import React from 'react';
import { Box, Chip, Typography, Paper, Stack, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faFileCode } from '@fortawesome/free-solid-svg-icons';
import { isAiBuild, parseImpactedTests } from '../utils/logs';

export default function ImpactedTests({ build }) {
  const ai = isAiBuild(build);
  if (!ai) return null;
  const items = parseImpactedTests(build);
  const totalTests = items.reduce((acc, it) => acc + it.tests.length, 0);

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        borderLeft: theme => `4px solid ${theme.palette.warning.main}`,
        background: '#fffdf6'
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
        <FontAwesomeIcon icon={faRobot} color="#ed6c02" />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Impacted Tests</Typography>
        <Chip size="small" color="warning" label="AI" />
        <Chip size="small" variant="outlined" label={`${totalTests} test${totalTests===1?'':'s'}`} />
      </Stack>
      <Divider sx={{ mb: 1.75 }} />
      <Stack spacing={2}>
        {items.map(it => (
          <Paper
            key={it.id}
            variant="outlined"
            sx={{ p: 1.75, borderRadius: 1.5, background: '#fffdf6' }}
          >
            <Stack direction="row" spacing={1.25} alignItems="center">
              <FontAwesomeIcon icon={faFileCode} style={{ color: '#1976d2' }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  flexGrow: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {it.file}
              </Typography>
              <Chip size="small" color="primary" label={it.tests.length} sx={{ ml: 1.5 }} />
            </Stack>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1.25, mb: 1.25 }}>
              {it.tests.map((t, i) => (
                <Chip key={i} size="small" color="primary" variant="outlined" label={t} />
              ))}
            </Stack>
            {it.explanation && (
              <Box
                component="pre"
                sx={{
                  mt: 2.5,
                  p: 1.25,
                  borderRadius: 1,
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  fontSize: 12,
                  background: theme =>
                    theme.palette.mode === 'light' ? 'rgba(25,118,210,0.06)' : 'rgba(25,118,210,0.12)',
                  color: theme => (theme.palette.mode === 'light' ? '#0d47a1' : '#90caf9'),
                  whiteSpace: 'pre-wrap',
                  m: 0
                }}
              >
                {it.explanation}
              </Box>
            )}
          </Paper>
        ))}
        {!items.length && (
          <Typography variant="body2">No impacted tests found.</Typography>
        )}
      </Stack>
    </Paper>
  );
}


