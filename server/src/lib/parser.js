const _ = require('lodash')
const { tagID3Names } = require('./constants')

function parseID3Tags(rawData) {
  const res = {}
  _.each(rawData, function(value, key) {
    key = tagID3Names[key] || key
    res[key] = value
  })
  return res
}

function parseDataFromAudio(objectFile) {
  const raw = _.get(objectFile, 'raw')
  const rawData = _.pick(raw, ['TIT2', 'TPE1', 'TALB', 'TYER', 'TCON', 'TRCK'])
  const fileID3Data = parseID3Tags(rawData)
  const fileData = _.pick(objectFile, [
    'title',
    'artist',
    'album',
    'year',
    'genre',
    'trackNumber',
  ])

  return {
    ...fileID3Data,
    ...fileData,
  }
}

module.exports = {
  parseDataFromAudio,
}
