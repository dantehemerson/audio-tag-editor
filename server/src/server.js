const restify = require('restify')
const NodeID3 = require('node-id3')
const { getTags } = require('./lib/audio')
const restifyPromise = require('restify-await-promise')

const server = restify.createServer()

//Allows you to manipulate the errors before restify does its work
const alwaysBlameTheUserErrorTransformer = {
  transform: function(exceptionThrownByRoute) {
    //Always blame the user
    exceptionThrownByRoute.statusCode = 400
    return exceptionThrownByRoute
  },
}

const options = {
  logger: console.log, //Optional: Will automatically log exceptions
  errorTransformer: alwaysBlameTheUserErrorTransformer, //Optional: Lets you add status codes
}

restifyPromise.install(server, options)

function respond(req, res, next) {
  res.send('hello ' + req.params.name)
  next()
}

server.use(restify.plugins.multipartBodyParser())

server.get('/hello/:name', respond)

server.post('/upload', async function(req, res, next) {
  console.log(`El archivo de audio es `)
  console.log(req.files)
  const uploadedFile = req.files.audio_file
  const filename = uploadedFile.path
  console.log(`El nombre del archivo es `, filename)
  const tags = await getTags(filename)
  res.json({
    tags,
  })
  next()
})

server.listen(8080, function() {
  console.log(`${server.name} listening at ${server.url}`)
})
