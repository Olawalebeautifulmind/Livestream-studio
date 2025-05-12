import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import Chat from '../components/Chat';
import ViewerCount from '../components/ViewerCount';
import { useSocket } from '../hooks/useSocket';
import api from '../services/api';

const LiveStreamViewer = () => {
  const { streamId } = useParams();
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { joinStream } = useSocket(streamId);

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const response = await api.get(`/api/streams/${streamId}`);
        setStream(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load stream');
        setLoading(false);
      }
    };

    fetchStream();
  }, [streamId]);

  useEffect(() => {
    if (stream) {
      joinStream();
    }
  }, [stream, joinStream]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !stream) {
    return (
      <Container>
        <Typography color="error" variant="h5">
          {error || 'Stream not found'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Main Video Area */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              position: 'relative',
              paddingTop: '56.25%', // 16:9 aspect ratio
              backgroundColor: 'black',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Video Player Component */}
              <Typography variant="h6" color="white">
                Video Player Placeholder
              </Typography>
            </Box>
            {/* Viewer Count Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 1,
              }}
            >
              <ViewerCount streamId={streamId} />
            </Box>
          </Paper>
          
          {/* Stream Info */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="h4" gutterBottom>
              {stream.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Hosted by {stream.influencer.username}
            </Typography>
          </Box>
        </Grid>

        {/* Chat Sidebar */}
        <Grid item xs={12} md={4}>
          <Chat streamId={streamId} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LiveStreamViewer; 