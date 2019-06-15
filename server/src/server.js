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
  const form = new IncomingForm()
  form.on('file', (field, file) => {
    console.log('ONNNNN FILEEEE', file.path)
  })
  form.on('end', () => {
    res.json()
  })
  form.parse(req)
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
