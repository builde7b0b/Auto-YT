const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = "830154272096-jaqvtthci8tqnrpirggg223h49af5rnm.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

const REDIRECT_URL = "http://localhost";

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

const scopes = [
  'https://www.googleapis.com/auth/youtube.upload'
];

const authorizeUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes.join(' '),
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(`Go to the following URL: ${authorizeUrl}`);

rl.question('Enter the code here:', (code) => {
  oauth2Client.getToken(code, (err, tokens) => {
    if (err) return console.error('Error getting oAuth tokens:', err);
    oauth2Client.credentials = tokens;

    google.options({ auth: oauth2Client });

    uploadVideo();
    rl.close();
  });
});

async function uploadVideo() {
  const youtube = google.youtube('v3');

  const videoParams = {
    part: 'snippet',
    requestBody: {
      snippet: {
        title: 'title',
        description: 'description',
        tags: ['tag1', 'tag2'],
      },
    },
    media: {
      body: fs.createReadStream('./Vid.mp4'),
    },
  };

  const response = await youtube.videos.insert(videoParams);
  console.log('Video uploaded:', response.data);
}
