const Usuarios = require("../models/usuarios.model.js");

// Create and Save a new Usuarios
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Usuarios
  const usuarios = new Usuarios({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Usuarios in the database
  Usuarios.create(usuarios, (err, data) => {
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
exports.findAll = (req, res) => {
  const title = req.query.title;

  Usuarios.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single Usuarios by Id
exports.findOne = (req, res) => {
  Usuarios.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Usuarios with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Usuarios with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  Usuarios.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Update a Usuarios identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Usuarios.updateById(
    req.params.id,
    new Usuarios(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Usuarios with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Usuarios with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Usuarios with the specified id in the request
exports.delete = (req, res) => {
  Usuarios.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Usuarios with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Usuarios with id " + req.params.id
        });
      }
    } else res.send({ message: `Usuarios was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Usuarios.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
