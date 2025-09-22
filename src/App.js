import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Box, Grid, Paper } from '@mui/material';
import HeaderBar from './components/HeaderBar';
import Sidebar from './components/Sidebar';
import CommitDetails from './components/CommitDetails';
import DonutChart from './components/charts/DonutChart';
import BarChartImpacted from './components/charts/BarChartImpacted';
import ImpactedTests from './components/ImpactedTests';
import LogsViewer from './components/LogsViewer';
import SummaryView from './components/SummaryView';
import BuildsTable from './components/BuildsTable';
import { getLogs, buildDonutData, buildBarData } from './utils/logs';

function App() {
  const [builds, setBuilds] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    try {
      setBuilds(getLogs());
    } catch (e) {
      setBuilds([]);
    }
  }, []);

  const selectedBuild = useMemo(() => builds.find(b => b.id === selectedId) || null, [builds, selectedId]);

  const filteredBuilds = useMemo(() => {
    if (filter === 'AI') return builds.filter(b => String(b.type || '').toUpperCase().includes('AI'));
    if (filter === 'NORMAL') return builds.filter(b => !String(b.type || '').toUpperCase().includes('AI'));
    return builds;
  }, [builds, filter]);

  const donutData = useMemo(() => selectedBuild ? buildDonutData(selectedBuild) : [], [selectedBuild]);
  const barData = useMemo(() => selectedBuild ? buildBarData(selectedBuild) : [], [selectedBuild]);

  const handleSelect = (id) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  return (
    <Box className="app-shell">
      <HeaderBar selectedBuild={selectedBuild} />
      <Box className="app-body">
        <Sidebar
          builds={builds}
          selectedId={selectedId}
          onSelect={handleSelect}
          filter={filter}
          onFilterChange={setFilter}
        />
        <Box className="app-main">
          {!selectedBuild && (
            <>
              <Box sx={{ mt: 0 }}>
                <SummaryView builds={filteredBuilds} />
              </Box>
              <Box sx={{ mt: 2 }}>
                <BuildsTable builds={filteredBuilds} />
              </Box>
            </>
          )}
          {selectedBuild && (
            <>
              <Box sx={{ mt: 2 }}>
                <CommitDetails build={selectedBuild} />
              </Box>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderLeft: theme => `4px solid ${theme.palette.warning.main}`,
                      background: theme => (theme.palette.mode === 'light' ? '#fffdf6' : 'rgba(255,193,7,0.06)')
                    }}
                  >
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Time Breakdown (Build / Test / LLM)</div>
                    <DonutChart data={donutData} />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderLeft: theme => `4px solid ${theme.palette.warning.main}`,
                      background: theme => (theme.palette.mode === 'light' ? '#fffdf6' : 'rgba(255,193,7,0.06)')
                    }}
                  >
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Tests: Total vs Impacted</div>
                    <BarChartImpacted data={barData} />
                  </Paper>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <ImpactedTests build={selectedBuild} />
              </Box>
              <Box sx={{ mt: 2 }}>
                <LogsViewer text={selectedBuild.terminal_logs} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
