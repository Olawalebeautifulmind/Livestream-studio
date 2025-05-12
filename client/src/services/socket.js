import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    this.socket = io(SOCKET_URL, {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinStream(streamId) {
    if (this.socket) {
      this.socket.emit('join-stream', streamId);
    }
  }

  leaveStream(streamId) {
    if (this.socket) {
      this.socket.emit('leave-stream', streamId);
    }
  }

  sendChatMessage(streamId, message) {
    if (this.socket) {
      this.socket.emit('chat-message', { streamId, message });
    }
  }

  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('new-message', callback);
    }
  }

  onViewerCount(callback) {
    if (this.socket) {
      this.socket.on('viewer-count', callback);
    }
  }

  onProductHighlight(callback) {
    if (this.socket) {
      this.socket.on('product-highlight', callback);
    }
  }

  removeListeners() {
    if (this.socket) {
      this.socket.off('new-message');
      this.socket.off('viewer-count');
      this.socket.off('product-highlight');
    }
  }
}

export default new SocketService(); 