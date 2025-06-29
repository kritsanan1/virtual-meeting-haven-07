# Twilio Video Backend Server

This backend server provides access token generation and room management for Twilio Video API integration.

## Setup Instructions

### 1. Get Twilio Credentials

1. Sign up for a Twilio account at https://www.twilio.com/
2. Go to the Twilio Console Dashboard
3. Note your **Account SID** from the dashboard
4. Create an API Key:
   - Go to Settings > API Keys in the console
   - Click "Create API Key"
   - Choose "Standard" key type
   - Copy the **API Key SID** and **API Secret** (save the secret securely)

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Twilio credentials:
   ```
   TWILIO_ACCOUNT_SID=your_actual_account_sid
   TWILIO_API_KEY=your_actual_api_key_sid
   TWILIO_API_SECRET=your_actual_api_secret
   PORT=3001
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

## API Endpoints

### POST /token
Generate an access token for a user to join a video room.

**Request Body:**
```json
{
  "identity": "user123",
  "room": "my-video-room"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "identity": "user123",
  "room": "my-video-room"
}
```

### POST /rooms
Create a new video room.

**Request Body:**
```json
{
  "roomName": "my-video-room",
  "type": "group"
}
```

### GET /rooms/:roomName
Get information about a specific room.

### POST /rooms/:roomName/end
End a video room.

### GET /health
Health check endpoint.

## Security Notes

- Keep your API credentials secure and never commit them to version control
- The `.env` file is gitignored to prevent accidental commits
- In production, use proper environment variable management
- Consider implementing rate limiting and authentication for production use

## Troubleshooting

1. **"Missing required environment variables"**: Make sure your `.env` file has all required Twilio credentials
2. **"Room already exists"**: Room names must be unique. Use a different name or end the existing room first
3. **Token generation fails**: Verify your Twilio credentials are correct and your account is active