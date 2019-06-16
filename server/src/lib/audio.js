const { readFile, writeFile } = require('./fs')
const { readFileSync, writeFileSync } = require('fs')
const NodeID3 = require('node-id3')

function getTags(fileBuffer) {
  try {
    return NodeID3.read(fileBuffer)
  } catch (e) {
    console.log(e)
  }
}

function updateTags(filename, tags) {
  try {
    const file = readFileSync(filename)
    return NodeID3.update(tags, file)
  } catch (e) {
    console.log(`Cannt update tags.`, e)
  }
}

function saveFile(buffer) {
  const id = `dxnt-${new Date().toISOString()}`
  filename = `./bucket/${id}.mp3`
  try {
    writeFileSync(filename, buffer)
    return id
  } catch (e) {
    console.log(`Error on save file`, e)
  } finally {
    console.log(`File saved correctly with name ${filename}`)
  }
}

module.exports = {
  getTags,
  updateTags,
  saveFile,
}
