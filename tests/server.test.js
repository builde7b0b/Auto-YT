const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
jest.mock('googleapis');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
require('./server.js');// Import the server Configuration

describe('OAuth URL Generation', () => {
    it('should redirect to Google OAuth URL', async () => {
        const response = await request(app).get('/auth/google');
        console.log(response);
        expect(response.status).toBe(302); //Expect a redirection
        expect(response.headers.location).toContain('https://accounts.google.com/o/oauth2/auth');
       
    });
});

// describe('OAuth Callback Handling', () => {
//     it('should handle OAuth callback', async () => {
//         const response = await request(app).get('/oauth-callback?code=123');
//         expect(response.status).toBe(302); // Expect a redirection 
//         // Check for redirection to dashboard or auth-faiure 
//         expect(['http://localhost:3000/dashboard', 'http://localhost:3000/auth-failure']).toContain(response.headers.location);

//     });
// });

// describe('Upload Status Endpoint', () => {
//     it('should return no uplaods in porgress', async () => {
//         const response = await request(app).get('/upload-status');
//         expect(response.status).toBe(200);
//         expect(response.body.status).toBe('No uploads in progress');
//     });
// });

// describe('Video Upload Functionality', () => {
//     // This test requires mocking of file upload and Google API 
//     it('should upload a video', async () => {
//         // Mock the file upload and Google API response 
//         const response = await request(app)
//             .post('/upload')
//             .field('title', 'Test Video')
//             .field('description', 'A test video')
//             .field('tags', 'test,video')
//             .attach('video', 'path/to/test/video.mp4');
        
//         expec(response.status).toBe(200);
//         expect(response.body.message).toBe('Video uploaded successfully');
//         // Add more assertions as needed
//     });
// });