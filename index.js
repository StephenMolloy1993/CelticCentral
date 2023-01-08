require("dotenv").config();

const express = require('express');
const app = express();
const port = 3000;

const JSONdb = require('simple-json-db');
const db = new JSONdb('./tokens.json');
let data = db.get('tokens');

// Twitter API init
const TwitterApi = require('twitter-api-v2').default;
const twitterClient = new TwitterApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

const api = require("./football-api");
(async () => {
    let data = await api.getMatchStats();
    console.log(data);
})();

const callbackURL = 'http://127.0.0.1:3000/callback';

let authenticatedClient;

app.get('/', (req, res) => {
    console.log(data);
    res.send(data);
});

app.get('/keep-alive', (req, res) => {
    console.log("Stayin' Alive!");
    res.sendStatus(200);
});

app.get('/auth', (req, res) => {
    const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
        callbackURL,
        { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
    );

    data.codeVerifier = codeVerifier;
    data.state = state;

    res.redirect(url);
})

app.get('/callback', async (req, res) => {
    // Extract state and code from query string
    const { state, code } = req.query;
    // Get the saved codeVerifier from session
    const codeVerifier = data.codeVerifier;
    const storedState = data.state;

    if (state !== storedState) {
        return response.status(400).send('Stored tokens do not match!');
    }

    const {
        client: loggedClient,
        accessToken,
        refreshToken,
        expiresIn
    } = await twitterClient.loginWithOAuth2({
        code,
        codeVerifier,
        redirectUri: callbackURL,
    });

    data.accessToken = accessToken;
    data.refreshToken = refreshToken;
    data.expiresIn = expiresIn;
    authenticatedClient = loggedClient;

    res.sendStatus(200);

});

app.get('/tweet', async (req, res) => {
    const { tweet } = await authenticatedClient.v2.tweet(
        "Another auto tweet from the backend!"
    );

    res.send(tweet);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});