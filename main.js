const { readFile } = require('./src/lib/fs')
const NodeID3 = require('node-id3')

const FILENAME_TEST = './files/audio.mp3'

async function readAudioFile(filename) {
  const file = await readFile(filename)
  return file
}

// let tags = NodeID3.read(file)

async function main() {
  const { buffer } = await readAudioFile(FILENAME_TEST)
  console.log(buffer)
}

main()
