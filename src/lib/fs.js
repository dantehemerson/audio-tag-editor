const fs = require('fs')
const { promisify } = require('util')

exports.readFile = promisify(fs.readFile)
