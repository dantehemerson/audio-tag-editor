'use strict'

const _ = require('lodash')
const path = require('path')
const os = require('os')

const { supportedExtensions, supportedFileTypes } = require('./constants')

function isValidFile(file) {
  const filename = path.extname(_.get(file, 'name', ''))
  const fileType = _.get(file, 'type', '')

  const isValidExtension = supportedExtensions.find(ext => ext === filename) !== undefined
  const isValidType = supportedFileTypes.find(type => type === fileType) !== undefined

  console.log(
    `isValidExtension? ${isValidExtension} | isValidType? ${isValidType}. isValid? ${isValidExtension && isValidType}`
  )
  return isValidExtension && isValidType
}

function getPathForFileId(fileId) {
  return `${os.tmpdir()}/${fileId}`
}

function generateUniqueFileId(extension = '.mp3') {
  return `edited-${new Date().toISOString()}${extension}`
}

function generateUniqueFilePath() {
  return getPathForFileId(generateUniqueFileId())
}

module.exports = {
  isValidFile,
  getPathForFileId,
  generateUniqueFileId,
  generateUniqueFilePath
}
