const fs = require('fs')
const NodeID3 = require('node-id3')

///async function readAudioFile(filename) {}

let file = './files/audio.mp3'

let tags = NodeID3.read(file)

console.log(tags)
