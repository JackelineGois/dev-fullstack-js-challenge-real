const express = require("express");
var cors = require("cors");
let database = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Atualizando");
});

app.get("/students/list/:searchQuery?", function (req, res) {
  let result = database;
  let search = req.params.searchQuery;
  if (search) {
    search = search.toLowerCase();
    result = result.filter((student) => {
      return (
        student.ra == search ||
        student.nome.toLowerCase().indexOf(search) != -1 || 
        student.cpf == search
      );
    });
  }
  setTimeout(function () {
    res.send(result);
  }, 2000);
});

app.get("/students/find/:ra", function (req, res) {
  const studentFound = database.find(function (student) {
    return student.ra == req.params.ra;
  });
  setTimeout(function () {
    res.send(studentFound);
  }, 2000);
});

app.post("/students/save", (req, res) => {
  database.push({
    nome: req.body.name,
    ra: req.body.ra,
    email: req.body.email,
    cpf: req.body.cpf,
  });
  res.send({
    result: true,
    message: " O usuário foi cadastrado com sucesso.",
  });
});

app.delete("/students/delete/:ra", (req, res) => {
  database = database.filter(function (student) {
    return student.ra != req.params.ra;
  });
  res.send({
    result: true,
    message: ` O estudante #${req.params.ra} foi excluido com sucesso!`,
  });
});

app.put("/students/edit/:ra", (req, res) => {
  database = database.filter(function (student) {
    return student.ra != req.body.ra;
  });

  database.push({
    nome: req.body.name,
    ra: req.body.ra,
    email: req.body.email,
    cpf: req.body.cpf,
  });
  res.send({
    result: true,
    message: "Usúario editado com sucesso!",
  });
});

app.listen(3000);
console.log("Server is running");
