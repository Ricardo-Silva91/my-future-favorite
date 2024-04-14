export const sortAndFilterArtists = (artistDataArray: any[], sortFactor = 'popularity') => {
  const sortedArray = artistDataArray.sort((a, b) => {
    const scoreA = sortFactor === 'popularity' ? a.popularity : a.followers.total
    const scoreB = sortFactor === 'popularity' ? b.popularity : b.followers.total

    return scoreA > scoreB ? 1 : -1
  })

  const firstArtistScore =
    sortFactor === 'popularity' ? sortedArray[0].popularity : sortedArray[0].followers.total

  const filteredArray = sortedArray.filter((artist) => {
    const artistScore = sortFactor === 'popularity' ? artist.popularity : artist.followers.total

    return artistScore <= firstArtistScore
  })

  return filteredArray
}

export const getGenresFromArtistArray = (artistArray: any[]) => [
  '',
  ...artistArray.reduce(
    (acc, artist) => [...acc, ...artist.genres.filter((genre: string) => !acc.includes(genre))],
    []
  )
]

export const getRandomArtistFromArray = (artistDataArray: any = [], genre = '') => {
  const filteredArtistArray =
    genre === ''
      ? artistDataArray
      : artistDataArray.filter((artist: any) => artist.genres.includes(genre))
  return filteredArtistArray[Math.floor(Math.random() * filteredArtistArray.length)]
}

export const getTodayStamp = () => {
  const today = new Date()
  const dateStamp = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

  return dateStamp
}
