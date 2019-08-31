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

function generateUniqueId() {
  return `edited-${new Date().toISOString()}`
}

function generateUniqueFilePath(extension = '.mp3') {
  return getPathForFileId(generateUniqueId() + extension)
}

module.exports = {
  isValidFile,
  getPathForFileId,
  generateUniqueId,
  generateUniqueFilePath
}
