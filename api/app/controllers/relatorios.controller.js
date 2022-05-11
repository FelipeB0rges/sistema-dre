const Relatorio = require("../models/relatorios.model.js");

// Create and Save a new Relatorio
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Relatorio
    const relatorio = new Relatorio({
        id_empresa: req.body.id_empresa,
        id_tipo: req.body.id_tipo,
        data_inicio: req.body.data_inicio,
        data_fim: req.body.data_fim
    });

    // Save Relatorio in the database
    Relatorio.create(relatorio, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Relatorio."
            });
        else res.send(data);
    });
};


exports.gerar = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Relatorio
    const relatorio = new Relatorio({
        id_empresa: req.body.id_empresa,
        id_relatorio: req.body.id_relatorio,
        data_inicio: req.body.data_inicio,
        data_fim: req.body.data_fim
    });

    // Save Relatorio in the database
    Relatorio.gerar(relatorio, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Relatorio."
            });
        else res.send(data);
    });
};



// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {

    const relatorio = {
        id_empresa: req.params.id_empresa,
        id_relatorio: req.params.id_relatorio
    }


    Relatorio.findAll(relatorio, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Erro ao buscar relatorios"
            });
        else res.send(data);
    });
};

exports.delete = (req, res) => {

    const id_receita = req.params.id;

    Relatorio.delete(id_receita, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Erro ao deletar tipo de relatorio"
            });
        else res.send(data);
    });
};

