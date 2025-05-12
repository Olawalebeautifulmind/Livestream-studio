import { useEffect, useCallback } from 'react';
import socketService from '../services/socket';

export const useSocket = (streamId) => {
  useEffect(() => {
    socketService.connect();

    return () => {
      if (streamId) {
        socketService.leaveStream(streamId);
      }
      socketService.disconnect();
    };
  }, [streamId]);

  const joinStream = useCallback(() => {
    if (streamId) {
      socketService.joinStream(streamId);
    }
  }, [streamId]);

  const leaveStream = useCallback(() => {
    if (streamId) {
      socketService.leaveStream(streamId);
    }
  }, [streamId]);

  const sendMessage = useCallback((message) => {
    if (streamId) {
      socketService.sendChatMessage(streamId, message);
    }
  }, [streamId]);

  const onNewMessage = useCallback((callback) => {
    socketService.onNewMessage(callback);
    return () => socketService.socket?.off('new-message', callback);
  }, []);

  const onViewerCount = useCallback((callback) => {
    socketService.onViewerCount(callback);
    return () => socketService.socket?.off('viewer-count', callback);
  }, []);

  const onProductHighlight = useCallback((callback) => {
    socketService.onProductHighlight(callback);
    return () => socketService.socket?.off('product-highlight', callback);
  }, []);

  return {
    joinStream,
    leaveStream,
    sendMessage,
    onNewMessage,
    onViewerCount,
    onProductHighlight,
  };
}; 