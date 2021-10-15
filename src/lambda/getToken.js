import fetch from 'node-fetch';

exports.handler = async () => {
    const client_id = process.env.SPOTIFY_CLIENT_ID || 'p';
    const secret_key = process.env.SPOTIFY_SECRET_KEY || 'p';

    const encodedKey = Buffer.from(`${client_id}:${secret_key}`).toString('base64');
    const res = await fetch("https://accounts.spotify.com/api/token", {
        body: "grant_type=client_credentials",
        headers: {
          Authorization: `Basic ${encodedKey}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      });

    const getTokenJson = await res.json();
    const body = JSON.stringify({ token: getTokenJson.access_token });

    return {
        statusCode: 200,
        body
    };
};