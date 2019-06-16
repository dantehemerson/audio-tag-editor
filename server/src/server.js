const express = require('express')
const cors = require('cors')
const { readFileSync, writeFileSync } = require('fs')

const IncomingForm = require('formidable').IncomingForm
const { getTags, saveFile } = require('./lib/audio')
const { parseDataFromAudio } = require('./lib/parser')

const PORT = process.env.PORT || 8080

const server = express()

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

server.use(cors(corsOptions))

server.post('/upload', function uploadAndGetTags(req, res) {
  const form = new IncomingForm()
  let tags = {}
  form.on('file', (field, file) => {
    const fileBuffer = readFileSync(file.path)
    const fileId = saveFile(fileBuffer)
    const t = getTags(fileBuffer)
    const image = t.image
    const imagebase64 = image.imageBuffer.toString('base64')
    const parsedData = parseDataFromAudio(t)
    tags = {
      id: fileId, // fileId to update
      ...parsedData,
      image: imagebase64,
    }
  })
  form.on('end', () => {
    res.json(tags)
  })
  form.parse(req)
})

server.post('/update', function updateTags(req, res) {
  res.json({ actualizado: 'Se actualizaron los valores' })
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
