module.exports = app => {
    const receitas = require("../controllers/receitas.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Usuario
    router.post("/cadastrar", receitas.create);
  
    // Retrieve all published Usuarios
    router.get("/empresa/:id_empresa", receitas.findByIdEmpresa);

    router.delete("/:id", receitas.delete);
  
    app.use('/api/receitas', router);
  };
  