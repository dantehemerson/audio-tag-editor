const NodeID3 = require("node-id3");

let file = "./files/audio.mp3";

let tags = NodeID3.read(file);

console.log(tags);
