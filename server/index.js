const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Twilio configuration
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// Environment variables validation
const requiredEnvVars = ['TWILIO_ACCOUNT_SID', 'TWILIO_API_KEY', 'TWILIO_API_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  console.error('Please check your .env file and ensure all Twilio credentials are set.');
  process.exit(1);
}

// Generate access token endpoint
app.post('/token', (req, res) => {
  try {
    const { identity, room } = req.body;

    // Validate required parameters
    if (!identity) {
      return res.status(400).json({ 
        error: 'Identity is required',
        message: 'Please provide a user identity to generate access token'
      });
    }

    if (!room) {
      return res.status(400).json({ 
        error: 'Room name is required',
        message: 'Please provide a room name to generate access token'
      });
    }

    // Create access token
    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET,
      { identity: identity }
    );

    // Create video grant
    const videoGrant = new VideoGrant({
      room: room
    });

    // Add grant to token
    token.addGrant(videoGrant);

    // Generate JWT token
    const jwt = token.toJwt();

    res.json({
      token: jwt,
      identity: identity,
      room: room
    });

  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to generate access token'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Twilio Video server is running',
    timestamp: new Date().toISOString()
  });
});

// Room management endpoints
app.post('/rooms', async (req, res) => {
  try {
    const { roomName, type = 'group' } = req.body;

    if (!roomName) {
      return res.status(400).json({ 
        error: 'Room name is required',
        message: 'Please provide a room name'
      });
    }

    const client = twilio(process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET, {
      accountSid: process.env.TWILIO_ACCOUNT_SID
    });

    const room = await client.video.v1.rooms.create({
      uniqueName: roomName,
      type: type,
      maxParticipants: 50
    });

    res.json({
      sid: room.sid,
      uniqueName: room.uniqueName,
      status: room.status,
      type: room.type,
      maxParticipants: room.maxParticipants,
      dateCreated: room.dateCreated
    });

  } catch (error) {
    console.error('Error creating room:', error);
    
    if (error.code === 53113) {
      return res.status(409).json({
        error: 'Room already exists',
        message: 'A room with this name already exists'
      });
    }

    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to create room'
    });
  }
});

// Get room information
app.get('/rooms/:roomName', async (req, res) => {
  try {
    const { roomName } = req.params;

    const client = twilio(process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET, {
      accountSid: process.env.TWILIO_ACCOUNT_SID
    });

    const room = await client.video.v1.rooms(roomName).fetch();

    res.json({
      sid: room.sid,
      uniqueName: room.uniqueName,
      status: room.status,
      type: room.type,
      maxParticipants: room.maxParticipants,
      dateCreated: room.dateCreated,
      dateUpdated: room.dateUpdated
    });

  } catch (error) {
    console.error('Error fetching room:', error);
    
    if (error.code === 20404) {
      return res.status(404).json({
        error: 'Room not found',
        message: 'The specified room does not exist'
      });
    }

    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch room information'
    });
  }
});

// End room
app.post('/rooms/:roomName/end', async (req, res) => {
  try {
    const { roomName } = req.params;

    const client = twilio(process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET, {
      accountSid: process.env.TWILIO_ACCOUNT_SID
    });

    const room = await client.video.v1.rooms(roomName).update({
      status: 'completed'
    });

    res.json({
      sid: room.sid,
      uniqueName: room.uniqueName,
      status: room.status,
      message: 'Room ended successfully'
    });

  } catch (error) {
    console.error('Error ending room:', error);
    
    if (error.code === 20404) {
      return res.status(404).json({
        error: 'Room not found',
        message: 'The specified room does not exist'
      });
    }

    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to end room'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'An unexpected error occurred'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    message: 'The requested endpoint does not exist'
  });
});

app.listen(port, () => {
  console.log(`Twilio Video server running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
  console.log('Make sure to set up your .env file with Twilio credentials');
});