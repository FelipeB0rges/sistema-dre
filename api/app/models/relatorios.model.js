const sql = require("./db.js");

// constructor
const Relatorio = function (relatorio) {
  this.id_empresa = relatorio.id_empresa;
  this.id_relatorio = relatorio.id_relatorio;
};

Relatorio.create = (novo_relatorio, result) => {

  sql.query("INSERT INTO relatorios SET ?", novo_relatorio, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created relatorio: ", { id: res.insertId, ...novo_relatorio });
    result(null, { id: res.insertId, ...novo_relatorio });
  });
};

Relatorio.gerar = (relatorio, result) => {

  console.log('relatoriooo', relatorio)

  let primeira_consulta = `SELECT query FROM relatorios WHERE id = ${relatorio.id_relatorio}`;

  let query = ''

  sql.query(primeira_consulta, (err, res) => {
    query = res[0].query
    query += ` WHERE id_empresa = '${relatorio.id_empresa}'`;
    console.log('query', query)
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("relatorios: ", res);
      result(null, res);
    });
  });


};

Relatorio.login = (newRelatorio, result) => {
  sql.query("INSERT INTO relatorios SET ?", newRelatorio, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newRelatorio });
    result(null, { id: res.insertId, ...newRelatorio });
  });
};

Relatorio.findAll = (relatorio, result) => {
  sql.query(`SELECT * from relatorios`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Relatorio encontrados: ", res[0]);
      result(null, res);
      return;
    }

    // not found Relatorio with the id
    result({ kind: "nenhum_usuario_encontrado" }, null);
  });
};

Relatorio.getEmailSenha = (login, result) => {

  let query = "SELECT * FROM relatorios";

  if (login) {
    query += ` WHERE email = '${login.email}' AND senha = '${login.senha}'`;
  }

  console.log(query);

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }


    console.log("relatorios: ", res);
    result(null, res);
  });
};

Relatorio.getAllPublished = result => {
  sql.query("SELECT * FROM relatorios WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("relatorios: ", res);
    result(null, res);
  });
};

Relatorio.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE relatorios SET title = ?, description = ?, published = ? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Relatorio with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Relatorio.delete = (id, result) => {
  sql.query("DELETE FROM relatorios WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Relatorio with the id
      result({ kind: "relatorio não encontrado" }, null);
      return;
    }

    console.log("Tipo de relatorio deleatada com o id: ", id);
    result(null, res);
  });
};


module.exports = Relatorio;
