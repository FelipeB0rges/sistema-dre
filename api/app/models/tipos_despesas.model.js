const sql = require("./db.js");

// constructor
const TipoDespesa = function (tipo_despesa) {
  this.id_empresa = tipo_despesa.id_empresa;
  this.descricao = tipo_despesa.descricao;
};

TipoDespesa.create = (novo_tipo_despesa, result) => {

  sql.query("INSERT INTO despesa_tipo SET ?", novo_tipo_despesa, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created tipo_despesa: ", { id: res.insertId, ...novo_tipo_despesa });
    result(null, { id: res.insertId, ...novo_tipo_despesa });
  });
};

TipoDespesa.login = (newUsuario, result) => {
  sql.query("INSERT INTO despesa_tipo SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
  });
};

TipoDespesa.findByIdEmpresa = (id, result) => {
  sql.query(`SELECT * FROM despesa_tipo WHERE id_empresa = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("TipoDespesa encontrados: ", res[0]);
      result(null, res);
      return;
    }

    // not found TipoDespesa with the id
    result({ kind: "nenhum_usuario_encontrado" }, null);
  });
};

TipoDespesa.getEmailSenha = (login, result) => {

  let query = "SELECT * FROM despesa_tipo";

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


    console.log("despesa_tipo: ", res);
    result(null, res);
  });
};

TipoDespesa.getAllPublished = result => {
  sql.query("SELECT * FROM despesa_tipo WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("despesa_tipo: ", res);
    result(null, res);
  });
};

TipoDespesa.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE despesa_tipo SET title = ?, description = ?, published = ? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found TipoDespesa with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

TipoDespesa.delete = (id, result) => {
  sql.query("DELETE FROM despesa_tipo WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found TipoDespesa with the id
      result({ kind: "tipo_despesa não encontrado" }, null);
      return;
    }

    console.log("Tipo de receita deleatada com o id: ", id);
    result(null, res);
  });
};


module.exports = TipoDespesa;
