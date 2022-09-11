const express = require("express");
const studentsRoutes = require("./routes/studentsRoutes");
const knex = require("knex");
var cors = require("cors");

/* essa constante foi criada para armazenar as nossas configurações de acesso do banco de dados */
const knexConfigFile = require("../knexfile");

const app = express();

/* essa app abaixo é usado para conectar o banco de dados com a nossa aplicação/projeto */
app.database = knex(knexConfigFile.test);

app.use(cors());
app.use(express.json());

app.use("/students", studentsRoutes(app));

/* codigo feito pra teste do começo
app.get("/", function (req, res) {
  res.send("Atualizando");
});

esse codigo estava aqui abaixo, mas nos transferimos ele para a pasta de studentsRoutes, para não deixar o nosso server.js poluído

app.get("/students/list/:searchQuery?", StudentsControllerInstance.listAction);
app.get("/students/find/:ra", StudentsControllerInstance.findAction);
app.post("/students/save", (req, res) => {
  return StudentsControllerInstance.createAction(req, res);
});
app.delete("/students/delete/:ra", (req, res) => {
  return StudentsControllerInstance.deleteAction(req, res);
});
app.put("/students/edit/:ra", StudentsControllerInstance.editAction);

/* abaixo é o metodo de fazer update sem usar banco de dados 

  if (req.body.name == "") {
    return res.status(400).send({
      result: false,
      message: "O nome é um campo obrigatório!",
    });
  }
  if (req.body.email == "") {
    return res.status(400).send({
      result: false,
      message: "O nome é um campo obrigatório!",
    });
  }
  const userFound = await app
    .database("students")
    .select()
    .where({ ra: req.params.ra })
    .first();

  if (!userFound) {
    return res.status(400).send({
      result: false,
      message: "O estudante informado não existe",
    });
  }

  const studentUpdate = await app
    .database("students")
    .update({
      nome: req.body.name,
      email: req.body.email,
    })
    .where({
      ra: req.body.ra,
    });
  if (studentUpdate) {
    res.send({
      result: true,
      message: "Usúario editado com sucesso!",
    });
  }
  */

app.listen(3006);
console.log("Server is running");
