const restify = require('restify')
const NodeID3 = require('node-id3')
const { getTags } = require('./lib/audio')

function respond(req, res, next) {
  res.send('hello ' + req.params.name)
  next()
}

const server = restify.createServer()

server.use(restify.plugins.bodyParser())

server.get('/hello/:name', respond)

server.post('/upload', function(req, res) {
  console.log(`El archivo de audio es `)
  console.log(req.files)
  const tags = NodeID3.read(req.files.audio_file)

  res.json({
    tags,
  })
})

server.listen(8080, function() {
  console.log(`${server.name} listening at ${server.url}`)
})
