export const getToken = async () => {
  // const encodedKey = btoa(`${process.env.VUE_APP_SPOTIFY_CLIENT_ID}:${process.env.VUE_APP_SPOTIFY_SECRET_KEY}`);
  // const res = await fetch("https://accounts.spotify.com/api/token", {
  //     body: "grant_type=client_credentials",
  //     headers: {
  //       Authorization: `Basic ${encodedKey}`,
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     method: "POST"
  //   });

  // const getTokenJson = await res.json();

  // return getTokenJson.access_token;

  const res = await fetch("https://jovial-johnson-f3855e.netlify.app/api/getToken", {
      method: "GET"
    });

    console.log({ res });

  const getTokenJson = await res.json();

  return getTokenJson.access_token;
}

export const fetchArtistsData = async (token, artistArray) => {
    const artistString = artistArray.join(',');

    const res = await fetch(`https://api.spotify.com/v1/artists?ids=${artistString}`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    const fetchArtistsDataJson = await res.json();

    return fetchArtistsDataJson.artists;
};

export const fetchAlbumsFromArtist = async (token, artistId) => {
    const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=5`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

    const fetchAlbumsFromArtistJson = await res.json();

    return fetchAlbumsFromArtistJson.items;
};