import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

import { config } from 'dotenv-safe'

if (!process.env.CI) {
  config()
}

const keys = [
  'url',
  'external_url',
  'name',
  'app',
  'popularityScore',
  'numberOfFollowers',
  'tags',
  'profilePicUrl',
  'recentSales',
  'recentAlbums',
  'uri'
]

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

export const getDoc = async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || '', serviceAccountAuth)
  await doc.loadInfo()

  return doc
}

export const getRowCount = async (doc: GoogleSpreadsheet, sheetId = 0) => {
  const sheet = doc.sheetsById[sheetId]
  const { rowCount } = sheet

  return rowCount
}

export const getRows = async (
  doc: GoogleSpreadsheet,
  offset = 0,
  limit = 1000,
  options = { sheetId: 0 }
) => {
  const sheet = doc.sheetsByIndex[options.sheetId]
  const { rowCount } = sheet
  const offsetToUse = offset > rowCount ? rowCount : offset
  const sliceOffset = offsetToUse ? rowCount - offsetToUse : 0

  const rowsRaw = await sheet.getRows({ offset: sliceOffset, limit })
  const rows = rowsRaw.map((row) =>
    keys.reduce((acc, key) => ({ ...acc, [key]: row.get(key) }), {})
  )

  return { rows, rowsRaw, sheet }
}

export const getArtists = async () => {
  const doc = await getDoc()
  const rowCount = await getRowCount(doc)
  const { rows } = await getRows(doc, 0, rowCount)

  return rows.map((artist: any) => ({
    ...artist
  }))
}
