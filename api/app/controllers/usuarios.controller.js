const Usuarios = require("../models/usuarios.model.js");

// Create and Save a new Usuarios
exports.create = (req, res) => {
  console.log('chamandoooo')
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Usuarios
  const usuario = new Usuarios({
    id_empresa: req.body.id_empresa,
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    cpf: req.body.cpf,
  });

  // Save Usuarios in the database
  Usuarios.create(usuario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Usuarios."
      });
    else res.send(data);
  });
};


exports.login = (req, res) => {

  const login = {
    email: req.body.email,
    senha: req.body.senha
  }

  Usuarios.getEmailSenha(login, (err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Login ou senha incorretos."
      });
    else if (data.length == 0) {
      res.status(401).send({
        message:
          "Login ou senha incorretos."
      });
    }
    else res.send(data);
  });
};


// Retrieve all Tutorials from the database (with condition).
exports.findByIdEmpresa = (req, res) => {
  console.log(req)
  const id_empresa = req.params.id_empresa;

  console.log('id_empresa2', id_empresa)

  Usuarios.findByIdEmpresa(id_empresa, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erro ao buscar usuarios"
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {

  const id_usuario = req.params.id;


  Usuarios.delete(id_usuario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erro ao deletar usuário"
      });
    else res.send(data);
  });
};

