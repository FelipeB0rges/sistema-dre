const sql = require("./db.js");

// constructor
const TiposReceita = function (tipo_receita) {
  this.id_empresa = tipo_receita.id_empresa;
  this.descricao = tipo_receita.descricao;
};

TiposReceita.create = (novo_tipo_receita, result) => {

  sql.query("INSERT INTO receita_tipo SET ?", novo_tipo_receita, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created tipo_receita: ", { id: res.insertId, ...novo_tipo_receita });
    result(null, { id: res.insertId, ...novo_tipo_receita });
  });
};

TiposReceita.login = (newUsuario, result) => {
  sql.query("INSERT INTO receita_tipo SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
  });
};

TiposReceita.findByIdEmpresa = (id, result) => {
  sql.query(`SELECT * FROM receita_tipo WHERE id_empresa = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("TiposReceita encontrados: ", res[0]);
      result(null, res);
      return;
    }

    // not found TiposReceita with the id
    result({ kind: "nenhum_usuario_encontrado" }, null);
  });
};

TiposReceita.getEmailSenha = (login, result) => {

  let query = "SELECT * FROM receita_tipo";

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


    console.log("receita_tipo: ", res);
    result(null, res);
  });
};

TiposReceita.getAllPublished = result => {
  sql.query("SELECT * FROM receita_tipo WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("receita_tipo: ", res);
    result(null, res);
  });
};

TiposReceita.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE receita_tipo SET title = ?, description = ?, published = ? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found TiposReceita with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

TiposReceita.delete = (id, result) => {
  sql.query("DELETE FROM receita_tipo WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found TiposReceita with the id
      result({ kind: "tipo_receita não encontrado" }, null);
      return;
    }

    console.log("Tipo de receita deleatada com o id: ", id);
    result(null, res);
  });
};


module.exports = TiposReceita;
