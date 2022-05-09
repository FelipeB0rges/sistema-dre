module.exports = app => {
  const usuarios = require("../controllers/usuarios.controller.js");

  var router = require("express").Router();

  // Create a new Usuario
  router.post("/cadastrar", usuarios.create);

  // Login Usuario
  router.post("/login", usuarios.login);

 /*  // Retrieve all Usuarios
  router.get("/", usuarios.findByIdEmpresa); */

  // Retrieve all published Usuarios
  router.get("/empresa/:id_empresa", usuarios.findByIdEmpresa);

/*   // Retrieve a single Usuario with id
  router.get("/:id", usuarios.findOne);

  // Update a Usuario with id
  router.put("/:id", usuarios.update); */

  // Delete a Usuario with id
  router.delete("/:id", usuarios.delete);

/*   // Delete all Usuarios
  router.delete("/", usuarios.deleteAll); */

  app.use('/api/usuarios', router);
};
