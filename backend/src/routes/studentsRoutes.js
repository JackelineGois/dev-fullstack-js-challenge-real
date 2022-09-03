/* mas a primeira coisa que precisamos fazer é importar o express */
const express = require("express");
const StudentsController = require("../controllers/StudentController");
/* Temos que exportar o código que for criar aqui dentro. */

module.exports = (app) => {
  const router = express.Router();
  const StudentsControllerInstance = new StudentsController(app);
  /* eu tirei o /students da frente porque nos criamos um método que chama o /students no server automaticamente e se eu deixar escrito aqui tbm, isso vai causar duplicação dessa palavra e isso vai dar problema no meu servidor. */
  router.get("/list/:searchQuery?", StudentsControllerInstance.listAction);
  router.get("/find/:ra", StudentsControllerInstance.findAction);
  router.post("/save", (req, res) => {
    return StudentsControllerInstance.createAction(req, res);
  });
  router.delete("/delete/:ra", (req, res) => {
    return StudentsControllerInstance.deleteAction(req, res);
  });
  router.put("/edit/:ra", StudentsControllerInstance.editAction);

  return router;
};
