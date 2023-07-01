const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const readline = require('readline');

const CLIENT_ID = '830154272096-jaqvtthci8tqnrpirggg223h49af5rnm.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'http://localhost';

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

const scopes = ['https://www.googleapis.com/auth/youtube.force-ssl'];

async function main() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  console.log(`Please authorize this app by visiting the following URL:\n${authUrl}`);

  const code = await askQuestion('Enter the authorization code: ');

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

  const channels = await youtube.channels.list({
    part: 'snippet',
    mine: true,
  });

  console.log('Channel information:', channels.data);
}

function askQuestion(question) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

main().catch((error) => {
  console.error('Error:', error);
});
