'use strict'

const _ = require('lodash')
const path = require('path')
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

module.exports = {
  isValidFile
}
