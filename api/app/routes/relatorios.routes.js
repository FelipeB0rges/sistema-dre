module.exports = app => {
    const relatorios = require("../controllers/relatorios.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Usuario
    router.post("/cadastrar", relatorios.create);

     // Create a new Usuario
    router.post("/gerar", relatorios.gerar);

      // Create a new Usuario
    router.post("/despesas", relatorios.despesas);
  
    // Retrieve all published Usuarios
    router.get("/", relatorios.findAll);

    router.delete("/:id", relatorios.delete);
  
    app.use('/api/relatorios', router);
  };
  