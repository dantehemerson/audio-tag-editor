const { readFile, writeFile } = require('./fs')
const NodeID3 = require('node-id3')

const FILENAME_TEST = './files/audio.mp3'

const NodeID3ReadFile = file => {
  return new Promise((resolve, reject) => {
    NodeID3.read(file, (err, tags) => {
      resolve(tags)
    })
  })
}

async function getTags(filename) {
  try {
    const file = await readFile(filename)
    return await NodeID3ReadFile(file)
  } catch (e) {
    console.log(e)
  }
}

async function updateTags(filename, tags) {
  try {
    const file = await readFile(filename)
    return NodeID3.update(tags, file)
  } catch (e) {
    console.log(`Cannt update tags.`, e)
  }
}

async function saveFile(buffer, filename) {
  filename =
    filename || `./result/generated-ate-${new Date().toISOString()}.mp3`
  try {
    const res = await writeFile(filename, buffer)
    return res
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
