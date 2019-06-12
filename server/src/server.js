const restify = require('restify')

function respond(req, res, next) {
  res.send('hello ' + req.params.name)
  next()
}

const server = restify.createServer()

server.get('/hello/:name', respond)

server.listen(8080, function() {
  console.log(`${server.name} listening at ${server.url}`)
})
