'use strict'

const express = require('express')
const cors = require('cors')
const path = require('path')
const logger = require('./lib/logger')
const { readFileSync, existsSync } = require('fs')
const IncomingForm = require('formidable').IncomingForm
const { getTags, saveFile, updateTags } = require('./lib/audio')
const { parseDataFromAudio } = require('./lib/parser')
const { corsOptions } = require('./lib/constants')
const config = require('./config')
const { isValidFile, getPathForFileId } = require('./lib/utils')

const server = express()

server.use(cors(corsOptions))
server.use(express.json())

server.post('/upload', function uploadAndGetTags(req, res) {
  const form = new IncomingForm()
  form.keepExtensions = true

  let tags = {}
  let error = false
  form.on('file', (field, file) => {
    console.log(file)
    if (!isValidFile(file)) {
      logger.error(`The file hasn't an correct type or extension.`)
      return (error = true)
    }

    const fileBuffer = readFileSync(file.path)
    const baseTags = getTags(fileBuffer)
    if (!baseTags) return (error = true)

    console.log('Tags: ', baseTags)
    const image = baseTags.image
    let imagebase64 = undefined
    if (image) {
      imagebase64 = image.imageBuffer.toString('base64')
    }

    const parsedData = parseDataFromAudio(baseTags)
    tags = {
      id: path.basename(file.path), // fileId to update
      ...parsedData,
      image: imagebase64
    }
    console.log(`Los tags son: `)
    console.log(tags)
  })

  form.on('end', () => {
    console.log('Hubo error?: ', error)
    if (error) {
      res.status(409).json({
        error: 'Error uploading file, please verify that the file is correct.'
      })
    } else {
      res.json(tags)
    }
  })

  form.parse(req)
})

server.post('/update/:id', function updateFileTags(req, res) {
  const body = req.body
  const fileId = req.params.id
  const tags = body.tags

  if (!tags || typeof tags !== 'object') {
    return res.status(409).json({
      error: `No hay tags para actualizar.`
    })
  }

  try {
    const file = readFileSync(getPathForFileId(fileId))
    const fileBuffer = updateTags(file, tags)
    const fileDownloadId = saveFile(fileBuffer) // id to download
    res.json({
      id: fileDownloadId
    })
  } catch (e) {
    console.error('Error: ', e)
    res.status(404).json({
      error: `File not exists.`
    })
  }
})

server.get('/download/:id', function downloadFile(req, res) {
  const fileId = req.params.id
  const filePath = getPathForFileId(fileId)
  console.log(`The filepath to download is ${filePath}`)
  if (existsSync(filePath)) {
    res.download(filePath)
  } else {
    res.status(404).json({
      message: `File not found.`
    })
  }
})

server.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`)
})
