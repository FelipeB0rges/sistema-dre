const Despesa = require("../models/tipos_despesas.model.js");

// Create and Save a new Despesa
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Despesa
  const despesa = new Despesa({
    id_empresa: req.body.id_empresa,
    descricao: req.body.descricao,
  });

  // Save Despesa in the database
  Despesa.create(despesa, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Despesa."
      });
    else res.send(data);
  });
};



// Retrieve all Tutorials from the database (with condition).
exports.findByIdEmpresa = (req, res) => {
  const id_empresa = req.params.id_empresa;

  Despesa.findByIdEmpresa(id_empresa, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erro ao buscar despesas"
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {

  const id_despesa = req.params.id;

  Despesa.delete(id_despesa, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erro ao deletar tipo de despesa"
      });
    else res.send(data);
  });
};

