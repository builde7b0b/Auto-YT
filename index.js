
const { google } = require('googleapis');
const { auth } = require('google-auth-library');


async function authenticate() {

    const client = await auth.getClient({
        keyFile: 'path/to/client_secret.json',
        scopes: 'https://www.googleapis.com/auth/youtube.upload',
    });

    google.options({ auth: client })
}