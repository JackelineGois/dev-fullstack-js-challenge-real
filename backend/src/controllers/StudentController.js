module.exports = class StudentsController {
  constructor(app) {
    this.app = app;
  }

  listAction = (req, res) => {
    let query = this.app.database("students");
    let search = req.params.searchQuery;
    if (search) {
      query
        .where("ra", search)
        .orWhere("nome", "like", `%${search}%`)
        .orWhere("cpf", "like", search);
    }
    return query.select().then((data) => {
      res.send(data);
    });
  };

  findAction = (req, res) => {
    return this.app

      .database("students")
      .select()
      .where({ ra: req.params.ra })
      .first()
      .then((response) => {
        console.log(response);
        res.send(response);
      });
  };

  isCreateDataValid = async (data) => {
    if (data.name == "") {
      return "O nome é um campo obrigatório!";
    }
    if (data.email == "") {
      return "O email é um campo obrigatório!";
    }
    if (data.ra == "") {
      return "O RA é um campo obrigatório!";
    }
    if (data.cpf == "") {
      return "O cpf é um campo obrigatório!";
    }

    if (parseInt(data.ra) != data.ra) {
      return "O Ra deve ser um número!";
    }
    if (parseInt(data.cpf) != data.cpf) {
      return "O CPF deve ser um número!";
    }
    const userExists = await this.app
      .database("students")
      .select()
      .where({
        ra: data.ra,
      })
      .first();

    if (userExists) {
      return "Desculpe, mas já existe um estudante cadastrado com esse RA";
    }

    return true;
  };

  createAction = async (req, res) => {
    const isCreateDataValid = await this.isCreateDataValid(req.body);
    if (isCreateDataValid !== true) {
      return res.status(400).send({
        result: false,
        message: isCreateDataValid,
      });
    }

    return this.app
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
  };

  deleteAction = (req, res) => {
    return this.app
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
  };

  isEditDataValid = (data) => {
    if (data.name == "") {
      return "O nome é um campo obrigatório!";
    }

    if (data.email == "") {
      return "O Email é um campo obrigatório!";
    }

    return true;
  };

  editAction = async (req, res) => {
    const isEditDataValid = await this.isEditDataValid(req.body);
    console.log(isEditDataValid);
    if (isEditDataValid != true) {
      return res.status(400).send({
        result: false,
        message: isEditDataValid,
      });
    }
    const userFound = await this.app

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
    const studentUpdate = await this.app
      .database("students")
      .update({
        email: req.body.email,
        nome: req.body.name,
      })
      .where({
        ra: req.params.ra,
      });
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
  };
};
