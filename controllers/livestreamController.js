const LiveStream = require('../models/LiveStream');

const createStream = async (req, res) => {
  try {
    const stream = new LiveStream({
      ...req.body,
      influencer: req.user._id
    });
    await stream.save();
    res.status(201).json(stream);
  } catch (error) {
    res.status(500).json({ message: 'Error creating stream', error: error.message });
  }
};

const getStreams = async (req, res) => {
  try {
    const { status, influencer } = req.query;
    const query = {};

    if (status) query.status = status;
    if (influencer) query.influencer = influencer;

    const streams = await LiveStream.find(query)
      .populate('influencer', 'username profile')
      .populate('products')
      .sort({ startTime: -1 });

    res.json(streams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching streams', error: error.message });
  }
};

const getStreamById = async (req, res) => {
  try {
    const stream = await LiveStream.findById(req.params.id)
      .populate('influencer', 'username profile')
      .populate('products')
      .populate('viewers', 'username')
      .populate('chatMessages.user', 'username');

    if (!stream) {
      return res.status(404).json({ message: 'Stream not found' });
    }

    res.json(stream);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stream', error: error.message });
  }
};

const updateStreamStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const stream = await LiveStream.findOne({
      _id: req.params.id,
      influencer: req.user._id
    });

    if (!stream) {
      return res.status(404).json({ message: 'Stream not found' });
    }

    stream.status = status;
    if (status === 'ended') {
      stream.endTime = new Date();
    }

    await stream.save();
    res.json(stream);
  } catch (error) {
    res.status(500).json({ message: 'Error updating stream status', error: error.message });
  }
};

const addViewer = async (req, res) => {
  try {
    const stream = await LiveStream.findById(req.params.id);
    if (!stream) {
      return res.status(404).json({ message: 'Stream not found' });
    }

    if (!stream.viewers.includes(req.user._id)) {
      stream.viewers.push(req.user._id);
      await stream.save();
    }

    res.json(stream);
  } catch (error) {
    res.status(500).json({ message: 'Error adding viewer', error: error.message });
  }
};

const addChatMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const stream = await LiveStream.findById(req.params.id);
    
    if (!stream) {
      return res.status(404).json({ message: 'Stream not found' });
    }

    stream.chatMessages.push({
      user: req.user._id,
      message
    });

    await stream.save();
    res.json(stream);
  } catch (error) {
    res.status(500).json({ message: 'Error adding chat message', error: error.message });
  }
};

module.exports = {
  createStream,
  getStreams,
  getStreamById,
  updateStreamStatus,
  addViewer,
  addChatMessage
}; 