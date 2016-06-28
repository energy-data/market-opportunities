var bbox = require('turf-bbox')
var fc = require('turf-featurecollection')
var fs = require('fs')
var geojsonStream = require('geojson-stream')
var through2 = require('through2')

var c = through2({ objectMode: true }, function (feature, enc, callback) {
  var result = {}
  result.bbox = bbox(fc([feature]))
  result.properties = {
    iso_a2: feature.properties.iso_a2,
    iso_a3: feature.properties.iso_a3,
    name: feature.properties.name,
    name_long: feature.properties.name_long
  }
  this.push(result)
  callback()
})

var r = fs.createReadStream(process.argv[2])
var parse = geojsonStream.parse()
var stringify = geojsonStream.stringify()
var w = fs.createWriteStream('app/assets/data/bounds.geojson')

r.pipe(parse).pipe(c).pipe(stringify).pipe(w)
