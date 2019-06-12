const { readFile } = require('./src/lib/fs')
const NodeID3 = require('node-id3')

const FILENAME_TEST = './files/audio.mp3'

async function readAudioFile(filename) {
  let file
  try {
    file = await readFile(filename)
  } catch (e) {
    console.log(`Can't read file`, e)
  }
  return file
}

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
