import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { useSocket } from '../hooks/useSocket';

const ViewerCount = ({ streamId }) => {
  const [viewerCount, setViewerCount] = useState(0);
  const { onViewerCount } = useSocket(streamId);

  useEffect(() => {
    const cleanup = onViewerCount((count) => {
      setViewerCount(count);
    });
    return cleanup;
  }, [onViewerCount]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
      }}
    >
      <PeopleIcon />
      <Typography variant="h6">
        {viewerCount} {viewerCount === 1 ? 'Viewer' : 'Viewers'}
      </Typography>
    </Paper>
  );
};

export default ViewerCount; 