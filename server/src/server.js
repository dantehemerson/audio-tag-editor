const express = require('express')
const cors = require('cors')
const IncomingForm = require('formidable').IncomingForm

const { getTags } = require('./lib/audio')

const PORT = process.env.PORT || 8080

const server = express()

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

server.use(cors(corsOptions))

server.post('/upload', function(req, res) {
  res.send(`Hola Mundo`)
})
// server.use(
// server.post('/get-tags', async function(req, res, next) {
//   const uploadedFile = req.files.audio_file
//   const filename = uploadedFile.path
//   const tags = await getTags(filename)
//   res.json({
//     tags,
//   })
//   next()
// })

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
