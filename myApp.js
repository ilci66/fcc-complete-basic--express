var express = require('express');
var app = express();
var bodyParser = require('body-parser')
//this can be used for chaining as well
//app.route(path).get(handler).post(handler)

//var absolutePath = __dirname + relativePath/file.ext
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip)
  next();
})

console.log("Hello World");

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({time: req.time});
});

app.get('/:word/echo', (req, res) => {
  let word = req.params.word;
  
  res.json({echo: word})
})
//app.get('/', (req, res) => {
  //res.send("Hello Express")
//})


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
});

app.use('/public', express.static(__dirname + '/public'))

let message = {"message": "Hello json"}

// app.get('/json', (req, res) => {
//   res.json(message)
// })

app.get('/json', (req, res) => {
  if(process.env.MESSAGE_STYLE === 'uppercase'){
    res.json({"message": "HELLO JSON"})
  } else {
    res.json({"message": "Hello json"})
  }
})

// make the query like this /name?first=pokemon&last=catcher
app.get('/name', (req, res) => {
  //console.log(req.query)
  let string = req.query.first + ' ' + req.query.last
  res.json({name: string})
})

//chech the html, and the name values there
app.post('/name', bodyParser.urlencoded({extended: false}), 
  (req, res) => {
    let string = req.body.first + ' ' + req.body.last;
    res.json({name: string}) 
})

















 module.exports = app;
