const express = require("express");
const knex = require("knex");
var cors = require("cors");
let database = require("./database");

/* essa constante foi criada para armazenar as nossas configurações de acesso do banco de dados */
const knexConfigFile = require("../knexfile");

const app = express();

/* essa app abaixo é usado para conectar o banco de dados com a nossa aplicação/projeto */
app.database = knex(knexConfigFile.test);

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Atualizando");
});

app.get("/students/list/:searchQuery?", function (req, res) {
  let query = app.database("students");
  /* Esse codigo nos fizemos para conseguir pesquisar um usuário pelo banco de dados, nos usamos % e like para que seja possivél pesquisar o nome por várias maneiras, nos sempre usaremos like e % quando formos trabalhar com banco de dados */
  let result = database;
  let search = req.params.searchQuery;
  if (search) {
    query
      .where("ra", search)
      .orWhere("nome", "like", `%${search}% `)
      .orWhere("cpf", search);
  }
  /* select é uma das operações do banco de dados que busca informações */

  return query.select().then((data) => {
    res.send(data);
  });
});

app.get("/students/find/:ra", function (req, res) {
  return app
    .database("students")
    .select()
    .where({ ra: req.params.ra })
    .first()
    .then((response) => {
      res.send(response);
    });
});

app.post("/students/save", async (req, res) => {
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
  if (req.body.ra == "") {
    return res.status(400).send({
      result: false,
      message: "O nome é um campo obrigatório!",
    });
  }
  if (req.body.cpf == "") {
    return res.status(400).send({
      result: false,
      message: "O nome é um campo obrigatório!",
    });
  }

  if (parseInt(req.body.ra) != req.body.ra) {
    return res.status(400).send({
      result: false,
      message: "O Ra deve ser um número!",
    });
  }
  if (parseInt(req.body.cpf) != req.body.cpf) {
    return res.status(400).send({
      result: false,
      message: "O CPF deve ser um número!",
    });
  }
  const userExists = await app
    .database("students")
    .select()
    .where({
      ra: req.body.ra,
    })
    .first();

  if (userExists) {
    return res.status(400).send({
      result: false,
      message: "Desculpe, mas já existe um estudante cadastrado com esse RA",
    });
  }

  return app
    .database("students")
    .insert({
      nome: req.body.name,
      ra: req.body.ra,
      email: req.body.email,
      cpf: req.body.cpf,
    })
    .then((response) => {
      if (response) {
        res.send({
          result: true,
          message: " O usuário foi cadastrado com sucesso.",
        });
      } else {
        res.status(500).send({
          result: true,
          message: "Não foi possível cadastrar o estudante",
        });
      }
    });
});

app.delete("/students/delete/:ra", (req, res) => {
  return app
    .database("students")
    .where({ ra: req.params.ra })
    .del()
    .then((response) => {
      if (response) {
        res.send({
          result: true,
          message: ` O estudante #${req.params.ra} foi excluido com sucesso!`,
        });
      } else {
        res.send({
          result: false,
          message: "Não foi possivel excluir o estudante",
        });
      }
    });
});

app.put("/students/edit/:ra", async (req, res) => {
  const userFound = await app

    .database("students")
    .select()
    .where({ ra: req.params.ra })
    .first()

     if (!userFound) {
       return res.status(400).send({
         result: false,
         message: "O estudante informado não existe",
       });
        }
        const studentUpdate = await app
          .database("students")
          .update({
            email: req.body.email,
            nome: req.body.name,
          })
          .where({
            ra: req.params.ra,
          })
            if (studentUpdate) {
              res.send({
                result: true,
                message: "Usúario editado com sucesso!",
              });
            } else {
              res.status(500).send({
                result: false,
                message: "Desculpe, mas não conseguimos atualizar o estudante",
              });
            }

    });


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


app.listen(3000);
console.log("Server is running");
