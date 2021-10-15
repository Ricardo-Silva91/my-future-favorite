export const sortAndFilterArtistsByPopularity = (artistDataArray) => {
    const sortedArray = artistDataArray.sort((a, b) => a.popularity > b.popularity ? 1 : -1);
    const filteredArray = sortedArray.filter((artist) => artist.popularity <= sortedArray[0].popularity);

    return filteredArray;
};

export const getGenresFromArtistArray = (artistArray) => ['', ...artistArray.reduce((acc, artist) => [...acc, ...artist.genres.filter((genre) => !acc.includes(genre))], [])]; 

export const getRandomArtistFromArray = (artistDataArray = [], genre = '') =>  {
    const filteredArtistArray = genre === '' ? artistDataArray : artistDataArray.filter((artist) => artist.genres.includes(genre));
    return filteredArtistArray[Math.floor(Math.random() * filteredArtistArray.length)];
}
