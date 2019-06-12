const { readFile } = require('./src/lib/fs')
const NodeID3 = require('node-id3')

const FILENAME_TEST = './files/audio.mp3'

async function getTags(filename) {
  try {
    const file = await readFile(filename)
    return NodeID3.read(file)
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

async function main() {
  const tags = await getTags(FILENAME_TEST)
  console.log(`Old tags: `)
  console.log(tags)

  console.log(`Tags for update`)
  const newTags = {
    title: `Title ${Math.random() * 10}`,
  }
  console.log(newTags)

  const resUpdate = await updateTags(FILENAME_TEST, newTags)
  console.log(`Los nuevos tags son: `)
  console.log(NodeID3.read(resUpdate))
}

main()
