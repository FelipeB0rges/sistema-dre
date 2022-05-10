const Receita = require("../models/receitas.model.js");

// Create and Save a new Receita
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Receita
  const receita = new Receita({
    id_empresa: req.body.id_empresa,
    id_tipo: req.body.id_tipo,
    nome: req.body.nome,
    valor: req.body.valor,
  });

  // Save Receita in the database
  Receita.create(receita, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Receita."
      });
    else res.send(data);
  });
};



// Retrieve all Tutorials from the database (with condition).
exports.findByIdEmpresa = (req, res) => {
  const id_empresa = req.params.id_empresa;

  Receita.findByIdEmpresa(id_empresa, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erro ao buscar receitas"
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {

  const id_receita = req.params.id;

  Receita.delete(id_receita, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erro ao deletar tipo de receita"
      });
    else res.send(data);
  });
};

