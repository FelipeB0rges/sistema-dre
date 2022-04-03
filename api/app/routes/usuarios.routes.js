module.exports = app => {
  const usuarios = require("../controllers/usuarios.controller.js");

  var router = require("express").Router();

  // Create a new Usuario
  router.post("/criar", usuarios.create);

  // Login Usuario
  router.post("/login", usuarios.login);

  // Retrieve all Tutorials
  router.get("/", usuarios.findAll);

  // Retrieve all published Tutorials
  router.get("/published", usuarios.findAllPublished);

  // Retrieve a single Usuario with id
  router.get("/:id", usuarios.findOne);

  // Update a Usuario with id
  router.put("/:id", usuarios.update);

  // Delete a Usuario with id
  router.delete("/:id", usuarios.delete);

  // Delete all Tutorials
  router.delete("/", usuarios.deleteAll);

  app.use('/api/usuarios', router);
};
