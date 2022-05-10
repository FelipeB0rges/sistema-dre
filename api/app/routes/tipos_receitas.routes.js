module.exports = app => {
    const tipos_receitas = require("../controllers/tipos_receitas.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Usuario
    router.post("/cadastrar", tipos_receitas.create);
  
    // Retrieve all published Usuarios
    router.get("/empresa/:id_empresa", tipos_receitas.findByIdEmpresa);

    router.delete("/:id", tipos_receitas.delete);
  
    
    app.use('/api/tipos_receitas', router);
  };
  