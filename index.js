var fs = require('fs')

fs.readFile('./brand-data.json', 'utf8', function (err, data) {
  if (err) throw err
  var brands = JSON.parse(data)
  var html = ''

  for (var brand of Object.keys(brands)) {
    var colors = brands[brand]

    html += '<div class="brand brand-' + brand + '">'
    html += '<div class="colors">'
    for (var color of colors) {
      html += '<div class="color-wrapper">'
      html += '<span style="background-color:' + color + '"></span>'
      html += '</div>'
    }
    html += '</div>'
    html += '</div>'
  }
  console.log(html)
})
