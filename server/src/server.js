const express = require('express')
const cors = require('cors')
const { readFileSync, writeFileSync, existsSync } = require('fs')
const IncomingForm = require('formidable').IncomingForm
const { getTags, saveFile, updateTags } = require('./lib/audio')
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

server.post('/update', function updateFileTags(req, res) {
  const body = req.body
  if (!body['id']) {
    res.json({
      error: `Id not found`,
    })
  }
  const tags = body.tags
  if (!tags) {
    res.json({
      error: `No hay tags para actualizar.`,
    })
  }

  try {
    const file = readFileSync(filename)
    const fileBuffer = updateTags(file, tags)
    const fileId = saveFile(fileBuffer) // el id que se usara para descargar
    res.json({
      id: fileId,
    })
  } catch (e) {
    res.json({
      error: `File not exists.`,
    })
  }
})

server.get('/download/:fileId', function downloadFile(req, res) {
  const fileId = req.params.fileId
  const filepath = `./bucket/${fileId}.mp3`
  if (existsSync(filepath)) {
    res.download(`./bucket/${fileId}.mp3`)
  } else {
    res.status(404).json({
      message: `File not found.`,
    })
  }
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
