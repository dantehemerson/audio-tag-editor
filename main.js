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

async function main() {
  const tags = await getTags(FILENAME_TEST)
  console.log(tags)
}

main()
