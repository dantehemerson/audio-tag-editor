'use strict'

const tagID3Names = {
  TIT2: 'title',
  TPE1: 'artist',
  TALB: 'album',
  TYER: 'year',
  TCON: 'genre',
  TRCK: 'trackNumber'
}

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

const supportedExtensions = ['.mp3']

const supportedFileTypes = ['audio/mp3']

module.exports = {
  tagID3Names,
  corsOptions,
  supportedExtensions,
  supportedFileTypes
}
