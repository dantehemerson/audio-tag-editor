'use strict'

const { writeFileSync } = require('fs')
const NodeID3 = require('node-id3')
const { generateUniqueFileId, getPathForFileId } = require('../lib/utils')

function getTags(fileBuffer) {
  return NodeID3.read(fileBuffer)
}

function updateTags(fileBuffer, tags) {
  try {
    return NodeID3.update(tags, fileBuffer)
  } catch (e) {
    console.log(`Cannt update tags.`, e)
  }
}

function saveFile(buffer) {
  const fileId = generateUniqueFileId()
  const filePath = getPathForFileId(fileId)
  try {
    writeFileSync(filePath, buffer)
    return fileId
  } catch (e) {
    console.log(`Error on save file`, e)
  } finally {
    console.log(`File saved correctly with name ${fileId}`)
  }
}

module.exports = {
  getTags,
  updateTags,
  saveFile
}
