module.exports = app => {
    const despesas = require("../controllers/tipos_despesas.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Usuario
    router.post("/cadastrar", despesas.create);
  
    // Retrieve all published Usuarios
    router.get("/empresa/:id_empresa", despesas.findByIdEmpresa);

    router.delete("/:id", despesas.delete);
  
    app.use('/api/tipos_despesas', router);
  };
  