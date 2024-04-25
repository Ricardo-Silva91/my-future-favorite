export type TApp = 'spotify' | 'bandcamp'

export interface ICardItem {
  image: string
  url: string
  title: string
  name: string
  albums: ICardItem[]
  blockUrl?: string
}

export interface IAlbum {
  name: string
  coverUrl: string
  tags: string[]
  url: string
  external_url: string
}

export interface IArtist {
  url: string
  external_url: string
  name: string
  app: TApp
  popularityScore: number
  numberOfFollowers: number
  tags: string[]
  profilePicUrl: string
  recentSales: number
  recentAlbums: IAlbum[]
  uri: string
}

export interface IBandcampAlbum {
  name: string
  coverUrl: string
  tags: string[]
}

export interface IBandcampArtist {
  app: 'bandcamp'
  id: string
  name: string
  profilePicUrl: string
  recentSales: number
  recentAlbums: IBandcampAlbum[]
}
