export const sortAndFilterArtistsByPopularity = (artistDataArray) => {
    const sortedArray = artistDataArray.sort((a, b) => a.popularity > b.popularity ? 1 : -1);
    const filteredArray = sortedArray.filter((artist) => artist.popularity <= sortedArray[0].popularity);

    return filteredArray;
}

export const getRandomArtistFromArray = (artistDataArray = []) =>  artistDataArray[Math.floor(Math.random() * artistDataArray.length)];
