import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Box, Grid, Paper } from '@mui/material';
import HeaderBar from './components/HeaderBar';
import Sidebar from './components/Sidebar';
import CommitDetails from './components/CommitDetails';
import BuildSummary from './components/BuildSummary';
import TimeCards from './components/TimeCards';
import DonutChart from './components/charts/DonutChart';
import BarChartImpacted from './components/charts/BarChartImpacted';
import ImpactedTests from './components/ImpactedTests';
import LogsViewer from './components/LogsViewer';
import SummaryView from './components/SummaryView';
import BuildsTable from './components/BuildsTable';
import BuildStatusNotification from './components/BuildStatusNotification';
import BuildSuccessAlert from './components/BuildSuccessAlert';
import { getLogs, buildDonutData, buildBarData } from './utils/logs';

function App() {
  const [builds, setBuilds] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [buildModal, setBuildModal] = useState({ open: false, type: null });
  const [successAlert, setSuccessAlert] = useState({ open: false, type: null });

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

  const handleBuildStart = (type) => {
    setBuildModal({ open: true, type });
  };

  const handleBuildComplete = (type) => {
    setBuildModal({ open: false, type: null });
    setSuccessAlert({ open: true, type });
  };

  const handleSuccessAlertClose = () => {
    setSuccessAlert({ open: false, type: null });
    // Refresh the page to get latest data
    window.location.reload();
  };


  return (
    <Box className="app-shell">
      <HeaderBar />
      <Box className="app-body"
        sx={{
            marginTop: buildModal.open ? '75px' : '0px', // Add space for notification
            transition: 'margin-top 0.3s ease-out'
          }}
      >
        <Sidebar
          builds={builds}
          selectedId={selectedId}
          onSelect={handleSelect}
          filter={filter}
          onFilterChange={setFilter}
          onBuildStart={handleBuildStart}
          onBuildComplete={handleBuildComplete}
        />
        <Box 
          className="app-main"
        >
          {!selectedBuild && (
            <>
              <Box sx={{ mt: 0 }}>
                <SummaryView builds={filteredBuilds} />
              </Box>
              <Box sx={{ mt: 2 }}>
                <BuildsTable builds={filteredBuilds} onSelectBuild={handleSelect} />
              </Box>
            </>
          )}
          {selectedBuild && (
            <>
              <Box sx={{ mt: 1 }}>
                <BuildSummary build={selectedBuild} />
              </Box>
              <Box sx={{ mt: 2 }}>
                <CommitDetails build={selectedBuild} />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: 300 }}>
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
                </Box>
                <Box sx={{ flex: 1, minWidth: 300 }}>
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
                </Box>
                <Box sx={{ flex: 1, minWidth: 300 }}>
                  <TimeCards build={selectedBuild} />
                </Box>
              </Box>
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
      
      {/* Build Status Notification */}
      <BuildStatusNotification 
        open={buildModal.open} 
        buildType={buildModal.type} 
      />
      
      {/* Build Success Alert */}
      <BuildSuccessAlert
        open={successAlert.open}
        buildType={successAlert.type}
        onClose={handleSuccessAlertClose}
      />
    </Box>
  );
}

export default App;
