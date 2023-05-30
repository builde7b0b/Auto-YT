
const { google } = require('googleapis');
const { auth } = require('google-auth-library');
const fs = require('fs');


async function authenticate() {

    const client = await auth.getClient({
        keyFile: 'client_secret_830154272096-jaqvtthci8tqnrpirggg223h49af5rnm.apps.googleusercontent.com.json',
        scopes: 'https://www.googleapis.com/auth/youtube.upload',
    });

    google.options({ auth: client })
}

authenticate();


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

uploadVideo(); 