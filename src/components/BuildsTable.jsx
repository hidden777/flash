import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { computeTotals, formatSeconds, chipColorForBuild } from '../utils/logs';

export default function BuildsTable({ builds, onSelectBuild }) {
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        borderLeft: theme => `4px solid ${theme.palette.warning.main}`,
        background: '#fffdf6'
      }}
    >
      <Table size="small" sx={{
        '& thead th': { fontWeight: 700, backgroundColor: 'rgba(0,0,0,0.04)' },
        '& tbody tr:hover': { backgroundColor: 'action.hover', cursor: 'pointer' }
      }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '1rem', fontWeight: 800 }}>ID</TableCell>
            <TableCell sx={{ fontSize: '1rem', fontWeight: 800 }}>Type</TableCell>
            <TableCell sx={{ fontSize: '1rem', fontWeight: 800 }}>Commit Hash</TableCell>
            <TableCell sx={{ fontSize: '1rem', fontWeight: 800 }}>Message</TableCell>
            <TableCell sx={{ fontSize: '1rem', fontWeight: 800 }}>Author</TableCell>
            <TableCell sx={{ fontSize: '1rem', fontWeight: 800 }}>Date</TableCell>
            <TableCell sx={{ fontSize: '1rem', fontWeight: 800 }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {builds.map(b => {
            const totals = computeTotals(b);
            return (
              <TableRow 
                key={b.id} 
                onClick={() => onSelectBuild && onSelectBuild(b.id)}
                sx={{ cursor: 'pointer' }}
              >
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
                    sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
                  />
                </TableCell>
                <TableCell>{b.commit?.message}</TableCell>
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


