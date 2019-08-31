const express = require('express')
const cors = require('cors')
const path = require('path')
const logger = require('./lib/logger')
const { readFileSync, existsSync } = require('fs')
const IncomingForm = require('formidable').IncomingForm
const { getTags, saveFile, updateTags } = require('./lib/audio')
const { parseDataFromAudio } = require('./lib/parser')
const { corsOptions } = require('./lib/constants')

const PORT = process.env.PORT || 8080

const server = express()

server.use(cors(corsOptions))
server.use(express.json())

server.post('/upload', function uploadAndGetTags(req, res) {
  const form = new IncomingForm()
  let tags = {}
  form.on('file', (field, file) => {
    if (path.extname(file.name) !== '.mp3') {
      logger.error(`The file hasn't mp3 extension.`)
      return null
    }
    const fileBuffer = readFileSync(file.path)
    const fileId = saveFile(fileBuffer)
    let baseTags = undefined

    baseTags = getTags(fileBuffer)

    if (!baseTags) return null

    console.log(typeof baseTags)

    console.log('Tags: ', baseTags)
    const image = baseTags.image
    let imagebase64 = undefined
    if (image) {
      imagebase64 = image.imageBuffer.toString('base64')
    }

    const parsedData = parseDataFromAudio(baseTags)
    tags = {
      id: fileId, // fileId to update
      ...parsedData,
      image: imagebase64
    }
    console.log(`Los tags son: `)
    console.log(tags)
  })
  form.on('end', () => {
    res.json(tags)
  })
  form.parse(req)
})

server.post('/update/:id', function updateFileTags(req, res) {
  const body = req.body

  const filename = req.params.id
  if (!filename) {
    return res.json({
      error: `Id not found`
    })
  }

  const tags = body.tags
  if (!tags) {
    console.log(`No hay tags`)
    return res.json({
      error: `No hay tags para actualizar.`
    })
  }

  try {
    const file = readFileSync(`./bucket/${filename}.mp3`)
    console.log(file)
    const fileBuffer = updateTags(file, tags)
    const fileId = saveFile(fileBuffer) // el id que se usara para descargar
    res.json({
      id: fileId
    })
  } catch (e) {
    res.json({
      error: `File not exists.`
    })
  }
})

server.get('/download/:id', function downloadFile(req, res) {
  const fileId = req.params.id
  const filepath = `./bucket/${fileId}.mp3`
  console.log(`The filepath to download is ${filepath}`)
  if (existsSync(filepath)) {
    res.download(`./bucket/${fileId}.mp3`)
  } else {
    res.status(404).json({
      message: `File not found.`
    })
  }
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
