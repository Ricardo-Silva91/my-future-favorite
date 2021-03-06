export const getToken = async () => {
  const res = await fetch("api/getToken");
  
  const getTokenJson = await res.json();

  return getTokenJson.token;
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