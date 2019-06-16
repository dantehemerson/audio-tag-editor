const tagID3Names = {
  TIT2: 'title',
  TPE1: 'artist',
  TALB: 'album',
  TYER: 'year',
  TCON: 'genre',
  TRCK: 'trackNumber',
}

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

module.exports = {
  tagID3Names,
  corsOptions,
}
