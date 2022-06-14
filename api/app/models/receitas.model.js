const sql = require("./db.js");
const moment = require("moment");

// constructor
const Receita = function (receita) {
  this.id_empresa = receita.id_empresa;
  this.id_tipo = receita.id_tipo;
  this.nome = receita.nome;
  this.valor = receita.valor;
};

Receita.create = (nova_receita, result) => {

  sql.query("INSERT INTO receitas_empresa SET ?", nova_receita, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created receita: ", { id: res.insertId, ...nova_receita });
    result(null, { id: res.insertId, ...nova_receita });
  });
};

Receita.login = (newUsuario, result) => {
  sql.query("INSERT INTO receitas_empresa SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
  });
};

Receita.findByIdEmpresa = (id, result) => {
  sql.query(`SELECT re.id,re.nome,re.valor,re.data,rt.descricao FROM receitas_empresa re join receita_tipo rt on rt.id = re.id_tipo WHERE re.id_empresa = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      res.forEach(element => {
        if (element.data) {
          element.data = moment(element.data).format("DD/MM/YYYY HH:mm:ss")
        }
      });
      console.log("Receita encontrados: ", res[0]);
      result(null, res);
      return;
    }

    // not found Receita with the id
    result({ kind: "nenhum_usuario_encontrado" }, null);
  });
};

Receita.getEmailSenha = (login, result) => {

  let query = "SELECT * FROM receitas_empresa";

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


    console.log("receitas_empresa: ", res);
    result(null, res);
  });
};

Receita.getAllPublished = result => {
  sql.query("SELECT * FROM receitas_empresa WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("receitas_empresa: ", res);
    result(null, res);
  });
};

Receita.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE receitas_empresa SET title = ?, description = ?, published = ? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Receita with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Receita.delete = (id, result) => {
  sql.query("DELETE FROM receitas_empresa WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Receita with the id
      result({ kind: "receita não encontrado" }, null);
      return;
    }

    console.log("Tipo de receita deleatada com o id: ", id);
    result(null, res);
  });
};


module.exports = Receita;
