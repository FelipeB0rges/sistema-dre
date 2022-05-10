const TiposReceita = require("../models/tipos_receitas.model.js");

// Create and Save a new TiposReceita
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a TiposReceita
  const tipo_receita = new TiposReceita({
    id_empresa: req.body.id_empresa,
    id_tipo: req.body.id_tipo,
    nome: req.body.nome,
    valor: req.body.valor
  });

  // Save TiposReceita in the database
  TiposReceita.create(tipo_receita, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TiposReceita."
      });
    else res.send(data);
  });
};



// Retrieve all Tutorials from the database (with condition).
exports.findByIdEmpresa = (req, res) => {
  const id_empresa = req.params.id_empresa;

  console.log('id_empresa2', id_empresa)

  TiposReceita.findByIdEmpresa(id_empresa, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erro ao buscar tipos_receitas"
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {

  const id_tipo_receita = req.params.id;

  TiposReceita.delete(id_tipo_receita, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erro ao deletar tipo de receita"
      });
    else res.send(data);
  });
};

