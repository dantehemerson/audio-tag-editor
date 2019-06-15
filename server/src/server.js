const express = require('express')
const cors = require('cors')
const IncomingForm = require('formidable').IncomingForm
const { getTags } = require('./lib/audio')
const { parseDataFromAudio } = require('./lib/parser')

const PORT = process.env.PORT || 8080

const server = express()

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

server.use(cors(corsOptions))

server.post('/upload', function(req, res) {
  const form = new IncomingForm()
  let tags = {}
  form.on('file', (field, file) => {
    const t = getTags(file.path)
    const image = t.image
    const imagebase64 = image.imageBuffer.toString('base64')
    const parsedData = parseDataFromAudio(t)
    tags = {
      ...parsedData,
      image: imagebase64,
    }
  })
  form.on('end', () => {
    res.json(tags)
  })
  form.parse(req)
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
