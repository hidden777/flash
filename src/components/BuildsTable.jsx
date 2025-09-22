import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { computeTotals, formatSeconds, chipColorForBuild } from '../utils/logs';

export default function BuildsTable({ builds }) {
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        borderLeft: theme => `4px solid ${theme.palette.warning.main}`,
        background: theme => (theme.palette.mode === 'light' ? '#fffdf6' : 'rgba(255,193,7,0.06)')
      }}
    >
      <Table size="small" sx={{
        '& thead th': { fontWeight: 700, backgroundColor: 'rgba(0,0,0,0.04)' },
        '& tbody tr:hover': { backgroundColor: 'action.hover' }
      }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Commit</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {builds.map(b => {
            const totals = computeTotals(b);
            return (
              <TableRow key={b.id}>
                <TableCell>#{b.id}</TableCell>
                <TableCell>
                  <Chip size="small" color={chipColorForBuild(b)} label={b.type} sx={{ fontWeight: 700 }} />
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    variant="outlined"
                    color="primary"
                    label={b.commit?.hash?.slice(0,7)}
                    sx={{ mr: 1, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
                  />
                  {b.commit?.message}
                </TableCell>
                <TableCell>{b.commit?.author}</TableCell>
                <TableCell>{b.commit?.date}</TableCell>
                <TableCell>{formatSeconds(totals.totalSeconds)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


