var express = require("express");
var app = express();

// // Route that executed for GET request and request url path '/' or
// app.get("/", function (req, res) {
//   res.send("home.");
// });

// // Route that executed for GET request and request url path '/hello/'
// app.get("/hello/", function (req, res) {
//   res.send("Hello page.");
// });

// // Route that executed for GET request and request url path '/bye/'
// app.get("/bye/", function (req, res) {
//   res.send("Bye page.");
// });

// var router1 = require("./router1");
// app.use("/api", router1);

function logger(req, res, next) {
  console.log(new Date(), req.url);
  next();
}

// // calls logger:middleware for each requeste-response cycle
app.use(logger);

// // route that gets executed for the path '/'
app.get("/", function (req, res) {
  res.send("This is a basic example for express.js");
});

app.get("/api/users", function (req, res) {
  const user_id = req.query.id;
  const token = req.query.token;
  const geo = req.query.geo;

  res.send({
    user_id: user_id,
    token: token,
    geo: geo,
  });
});

app.get("/api/:version", function (req, res) {
  res.send(req.params.version);
});

app.param("name", function (req, res, next, name) {
  const modified = name.toUpperCase();

  req.name = modified;
  next();
});

app.get("/api/users/:name", function (req, res) {
  res.send("Hello " + req.name + "!");
});
// app.listen(port);
// console.log("server started at http://localhost:" + port);

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/users", function (req, res) {
  const nama = req.body.nama;
  const tempat_lahir = req.body.tempat_lahir;
  const tanggal_lahir = req.body.tanggal_lahir;
  const alamat = req.body.alamat;

  res.send({
    nama,
    tempat_lahir,
    tanggal_lahir,
    alamat,
  });
});
// Start the server
app.listen(port);
console.log("server started at http://localhost:" + port);
