var fs = require('fs');
var formidable = require('formidable');

exports.upload = function(request, response) {
  console.log("Rozpoczynam obsługę żadania upload");
  var form = new formidable.IncomingForm();
  form.parse(request, function(err, fields, files) {
    if (err) { console.error(err); }

    var name = (fields.title || 'test') + '.png';
    fs.writeFile('./imageData.txt', name);
    fs.renameSync(files.upload.path, name);
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile('templates/upload.html', function(err, html) {
      if (err) {
        response.writeHead(404);
        response.write("404 :(");
      } else {
        response.write(html);
        response.write("<img src='/show'/>");
        response.end();
      }
    });
  });
};


exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        response.write(html);
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}

exports.show = function(request, response) {
    fs.readFile("test.png", "binary", function(error, file) {
        response.writeHead(200, {
            "Content-Type": "image/png"
        });
        response.write(file, "binary");
        response.end();
    });
}
