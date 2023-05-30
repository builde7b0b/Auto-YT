
const { google } = require('googleapis');
const { auth } = require('google-auth-library');


async function authenticate() {

    const client = await auth.getClient({
        keyFile: 'client_secret_830154272096-jaqvtthci8tqnrpirggg223h49af5rnm.apps.googleusercontent.com.json',
        scopes: 'https://www.googleapis.com/auth/youtube.upload',
    });

    google.options({ auth: client })
}

authenticate();


async function uploadVideo() {
    
}