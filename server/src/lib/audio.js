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

// async function main() {
//   const tags = await getTags(FILENAME_TEST)
//   console.log(`Old tags: `)
//   console.log(tags)

//   console.log(`Tags for update`)
//   const newTags = {
//     title: `Title ${Math.random() * 10}`,
//   }
//   console.log(newTags)

//   const resUpdate = await updateTags(FILENAME_TEST, newTags)
//   console.log(`The new tags are: `)
//   console.log(NodeID3.read(resUpdate))

//   console.log(`Guardando archivo.`)
//   console.log(await saveFile(resUpdate))
// }

// main()

module.exports = {
  getTags,
  updateTags,
  saveFile,
}
