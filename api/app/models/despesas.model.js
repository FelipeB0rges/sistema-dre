const sql = require("./db.js");

// constructor
const Despesa = function (despesa) {
  this.id_empresa = despesa.id_empresa;
  this.id_tipo = despesa.id_tipo;
  this.nome = despesa.nome;
  this.valor = despesa.valor;
};

Despesa.create = (nova_despesa, result) => {

  sql.query("INSERT INTO despesas_empresa SET ?", nova_despesa, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created despesa: ", { id: res.insertId, ...nova_despesa });
    result(null, { id: res.insertId, ...nova_despesa });
  });
};

Despesa.login = (newUsuario, result) => {
  sql.query("INSERT INTO despesas_empresa SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created despesa: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
  });
};

Despesa.findByIdEmpresa = (id, result) => {
  sql.query(`SELECT re.id,re.nome,re.valor,re.data,rt.descricao FROM despesas_empresa re join despesa_tipo rt on rt.id = re.id_tipo WHERE re.id_empresa = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Despesa encontrados: ", res[0]);
      result(null, res);
      return;
    }

    // not found Despesa with the id
    result({ kind: "nenhum_usuario_encontrado" }, null);
  });
};

Despesa.getEmailSenha = (login, result) => {

  let query = "SELECT * FROM despesas_empresa";

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


    console.log("despesas_empresa: ", res);
    result(null, res);
  });
};

Despesa.getAllPublished = result => {
  sql.query("SELECT * FROM despesas_empresa WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("despesas_empresa: ", res);
    result(null, res);
  });
};

Despesa.updateById = (id, despesa, result) => {
  sql.query(
    "UPDATE despesas_empresa SET title = ?, description = ?, published = ? WHERE id = ?",
    [despesa.title, despesa.description, despesa.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Despesa with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated despesa: ", { id: id, ...despesa });
      result(null, { id: id, ...despesa });
    }
  );
};

Despesa.delete = (id, result) => {
  sql.query("DELETE FROM despesas_empresa WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Despesa with the id
      result({ kind: "despesa não encontrado" }, null);
      return;
    }

    console.log("Tipo de despesa deleatada com o id: ", id);
    result(null, res);
  });
};


module.exports = Despesa;
